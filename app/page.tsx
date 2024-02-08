import { draftMode } from 'next/headers'

import {
  getAboutPage,
  getAllBlog,
  getAllCodeProjects,
  getAllMusicProjects,
} from '@/lib/api'

import BlogList from './components/BlogList'
import Code from './components/Code'
import Hero from './components/Hero'
import Music from './components/Music'

const Home = async () => {
  const { isEnabled } = draftMode()

  const allCodeProjects = await getAllCodeProjects(isEnabled)
  const allMusicProjects = await getAllMusicProjects(isEnabled)
  const allBlogPosts = await getAllBlog(isEnabled)
  const aboutPage = await getAboutPage(isEnabled)

  return (
    <main className="p-4">
      <Hero aboutPage={aboutPage} />
      <Code allCodeProjects={allCodeProjects} />
      <Music allMusicProjects={allMusicProjects} />
      <BlogList allBlogPosts={allBlogPosts} />
    </main>
  )
}

export default Home
