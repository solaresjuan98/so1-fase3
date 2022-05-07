import React, { useState, useEffect, useContext } from 'react'
import { io, connect } from 'socket.io-client'
import { APP_URI } from '../helpers/apirul';

export const Ultimos10Tidb = () => {
    const [ultimos10Juegos, setUltimos10Juegos] = useState<any[]>([])
    // const socket = io('http://localhost:8080/', {
    //     transports: ["polling", "websocket"]
    // });
    //const { socket } = useContext(SocketContext)

    const onGetInfo = () => {

        return new Promise((resolve) => {
            const socket = connect(APP_URI)
            socket.on('connect', () => console.log(socket.id))
            console.log('get ultimos 10')
            socket.on('ultimos-10ganadores',  (stream) => {
                //setTop10(stream)
                socket.disconnect()
                resolve(stream)
                // console.log('stream ->', stream)
                // setTop10(stream)
            })
            

        })
    }

    useEffect(() => {
        const socket = connect(APP_URI)

        const interval = setInterval(async() => {
            const info: any = await onGetInfo();
            setUltimos10Juegos(info);
            // const socket = connect('http://localhost:8080/')
            // socket.on('connect', () => console.log(socket.id))
            // console.log('useeffect')
            // socket.on('top10-jugadores', (stream) => {

            //     console.log('stream ->', stream)
            //     setTop10(stream)
            // })
            // socket.disconnect()
        }, 1000);


        socket.on('connect', () => console.log(socket.id))

        socket.on('ultimos-10ganadores', (stream) => {
            console.log(stream)
            //setTop10(stream)
        })
        socket.disconnect()
        //socket.emit('disconnect', () => console.log('server disconnected'))
        return () => clearInterval(interval);
        //console.log(socket);
        //socket.on('connect', () => console.log(socket.id))
        // socket.on('ultimos-10ganadores', (stream: React.SetStateAction<any[]>) => {
        //     console.log(stream)
        //     setUltimos10Juegos(stream);
        // })

    }, [])

    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Ganador</th>
                        <th scope="col">Juego</th>
                        <th scope="col">Id juego</th>
                        <th scope="col">Cola</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ultimos10Juegos.map((game, i) => (
                            <tr className="table-active" key={i}>
                                <th scope="row">{game.winner}</th>
                                <td>{game.game_name}</td>
                                <td>{game.game_id}</td>
                                <td>{game.queue}</td>
                            </tr>

                        ))
                    }

                </tbody>
            </table>
        </>
    )
}
