import React, { useState, useContext } from 'react'
import AuthContext from '../contexts/AuthContext';
import LoginForm from '../utils/LoginForm';
import { Link, useNavigate } from 'react-router-dom';
import AlertComponent from '../components/AlertComponent';

const LoginPage = () => {

  const navigate = useNavigate();
  let { loginUser, rememberMe, setRememberMe } = useContext(AuthContext);

  const initialCredentialsState = { email: '', password: '' };

  const [alert, setAlert] = useState({ open: false, theme: '', content: '' });
  const [credentials, setCredentials] = useState(initialCredentialsState);


  const toggleAlert = (open = false, theme = '', content = '') => setAlert({ ...alert, open: open, theme: theme, content: content });

  const handleCredentialsChange = (e, fieldErrorProps) => {
    const { name, value, validity } = e.target;
    const currentCredentials = { ...credentials, [name]: value }

    setCredentials({ ...currentCredentials });

    for (let val in validity) {
      if (validity[val]) {
        fieldErrorProps.map(x => x.error === String(val) && (x.display = 'danger'))
      } else {
        fieldErrorProps.map(x => x.error === String(val) && (x.display = 'success'))
      }
    }
  }

  const loginRequest = async (event) => {
    event.preventDefault();
    const response = await loginUser({ ...credentials });

    setRememberMe(false);

    if (response.status === 200) {
      setCredentials(initialCredentialsState);
      response.message && response.message === 'success' && navigate("/profile");
    } else {
      switch (response.status) {
        case 404:
          setCredentials(initialCredentialsState);
          break;
        case 401:
          setCredentials({ ...credentials, password: '' });
          break;
        case 500:
        default:
          setCredentials({ ...credentials });
          break;
      }
      setAlert({ ...alert, open: true, theme: 'danger', content: `${response.message} (Error Code: ${response.status})` });
    }
  }

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  }

  return (
    <section>
      {alert.open && <AlertComponent theme={alert.theme} content={<>{alert.content}</>} handleClose={() => toggleAlert()} WW></AlertComponent>}
      <div className="form-wrapper d-flex">
        <form className="custom-form" onSubmit={loginRequest} autoComplete='off'>
          {LoginForm && LoginForm.map(field =>
            <div
              key={field.id}
              className='custom-form-control' >
              <label
                className='custom-form-label font-14'
                htmlFor={field.attributes.name}>{field.label}
              </label>
              <input
                className='custom-form-field'
                {...field.attributes}
                {...field.validations}
                onChange={(e) => handleCredentialsChange(e, field.errorMessages)}
                value={credentials[field.attributes.name]}
              />
              <div className='custom-error-message'>
                {field.errorMessages && field.errorMessages.map(messageObject => {
                  return (
                    <div
                      className={`message-block ${messageObject.display}`}
                      key={messageObject.id} >
                      <span
                        className={`material-symbols-outlined icon ${messageObject.display} `}>
                        {messageObject.display === 'success' ? 'check_circle' : 'cancel'}
                      </span>
                      <span className='content' >{messageObject.message}</span>
                    </div>
                  )
                })
                }
              </div>
            </div>
          )}
          <div className="custom-form-control form-links">
            <label className="form-links-label font-12">
              <input type="checkbox" name="" id="" checked={rememberMe} onChange={handleRememberMe} /> Remember me
            </label>
            <button type="submit" className="btn-secondary">Log In </button>
            <div className="d-flex jc-sb font-12">
              <a href="https://github.com/" >Forgot Password</a>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default LoginPage;
