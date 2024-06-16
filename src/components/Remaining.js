import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { CurrencyContext } from '../context/CurrencyContext';

const Remaining = () => {
    const { budget, expenses } = useContext(AppContext);
    const { currency } = useContext(CurrencyContext);

    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    const remaining = budget - totalExpenses;

    return (
        <div className={`alert ${remaining < 0 ? 'alert-danger' : 'alert-success'}`}>
            <span>Remaining: {currency}{remaining}</span>
        </div>
    );
};

export default Remaining;
