import React from 'react';
import { Ultimos10Tidb } from '../components/Ultimos10Tidb'
import { Ultimos10Redis } from '../components/Ultimos10Redis';




export const Ultimos10JuegosPage = () => {

  // }, [])


  return (
    <div className='float-container container'>
      <h1>Ultimos 10 juegos</h1>
      <hr />

      <div className="row mt-5" style={{
        background: '#ccc',
        borderRadius: '5px',
        padding: '15px'
      }}>
        <div className="col-6">
          <h3>Tidb</h3>

          {/** Table */}
          <Ultimos10Tidb />
        </div>
        <div className="col-6">
          <h3>Redis</h3>

          <Ultimos10Redis />
        </div>
      </div>


    </div>
  )
}
