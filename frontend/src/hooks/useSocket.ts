import { useState, useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (serverPath: string) => {

    console.log(serverPath)
    const socket = io(serverPath, {
        transports: ['polling', 'websocket'],
        rejectUnauthorized: false,
    })
    // const socket = useMemo(() => io(serverPath, {
    //     "transports": ['websocket']
    // }), [serverPath])

    const [online, setOnline] = useState(false);


    useEffect(() => {

        socket.on('connect', () => {
            console.log('connecting')
            setOnline(true);
        })

    }, [socket])


    // useEffect(() => {

    //     socket.on('disconnect', () => {
    //         console.log('desconectado')
    //         setOnline(false);
    //     })

    // }, [socket])



    return {
        online,
        socket
    }
}