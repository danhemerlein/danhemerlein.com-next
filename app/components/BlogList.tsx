'use client'
import { useState } from 'react'
import Link from 'next/link'

import { TypeBlogPostFields } from '@/types/contentful'

import LoadMoreButton from './LoadMoreButton'
import ProgressBar from './ProgressBar'

interface BlogListProps {
  allBlogPosts: TypeBlogPostFields[]
  totalPosts: number
}

const BlogList = ({ allBlogPosts, totalPosts }: BlogListProps) => {
  const [page, setPage] = useState(0)
  const [displayedPosts, setDisplayedPosts] = useState(allBlogPosts[page])

  const handleLoadMore = () => {
    setPage((prev) => prev + 1)
    setDisplayedPosts((prev) => [...prev, ...allBlogPosts[page + 1]])
  }

  return (
    <>
      <h2 className="my-4 font-bold">blog</h2>
      {displayedPosts?.map((project: TypeBlogPostFields) => {
        const link = `/notes/${project.handle}`
        return (
          <div key={project.sys.id} className="my-4">
            <Link
              href={link}
              className="my-2	cursor-pointer italic underline decoration-dotted	 underline-offset-2 transition-colors hover:text-red focus:text-red"
            >
              {project.title}
            </Link>
          </div>
        )
      })}

      <LoadMoreButton
        handleLoadMore={handleLoadMore}
        allLoaded={displayedPosts.length === totalPosts}
      />

      <ProgressBar target={totalPosts} current={displayedPosts.length} />
    </>
  )
}

export default BlogList
