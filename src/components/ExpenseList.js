import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ExpenseItem from './ExpenseItem';

const ExpenseList = () => {
    const { expenses } = useContext(AppContext);

    return (
        <div>
            <div className="row mb-3">
                <div className="col-sm">Department</div>
                <div className="col-sm">Allocated Budget</div>
                <div className="col-sm">Increase by 10</div>
                <div className="col-sm">Decrease by 10</div>
            </div>
            <ul className='list-group'>
                {expenses.map((expense) => (
                    <ExpenseItem key={expense.id} expense={expense} />
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;
