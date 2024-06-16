import React, { useContext } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';

const CurrencyDropdown = () => {
    const { currency, setCurrency } = useContext(CurrencyContext);

    return (
        <div className='mt-3'>
            <label>Currency: </label>
            <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className='form-control'
                style={{ width: 'auto', display: 'inline-block', marginLeft: '10px' }}
            >
                <option value='$'>$ Dollar</option>
                <option value='£'>£ Pound</option>
                <option value='€'>€ Euro</option>
                <option value='₹'>₹ Rupee</option>
            </select>
        </div>
    );
};

export default CurrencyDropdown;
