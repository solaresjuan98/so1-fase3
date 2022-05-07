import React, { createContext } from 'react'
import { useSocket } from '../hooks/useSocket'

// interface IContextProps { 



// }

interface Props {
    children:  any;
}

export const SocketContext = createContext({} as any)

export const SocketProvider = ({ children }: Props) => {

    const { online, socket } = useSocket('http://localhost:8080');
    console.log(online)
    return (

        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>

    )
}