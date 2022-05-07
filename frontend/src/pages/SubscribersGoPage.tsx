import React from 'react'
import { BarGraph } from '../components/BarGraph'

export const SubscribersGoPage = () => {
  return (
    <div className='float-container container'>
    <h1>Subscribers</h1>
    <hr />


    <div className="row">
      <BarGraph />
    </div>
  </div>
  )
}
