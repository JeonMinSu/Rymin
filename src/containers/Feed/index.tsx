import { useState } from "react"

import * as Cards from "./components/cards"
import * as Lists from "./components/lists"

import { TCategories, TPosts, TTags } from "@customTypes/index"
import SearchInput from "./components/SearchInput"
import { FeedHeader } from "./components/FeedHeader"
import Footer from "./components/Footer"
import Cover from "./components/Cover";
import { getPostBlocks } from "@/src/libs/apis"
import { CONFIG } from "@/site.config"

type Props = {
  categories: TCategories
  tags: TTags
  posts: TPosts
}

export async function getStaticProps() {
  try {
    //includePages: true
    let id = CONFIG.notionConfig.pageId as string
    const blockMap = await getPostBlocks(id)

    return {
      props: { blockMap },
      revalidate: 1,
    }
  } catch (error) {
    return {
      props: {},
      revalidate: 1,
    }
  }
}

const Feed: React.FC<Props> = ({ categories, tags, posts }) => {
  const [q, setQ] = useState("")

  //   .box {
  //     -ms-overflow-style: none;
  //     scrollbar-width: none;
  // }
  // .box::-webkit-scrollbar {
  //     display: none;
  // }
  return (
    <div className="block md:grid grid-cols-12 lg:col-span-12 gap-0">
      <div
        className="common-no-scroll-bar sticky top-[73px] hidden lg:block col-span-2 overflow-scroll"
        style={{ backgroundColor: "#f9f9f9",
          height: "calc(100vh - 73px)",
        }}
      >
        <Lists.TagList data={tags} />
        <Lists.CategoryList data={categories} />
      </div>
      <div className="col-span-12 lg:col-span-12">
        {/* <Cards.MobileProfileCard /> */}
        <Cover />
        {/* <SearchInput value={q} onChange={(e) => setQ(e.target.value)} /> */}
        {/* <Lists.TagList className="block lg:hidden" data={tags} /> */}
        {/* <FeedHeader categories={categories} /> */}
        <Lists.PostList q={q} posts={posts} />
        {/* <Footer className="block lg:hidden flex justify-center pb-8" /> */}
      </div>
      {/* <div
        className="common-no-scroll-bar sticky top-[73px] hidden lg:block lg:col-span-3 overflow-scroll"
        style={{
          backgroundColor: "#f9f000",
          height: "calc(100vh - 73px)",
        }}
      >
        <Cards.ProfileCard />
        <Cards.ServiceCard />
        <Cards.ContactCard />
        <Footer className="pt-4" />
      </div> */}
    </div>
  )
}

export default Feed
