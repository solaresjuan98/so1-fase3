import React, { useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useLogs } from '../hooks/useLogs';


interface Top3 {
    game?: string;
    value?: number;
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Top 3 juegos',
        },
    },
};

const labels = ['Inserciones'];

export const data = {
    labels,
    datasets: [
        {
            label: '',
            data: labels.map(() => 0),
            //data: labels.map(() => Math.floor(Math.random() * 6) + 1),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: '',
            data: labels.map(() => 0),
            //data: labels.map(() => Math.floor(Math.random() * 6) + 1),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: '',
            data: labels.map(() => 0),
            //data: labels.map(() => Math.floor(Math.random() * 6) + 1),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export const Top3Graph = () => {


    const { gameLogs, loadingGameLogs } = useLogs();
    // let kafkaLength = 0;
    // let rabbitLength = 0;

    useEffect(() => {

        console.log('-> ', loadingGameLogs)

        let top3: Top3[] = [];
        if (!loadingGameLogs) {

            // Separar en alguna funcion por separado 

            // get all games
            let blackJack = gameLogs?.filter((log) => log.game_name === 'BlackJACK')
            console.log('Blackjack ', blackJack?.length)

            top3.push({
                game: 'BlackJack',
                value: blackJack?.length
            })

            let letters = gameLogs?.filter((log) => log.game_name === 'Letters')
            //console.log('Letters ', letters?.length)
            top3.push({
                game: 'Letters',
                value: letters?.length
            })

            let random1 = gameLogs?.filter((log) => log.game_name === 'Random1')
            //console.log('Random1 ', random1?.length)
            top3.push({
                game: 'Random1',
                value: random1?.length
            })

            let random2 = gameLogs?.filter((log) => log.game_name === 'Random2')
            //console.log('Random2 ', random2?.length)
            top3.push({
                game: 'Random2',
                value: random2?.length
            })

            top3.sort((a, b) => {
                return b.value! - a.value!
            })
            console.log(top3)


            data.datasets[0].data = labels.map(() => (top3[0].value !== undefined) ? top3[0].value : 0)
            data.datasets[0].label = top3[0].game!
            data.datasets[1].data = labels.map(() => (top3[1].value !== undefined) ? top3[1].value : 0)
            data.datasets[1].label = top3[1].game!
            data.datasets[2].data = labels.map(() => (top3[2].value !== undefined) ? top3[2].value : 0)
            data.datasets[2].label = top3[2].game!

            // if (top3 !== undefined) {
            //     top3.map((item, i) => {
            //         data.datasets[i].data = labels.map(() => (item.value !== undefined) ? item.value : 0)
            //     })
            // }

        }


        //console.log(logs?.slice(0, 10))

    }, [loadingGameLogs])




    return (
        <Bar options={options} data={data} />
    )
}

