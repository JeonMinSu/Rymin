// 클라이언트에서 API 호출
import { useEffect, useState } from "react";
import { useRouter } from "next/router"
import { getPageCover } from "@/src/libs/apis/getCover";

const Cover: React.FC = () => {
  const router = useRouter();
  const [coverUrl, setCoverUrl] = useState();

  console.log('Cover.tsx: Cover: React.FC'+ router.query.coverUrl);
  useEffect(() => {
    async function fetchCover() {
      try {
        // const cover = await getPageCover();

      //   if (cover) {
      //     setCoverUrl(coverUrl);
      //   } else {
      //     console.error("Failed to load cover.");
      //   }
      } catch (error) {
        console.error("Failed to load cover.");
      }
    }
    fetchCover();
  })

  return (
    <div className="p-6">
      {(
        <img
          src={'coverUrl'}
          alt="Notion Cover"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      ) }
    </div>
  );
};

export default Cover;
