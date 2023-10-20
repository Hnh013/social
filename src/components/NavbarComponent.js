import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import toggleDark from '../themes';

const NavbarComponent = () => {

    const navigate = useNavigate();

    let { user,logoutUser } = useContext(AuthContext);

    const logoutRequest = async (event) => {
        event.preventDefault();
        const response = await logoutUser();
        response && response.message && response.message === 'success' && navigate("/login");
    }

    return (
        <nav>
            <div  className="navbar-body">
                <div  className="navbar-content">
                    <div  className="navbar-brand">
                        Brand Name
                    </div>

                    <div  className="navbar-links">

                        <Link className="link" to="/home">Home</Link>
                        <Link className="link" to="/profile">Profile</Link>
                        <div  className="link">Contact Us</div>

                    </div>

                    <div  className="navbar-others">
                        { user ? ( <button className='btn-primary' onClick={(e) => logoutRequest(e)}>Logout</button>) : (<button className="btn-primary" onClick={() => navigate('/login')}>Log In</button>)}
                       
                        <button id="toggler"  className="btn-secondary" onClick={() => toggleDark()}>
                            🍦
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarComponent