import React from 'react'
import '../cssFiles/Transaction.css'

export default function Transaction({transaction,deleteTransaction}) {
  return (
    <div className={transaction.amount>0 ? 'income-transaction' : 'expenditure-transaction'}>
      {transaction.category} <br />{transaction.amount}<br /> {transaction.vendor}
      <button onClick={()=>deleteTransaction(transaction._id)}>Delete</button>
    </div>
  )
}
