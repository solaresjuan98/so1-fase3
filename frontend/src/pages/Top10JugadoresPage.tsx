
import React, { useEffect, useState } from 'react'
import { io, connect } from 'socket.io-client'
import { APP_URI } from '../helpers/apirul';


export const Top10JugadoresPage = () => {

    const [top10, setTop10] = useState<any[]>([])
    const [top10Redis, setTop10Redis] = useState<any[]>([])


    const onGetInfo = () => {

        return new Promise((resolve) => {
            const socket = connect(APP_URI)
            socket.on('connect', () => console.log(socket.id))
            console.log('get top 10 tidb')
            socket.on('top10-jugadores', (stream) => {
                //setTop10(stream)
                socket.disconnect()
                resolve(stream)
                // console.log('stream ->', stream)
                // setTop10(stream)
            })


        })
    }

    const onGetInfoRedis = () => {

        return new Promise((resolve) => {
            const socket = connect(APP_URI)
            socket.on('connect', () => console.log(socket.id))
            console.log('get top 10 redis')
            socket.on('top10-redis', (stream) => {
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

        const socket = connect(APP_URI)

        const interval = setInterval(async () => {
            const info: any = await onGetInfo();
            setTop10(info);

            const infoRedis: any = await onGetInfoRedis();
            setTop10Redis(infoRedis);
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

        socket.on('top10-jugadores', (stream) => {
            console.log(stream)
            setTop10(stream)
        })

        socket.on('top10-redis', (stream) => {
            console.log(stream)
            setTop10Redis(stream)
        })
        socket.disconnect()
        //socket.emit('disconnect', () => console.log('server disconnected'))
        return () => clearInterval(interval);
    }, [])


    return (
        <div className='float-container container'>
            <h1>Top 10 jugadores</h1>
            <hr />

            <div className="row mt-5" style={{
                background: '#ccc',
                borderRadius: '5px',
                padding: '15px'
            }}>
                <div className="col-6">
                    <h3>Tidb</h3>

                    {/** Table */}
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Ganador</th>
                                <th scope="col">Veces</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                top10.map((player) => (
                                    <tr className="table-active">
                                        <th scope="row">{player.winner}</th>
                                        <td>{player.veces}</td>
                                    </tr>

                                ))
                            }



                        </tbody>
                    </table>

                </div>
                <div className="col-6">
                    <h3>Redis</h3>
                    {/** Table */}
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Ganador</th>
                                <th scope="col">Veces</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                top10Redis.map((player) => (
                                    <tr className="table-active">
                                        <th scope="row">{player.id}</th>
                                        <td>{player.conteo}</td>
                                    </tr>

                                ))
                            }



                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
