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
export default FeedPage
