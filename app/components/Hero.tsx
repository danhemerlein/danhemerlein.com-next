import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'

import { generateRichTextParserOptions } from '@/lib/rich-text-helpers'

const Hero = ({ aboutPage }) => (
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
)

export default Hero
