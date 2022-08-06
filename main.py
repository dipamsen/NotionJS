from notion.client import NotionClient

# Obtain the `token_v2` value by inspecting your browser cookies on a logged-in (non-guest) session on Notion.so
client = NotionClient(
    token_v2="71d1e858a1e83142bf8f51c5d504ddca1e1d2d275a570169ab57873a148a817d53c71cd9e85c44174899a1f7946b4c7bbc381953c8ca0010345fe49bad8603ac33473fd2392871d872eaea5252eb")

# Replace this URL with the URL of the page you want to edit
page = client.get_block(
    "https://www.notion.so/funplanet/ab1e757d5e1342559b402f0d86494e79")

print("The old title is:", page.title)

# Note: You can use Markdown! We convert on-the-fly to Notion's internal formatted text data structure.
page.title = "The title has now changed, and has *live-updated* in the browser!"
