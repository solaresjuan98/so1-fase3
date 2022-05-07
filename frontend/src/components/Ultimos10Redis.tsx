import React, { useState, useEffect } from 'react'
import { connect, io } from 'socket.io-client'

export const Ultimos10Redis = () => {
    const [ultimos10Juegos, setUltimos10Juegos] = useState<any[]>([])
    //const socket = io('http://localhost:8080/')


    const onGetInfo = () => {

        return new Promise((resolve) => {
            const socket = connect('https://sopes1-usac-342203.uc.r.appspot.com')
            socket.on('connect', () => console.log(socket.id))
            console.log('get ultimos 10 Redis')
            socket.on('last10-gamesredis', (stream) => {
                //setTop10(stream)
                console.log(stream)
                socket.disconnect()
                resolve(stream)
                // console.log('stream ->', stream)
                // setTop10(stream)
            })


        })
    }

    useEffect(() => {

        const socket = connect('https://sopes1-usac-342203.uc.r.appspot.com')

        const interval = setInterval(async () => {
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

        socket.on('last10-gamesredis', (stream) => {
            console.log(stream)
            //setTop10(stream)
        })
        socket.disconnect()
        //socket.emit('disconnect', () => console.log('server disconnected'))
        return () => clearInterval(interval);

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
                                <th scope="row">{game.Winner}</th>
                                <td>{game.Game_name}</td>
                                <td>{game.Game_id}</td>
                                <td>{game.Queue}</td>
                            </tr>

                        ))
                    }

                </tbody>
            </table>
        </>
    )
}
