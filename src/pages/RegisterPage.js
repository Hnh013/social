import React, { useState, useContext, useEffect } from 'react'
import RegisterForm from '../utils/RegisterForm';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import SecurityQuesAnsComponent from '../components/SecurityQuesAnsComponent';
import securityQuestionAnswerWrapper from '../utils/SecurityQuesAnsWrapper';
import AlertComponent from '../components/AlertComponent';


const RegisterPage = () => {

  const navigate = useNavigate();
  const { registerUser, rememberMe, setRememberMe, questions } = useContext(AuthContext);

  const initialCredentialsState = { info: { first_name: '', last_name: '', email: '', password: '' }, answers: [{ question: 1, text: "What's your favorite book?", answer: '' }] };
  const initialQuesAns = [{ ...securityQuestionAnswerWrapper, question: 1, text: "What's your favorite book?" , answer: '' }];

  const [credentials, setCredentials] = useState(initialCredentialsState);
  const [alert, setAlert] = useState({ open: false, theme: '', content: '' });


  const toggleAlert = (open = false, theme = '', content = '') => setAlert({ ...alert, open: open, theme: theme, content: content });

  const registerRequest = async (event) => {
    event.preventDefault();
    const response = await registerUser({ ...credentials });

    setRememberMe(false);

    switch (response.status) {
      case 201:
        setCredentials(initialCredentialsState);
        response.message && response.message === 'success' && navigate("/profile");
        break;
      default:
        setAlert({ ...alert, open: true, theme: 'danger', content: `Sorry, an unknown error has occured` });
        break;
    }
  }

  const handleCredentialsChange = (e, fieldErrorProps) => {
    const { name, value, validity } = e.target;
    const currentCredentials = { ...credentials, info: { ...credentials.info, [name]: value } }
    setCredentials({ ...currentCredentials });
    for (let val in validity) {
      if (validity[val]) {
        fieldErrorProps.map(x => x.error === String(val) && (x.display = 'danger'))
      } else {
        fieldErrorProps.map(x => x.error === String(val) && (x.display = 'success'))
      }
    }
  }

  const handleQuesAnsChange = (quesAnsObject) => {
    let newCredentials = [...quesAnsObject].map(({ text, ...rest }) => rest);
    setCredentials({ ...credentials, answers: [...newCredentials] })
  }

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  }

  return (
    <section>
      {alert.open && <AlertComponent theme={alert.theme} content={<>{alert.content}</>} handleClose={() => toggleAlert()} WW></AlertComponent>}
      <div className="form-wrapper d-flex">
        <form className="custom-form" onSubmit={(e) => registerRequest(e)} autoComplete='off'>
          {RegisterForm && RegisterForm.map(field =>
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
                value={credentials.info[field.attributes.name]}
              />
              <div className='custom-error-message'>
                {field.errorMessages && field.errorMessages.map((messageObject, index) => {
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
          {questions && questions.length ?
            (<SecurityQuesAnsComponent
                questions={questions}
                quesAnsObject={initialQuesAns}
                credentials={credentials}
                handleQuesAnsChange={handleQuesAnsChange}
            />) 
            :
            (<div className='custom-form-control' >
                <label className='custom-form-label font-14'>
                    Loading Security Questions...
                </label>
            </div>)
          }
          <div className="custom-form-control form-links">
            <label className="form-links-label font-12">
              <input type="checkbox" name="" id="" checked={rememberMe} onChange={handleRememberMe} />Remember Me
            </label>
            <button type="submit" className="btn-secondary">Register</button>
            <div className="">
              <Link to="/login" className='float-right font-12'>Login</Link>
            </div>
          </div>
        </form>
      </div> 
    </section>
  )
}

export default RegisterPage;
