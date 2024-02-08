const BlogList = ({ allBlogPosts }) => {
  return (
    <>
      <h2 className="my-4 font-bold">blog</h2>
      {allBlogPosts.map((project) => {
        return (
          <div key={project.sys.id}>
            <h3 className="my-2">{project.title}</h3>
          </div>
        )
      })}
    </>
  )
}

export default BlogList
