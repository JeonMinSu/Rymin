import { CONFIG } from "@/site.config"
import { NotionAPI } from "notion-client"

const api = new NotionAPI()
export async function getPostBlocks(pageId: string) {

  try{
    if (!pageId || typeof pageId !== "string") {
      throw new Error("Invalid pageId")
    }

    const pageBlock = await api.getPage(pageId)
    return pageBlock

  } catch (error) {
    console.error("Error fetching Notion data:", error)
  }
}
