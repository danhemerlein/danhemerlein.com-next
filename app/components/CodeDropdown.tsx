'use client'

import React, { useCallback, useRef, useState } from 'react'
import AnimateHeight from 'react-animate-height'

import { UseBrowserModal } from '../hooks/UseBrowserModal'
import useOnClickOutside from '../hooks/useOnClickOutside'

const CodeDropdown = ({ cta, options }) => {
  const ref = useRef()
  const handleClickOutside = useCallback(() => setIsOpen(false), [ref])
  const { isModalOpen, toggleModal } = UseBrowserModal()

  useOnClickOutside(ref, handleClickOutside)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="relative">
        <button
          ref={ref}
          onClick={() => setIsOpen((prev) => !prev)}
          className="mt-3 flex items-center text-sm uppercase"
        >
          {cta}
        </button>
        <AnimateHeight
          height={isOpen ? 'auto' : 0}
          className="absolute mt-2 min-w-[120px] bg-reverse"
        >
          {options.map((option, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-center border border-l-0 border-r-0 border-solid border-ink p-2 text-sm"
              >
                <button onClick={() => toggleModal()}>{option}</button>
              </div>
            )
          })}
        </AnimateHeight>
      </div>
    </>
  )
}

export default CodeDropdown
