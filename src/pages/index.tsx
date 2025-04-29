import {
  getAllSelectItemsFromPosts,
  filterPosts,
} from "@/src/libs/utils/notion"
import Layout from "@components/Layout"
import Feed from "@containers/Feed"
import { CONFIG } from "../../site.config"
import { NextPageWithLayout } from "./_app"
import { TCategories, TPost, TPosts, TTags } from "../types"
import { getPostBlocks, getPosts } from "../libs/apis"
import { DEFAULT_CATEGORY } from "../constants"
import { BlockMap, ExtendedRecordMap } from "notion-types"


export async function getStaticProps() {
  try {
    const posts = await getPosts()
    const filteredPost = filterPosts(posts)
    const tags = getAllSelectItemsFromPosts("tags", filteredPost)
    const categories = getAllSelectItemsFromPosts("category", filteredPost)
    const blockMap = await getPostBlocks(CONFIG.notionConfig.pageId as string)

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
        blockMap: blockMap
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
  blockMap: ExtendedRecordMap
}

const FeedPage: NextPageWithLayout<Props> = ({ categories, tags, posts, blockMap }) => {
  return <Feed categories={categories} tags={tags} posts={posts} blockMap={blockMap} />
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
