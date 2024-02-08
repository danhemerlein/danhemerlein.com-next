import { draftMode } from 'next/headers'
import Image from 'next/image'

import { getMoodboard } from '@/lib/api'

const Page = async () => {
  const { isEnabled } = draftMode()

  const moodboard = await getMoodboard(isEnabled)

  return (
    <main className="p-24">
      <h1 className="my-4 font-bold">moodboard</h1>
      {moodboard.map((project) => {
        return (
          <div key={project.url}>
            <Image
              src={project.url}
              alt={project.title}
              width="500"
              height="500"
            />
          </div>
        )
      })}
    </main>
  )
}

export default Page
