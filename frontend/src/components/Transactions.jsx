import React, { useState, useEffect } from 'react';
import Transaction from './Transaction';
import useFetch from '../customeHooks/useFetch';
import useDeleteTransaction from '../customeHooks/deleteTransaction';
import '../cssFiles/Transaction.css';

export default function Transactions() {
  const { data, isLoading, error } = useFetch('http://localhost:8080/Transactions');
  const { deleteTransaction } = useDeleteTransaction()
  const [transactions, setTransactions] = useState(null)

  useEffect(() => {
    if (data) {
      setTransactions(data);
    }
  }, [data])
  
  const handleDelete = async (id) => {
    await deleteTransaction(id);
    setTransactions(transactions.filter(transaction => transaction._id !== id));
  };

  return (
    <div className='the-container'>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      { transactions && (
        <div className="grid-container">
          {transactions.map((transaction) => (
            <Transaction key={transaction._id} transaction={transaction} deleteTransaction={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
