import React, { useState, useContext } from 'react'
import RegisterForm from '../forms/RegisterForm';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import SecurityQuesAnsComponent from '../components/SecurityQuesAnsComponent';
import securityQuestionAnswerWrapper from '../utils/SecurityQuesAnsWrapper';


const RegisterPage = () => {

  const initialQuesAns = [{ ...securityQuestionAnswerWrapper, question: 1, text: 'What were the last four digits of your childhood telephone number?', answer: '' }];

  const [credentials, setCredentials] = useState({ info: { first_name: '', last_name: '', email: '', password: '' }, answers: [{ question: 1, text: 'What were the last four digits of your childhood telephone number?', answer: '' }] });

  const questions = [
    { id: 1, text: "What were the last four digits of your childhood telephone number?" },
    { id: 2, text: "In what town or city did your parents meet?" },
    { id: 3, text: "In what town or city was your first full time job?" },
    { id: 4, text: "What primary school did you attend?" },
    { id: 5, text: "What time of the day was your first child born? (hh:mm)" }
  ];

  const navigate = useNavigate();
  const { registerUser } = useContext(AuthContext);


  const registerRequest = async (event) => {
    event.preventDefault();
    const response = await registerUser({ ...credentials })
    response && response.message && response.message === 'success' && navigate("/login");
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

  return (
    <section>
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
          <SecurityQuesAnsComponent
            questions={questions}
            quesAnsObject={initialQuesAns}
            credentials={credentials}
            handleQuesAnsChange={handleQuesAnsChange}
          />
          <div className="custom-form-control form-links">
            <label className="form-links-label font-12">
              <input type="checkbox" name="" id="" /> I accept terms & conditions.
            </label>
            <button type="submit" className="btn-secondary">Register</button>
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
