import { ExtendedRecordMap } from "notion-types";

export function filterPublicBlocks(blockMap: ExtendedRecordMap): ExtendedRecordMap {
    

  const filteredBlockMap = Object.fromEntries(
    Object.entries(blockMap.block).filter(([id, block]) => {
      const properties = block?.value?.properties
      const statusArray = properties?.['Status']

      const status = Array.isArray(statusArray) && statusArray[0] && statusArray[0][0]

      const ispublic = !status || status === 'Public'

      return ispublic
    })
  )
    return {
        ...blockMap,
        block: filteredBlockMap,
    }
}