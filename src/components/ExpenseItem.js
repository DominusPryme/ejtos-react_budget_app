import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { CurrencyContext } from '../context/CurrencyContext';

const ExpenseItem = ({ expense }) => {
    const { dispatch } = useContext(AppContext);
    const { currency } = useContext(CurrencyContext);

    const handleIncrease = () => {
        dispatch({
            type: 'UPDATE_EXPENSE',
            payload: { id: expense.id, amount: 10 },
        });
    };

    const handleDecrease = () => {
        dispatch({
            type: 'UPDATE_EXPENSE',
            payload: { id: expense.id, amount: -10 },
        });
    };

    return (
        <li className='list-group-item d-flex justify-content-between align-items-center'>
            <div className='col-sm'>{expense.name}</div>
            <div className='col-sm'>{currency}{expense.cost}</div>
            <div className='col-sm'>
                <button onClick={handleIncrease} className='btn btn-primary btn-sm ml-2'>+</button>
            </div>
            <div className='col-sm'>
                <button onClick={handleDecrease} className='btn btn-danger btn-sm ml-2'>-</button>
            </div>
        </li>
    );
};

export default ExpenseItem;
