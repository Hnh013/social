import React, { useState, useContext } from 'react'
import AuthContext from '../contexts/AuthContext';
import LoginForm from '../forms/LoginForm';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleCredentialsChange = (e) => {
    const { name, value } = e.target;
    const currentCredentials = { ...credentials, [name]: value }
    setCredentials({ ...currentCredentials });
  }

  let { loginUser } = useContext(AuthContext);

  const loginRequest = async (event) => {
    event.preventDefault();
    const response = await loginUser({ ...credentials })
    response && response.message && response.message === 'success' && navigate("/");
  }

  return (
    <section>
      <div className="form-wrapper d-flex">
        <form className="custom-form" onSubmit={(e) => loginRequest(e)}>
          {LoginForm && LoginForm.map(field => {
            return (
              <div className='custom-form-control' key={field.id}>
                <label className='custom-form-label font-14' htmlFor={field?.attributes?.name}>{field?.label}</label>
                <input {...field?.attributes} className='custom-form-field' onChange={(e) => handleCredentialsChange(e)} value={credentials[field?.attributes?.name]} />
              </div>
            )
          }
          )}
          <div className="custom-form-control form-links">
            <label className="form-links-label font-12">
              <input type="checkbox" name="" id="" /> Remember me
            </label>
            <button type="submit" className="btn-secondary">Log In </button>
            <div className="d-flex jc-sb font-12">
              <a href="#" >Forgot Password</a>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default LoginPage;
