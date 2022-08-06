const { NotionAPI } = require("./api.js");
const Database = require("./structures/Database.js");

class NotionClient {
  constructor(client) {
    this.api = new NotionAPI(client);
  }

  async getDatabase(id) {
    const query = await this.api.getDatabase(id);
    return new Database(this, id, query);
  }
}

module.exports = { NotionClient };
