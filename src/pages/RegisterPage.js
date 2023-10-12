import React, { useState, useContext } from 'react'
import RegisterForm from '../forms/RegisterForm';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const RegisterPage = () => {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ firstname: '', lastname: '', email: '', password: '' });

  let { registerUser } = useContext(AuthContext);

  const registerRequest = async (event) => {
    event.preventDefault();
    const response = await registerUser({ ...credentials })
    response && response.message && response.message === 'success' && navigate("/login");
  }

  const handleCredentialsChange = (e) => {
    const { name, value } = e.target;
    const currentCredentials = { ...credentials, [name]: value }
    setCredentials({ ...currentCredentials });
  }

  return (
    <section>
      <div className="form-wrapper d-flex">
        <form className="custom-form" onSubmit={(e) => registerRequest(e)} >
          {RegisterForm && RegisterForm.map(field => {
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
              <input type="checkbox" name="" id="" /> I accept terms & conditions.
            </label>
            <button type="submit" className="btn-secondary">Log In </button>
            <div className="d-flex jc-sb font-12">
              <Link to="/login">Login</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default RegisterPage;
