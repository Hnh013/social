let securityQuestionAnswerWrapper = {
    question: 0,
    key: Math.random(),
    text: "",
    asnwer: "",
    attributes: {
        name: "",
        placeholder: "Answer here",
        autoComplete: 'off'
    },
    validations: {
        type: "text",
        required: true,
        maxLength: 50,
        minLength: 2
    },
    errorMessages: [
        {id: 1001 , display: 'hidden', error: 'typeMismatch', message: "You must enter a valid response" },
        {id: 1002 , display: 'hidden', error: 'valueMissing', message: "You must enter a value" },
        {id: 1003 , display: 'hidden', error: 'tooShort', message: `Your must enter a value containing at least 2 character(s)` },
        {id: 1004 , display: 'hidden', error: 'tooLong', message: `Your must enter a value containing at most 50 character(s)` },
    ]
};

export default securityQuestionAnswerWrapper;