'use client'
import Link from 'next/link'

import { BlogPostListType } from '@/types'

interface BlogListProps {
  posts: BlogPostListType[][]
}

const BlogList = ({ posts }: BlogListProps) => {
  return (
    <>
      <h2 className="my-4 font-bold">blog</h2>
      {posts?.flat()?.map((project: BlogPostListType) => {
        const link = `/notes/${project.handle}`
        return (
          <div key={project?.sys?.id} className="my-4">
            <Link
              href={link}
              className="my-2	cursor-pointer italic underline decoration-dotted	 underline-offset-2 transition-colors hover:text-red focus:text-red"
            >
              {project?.title}
            </Link>
          </div>
        )
      })}
    </>
  )
}

export default BlogList
