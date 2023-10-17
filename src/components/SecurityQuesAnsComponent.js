import React, { useEffect, useState } from 'react';
import securityQuestionAnswerWrapper from '../utils/SecurityQuesAnsWrapper';

const SecurityQuesAnsComponent = (props) => {

    const [questions, setQuestions] = useState(props.questions);
    const [selectedQuestions, setSelectedQuestions] = useState(props.credentials.answers);
    const [quesAns, setQuesAns] = useState(props.quesAnsObject);

    const handleAdd = (x) => {
        let { id, text } = x;
        let newSelectedQuestions = [...selectedQuestions, { question: id, text: text, answer: '' }];
        /**/
        props.handleQuesAnsChange([...newSelectedQuestions]);
        /**/
        setSelectedQuestions([...newSelectedQuestions]);
        setQuesAns([...quesAns, { ...securityQuestionAnswerWrapper, question: id, text: text, answer: '' }])
    }

    const handleRemove = (x) => {
        let { question, text } = x;
        let newSelectedQuestions = [...selectedQuestions].filter(x => x.question !== question);
        let newQuesAns = [...quesAns].filter(x => x.question !== question);
        /**/
        props.handleQuesAnsChange([...newSelectedQuestions]);
        /**/
        setQuestions([...questions, { id: question, text: text }]);
        setQuesAns([...newQuesAns]);
        setSelectedQuestions([...newSelectedQuestions]);
    }

    const handleCredentialsChange = (e, id, fieldErrorProps) => {
        const { value, validity } = e.target;
        const newQuesAns = [...quesAns].map(x => x.question === id ? { ...x, answer: value } : x)
        const newSelectedQuestions = [...selectedQuestions].map(x => x.question === id ? { ...x, answer: value } : x);
        for (let val in validity) {
            if (validity[val]) {
                fieldErrorProps.map(x => x.error === String(val) && (x.display = 'danger'))
            } else {
                fieldErrorProps.map(x => x.error === String(val) && (x.display = 'success'))
            }
        }
        /**/
        props.handleQuesAnsChange([...newSelectedQuestions]);
        /** */
        setQuesAns([...newQuesAns]);
        setSelectedQuestions([...newSelectedQuestions]);
    }

    useEffect(() => {
        initialStateOfThings();
    }, [selectedQuestions])

    /* */
    const initialStateOfThings = () => {
        let selectedQuestionIDs = [...selectedQuestions].map(x => x.question);
        let newQuestions = [];
        for (let i = 0; i < selectedQuestionIDs.length; i++) {
            newQuestions = [...questions].filter(x => x.id !== selectedQuestionIDs[i]);
            setQuestions([...newQuestions]);
        }
    }

    return (
        <>
            <p className='custom-form-label font-14'>Security Question(s)</p>
            {
                questions.map(x =>
                    <div className='custom-error-message' key={x.id}>
                        <div className='message-block' onClick={() => handleAdd(x)}>
                            <span className='material-symbols-outlined valid-other icon'>add_circle</span>
                            <span className='content'>{x.text}</span>
                            <span className='content valid-other'>Add</span>
                        </div>
                    </div>
                )
            }
            {
                quesAns.map((field, index) =>
                    <div
                        key={`${field.key}${index}`}
                        className='custom-form-control' >
                        <label
                            className='custom-form-label font-14'>
                            {field.text}
                        </label>
                        <input
                            name="answer"
                            className='custom-form-field'
                            {...field.attributes}
                            {...field.validations}
                            onChange={(e) => handleCredentialsChange(e, field.question, field.errorMessages)}
                            value={field.answer}
                        />
                        <div className='custom-error-message'>
                            {selectedQuestions.length > 1 ?
                                (<div className='message-block warning' onClick={() => handleRemove(field)} >
                                    <span className='material-symbols-outlined warning icon' >do_not_disturb_on</span>
                                    <span className='content'>Remove Question</span>
                                </div>)
                                :
                                (<div className='message-block valid-other' >
                                    <span className='content'>Answer at least 1 question</span>
                                </div>)}
                        </div>
                        <div className='custom-error-message'>
                            {field.errorMessages && field.errorMessages.map((messageObject, index) => {
                                return (
                                    <div
                                        key={`${messageObject.id}${index}`}
                                        className={`message-block ${messageObject.display}`}
                                    >
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
                )
            }
        </>
    )
}

export default SecurityQuesAnsComponent