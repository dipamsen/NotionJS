const { Client } = require("@notionhq/client");
const { NotionClient } = require("./notion.js");
require("dotenv").config();

(async () => {
  // Initializing a client
  const notion = new NotionClient(
    new Client({
      auth: process.env.NOTION_TOKEN,
    })
  );
  const db = await notion.getDatabase("ab1e757d5e1342559b402f0d86494e79");
  await db.listPages();
  console.log(db);

  const classification = db.pages.find((n) => n.id === "642c8f7d-531d-437d-9b96-e7ca487ba306");
  console.log(await classification.block());
})();
