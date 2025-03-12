import { NotionAPI } from "notion-client";
import {NextApiRequest, NextApiResponse} from "next";
import { CONFIG } from "@/site.config";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: CONFIG.notionConfig.notionApiKey });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const pageId = CONFIG.notionConfig.pageId as string;
        if (!pageId) throw new Error("Database ID is missing");

        const response = await notion.databases.query({ database_id: pageId });

        res.status(200).json({ results: response.results });
    } catch (error) {
        console.error("Notion API Error:", error);
        res.status(500).json({ error: "Failed to fetch Notion database" });
    }
}
