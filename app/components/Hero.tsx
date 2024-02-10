import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'

import { generateRichTextParserOptions } from '@/lib/rich-text-helpers'

const Hero = ({ aboutPage }) => (
  <div className="flex gap-4">
    <div className="rtc">
      {aboutPage.contactLineOne.json.content.map((item) => {
        return documentToReactComponents(
          item,
          generateRichTextParserOptions(aboutPage, true),
        )
      })}
      {aboutPage.contactLineTwo.json.content.map((item) => {
        return documentToReactComponents(
          item,
          generateRichTextParserOptions(aboutPage, true),
        )
      })}
      <Image
        src={aboutPage.heroImage.url}
        height={500}
        width={500}
        alt={aboutPage.heroImage.title}
      />
    </div>
    <div className="rtc">
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
