import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { notFound } from 'next/navigation'

import { getAllBlog, getBlogPostByHandle } from '@/lib/api'
import {
  calculateReadingTimeFromContentfulContent,
  createReadableDateFromContentful,
} from '@/lib/helper-functions'
import { generateRichTextParserOptions } from '@/lib/rich-text-helpers'
import { BlogPostType } from '@/types'

interface BlogPostProps {
  params: { handle: string }
}

const BlogPost = async ({ params }: BlogPostProps) => {
  const post: BlogPostType = await getBlogPostByHandle(params.handle)

  if (!post) {
    notFound()
  }

  const { title, description, published, content } = post

  const updatedAt = post?.sys?.publishedAt

  return (
    <main>
      <section className="flex items-center justify-center">
        <div className="max-w-prose">
          <h1 className="mb-4 text-left text-4xl font-bold tracking-tighter sm:text-5xl">
            {title}
          </h1>

          <div className="mb-2 ">{description}</div>

          <div className="mb-4">
            <p className="mb-2">
              published on {createReadableDateFromContentful(published)}
            </p>
            <p className="mb-2">
              updated on {createReadableDateFromContentful(updatedAt)}
            </p>
            <p className="mb-2">
              estimated reading time:{' '}
              {calculateReadingTimeFromContentfulContent(content.json.content)}
              min
            </p>
          </div>

          <div className="rtc ">
            {content?.json?.content?.map((item: any) => {
              return documentToReactComponents(
                item,
                generateRichTextParserOptions(post, true),
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

export default BlogPost
