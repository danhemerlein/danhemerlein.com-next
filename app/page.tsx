import {
  getAboutPage,
  getAllCodeProjects,
  getAllMusicProjects,
} from '@/lib/api'

import Code from './components/Code'
import Hero from './components/Hero'
import Music from './components/Music'

const Home = async () => {
  const allCodeProjects = await getAllCodeProjects()
  const allMusicProjects = await getAllMusicProjects()

  const aboutPage = await getAboutPage()

  return (
    <>
      <Hero aboutPage={aboutPage} />
      <Code allCodeProjects={allCodeProjects} />
      <Music allMusicProjects={allMusicProjects} />
    </>
  )
}

export default Home
