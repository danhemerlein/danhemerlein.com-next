'use client'

import { CodeProjectType } from '@/types'

import CodeAccordion from './CodeAccordion'

interface CodeProps {
  allCodeProjects: CodeProjectType[]
}

const Code = ({ allCodeProjects }: CodeProps) => {
  return (
    <>
      <h2 className="my-4 font-bold">code</h2>
      {allCodeProjects?.map((project: CodeProjectType, key: number) => {
        return (
          <CodeAccordion
            project={project}
            index={key}
            key={project?.sys?.id}
            totalPojects={allCodeProjects.length}
          />
        )
      })}
    </>
  )
}

export default Code
