import Link from 'next/link'

const BlogList = ({ allBlogPosts }) => {
  return (
    <>
      <h2 className="my-4 font-bold">blog</h2>
      {allBlogPosts.map((project) => {
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
      <button className="border border-solid border-ink bg-ink px-4 py-2 text-reverse transition-colors hover:bg-reverse hover:text-ink">
        load more
      </button>
    </>
  )
}

export default BlogList
