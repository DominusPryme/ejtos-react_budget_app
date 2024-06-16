import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const BudgetAllocation = () => {
    const { CartValue, Location, dispatch, expenses } = useContext(AppContext);
    const [budget, setBudget] = useState(CartValue);
    const [currency, setCurrency] = useState(Location);
    const [allocation, setAllocation] = useState('');
    const [error, setError] = useState('');

    const totalExpenses = expenses.reduce((total, item) => total + (item.unitprice * item.quantity), 0);
    const remainingBudget = budget - totalExpenses;

    const increaseBudget = () => {
        if (budget + 10 <= 20000) {
            setBudget(budget + 10);
            dispatch({ type: 'SET_BUDGET', payload: budget + 10 });
        } else {
            alert('Budget cannot exceed 20,000');
        }
    };

    const decreaseBudget = () => {
        if (budget - 10 >= totalExpenses) {
            setBudget(budget - 10);
            dispatch({ type: 'SET_BUDGET', payload: budget - 10 });
        } else {
            alert('Budget cannot be less than total spending');
        }
    };

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
        dispatch({ type: 'CHG_LOCATION', payload: e.target.value });
    };

    const handleBudgetChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 20000) {
            alert('Budget cannot exceed 20,000');
        } else if (value < totalExpenses) {
            alert('Budget cannot be less than total spending');
        } else {
            setBudget(value);
            dispatch({ type: 'SET_BUDGET', payload: value });
        }
    };

    const handleAllocationChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value)) {
            setAllocation(value);
            setError('');
        } else {
            setError('Please enter a valid number');
        }
    };

    const handleAllocationSubmit = () => {
        const allocationValue = parseInt(allocation);
        if (allocationValue > remainingBudget) {
            setError('Allocation exceeds remaining budget');
        } else {
            dispatch({ type: 'ADD_ALLOCATION', payload: allocationValue });
            setAllocation('');
        }
    };

    return (
        <div>
            <div className='alert alert-primary'>
                <span>Budget: {currency}
                    <input 
                        type="number"
                        value={budget}
                        onChange={handleBudgetChange}
                        min={totalExpenses}
                        max="20000"
                    />
                </span>
                <button onClick={decreaseBudget}>-</button>
                <button onClick={increaseBudget}>+</button>
                <div>
                    <label htmlFor="currency">Currency: </label>
                    <select id="currency" value={currency} onChange={handleCurrencyChange}>
                        <option value="£">£ Pound</option>
                        <option value="$">$ Dollar</option>
                        <option value="€">€ Euro</option>
                        <option value="₹">₹ Rupee</option>
                    </select>
                </div>
            </div>
            <div>
                <input
                    type="number"
                    value={allocation}
                    onChange={handleAllocationChange}
                    min="0"
                    max={remainingBudget}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button onClick={handleAllocationSubmit}>Allocate Budget</button>
            </div>
        </div>
    );
};

export default BudgetAllocation;
