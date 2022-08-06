class NotionAPI {
  /** @type {import("@notionhq/client").Client} */
  client;

  constructor(client) {
    this.client = client;
  }

  getDatabase(id) {
    return this.client.databases.retrieve({
      database_id: id,
    });
  }

  queryDatabase(id) {
    return this.client.databases.query({
      database_id: id,
    });
  }

  getPage(id) {
    return this.client.pages.retrieve({
      page_id: id,
    });
  }

  getPageProperty(id, property) {
    return this.client.pages.properties.retrieve({
      page_id: id,
      property_id: property,
    });
  }

  getBlock(id) {
    return this.client.blocks.retrieve({
      block_id: id,
    });
  }

  getBlockChildren(id) {
    return this.client.blocks.children.list({
      block_id: id,
    });
  }
}

module.exports = { NotionAPI };
