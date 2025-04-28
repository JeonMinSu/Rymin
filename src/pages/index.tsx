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

export async function getStaticProps() {
  try {
    const posts = await getPosts()
    const filteredPost = filterPosts(posts)
    const tags = getAllSelectItemsFromPosts("tags", filteredPost)
    const categories = getAllSelectItemsFromPosts("category", filteredPost)

    return {
      props: {
        tags: {
          ...tags,
        },
        categories: {
          [DEFAULT_CATEGORY]: filteredPost.length,
          ...categories,
        },
        posts: filteredPost,
      },
      revalidate: 1,
    }
  } catch (error) {
    throw error
  }
}

type Props = {
  categories: TCategories
  tags: TTags
  posts: TPosts
}

const FeedPage: NextPageWithLayout<Props> = ({ categories, tags, posts }) => {
  return <Feed categories={categories} tags={tags} posts={posts} />
}

FeedPage.getLayout = function getlayout(page) {
  return (
    <Layout
      metaConfig={{
        title: CONFIG.blog.title,
        description: CONFIG.blog.description,
        type: "website",
        url: CONFIG.link,
      }}
    >
      {page}
    </Layout>
  )
}
// interface NotionItem {
//     id: string;
//     properties: {
//         Name?: { title: { text: { content: string } }[] };
//         CoverImage?: { files: { file?: { url: string }; external?: { url: string } }[] };
//     };
// }

// export default function FeedPage() {
//     const [data, setData] = useState<NotionItem[]>([]);

//     useEffect(() => {
//         fetch("/api/getDatabase")
//             .then((res) => res.json())
//             .then((data) => setData(data.results))
//             .catch((err) => console.error("Error fetching Notion database:", err));
//     }, []);

//     return (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
//             {data.map((item) => {
//                 const title = item.properties.Name?.title[0]?.text.content || "No Title";
//                 const imageUrl = item.properties.CoverImage?.files[0]?.file?.url ||
//                                  item.properties.CoverImage?.files[0]?.external?.url ||
//                                  "https://via.placeholder.com/300";

//                 return (
//                     <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
//                         <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
//                         <div className="p-4">
//                             <h3 className="text-lg font-semibold">{title}</h3>
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }

export default FeedPage
