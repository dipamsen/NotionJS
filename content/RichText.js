const util = require("util");
const log = require("debug")("Notion");
const chalk = require("chalk");

const annotationMap = {
  bold: chalk.bold,
  italic: chalk.italic,
  strikethrough: chalk.strikethrough,
  underline: chalk.underline,
  code: chalk.inverse,
  color: {
    default: (x) => x,
    gray: chalk.gray,
    brown: chalk.rgb(165, 42, 42),
    orange: chalk.rgb(255, 127, 0),
    yellow: chalk.yellow,
    green: chalk.green,
    blue: chalk.blue,
    purple: chalk.blueBright,
    pink: chalk.redBright,
    red: chalk.red,
    gray_background: chalk.bgGray,
    brown_background: chalk.bgRgb(165, 42, 42),
    orange_background: chalk.bgRgb(255, 127, 0),
    yellow_background: chalk.bgYellow,
    green_background: chalk.bgGreen,
    blue_background: chalk.bgBlue,
    purple_background: chalk.bgBlackBright,
    pink_background: chalk.bgRedBright,
    red_background: chalk.bgRed,
  },
};

class RichText {
  /**
   * @param {import("./notion.js").NotionClient} client
   * @param {string} id
   * @param {import("@notionhq/client/build/src/api-endpoints").RichTextItemResponse} data
   */
  constructor(data) {
    Object.defineProperty(this, "raw_data", {
      value: data,
    });
  }

  static create(data) {
    if (data.type === "text") {
      return new TextRichText(data);
    } else if (data.type === "equation") {
      return new EquationRichText(data);
    } else {
      throw new Error(`Unknown rich text type: ${data.type}`);
    }
  }
}

class TextRichText extends RichText {
  [util.inspect.custom]() {
    let txt = this.raw_data.text.content;
    for (const ann in this.raw_data.annotations) {
      const ann_data = this.raw_data.annotations[ann];
      if (ann === "color") {
        txt = annotationMap.color[ann_data](txt);
      } else if (ann_data) {
        txt = annotationMap[ann](txt);
      }
    }
    return txt;
  }
}

class EquationRichText extends RichText {
  [util.inspect.custom]() {
    return chalk.bgGreen(this.raw_data.equation.expression);
  }
}

module.exports = RichText;
