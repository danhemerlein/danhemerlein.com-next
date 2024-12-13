import { draftMode } from 'next/headers'

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
  const { isEnabled } = draftMode()

  const allCodeProjects = await getAllCodeProjects(isEnabled)
  const allMusicProjects = await getAllMusicProjects(isEnabled)
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
