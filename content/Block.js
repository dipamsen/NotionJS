const chalk = require("chalk");
const util = require("util");
const RichTextItemGroup = require("./RichTextItemGroup.js");
const log = require("debug")("Notion");

class Block {
  /**
   * @param {import("./notion.js").NotionClient} client
   * @param {import("@notionhq/client/build/src/api-endpoints").BlockObjectResponse} block
   */
  constructor(client, data) {
    Object.defineProperty(this, "client", {
      value: client,
    });
    Object.defineProperty(this, "raw_data", {
      value: data,
    });
    this.id = data.id;
  }

  static create(client, block, children) {
    if (block.type === "paragraph") {
      return new ParagraphBlock(client, block);
    } else if (block.type === "child_page") {
      const nb = new Block(client, { ...block, children: children.results });
      nb.children = children.results.map((child) => Block.create(client, child, children));
      return nb;
    } else if (block.type === "equation") {
      return new EquationBlock(client, block);
    } else if (block.type === "code") {
      return new CodeBlock(client, block);
    } else {
      throw new Error(`Unknown block type: ${block.type}`);
    }
  }
}

class ParagraphBlock extends Block {
  [util.inspect.custom]() {
    const col = this.raw_data.paragraph.color;
    const tg = new RichTextItemGroup(this.raw_data.paragraph.rich_text)[util.inspect.custom]();
    if (col === "default") return `<ParagraphBlock ${tg}>`;
    else return `<ParagraphBlock ${chalk[col](tg)}>`;
  }
}

class EquationBlock extends Block {
  [util.inspect.custom]() {
    return `<EquationBlock ${chalk.bgGreen(this.raw_data.equation.expression)}>`;
  }
}

class CodeBlock extends Block {
  [util.inspect.custom]() {
    return `<CodeBlock [${this.raw_data.code.language}] ${chalk.inverse(
      new RichTextItemGroup(this.raw_data.code.rich_text)[util.inspect.custom]()
    )}>`;
  }
}

module.exports = Block;
