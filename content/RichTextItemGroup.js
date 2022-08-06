const util = require("util");
const RichText = require("./RichText");
const log = require("debug")("Notion");

class RichTextItemGroup {
  /**
   * @param {string} id
   * @param {import("@notionhq/client/build/src/api-endpoints").RichTextItemResponse[]} data
   */
  constructor(data) {
    Object.defineProperty(this, "raw_data", {
      value: data,
    });
    this.group = data.map((item) => RichText.create(item));
  }
  [util.inspect.custom]() {
    return this.group
      .map((item) => item[util.inspect.custom]())
      .join("")
      .trim();
  }
}

module.exports = RichTextItemGroup;
