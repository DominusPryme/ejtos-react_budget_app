const AppReducer = (state, action) => {
    let new_expenses = [];
    switch (action.type) {
        case 'ADD_QUANTITY':
            new_expenses = state.expenses.map(expense => {
                if (expense.name === action.payload.name) {
                    return { ...expense, quantity: expense.quantity + action.payload.quantity };
                }
                return expense;
            });
            return { ...state, expenses: new_expenses };

        case 'RED_QUANTITY':
            new_expenses = state.expenses.map(expense => {
                if (expense.name === action.payload.name) {
                    return { ...expense, quantity: Math.max(0, expense.quantity - action.payload.quantity) };
                }
                return expense;
            });
            return { ...state, expenses: new_expenses };

        case 'DELETE_ITEM':
            new_expenses = state.expenses.map(expense => {
                if (expense.name === action.payload.name) {
                    return { ...expense, quantity: 0 };
                }
                return expense;
            });
            return { ...state, expenses: new_expenses };

        case 'CHG_LOCATION':
            return { ...state, Location: action.payload };

        case 'SET_BUDGET':
            return { ...state, CartValue: action.payload };

        case 'ADD_ALLOCATION':
            return { ...state, CartValue: state.CartValue + action.payload };

        default:
            return state;
    }
};

export default AppReducer;
