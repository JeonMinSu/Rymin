import { NotionAPI } from "notion-client";
import {NextApiRequest, NextApiResponse} from "next";
import { CONFIG } from "@/site.config";

const notion = new NotionAPI;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const pageId = CONFIG.notionConfig.pageId as string;
        if (!pageId || typeof pageId !== "string") {
            throw new Error("Invalid pageId")
        }

        const recordMap = await notion.getPage(pageId);
        res.status(200).json({recordMap});

    } catch (error) {
        console.error("Error fetching Notion data:", error);
        res.status(500).json({ error: "Failed to fetch Notion page" });
    }
}