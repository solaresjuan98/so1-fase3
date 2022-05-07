import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Logs } from '../helpers/interfaces';

export const useLogs = () => {


    const [logs, setLogs] = useState<Logs[]>();
    const [gameLogs, setGameLogs] = useState<Logs[]>()

    // const [kafkaLength, setKafkaLength] = useState(0);
    // const [rabbitLength, setRabbitLength] = useState(0);
    const [loadingLogs, setLoadingLogs] = useState(true);
    const [loadingLength, setLoadingLength] = useState(true);
    const [loadingGameLogs, setLoadingGameLogs] = useState(true);

    const getMongoLogs = async () => {

        await axios.get(`${process.env.REACT_APP_RUST_API}/api/logs`)
            .then((res) => {
                //console.log(res.data)

                //console.log(res.data.length)
                setLogs(res.data);
                //setLogs(res.data.slice(0, 100));
                setLoadingLogs(!loadingLogs);
            })
            .catch((err) => {
                console.error(err);
            })

    }


    const getGames = async () => {
        await axios.get(`${process.env.REACT_APP_RUST_API}/api/logs`)
            .then((res) => {


                // console.log(res.data.length)
                //console.log(':c ')
                //console.log(res.data)
                setGameLogs(res.data)
                setLoadingGameLogs(false);


            })
            .catch((err) => {
                console.error(err);
            })
    }


    useEffect(() => {

        const interval = setInterval(() => {
            getMongoLogs();
            console.log('recargando logs');
            
        }, 3500);
        getMongoLogs();

        return () => clearInterval(interval);
        //      getGames();
    }, [])

    useEffect(() => {
        //getMongoLogs();
        const interval = setInterval(() => {
            getGames();
            console.log('recargando juegos');
            //getModuloProcesos();
        }, 3500);
        getGames();

        return () => clearInterval(interval);
    }, [])


    return {
        logs,
        gameLogs,
        loadingLogs,
        loadingLength,
        loadingGameLogs
    }
}
