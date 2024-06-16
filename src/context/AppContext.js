import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';

const initialState = {
    expenses: JSON.parse(localStorage.getItem('expenses')) || [
        { id: "Marketing", name: 'Marketing', quantity: 0, unitprice: 50 },
        { id: "Finance", name: 'Finance', quantity: 0, unitprice: 300 },
        { id: "Sales", name: 'Sales', quantity: 0, unitprice: 70 },
        { id: "HumanResource", name: 'Human Resource', quantity: 0, unitprice: 40 },
        { id: "IT", name: 'IT', quantity: 0, unitprice: 500 },
    ],
    Location: '£',
    CartValue: 1000,
};

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(state.expenses));
    }, [state.expenses]);

    useEffect(() => {
        localStorage.setItem('CartValue', state.CartValue);
    }, [state.CartValue]);

    return (
        <AppContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </AppContext.Provider>
    );
};
