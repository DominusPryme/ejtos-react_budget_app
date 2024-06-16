import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { CurrencyContext } from '../context/CurrencyContext';

const AllocationForm = () => {
    const { dispatch, remaining } = useContext(AppContext);
    const { currency } = useContext(CurrencyContext);
    const [department, setDepartment] = useState('');
    const [allocationType, setAllocationType] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const departments = ['Marketing', 'Finance', 'Sales', 'Human Resource', 'IT'];
    const allocationTypes = ['Add', 'Reduce'];

    const onSubmit = (event) => {
        event.preventDefault();
        const numericAmount = parseInt(amount);

        if (isNaN(numericAmount)) {
            setError('Please enter a valid number');
            return;
        }

        if (allocationType === 'Add' && numericAmount > remaining) {
            setError('The cost exceeds the remaining budget');
            return;
        }

        const expense = {
            id: Math.random(),
            name: department,
            cost: allocationType === 'Add' ? numericAmount : -numericAmount,
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense,
        });

        setDepartment('');
        setAllocationType('');
        setAmount('');
        setError('');
    };

    return (
        <form onSubmit={onSubmit}>
            <div className='row'>
                <div className='col-sm'>
                    <select
                        className='form-control'
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    >
                        <option value=''>Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept} value={dept}>
                                {dept}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='col-sm'>
                    <select
                        className='form-control'
                        value={allocationType}
                        onChange={(e) => setAllocationType(e.target.value)}
                    >
                        <option value=''>Select Allocation Type</option>
                        {allocationTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='col-sm'>
                    <input
                        type='number'
                        className='form-control'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder={`${currency}Amount`}
                    />
                </div>
                <div className='col-sm'>
                    <button type='submit' className='btn btn-primary'>
                        Save
                    </button>
                </div>
            </div>
            {error && <div className='alert alert-danger mt-2'>{error}</div>}
        </form>
    );
};

export default AllocationForm;
