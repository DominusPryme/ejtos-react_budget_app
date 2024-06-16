import React, { createContext, useReducer } from 'react';

// Initial state
const initialState = {
    budget: 2000,
    expenses: [
        { id: 1, name: 'Marketing', cost: 60 },
        { id: 2, name: 'Finance', cost: 300 },
        { id: 3, name: 'Sales', cost: 70 },
        { id: 4, name: 'Human Resource', cost: 40 },
        { id: 5, name: 'IT', cost: 500 },
    ],
};

// Create context
export const AppContext = createContext();

const appReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload],
            };
        case 'SET_BUDGET':
            return {
                ...state,
                budget: action.payload,
            };
        case 'UPDATE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.map((expense) =>
                    expense.id === action.payload.id
                        ? { ...expense, cost: expense.cost + action.payload.amount }
                        : expense
                ),
            };
        default:
            return state;
    }
};

// Provider component
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const totalExpenses = state.expenses.reduce((total, item) => total + item.cost, 0);
    const remaining = state.budget - totalExpenses;

    return (
        <AppContext.Provider value={{ ...state, dispatch, remaining }}>
            {children}
        </AppContext.Provider>
    );
};
