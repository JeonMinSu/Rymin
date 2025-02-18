
import { CONFIG } from "site.config"
import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"

export async function getBanner() {
    try{
    
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
        const banner = block?.value.format?.page_cover || null;

  } catch (error) {
    console.error(error);
    return null;
  }
}