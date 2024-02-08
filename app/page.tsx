import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import cn from 'classnames'
import { draftMode } from 'next/headers'
import Image from 'next/image'

import {
  getAboutPage,
  getAllBlog,
  getAllCodeProjects,
  getAllMusicProjects,
} from '@/lib/api'
import { generateRichTextParserOptions } from '@/lib/rich-text-helpers'

const Home = async () => {
  const { isEnabled } = draftMode()

  const allCodeProjects = await getAllCodeProjects(isEnabled)
  const allMusicProjects = await getAllMusicProjects(isEnabled)
  const allBlogPosts = await getAllBlog(isEnabled)
  const aboutPage = await getAboutPage(isEnabled)

  console.log(aboutPage.contactLineOne.json.content[0])
  console.log(aboutPage.contactLineTwo.json.content[0])
  console.log(aboutPage.bio.json.content[0])

  return (
    <main className="p-4">
      <div className="flex gap-4">
        <div>
          <p>
            {aboutPage.contactLineOne.json.content.map((item) => {
              return documentToReactComponents(
                item,
                generateRichTextParserOptions(aboutPage, true),
              )
            })}
          </p>
          <p>
            {aboutPage.contactLineTwo.json.content.map((item) => {
              return documentToReactComponents(
                item,
                generateRichTextParserOptions(aboutPage, true),
              )
            })}
          </p>
          <Image
            src={aboutPage.heroImage.url}
            height={500}
            width={500}
            alt={aboutPage.heroImage.title}
          />
        </div>
        <div>
          {aboutPage.bio.json.content.map((item) => {
            return documentToReactComponents(
              item,
              generateRichTextParserOptions(aboutPage, true),
            )
          })}
        </div>
      </div>

      <h2 className="my-4 font-bold">code</h2>
      {allCodeProjects.map((project, key) => {
        return (
          <div
            className={cn(
              'flex items-start justify-between gap-2 border-b border-l border-r border-solid border-ink px-4 py-2 first-of-type:border-t',
              key === 0 && 'border-t',
            )}
            key={project.sys.id}
          >
            <h3 className="my-2">{project.title}</h3>
          </div>
        )
      })}

      <h2 className="my-4 flex font-extrabold">music</h2>
      <div className="mb-4 flex gap-4">
        <div className="flex items-center gap-2">
          <p>wrote</p>
          <div className="h-4 w-4 rounded-full bg-red"></div>
        </div>
        <div className="flex items-center gap-2">
          <p>produced</p>
          <div className="h-4 w-4 rounded-full bg-vinRouge"></div>
        </div>
        <div className="flex items-center gap-2">
          <p>performed</p>
          <div className="h-4 w-4 rounded-full bg-lochmara"></div>
        </div>
      </div>
      {allMusicProjects.map((project, key) => {
        const { wrote, produced, performed, title, artist, releaseDate } =
          project
        return (
          <div
            className={cn(
              'flex items-start justify-between gap-2 border-b border-l border-r border-solid border-ink px-4 py-2 first-of-type:border-t',
              key === 0 && 'border-t',
            )}
            key={project.sys.id}
          >
            <div>
              <h3 className="my-2 font-bold">{title}</h3>
              <p>
                <span className="italic">by</span>
                &nbsp;{artist}&nbsp;
                <span>
                  <span className="italic">released</span>
                  &nbsp;{releaseDate}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              {wrote && <div className="h-4 w-4 rounded-full bg-red"></div>}
              {produced && (
                <div className="bg-vin-rouge h-4 w-4 rounded-full bg-vinRouge"></div>
              )}
              {performed && (
                <div className="h-4 w-4 rounded-full bg-lochmara"></div>
              )}
            </div>
          </div>
        )
      })}

      <h2 className="my-4 font-bold">blog</h2>
      {allBlogPosts.map((project) => {
        return (
          <div key={project.sys.id}>
            <h3 className="my-2">{project.title}</h3>
          </div>
        )
      })}
    </main>
  )
}

export default Home
