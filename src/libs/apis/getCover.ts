import { CONFIG } from "site.config"
import { idToUuid } from "notion-utils"
import { NotionAPI } from "notion-client";

import { BlockMap, CollectionPropertySchemaMap } from "notion-types"
import { NextApiRequest, NextApiResponse } from "next";

export async function getPageCover() {

    const api = new NotionAPI();
    let id = CONFIG.notionConfig.pageId as string;

    const response = await api.getPage(id);
    id = idToUuid(id)

    const pageCover = response.block[id]?.value?.format?.page_cover || null;
    const coverUrl = pageCover ? `https://www.notion.so${pageCover}` : null;
    
    return coverUrl;
}