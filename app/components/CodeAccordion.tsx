'use client'
import { useState } from 'react'
import AnimateHeight from 'react-animate-height'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import cn from 'classnames'
import Image from 'next/image'

import { removeSpecialCharactersAndHandleize } from '@/lib/helper-functions'
import { generateRichTextParserOptions } from '@/lib/rich-text-helpers'
import { CodeProjectType } from '@/types'

interface CodeAccordionProps {
  project: CodeProjectType
  index: number
  totalPojects: number
}

const CodeAccordion = ({
  project,
  index,
  totalPojects,
}: CodeAccordionProps) => {
  const [collapsed, setCollapsed] = useState(true)
  const { description, image, title, timelineLaunchDate } = project

  const hasDescription = !!description?.content?.length
  const hasImage = !!image?.url?.length

  const clickHandler = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div
      data-state={collapsed ? 'collapsed' : 'open'}
      className={cn(
        ' border-l border-r border-t border-solid border-ink',
        index + 1 === totalPojects ? 'border-b' : '',
      )}
    >
      {hasDescription && (
        <AnimateHeight height={collapsed ? 65 : 'auto'}>
          <button
            className={cn(
              'flex w-full cursor-pointer items-center justify-between gap-2   px-4 py-2 transition-colors  hover:text-red',
              hasDescription ? 'cursor-pointer' : 'cursor-default',
            )}
            id={`${removeSpecialCharactersAndHandleize(title || '')}-button`}
            data-state={collapsed ? 'collapsed' : 'open'}
            aria-controls={`${removeSpecialCharactersAndHandleize(title || '')}-panel`}
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
          <div
            role="region"
            aria-labelledby={`${removeSpecialCharactersAndHandleize(title || '')}-button`}
            data-state={collapsed ? 'collapsed' : 'open'}
            id={`${removeSpecialCharactersAndHandleize(title || '')}-panel`}
            className="rtc max-w-prose px-8 py-4"
          >
            {description?.content?.map((item: any) => {
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
}

export default CodeAccordion
