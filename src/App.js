import './App.css';
import { BrowserRouter , Routes , Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';

import PrivateRoute  from './utils/PrivateRoute';

function App() {
    return (
        <div className="App">           
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    { /* Keep Home Page Route protected ffrom non-logged in users */ } 
                    <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>} />
                    
                    { /* Authnetication Routes */ }
                    <Route element={<LoginPage/>} path="/login" />
                    <Route element={<RegisterPage/>} path="/register" />
                    
                    { /* Router Path match to any non-existent route and redirect them to default 'Home' route  */ }
                    <Route path="*" element={<Navigate to="/" />} />    
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;