
import { NextApiRequest, NextApiResponse } from "next";

import { CONFIG } from "site.config";
import { NotionAPI } from "notion-client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = await getBanner();
    res.status(200).json({ pageData: data });
}


export async function getBanner() {
    try {
        const id = CONFIG.notionConfig.pageId as string;
        if (!id) {
            throw new Error("No page id found in config");
        }

        const api = new NotionAPI();
        const response = await api.getPage(id);

        const blocks = Object.values(response.block);
        if (!blocks.length) {
            throw new Error("No block found in response");
        }

        const block = blocks[0];

        // 배너 URL 처리
        const baseUrl = "https://www.notion.so";
        const banner = block?.value?.format?.page_cover 
            ? block.value.format.page_cover.startsWith("/") 
                ? baseUrl + block.value.format.page_cover 
                : block.value.format.page_cover
            : null;

        return { banner };
    } catch (error) {
        console.error("Error fetching Notion banner:", error);
        return { banner: null };
    }
}
