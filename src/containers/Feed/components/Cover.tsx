import { useEffect, useState } from "react";
import { getPageCover } from "@/src/libs/apis/getCover";

const Cover: React.FC = ({}) => {
  
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCover() {
      try {
        const coverUrl = await getPageCover();
        if (coverUrl) {
          setCoverUrl(coverUrl);
        } else {
          setError("Failed to load cover.");
        }

      } catch (error) {
        console.error("Error fetching Notion cover:", error);
        setError("Failed to load cover.");
      }
    }
    fetchCover();
  }, []);

  return (
    <div className="p-6">
      {coverUrl ? (
        <>
          {coverUrl && (
            <img src={coverUrl} alt="Notion Cover" className="w-full h-64 object-cover rounded-lg shadow-md" />
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Cover;