'use client'

import { useState } from 'react'
import AnimateHeight from 'react-animate-height'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import cn from 'classnames'
import Image from 'next/image'

import { removeSpecialCharactersAndHandleize } from '@/lib/helper-functions'
import { generateRichTextParserOptions } from '@/lib/rich-text-helpers'
import { TypeCodeProjectFields } from '@/types/contentful'

interface CodeProps {
  allCodeProjects: TypeCodeProjectFields[]
}

const Code = ({ allCodeProjects }: CodeProps) => {
  const [collapsed, setCollapsed] = useState(true)
  const clickHandler = () => {
    setCollapsed(!collapsed)
  }
  return (
    <>
      <h2 className="my-4 font-bold">code</h2>
      {allCodeProjects.map((project, key) => {
        const { description, image, title, timelineLaunchDate } = project
        const hasDescription = !!description?.json?.content?.length
        const hasImage = !!image?.url?.length

        return (
          <div
            key={project?.sys?.id}
            data-state={collapsed ? 'collapsed' : 'open'}
          >
            <button
              className={cn(
                'flex w-full cursor-pointer items-center justify-between gap-2 border-b border-l border-r border-solid border-ink px-4 py-2 transition-colors first-of-type:border-t hover:text-red',
                key === 0 && 'border-t',
                hasDescription ? 'cursor-pointer' : 'cursor-default',
              )}
              id={`${removeSpecialCharactersAndHandleize(title)}-button`}
              data-state={collapsed ? 'collapsed' : 'open'}
              aria-controls={`${removeSpecialCharactersAndHandleize(title)}-panel`}
              onClick={hasDescription ? clickHandler : () => {}}
            >
              <div>
                <p className="my-2 text-left font-bold">{title}</p>
                <p className="text-left">{timelineLaunchDate}</p>
              </div>
              <div className="flex h-12 w-12 items-center">
                {hasImage && (
                  <Image
                    src={image.url}
                    height={100}
                    width={100}
                    alt={image.title}
                  />
                )}
              </div>
            </button>

            {hasDescription && (
              <AnimateHeight height={collapsed ? 0 : 'auto'}>
                <div
                  role="region"
                  aria-labelledby={`${removeSpecialCharactersAndHandleize(title)}-button`}
                  data-state={collapsed ? 'collapsed' : 'open'}
                  id={`${removeSpecialCharactersAndHandleize(title)}-panel`}
                  className="rtc px-8 py-4"
                >
                  {description.json.content.map((item) => {
                    return documentToReactComponents(
                      item,
                      generateRichTextParserOptions(description),
                    )
                  })}
                </div>
              </AnimateHeight>
            )}
          </div>
        )
      })}
    </>
  )
}

export default Code
