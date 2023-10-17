const LoginForm = [
    {
        id: 101,
        label: "Email Address",
        inputType: "email",
        attributes: {
            name: "email",
            placeholder: "Email",
            autoComplete: 'off'
        },
        validations: {
            type: "email",
            required: true
        },
        errorMessages: [
            { id: 1011, display: 'hidden', error: 'typeMismatch', message: "You must enter a valid response" },
            { id: 1012, display: 'hidden', error: 'valueMissing', message: "You must enter a value" },
        ],
    },
    {
        id: 102,
        label: "Password",
        inputType: "password",
        attributes: {
            name: "password",
            placeholder: "********",
            autoComplete: 'off'
        },
        validations: {
            type: "password",
            required: true,
            maxLength: 16,
            minLength: 8
        },
        errorMessages: [
            { id: 1021, display: 'hidden', error: 'typeMismatch', message: "You must enter a valid response" },
            { id: 1022, display: 'hidden', error: 'valueMissing', message: "You must enter a value" },
            { id: 1023, display: 'hidden', error: 'tooShort', message: `Your must enter a value containing at least 8 character(s)` },
            { id: 1024, display: 'hidden', error: 'tooLong', message: `Your must enter a value containing at most 16 character(s)` },
        ],
    },
];

export default LoginForm;