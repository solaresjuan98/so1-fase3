import React from 'react'
import { PlayerData } from '../pages/EstadisticasPage';

interface Props {
    playerStatistics: PlayerData[];
}

export const EstadisticasTidb = ({playerStatistics}:Props) => {
    
    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Ganador</th>
                        <th scope="col">Veces</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        playerStatistics === undefined ? (

                            <tr>
                                <th>No data :c </th>
                                <td></td>
                            </tr>
                        ) : (
                            playerStatistics.map((item, i) => (
                                <tr className="table-active" key={i}>
                                    <th scope="row">{item.game_name}</th>
                                    <td>{item.times}</td>
                                </tr>
                            ))
                        )

                    }



                </tbody>
            </table>
        </>
    )
}
