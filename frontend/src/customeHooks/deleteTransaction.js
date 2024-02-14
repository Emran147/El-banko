import { useState } from 'react';

const useDeleteTransaction = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deleteTransaction = async (id) => {
    setIsDeleting(true)
    setError(null)
    try {
      const response = await fetch(`http://localhost:8080/Transactions/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Could not delete the transaction')
      }
      const result = await response.json()
      console.log(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsDeleting(false)
    }
  }
  return { deleteTransaction, isDeleting, error }
};

export default useDeleteTransaction;
