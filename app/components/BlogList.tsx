'use client'
import Link from 'next/link'
import { useState } from 'react'

import LoadMoreButton from './LoadMoreButton'
import ProgressBar from './ProgressBar'

const BlogList = ({ allBlogPosts, totalPosts }) => {
  const [page, setPage] = useState(0)
  const [displayedPosts, setDisplayedPosts] = useState(allBlogPosts[page])
  const [allPostsLoaded, setAllPostsLoaded] = useState(false)
  const handleLoadMore = () => {
    if (allPostsLoaded) return
    setPage((prev) => prev + 1)
    setDisplayedPosts((prev) => [...prev, ...allBlogPosts[page + 1]])
    if (displayedPosts?.length === totalPosts) {
      setAllPostsLoaded(true)
    }
  }

  return (
    <>
      <h2 className="my-4 font-bold">blog</h2>
      {displayedPosts?.map((project) => {
        const link = `/notes/${project.handle}`
        return (
          <div key={project.sys.id} className="my-4">
            <Link
              href={link}
              className="my-2	cursor-pointer italic underline decoration-dotted	 underline-offset-2 transition-colors hover:text-red"
            >
              {project.title}
            </Link>
          </div>
        )
      })}

      <LoadMoreButton
        handleLoadMore={handleLoadMore}
        allLoaded={allPostsLoaded}
      />

      <ProgressBar />
    </>
  )
}

export default BlogList
