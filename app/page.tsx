import {
  getAboutPage,
  getAllBlogList,
  getAllCodeProjects,
  getAllMusicProjects,
} from '@/lib/api'
import { chunkArray } from '@/lib/helper-functions'

import About from './components/About'
import Browser from './components/Browser'
import Footer from './components/Footer'
import Header from './components/Header'
import Music from './components/Music'
import MusicModal from './components/MusicModal'
import NewCode from './components/NewCode'
import TwoUpEditorial from './components/TwoUpEditorial'

const Home = async () => {
  const allCodeProjects = await getAllCodeProjects()
  const allMusicProjects = await getAllMusicProjects()
  const allBlogPosts = await getAllBlogList()
  const aboutPage = await getAboutPage()
  const chunkedBlogPosts = chunkArray(allBlogPosts, 10)

  return (
    <>
      <Header />
      <div className="mx-auto max-w-[1440px]">
        <NewCode />
        <TwoUpEditorial />
        <About />
        <Music allMusicProjects={allMusicProjects} />
      </div>
      <Footer />
      {/* <MusicModal /> */}
      <Browser />
    </>
  )
}

export default Home
