import React from 'react'
import { Sidebar } from './components/Sidebar'
import { SocketProvider } from './context/SocketContext'

export const App = () => {
  return (
    <>
        {/* <SocketProvider> */}
            <Sidebar />
        {/* </SocketProvider> */}
    </>
  )
}
