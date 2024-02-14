import React from 'react'
import useFetch from '../customeHooks/useFetch';
import Graph from './Graph'
import '../cssFiles/Breakdown.css'; 
export default function Breakdown() {
  const { data, isLoading, error } = useFetch('http://localhost:8080/Transactions/SumByCategory');
  return (
    <div>
      {error && <div className="error">{error}</div>}
      {isLoading && <div className="loading">Loading...</div>}
      {data && (
        <div className="graphs-container">
          <Graph className="Graph" data={data.deposits} type={'deposits'}/>
          <Graph className="Graph" data={data.withdrawals} type={'withdrawals'} />
        </div>
      )}
    </div>
  )
}
