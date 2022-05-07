import React from 'react'
import { useLogs } from '../hooks/useLogs';

export const LogsPage = () => {

  const { logs, loadingLogs } = useLogs();

  console.log(logs)
  return (
    <div className='float-container container'>
      <h2>Logs</h2>
      <hr />



      {
        logs !== undefined && (
          logs?.map((log) => (
            <div className="row">
              <div>
                <div className="card border-secondary mb-3">
                  <div className="card-header">id_log: {log._id.$oid}</div>
                  <div className="card-body">
                    <h4 className="card-title">Endpoint: /api/logs</h4>
                    <small>Game name: {log.game_name}</small>

                    <pre>
                      Queue: {log.queuename} {"\n"}
                      players: {log.players}
                    </pre>

                  </div>
                </div>
              </div>
            </div>
          ))
        )
      }



    </div>
  )
}
