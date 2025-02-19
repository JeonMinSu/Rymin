// 클라이언트에서 API 호출
import { useEffect, useState } from "react";
import { useRouter } from "next/router"
import { getPageCover } from "@/src/libs/apis/getCover";

export async function getStaticProps() {
  try {
    const coverUrl = await getPageCover();
    console.log('Cover.tsx: getStaticProps: ' + coverUrl);

    return {
      props: {
        coverUrl
      },
      revalidate: 1,
    };

  } catch (error) {
    throw error;
  }
} 

export async function getStaticPaths() {
  const coverUrl = await getPageCover();
  console.log('Cover.tsx: getStaticPaths: ' + coverUrl);

  return {
    paths: [],
    fallback: true,
  };
}

const Cover: React.FC = () => {
  const router = useRouter();
  const [coverUrl, setCoverUrl] = useState();

  console.log('Cover.tsx: Cover: React.FC' + router.query.coverUrl);
  useEffect(() => {
    try {

      //   if (cover) {
      //     setCoverUrl(coverUrl);
      //   } else {
      //     console.error("Failed to load cover.");
      //   }
    } catch (error) {
      console.error("Failed to load cover.");
    }
  })

  return (
    <div className="p-6">
      {(
        <img
          src={'coverUrl'}
          alt="Notion Cover"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      )}
    </div>
  );
};

export default Cover;
