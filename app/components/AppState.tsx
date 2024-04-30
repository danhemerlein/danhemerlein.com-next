'use client'

import {
  BroswerModalContext,
  UseBrowserModalState,
} from '../hooks/UseBrowserModal'

const AppState = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const modal = UseBrowserModalState()

  return (
    <BroswerModalContext.Provider value={modal}>
      {children}
    </BroswerModalContext.Provider>
  )
}
export default AppState
