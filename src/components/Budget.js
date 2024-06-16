import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { CurrencyContext } from '../context/CurrencyContext';

const Budget = () => {
    const { budget, dispatch, expenses } = useContext(AppContext);
    const { currency } = useContext(CurrencyContext);
    const [editableBudget, setEditableBudget] = useState(budget);
    const [error, setError] = useState('');

    const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);

    const handleChange = (event) => {
        const newBudget = parseInt(event.target.value, 10);
        if (isNaN(newBudget)) {
            setError('Please enter a valid number');
            return;
        }
        if (newBudget > 20000) {
            setError('Budget cannot exceed 20,000');
            return;
        }
        if (newBudget < totalExpenses) {
            setError('Budget cannot be less than the total spending');
            return;
        }
        setEditableBudget(newBudget);
        setError('');
        dispatch({
            type: 'SET_BUDGET',
            payload: newBudget,
        });
    };

    return (
        <div className='alert alert-secondary'>
            <div>
                <span>Budget: {currency}</span>
                <input 
                    type="number" 
                    value={editableBudget} 
                    onChange={handleChange} 
                    className='form-control d-inline w-auto ml-2' 
                />
            </div>
            {error && <div className='alert alert-danger mt-2'>{error}</div>}
        </div>
    );
};

export default Budget;
