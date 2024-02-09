import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { notFound } from 'next/navigation'

import { getAllBlog, getBlogPostByHandle } from '@/lib/api'
import {
  calculateReadingTimeFromContentfulContent,
  createReadableDateFromContentful,
} from '@/lib/helper-functions'
import { generateRichTextParserOptions } from '@/lib/rich-text-helpers'

export const generateStaticParams = async () => {
  const allBlogPosts = await getAllBlog()

  return allBlogPosts.map((post) => ({
    handle: post.handle,
  }))
}

const BlogPost = async ({ params }) => {
  const post = await getBlogPostByHandle(params.handle)

  if (!post) {
    notFound()
  }

  const { title, description, published, coverImage, content } = post

  const updatedAt = post.sys.publishedAt

  return (
    <main className="">
      <section className="w-full">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          {title}
        </h1>

        <div>{description}</div>

        <div>
          <span>
            published on {createReadableDateFromContentful(published)}
          </span>
          <br />
          <span>updated on {createReadableDateFromContentful(updatedAt)}</span>
          <br />
          estimated reading time:{' '}
          {calculateReadingTimeFromContentfulContent(content.json.content)} min
        </div>

        {content.json.content.map((item) => {
          return documentToReactComponents(
            item,
            generateRichTextParserOptions(post, true),
          )
        })}
      </section>
    </main>
  )
}

export default BlogPost
