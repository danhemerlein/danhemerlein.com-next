import { draftMode } from 'next/headers'

import {
  getAboutPage,
  getAllBlog,
  getAllCodeProjects,
  getAllMusicProjects,
} from '@/lib/api'
import { chunkArray } from '@/lib/helper-functions'

import BlogList from './components/BlogList'
import Code from './components/Code'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Music from './components/Music'
import MusicModal from './components/MusicModal'

const Home = async () => {
  const { isEnabled } = draftMode()

  const allCodeProjects = await getAllCodeProjects(isEnabled)
  const allMusicProjects = await getAllMusicProjects(isEnabled)
  const allBlogPosts = await getAllBlog()
  const aboutPage = await getAboutPage(isEnabled)

  console.log(allBlogPosts)

  return (
    <>
      <Hero aboutPage={aboutPage} />
      <Code allCodeProjects={allCodeProjects} />
      <Music allMusicProjects={allMusicProjects} />
      <BlogList
        allBlogPosts={chunkArray(allBlogPosts, 10)}
        totalPosts={allBlogPosts.length}
      />
      <Footer />
      <MusicModal />
    </>
  )
}

export default Home
