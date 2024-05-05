import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from "./context/user";
import { AdminProvider } from "./context/admin";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <UserProvider>
            <AdminProvider>
                <App />
            </AdminProvider>
        </UserProvider>
    </Router>
);
