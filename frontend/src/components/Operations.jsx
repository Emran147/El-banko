import React, { useState } from 'react';
import usePostRequest from '../customeHooks/post';
import '../cssFiles/Operations.css';

const InputField = ({ name, value, placeholder, onChange }) => (
    <input type={name === 'amount' ? 'number' : 'text'} name={name} value={value} placeholder={placeholder} onChange={onChange} />
);

const Operations = ({ handleBalance , balance}) => {
    const [formData, setFormData] = useState({
        amount: '',
        vendor: '',
        category: ''
    });

    const { data, error, isLoading, sendPostRequest } = usePostRequest('http://localhost:8080/Transaction');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (isDeposit) => {
        if (validateInputs()) {
            const updatedFormData = isDeposit ? formData : { ...formData, amount: formData.amount * -1 };
            if(!isDeposit&&!isThereBalance(updatedFormData))
            {
                alert('too much bro , we are not your parents')
                return
            }
            sendPostRequest(updatedFormData);
            handleBalance(updatedFormData.amount);
            const newForm = {
                amount: '',
                vendor: '',
                category: ''
            }
            setFormData(newForm)
        } else {
            alert('Please fill in all fields.');
        }
    };

    const  isThereBalance = function(updatedFormData){
        if(updatedFormData.amount+balance<-500)
        return false
        else return true
    }

    const validateInputs = () => {
        return Object.values(formData).every(value => value.trim() !== '');
    };

    return (
        <div className='Operations-container'>
            <InputField name="amount" value={formData.amount} placeholder="Amount" onChange={handleChange} />
            <InputField name="vendor" value={formData.vendor} placeholder="Vendor" onChange={handleChange} />
            <InputField name="category" value={formData.category} placeholder="Category" onChange={handleChange} />
            <button className='Deposit' onClick={() => handleSubmit(true)} disabled={isLoading}>Deposit</button>
            <button className='Withdraw' onClick={() => handleSubmit(false)} disabled={isLoading}>Withdraw</button>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {data && <p>Success! Data received</p>}
        </div>
    );
};

export default Operations;
