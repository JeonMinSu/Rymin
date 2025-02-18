import { NextApiRequest, NextApiResponse } from "next";
import { NotionAPI } from "notion-client";
import { idToUuid } from "notion-utils";
import { CONFIG } from "site.config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let id = CONFIG.notionConfig.pageId as string;
    if (!id) {
      return res.status(400).json({ error: "Missing Notion page ID" });
    }

    const api = new NotionAPI();
    const response = await api.getPage(id);
    id = idToUuid(id);

    const pageCover = response.block[id]?.value?.format?.page_cover || null;
    const coverUrl = pageCover?.startsWith("/") ? `https://www.notion.so${pageCover}` : pageCover;

    return res.status(200).json({ coverUrl });
  } catch (error) {
    console.error("Error fetching Notion cover:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
