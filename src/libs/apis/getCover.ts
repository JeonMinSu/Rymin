import { NotionAPI } from "notion-client";
import { idToUuid } from "notion-utils";
import { CONFIG } from "site.config";

export async function getPageCover() {
  let id = CONFIG.notionConfig.pageId as string;
  const api = new NotionAPI();
  const response = await api.getPage(id);
  id = idToUuid(id);

  const pageCover = response.block[id]?.value?.format?.page_cover || null;
  return pageCover ? `https://www.notion.so${pageCover}` : null;
}
