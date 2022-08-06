const Title = require("../content/Title");
const Block = require("../content/Block");
const log = require("debug")("Notion");

class Page {
  /**
   * @param {import("./notion.js").NotionClient} client
   * @param {string} id
   * @param {import("@notionhq/client/build/src/api-endpoints").QueryDatabaseResponse} data
   */
  constructor(client, id, data) {
    Object.defineProperty(this, "client", {
      value: client,
    });
    Object.defineProperty(this, "raw_data", {
      value: data,
    });
    this.id = id;
    this.url = this.raw_data.url;
    // this.title = new TextGroup(this.client, this.raw_data.title);
  }

  async fetchProperties() {
    this.properties = new Map();
    for (const [key, { id }] of Object.entries(this.raw_data.properties)) {
      const val = await this.client.api.getPageProperty(this.id, id);
      if (key === "Name") {
        this.title = new Title(this.client, val.results);
        this.properties.set(key, this.title);
      } else this.properties.set(key, val);
    }
  }

  async fetchTitle() {
    const val = await this.client.api.getPageProperty(this.id, this.raw_data.properties.Name.id);
    this.title = new Title(this.client, val.results);
  }

  async block() {
    const block = await this.client.api.getBlock(this.id);
    const children = await this.client.api.getBlockChildren(this.id);
    return Block.create(this.client, block, children);
  }

  static async create(client, id, data) {
    const page = new Page(client, id, data);
    await page.fetchTitle();
    return page;
  }
}

module.exports = Page;
