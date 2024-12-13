import {
  getAboutPage,
  getAllBlogList,
  getAllCodeProjects,
  getAllMusicProjects,
} from '@/lib/api'

import BlogList from './components/BlogList'
import Code from './components/Code'
import Hero from './components/Hero'
import Music from './components/Music'

const Home = async () => {
  const allCodeProjects = await getAllCodeProjects()
  const allMusicProjects = await getAllMusicProjects()
  const allBlogPosts = await getAllBlogList()
  const aboutPage = await getAboutPage()

  return (
    <>
      <Hero aboutPage={aboutPage} />
      <Code allCodeProjects={allCodeProjects} />
      <Music allMusicProjects={allMusicProjects} />
      <BlogList posts={allBlogPosts} />
    </>
  )
}

export default Home
