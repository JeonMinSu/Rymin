import {
  getAllSelectItemsFromPosts,
  filterPosts,
} from "@/src/libs/utils/notion"
import Layout from "@components/Layout"
import Feed from "@containers/Feed"
import { CONFIG } from "../../site.config"
import { NextPageWithLayout } from "./_app"
import { TCategories, TPosts, TTags } from "../types"
import { getPostBlocks, getPosts } from "../libs/apis"
import { DEFAULT_CATEGORY } from "../constants"
import { NotionRenderer } from "react-notion-x"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

// export async function getStaticProps() {
//   try {
//     const posts = await getPosts()
//     const filteredPost = filterPosts(posts)
//     const tags = getAllSelectItemsFromPosts("tags", filteredPost)
//     const categories = getAllSelectItemsFromPosts("category", filteredPost)

//     return {
//       props: {
//         tags: {
//           ...tags,
//         },
//         categories: {
//           [DEFAULT_CATEGORY]: filteredPost.length,
//           ...categories,
//         },
//         posts: filteredPost,
//       },
//       revalidate: 1,
//     }
//   } catch (error) {
//     throw error
//   }
// }

// type Props = {
//   categories: TCategories
//   tags: TTags
//   posts: TPosts
// }

// const FeedPage: NextPageWithLayout<Props> = ({ categories, tags, posts }) => {
//   return <Feed categories={categories} tags={tags} posts={posts} />
// }

// FeedPage.getLayout = function getlayout(page) {
//   return (
//     <Layout
//       metaConfig={{
//         title: CONFIG.blog.title,
//         description: CONFIG.blog.description,
//         type: "website",
//         url: CONFIG.link,
//       }}
//     >
//       {page}
//     </Layout>
//   )
// }
export async function getStaticProps() {
   try {
    let id  = CONFIG.notionConfig.pageId as string;
    const recordMap = await getPostBlocks(id);

    return { props: { recordMap }};

//     const posts = await getPosts()
//     const filteredPost = filterPosts(posts)
   } catch (error) {
    return { props: {recordMap: null}};
   }
}
export default function FeedPage({recordMap: initialRecordMap} : {recordMap: any}) {
  const router = useRouter();
  const { id } = router.query;
  const [recordMap, setRecordMap] = useState<any>(initialRecordMap);

//   useEffect(() => {
//       if (id) {
//           fetch(`/api/getPage?pageId=${id}`)
//               .then((res) => res.json())
//               .then((data) => setRecordMap(data))
//               .catch((err) => console.error("Error fetching Notion data:", err));
//       }
//   }, [id]);

  if (!recordMap) return <p>Loading...</p>;

  return (
      <div className="p-6">
          <NotionRenderer recordMap={recordMap} fullPage darkMode={false} />
      </div>
  );
}

// export default FeedPage
