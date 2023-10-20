import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import PrivateRoute from './utils/PrivateRoute';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <NavbarComponent />
                <Routes>
                { /* Keep Home Page Route protected from non-logged in users */}
                    <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                    
                    { /* Authentication Routes */}
                    <Route element={<LoginPage />} path="/login" />
                    <Route element={<RegisterPage />} path="/register" />

                    { /* Router Path match to any non-existent route and redirect them to default 'Home' route  */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;