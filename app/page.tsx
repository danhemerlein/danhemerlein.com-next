import {
  getAboutPage,
  getAllBlogList,
  getAllCodeProjects,
  getAllMusicProjects,
} from '@/lib/api'
import { chunkArray } from '@/lib/helper-functions'

import Header from './components/Header'
import Music from './components/Music'
import MusicModal from './components/MusicModal'
import NewCode from './components/NewCode'

const Home = async () => {
  const allCodeProjects = await getAllCodeProjects()
  const allMusicProjects = await getAllMusicProjects()
  const allBlogPosts = await getAllBlogList()
  const aboutPage = await getAboutPage()
  const chunkedBlogPosts = chunkArray(allBlogPosts, 10)

  return (
    <>
      {/* <Hero aboutPage={aboutPage} /> */}
      <Header />

      <div className="mx-auto max-w-[1440px]">
        <NewCode />

        <div className="my-[90px] grid grid-cols-2 gap-10">
          <div>
            <img />
            <h2 className="text-lg">young and nauseous</h2>
          </div>
          <div>
            <img />
            <h2 className="text-lg">blog</h2>
          </div>
        </div>

        <div className="mx-auto my-[90px] max-w-[700px] text-justify text-base">
          hey I'm dan (he/him), I'm a software developer and musician based in
          Brooklyn, New York. I'm into JavaScript, web accessibility and
          developer experience. I write and produce songs under the moniker
          young and nauseous. I play bass guitar in a few indie bands around
          Brooklyn. In my non-code/non-music time, I write, read, moodboard,
          run, and aimlessly bike around the city. I write code and make music
          because I can't not.
        </div>
        <Music allMusicProjects={allMusicProjects} />
      </div>

      <MusicModal />
    </>
  )
}

export default Home
