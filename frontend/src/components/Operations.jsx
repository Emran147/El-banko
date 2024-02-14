import React, { useState } from 'react'
import usePostRequest from '../customeHooks/post'
import '../cssFiles/Operations.css'

export default function Operations({ handleBalance }) {
    const [formData, setFormData] = useState({
        amount: '',
        vendor: '',
        category: ''
    })

    const { data, error, isLoading, sendPostRequest } = usePostRequest('http://localhost:8080/Transaction')

    const handleChange = (event) => {
        const { name, value } = event.target;
        // Check if the value is numeric before updating the state
        if (name === 'amount' && isNaN(value)) {
            alert('Please enter a numeric value for the amount.');
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }))
        }
    }

    const handleDeposit = () => {
        sendPostRequest(formData)
        handleBalance(formData.amount)
    }
    const handleWithdraw = () => {
        const updatedFormData = { ...formData, amount: formData.amount * -1 }
        sendPostRequest(updatedFormData)
        handleBalance(updatedFormData.amount)
    }

    return (
        <div className='Operations-container' >
            <input type="text" name="amount" value={formData.amount} placeholder="Amount" onChange={handleChange} />
            <input type="text" name="vendor" value={formData.vendor} placeholder="Vendor" onChange={handleChange} />
            <input type="text" name="category" value={formData.category} placeholder="Category" onChange={handleChange} />
            <button className='Deposit' onClick={handleDeposit} disabled={isLoading}>Deposit</button>
            <button className='Withdraw' onClick={handleWithdraw} disabled={isLoading}>Withdraw</button>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {data && <p>Success! Data received</p>}
        </div>
    );
}
