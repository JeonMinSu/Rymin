import { useState } from "react"

import * as Cards from "./components/cards"
import * as Lists from "./components/lists"

import { TCategories, TPosts, TTags } from "@customTypes/index"
import SearchInput from "./components/SearchInput"
import { FeedHeader } from "./components/FeedHeader"
import Footer from "./components/Footer"
import Cover from "./components/Cover";

import { NotionRenderer } from "react-notion-x"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { ExtendedRecordMap } from "notion-types"
import { filterPublicBlocks } from "@/src/libs/utils/notion/filterBlockMap"

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => {
    await Promise.all([
      import('prismjs/components/prism-markup-templating.js'),
      import('prismjs/components/prism-markup.js'),
      import('prismjs/components/prism-bash.js'),
      import('prismjs/components/prism-c.js'),
      import('prismjs/components/prism-cpp.js'),
      import('prismjs/components/prism-csharp.js'),
      import('prismjs/components/prism-docker.js'),
      import('prismjs/components/prism-java.js'),
      import('prismjs/components/prism-js-templates.js'),
      import('prismjs/components/prism-coffeescript.js'),
      import('prismjs/components/prism-diff.js'),
      import('prismjs/components/prism-git.js'),
      import('prismjs/components/prism-go.js'),
      import('prismjs/components/prism-graphql.js'),
      import('prismjs/components/prism-handlebars.js'),
      import('prismjs/components/prism-less.js'),
      import('prismjs/components/prism-makefile.js'),
      import('prismjs/components/prism-markdown.js'),
      import('prismjs/components/prism-objectivec.js'),
      import('prismjs/components/prism-ocaml.js'),
      import('prismjs/components/prism-python.js'),
      import('prismjs/components/prism-reason.js'),
      import('prismjs/components/prism-rust.js'),
      import('prismjs/components/prism-sass.js'),
      import('prismjs/components/prism-scss.js'),
      import('prismjs/components/prism-solidity.js'),
      import('prismjs/components/prism-sql.js'),
      import('prismjs/components/prism-stylus.js'),
      import('prismjs/components/prism-swift.js'),
      import('prismjs/components/prism-wasm.js'),
      import('prismjs/components/prism-yaml.js')
    ])
    return m.Code
  })
)
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
)
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
)

type Props = {
  categories: TCategories
  tags: TTags
  posts: TPosts
  blockMap: ExtendedRecordMap
}

const Feed: React.FC<Props> = ({ categories, tags, posts, blockMap }) => {
  const [q, setQ] = useState("")

  const idToSlugMap = Object.fromEntries(
    Object.entries(blockMap.block).map(([id, block]) => {
      const properties = block?.value?.properties;
      const slugArray = properties?.['slug'];
      const slug = Array.isArray(slugArray) && slugArray[0] && slugArray[0][0];
      return [id.replace(/-/g, ''), slug];
    }).filter(([_, slug]) => slug) // slug 없는 블록은 제거
  );

  const mapPageUrl = (id: string) => {
    const cleanId = id.replace(/-/g, '');
    const slug = idToSlugMap[cleanId];
    return slug ? `/${slug}` : `/${cleanId}`;
  };
  

  const filteredRecordMap = filterPublicBlocks(blockMap)

  return (
    <div className="block md:grid grid-cols-12 lg:col-span-12 gap-0">
      {/* <div
        className="common-no-scroll-bar sticky top-[73px] hidden lg:block col-span-1 overflow-scroll"
        style={{ height: "calc(100vh - 73px)",
        }}
      >
        <Lists.TagList data={tags} />
        <Lists.CategoryList data={categories} />
      </div> */}
      <div className="col-span-12 lg:col-span-12">
        {/* <Cards.MobileProfileCard /> */}
        <Cover />
        {/* <SearchInput value={q} onChange={(e) => setQ(e.target.value)} /> */}
        {/* <Lists.TagList className="block lg:hidden" data={tags} /> */}
        {/* <FeedHeader categories={categories} /> */}
        <NotionRenderer
              recordMap={blockMap}
              components={{
                Code,
                Collection,
                Equation,
                Modal,
                Pdf,
                nextImage: Image,
                nextLink: Link,
              }}
              mapPageUrl={mapPageUrl}
            />
        {/* <Lists.PostList q={q} posts={posts} /> */}
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
