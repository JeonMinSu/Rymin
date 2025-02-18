import { CONFIG } from "site.config"
import { idToUuid } from "notion-utils"
import { NotionAPI } from "notion-client";

import { BlockMap, CollectionPropertySchemaMap } from "notion-types"

export async function getPageCover() {

    let id = CONFIG.notionConfig.pageId as string;
    const api = new NotionAPI();

    const response = await api.getPage(id);
    id = idToUuid(id)

    //   const block = response.block;
    const pageCover = response.block[id]?.value?.format?.page_cover || null;
    if (pageCover && pageCover.startsWith("/")) {
        return `https://www.notion.so${pageCover}`;
    }

    //   if (!pageBlock)
    //   {
    //     return null;
    //   }

    //   const pageCover = pageBlock?

    //   if (pageCover && pageCover.startWith("/"))
    //   {
    //     return `https://www.notion.so${pageCover}`;
    //   }

    return pageCover;
}