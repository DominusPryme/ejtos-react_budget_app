import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const ItemSelected = () => {
    const { dispatch, Location, expenses, CartValue } = useContext(AppContext);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [action, setAction] = useState('');

    const totalExpenses = expenses.reduce((total, item) => total + (item.unitprice * item.quantity), 0);
    const remainingBudget = CartValue - totalExpenses;

    const submitEvent = () => {
        if (quantity > remainingBudget && action === "Add") {
            alert("The quantity exceeds the remaining budget.");
            return;
        }

        const item = {
            name: name,
            quantity: parseInt(quantity),
        };

        if (action === "Reduce") {
            dispatch({
                type: 'RED_QUANTITY',
                payload: item,
            });
        } else {
            dispatch({
                type: 'ADD_QUANTITY',
                payload: item,
            });
        }
    };

    return (
        <div>
            <div className='row'>
                <div className="input-group mb-3" style={{ marginLeft: '2rem' }}>
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Items</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect01" onChange={(event) => setName(event.target.value)}>
                        <option defaultValue>Choose...</option>
                        {expenses.map((expense) => (
                            <option key={expense.id} value={expense.name}>{expense.name}</option>
                        ))}
                    </select>
                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                        <label className="input-group-text" htmlFor="inputGroupSelect02">Action</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect02" onChange={(event) => setAction(event.target.value)}>
                        <option defaultValue value="Add">Add</option>
                        <option value="Reduce">Reduce</option>
                    </select>
                    <span className="eco" style={{ marginLeft: '2rem', marginRight: '8px' }}>{Location}</span>
                    <input
                        required='required'
                        type='number'
                        id='quantity'
                        value={quantity}
                        style={{ size: 10 }}
                        min="0"
                        max={remainingBudget}
                        onChange={(event) => setQuantity(Math.min(event.target.value, remainingBudget))}
                    />
                    <button className="btn btn-primary" onClick={submitEvent} style={{ marginLeft: '2rem' }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemSelected;
