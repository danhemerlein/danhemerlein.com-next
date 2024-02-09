import Link from 'next/link'

const BlogList = ({ allBlogPosts }) => {
  return (
    <>
      <h2 className="my-4 font-bold">blog</h2>
      {allBlogPosts.map((project) => {
        const link = `/notes/${project.handle}`
        return (
          <div key={project.sys.id}>
            <Link href={link} className="my-2 cursor-pointer">
              {project.title}
            </Link>
          </div>
        )
      })}
    </>
  )
}

export default BlogList
