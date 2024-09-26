'use client'
import ReactModal from 'react-modal'
import cn from 'classnames'

import { UseBrowserModal } from '../hooks/UseBrowserModal'

const Browser = () => {
  const { isModalOpen, toggleModal } = UseBrowserModal()

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={() => toggleModal(null)}
      className={{
        base: cn(
          'transition-cubic-bezier relative flex min-h-[650px] min-w-[1280px] justify-center bg-reverse text-ink opacity-0 duration-500',
        ),
        afterOpen: '!translate-y-0 !opacity-100',
        beforeClose: '!translate-y-full',
      }}
      overlayClassName="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-ink bg-opacity-50 z-50 opacity-100"
    >
      <div className="relative flex h-[37px] w-full items-center bg-ink p-[12px]">
        <div className=" flex gap-[8px]">
          <div className="h-[12px] w-[12px] cursor-pointer rounded-full bg-reverse"></div>
          <div className="h-[12px] w-[12px] cursor-pointer rounded-full bg-reverse"></div>
          <div className="h-[12px] w-[12px] cursor-pointer rounded-full bg-reverse"></div>
        </div>

        <div className="ml-[12px] flex items-center justify-center gap-[2px]">
          <div className="h-[24px] w-[24px] rounded-[3px] bg-reverse"></div>
          <div className="h-[24px] w-[24px] rounded-[3px] bg-reverse"></div>
        </div>

        <div className="ml-[12px] flex h-[24px] w-[37px] items-center justify-center rounded-[3px] bg-reverse">
          <div className="h-[11px] w-[14px] border border-solid border-ink"></div>
        </div>

        <div className="mx-auto h-[22px] min-w-[847px] rounded-[3px] bg-reverse"></div>
      </div>
    </ReactModal>
  )
}

Browser.propTypes = {}

export default Browser
