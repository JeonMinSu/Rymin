import { useEffect, useState } from "react";
import { useRouter } from "next/router"

export default function NotionBanner()
{

    const router = useRouter()
    const [data, setData] = useState<{ banner: string; icon: string } | null>(null);


    useEffect(() => {
        fetch("/api/getBanner")
          .then((res) => res.json())
          .then(({ pageData }) => {
            const block = Object.values(pageData.block)[0] as { value: { format?: { page_cover?: string; page_icon?: string } } }; // 첫 번째 블록 가져오기
            const banner = block.value.format?.page_cover || "";
            const icon = block.value.format?.page_icon || "";
    
            setData({ banner, icon });
          })
          .catch((err) => console.error("Failed to fetch Notion data:", err));
      }, []);


  return (
    <div className="p-6">
      {data ? (
        <>
          {data.banner && (
            <img src={data.banner} alt="Notion Banner" className="w-full h-64 object-cover rounded-lg shadow-md" />
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}