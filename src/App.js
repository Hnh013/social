import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import PrivateRoute from './utils/PrivateRoute';
import ProfilePage from './pages/ProfilePage';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <NavbarComponent />
                <Routes>
                    <Route element={<HomePage />} path="/" />

                    { /* Authentication Routes */}
                    <Route element={<LoginPage />} path="/login" />
                    <Route element={<RegisterPage />} path="/register" />

                    { /* Keep Profile Page Route protected from non-logged in users */}
                    <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />

                    { /* Router Path match to any non-existent route and redirect them to default 'Home' route  */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;