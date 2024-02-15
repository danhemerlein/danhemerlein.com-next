'use client'

import { createContext, useContext, useState } from 'react'

export const ModalContext = createContext()

export const UseModalState = () => {
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

export const UseModal = () => {
  const { isModalOpen, toggleModal, project } = useContext(ModalContext)

  return {
    isModalOpen,
    toggleModal,
    project,
  }
}
