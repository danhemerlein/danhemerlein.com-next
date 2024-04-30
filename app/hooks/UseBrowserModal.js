'use client'

import { createContext, useContext, useState } from 'react'

export const BroswerModalContext = createContext()

export const UseBrowserModalState = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [project, setProject] = useState(null)

  const toggleModal = (project) => {
    setIsModalOpen(!isModalOpen)
    isModalOpen
      ? (document.body.style.overflow = 'auto')
      : (document.body.style.overflow = 'hidden')

    setProject(project)
  }

  return {
    isModalOpen,
    toggleModal,
    project,
  }
}

export const UseBrowserModal = () => {
  const { isModalOpen, toggleModal, project } = useContext(BroswerModalContext)

  return {
    isModalOpen,
    toggleModal,
    project,
  }
}
