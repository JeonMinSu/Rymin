import { TPosts, TPostStatus, TPostType } from "@/src/types"
import { ExtendedRecordMap } from "notion-types";

type Options = {
    aceeptStatus?: TPostStatus[]
}

const initialOption:Options = {
    aceeptStatus: ["Public"]
}

// export function filterPublicBlocks(blockMap: ExtendedRecordMap, options: Options = initialOption): ExtendedRecordMap {

//     const { aceeptStatus = ["Public"] } = options

//     const filteredBlockMap = Object.fromEntries(
//         Object.entries(blockMap.block).filter(([id, block]) => {
//             const properties = block?.value?.properties
//             const statusArray = properties?.['status']

//             const status = Array.isArray(statusArray) && statusArray[0] && statusArray[0][0]

//             const ispublic = !status || aceeptStatus.includes(status)

//             return ispublic
//         })
//     )
//     return {
//         ...blockMap,
//         block: filteredBlockMap,
//     }
// }

export function filterPublicBlocks(blockMap: ExtendedRecordMap): ExtendedRecordMap {

  const filteredBlockMap = Object.fromEntries(
    Object.entries(blockMap.block).filter(([id, block]) => {
      const properties = block?.value?.properties
      const statusArray = properties?.['status']

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