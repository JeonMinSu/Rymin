import { useEffect, useState } from "react";
import { useRouter } from "next/router"
import { NotionAPI } from "notion-client";

import { BlockMap, CollectionPropertySchemaMap } from "notion-types"

async function getPageCover(
  id: string,
  block: BlockMap
): Promise<string | null> {
  const api = new NotionAPI()

  const response = await api.getPage(id)

  const pageBlock = block?.[id]
  
  if (!pageBlock)
  {
    return null;
  }

  const pageCover = pageBlock.value.format?.page_cover || null;

  if (pageCover && pageCover.startWith("/"))
  {
    return `https://www.notion.so${pageCover}`;
  }

  return pageCover;
}