import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { CurrencyContext } from '../context/CurrencyContext';

const ExpenseTotal = () => {
    const { expenses } = useContext(AppContext);
    const { currency } = useContext(CurrencyContext);

    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    return (
        <div className='alert alert-primary'>
            <span>Total Allocated: {currency}{totalExpenses}</span>
        </div>
    );
};

export default ExpenseTotal;
