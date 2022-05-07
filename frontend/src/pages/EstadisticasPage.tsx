import React, { useState, useEffect, useMemo } from 'react';
import { io, connect } from 'socket.io-client'
import { EstadisticasTidb } from '../components/EstadisticasTidb';
import { APP_URI } from '../helpers/apirul';
import { useForm } from '../hooks/useForm';

export interface PlayerData {
  game_name: string;
  times: number;
}

export const EstadisticasPage = () => {

  const [playerStatistics, setPlayerStatistics] = useState<PlayerData[]>();

  const { formData, onChangeForm } = useForm({
    name: 'juan'
  });

  const onGetInfo = () => {

    return new Promise((resolve) => {
      const socket = connect(APP_URI)
      socket.on('connect', () => console.log(socket.id))

      socket.emit('evento', { user: formData.name }, function (data: any) {
        console.log(data)
      })

      console.log('estadisticas jugador en tidb')
      socket.on('realtimeplayer-statistics', (stream) => {
        //setTop10(stream)
        console.log(stream);
        //setPlayerStatistics(stream);
        socket.disconnect()
        resolve(stream)
        // console.log('stream ->', stream)
        // setTop10(stream)
      })


    })
  }

  const { name } = formData;

  const onLoadData = async() => {

    const info: any = await onGetInfo();
    setPlayerStatistics(info);

  }

  useEffect(() => {

    if (playerStatistics !== undefined) {
      // recargar data 
      console.log(name);
    }

  }, [])


  return (
    <div className='float-container container'>
      <h1>Estadisticas</h1>
      <hr />

      <div className="form-group">
        <label className="form-label mt-1">Username</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={name}
          onChange={(ev) => onChangeForm(ev)}
        />
      </div>

      <button className='btn btn-primary' onClick={onLoadData}>Cargar</button>
      <div className="row mt-5" style={{
        background: '#ccc',
        borderRadius: '5px',
        padding: '15px'
      }}>
        <div className="col-6">
          <h3>Tidb</h3>
          {
            playerStatistics  &&
            (
              <EstadisticasTidb playerStatistics={playerStatistics!} />
            )
          }

        </div>
        <div className="col-6">
          <h3>Redis</h3>

          {/* <div className="card border-secondary mb-3" style={{ maxWidth: "175rem" }}>
            <div className="card-header">Header</div>
            <div className="card-body">
              <h4 className="card-title">Secondary card title</h4>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div> */}

        </div>
      </div>
    </div>
  )
}
