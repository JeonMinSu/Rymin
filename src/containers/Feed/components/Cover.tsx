// 클라이언트에서 API 호출
import { useEffect, useState } from "react";
import { useRouter } from "next/router"

const Cover: React.FC = () => {
  const router = useRouter();

  console.log('Cover.tsx: Cover: React.FC'+ router.query.coverUrl);
  // const [coverUrl, setCoverUrl] = useState<string | null>(null);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   async function fetchCover() {
  //     try {
  //       const response = await fetch("/api/notion");
  //       const data = await response.json();

  //       if (response.ok && data.coverUrl) {
  //         setCoverUrl(data.coverUrl);
  //       } else {
  //         setError(data.error || "Failed to load cover.");
  //       }
  //     } catch (error) {
  //       setError("Failed to load cover.");
  //     }
  //   }

  //   fetchCover();
  // }, []);

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
