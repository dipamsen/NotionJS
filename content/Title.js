const util = require("util");
const log = require("debug")("Notion");

class Title {
  /**
   *
   * @param {import("./notion.js").NotionClient} client
   * @param {string} id
   * @param {import("@notionhq/client/build/src/api-endpoints").RichTextItemResponse[]} data
   */
  constructor(client, data) {
    Object.defineProperty(this, "client", {
      value: client,
    });
    Object.defineProperty(this, "raw_data", {
      value: data,
    });
  }
  [util.inspect.custom]() {
    return this.raw_data
      .map((item) => item.title.plain_text)
      .join("")
      .trim();
  }
}

module.exports = Title;
