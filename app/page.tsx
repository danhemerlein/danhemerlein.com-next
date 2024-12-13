import { getAllCodeProjects, getAllMusicProjects } from '@/lib/api'

import Code from './components/Code'
import Hero from './components/Hero'
import Music from './components/Music'

const Home = async () => {
  const allCodeProjects = await getAllCodeProjects()
  const allMusicProjects = await getAllMusicProjects()

  return (
    <>
      <Hero />
      <Code allCodeProjects={allCodeProjects} />
      <Music allMusicProjects={allMusicProjects} />
    </>
  )
}

export default Home
