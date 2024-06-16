import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Budget from './components/Budget';
import Remaining from './components/Remaining';
import ExpenseTotal from './components/ExpenseTotal';
import ExpenseList from './components/ExpenseList';
import AllocationForm from './components/AllocationForm';
import CurrencyDropdown from './components/CurrencyDropdown';
import { AppProvider } from './context/AppContext';
import { CurrencyProvider } from './context/CurrencyContext';

const App = () => {
    return (
        <AppProvider>
            <CurrencyProvider>
                <div className='container'>
                    <h1 className='mt-3'>Company's Budget Allocation</h1>
                    <CurrencyDropdown />
                    <div className='row mt-3'>
                        <div className='col-sm'>
                            <Budget />
                        </div>
                        <div className='col-sm'>
                            <Remaining />
                        </div>
                        <div className='col-sm'>
                            <ExpenseTotal />
                        </div>
                    </div>
                    <h3 className='mt-3'>Allocations</h3>
                    <div className='row'>
                        <div className='col-sm'>
                            <ExpenseList />
                        </div>
                    </div>
                    <h3 className='mt-3'>Change Allocation</h3>
                    <div className='row'>
                        <div className='col-sm'>
                            <AllocationForm />
                        </div>
                    </div>
                </div>
            </CurrencyProvider>
        </AppProvider>
    );
};

export default App;
