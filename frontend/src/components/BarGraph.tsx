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
            text: 'Chart.js Bar Chart',
        },
    },
};

const labels = ['Inserciones Rabbitmq / Kafka'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Rabbitmq',
            data: labels.map(() => 0),
            //data: labels.map(() => Math.floor(Math.random() * 6) + 1),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Apache Kafka',
            data: labels.map(() => 0),
            //data: labels.map(() => Math.floor(Math.random() * 6) + 1),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export const BarGraph = () => {


    const { logs, /*rabbitLength, kafkaLength,*/ loadingLogs } = useLogs();
    let kafkaLength = 0;
    let rabbitLength = 0;

    useEffect(() => {
        //console.log(loadingLogs)
        if (!loadingLogs) {
            let rabbitFiltered = logs?.filter((log) => log.queue === 'RabbitMQ')
            console.log('Rabbit -> ', rabbitFiltered?.length)

            let kafkaFiltered = logs?.filter((log) => log.queuename === 'Kafka' || log.queue === 'Kafka')
            //console.log('Kafka -> ', kafkaFiltered?.length)


            if (rabbitFiltered !== undefined) {
                rabbitLength = rabbitFiltered.length;
                data.datasets[0].data = labels.map(() => (rabbitFiltered !== undefined) ? rabbitFiltered?.length : 0)
            }

            if (kafkaFiltered !== undefined) {
                kafkaLength = kafkaFiltered.length;
                //console.log('xdd')
                data.datasets[1].data = labels.map(() => (kafkaFiltered !== undefined) ? kafkaFiltered?.length : 0)
            }

        }


        //console.log(logs?.slice(0, 10))

    }, [loadingLogs])




    return (
        <Bar options={options} data={data} />
    )
}

