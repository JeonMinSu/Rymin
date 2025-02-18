import { useEffect, useState } from "react";
import { useRouter } from "next/router"
import { NotionAPI } from "notion-client";

import { BlockMap, CollectionPropertySchemaMap } from "notion-types"

type Props = {
  pageId: string;
}

const Cover: React.FC<Props> = ({ pageId }) => {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCover() {
      const api = new NotionAPI()
      const response = await api.getPage(pageId)

      const block = response.block as BlockMap
      const pageBlock = block?.[pageId]
      
      if (!pageBlock)
      {
        return;
      }
    
      const pageCover = pageBlock.value.format?.page_cover || null;
    
      if (pageCover && pageCover.startsWith("/"))
      {
        setCoverUrl(`https://www.notion.so${pageCover}`);
      }
      else
      {
        setCoverUrl(pageCover);
      }
    }

    fetchCover();
}, [pageId]);

  return (
    <div className="p-6">
      {coverUrl ? (
        <>
          {coverUrl && (
            <img src={coverUrl} alt="Notion Banner" className="w-full h-64 object-cover rounded-lg shadow-md" />
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Cover;
// type Props = {}

// const NotionBanner: React.FC<Props> = (Images) => {
//   const router = useRouter()
//   const [images,setImages] = useState(Images);

//   useEffect(() => {
//     setImages(() =>
//     {
//       let images = Images;

//       return images;
//     });

  // useEffect(() => {
  //   fetch("/apis/getBanner")
  //     .then((res) => res.json())
  //     .then(({ pageData }) => {
  //       const block = Object.values(pageData.block)[0] as { value: { format?: { page_cover?: string; page_icon?: string } } }; // 첫 번째 블록 가져오기
  //       const banner = block.value.format?.page_cover || "";
  //       const icon = block.value.format?.page_icon || "";

  //       console.log("Extracted Banner:", banner);

  //       setData({ banner, icon });
  //     })
  //     .catch((err) => console.error("Failed to fetch Notion data:", err));
  // }, []);

// }

// export default function NotionBanner()
// {

//     const router = useRouter()
//     const [data, setData] = useState<{ banner: string; icon: string } | null>(null);
    


//     useEffect(() => {
//         fetch("/apis/getBanner")
//           .then((res) => res.json())
//           .then(({ pageData }) => {
//             const block = Object.values(pageData.block)[0] as { value: { format?: { page_cover?: string; page_icon?: string } } }; // 첫 번째 블록 가져오기
//             const banner = block.value.format?.page_cover || "";
//             const icon = block.value.format?.page_icon || "";

//           console.log("Extracted Banner:", banner);

    
//             setData({ banner, icon });
//           })
//           .catch((err) => console.error("Failed to fetch Notion data:", err));
//       }, []);


//   return (
//     <div className="p-6">
//       {data ? (
//         <>
//           {data.banner && (
//             <img src={data.banner} alt="Notion Banner" className="w-full h-64 object-cover rounded-lg shadow-md" />
//           )}
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }