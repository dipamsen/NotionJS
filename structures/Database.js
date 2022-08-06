const RichTextItemGroup = require("../content/RichTextItemGroup");
const Page = require("./Page");
const log = require("debug")("Notion");

class Database {
  /**
   *
   * @param {import("./notion.js").NotionClient} client
   * @param {string} id
   * @param {import("@notionhq/client/build/src/api-endpoints").QueryDatabaseResponse} data
   */
  pages = [];
  constructor(client, id, data) {
    Object.defineProperty(this, "client", {
      value: client,
    });
    Object.defineProperty(this, "raw_data", {
      value: data,
    });
    this.id = id;
    this.url = this.raw_data.url;
    this.title = new RichTextItemGroup(this.raw_data.title);
  }
  async listPages() {
    const query = await this.client.api.queryDatabase(this.id);
    for (const page of query.results) {
      const apiPage = await this.client.api.getPage(page.id);
      this.pages.push(await Page.create(this.client, page.id, apiPage));
    }
    return this.pages;
  }
}

module.exports = Database;
