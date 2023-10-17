const RegisterForm = [
    {
        id: 201,
        label: "First Name",
        inputType: "text",
        attributes: {
            name: "first_name",
            placeholder: "First Name",
            autoComplete: 'off'
        },
        validations: {
            type: "text",
            required: true,
            minLength: 5,
            maxLength: 30
        },
        errorMessages: [
            { id: 2011, display: 'hidden', error: 'typeMismatch', message: "You must enter a valid response" },
            { id: 2012, display: 'hidden', error: 'valueMissing', message: "You must enter a value" },
            { id: 2013, display: 'hidden', error: 'tooShort', message: `You must enter a value containing at least 5 character(s)` },
            { id: 2014, display: 'hidden', error: 'tooLong', message: `You must enter a value containing at most 30 character(s)` },
        ]
    },
    {
        id: 202,
        label: "Last Name",
        inputType: "text",
        attributes: {
            name: "last_name",
            placeholder: "Last Name",
            autoComplete: 'off'
        },
        validations: {
            type: "text",
            required: true,
            minLength: 4,
            maxLength: 30
        },
        errorMessages: [
            { id: 2021, display: 'hidden', error: 'typeMismatch', message: "You must enter a valid response" },
            { id: 2022, display: 'hidden', error: 'valueMissing', message: "You must enter a value" },
            { id: 2023, display: 'hidden', error: 'tooShort', message: `Your must enter a value containing at least 4 character(s)` },
            { id: 2024, display: 'hidden', error: 'tooLong', message: `Your must enter a value containing at most 30 character(s)` },
        ],
    },
    {
        id: 203,
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
            { id: 2031, display: 'hidden', error: 'typeMismatch', message: "You must enter a valid response" },
            { id: 2032, display: 'hidden', error: 'valueMissing', message: "You must enter a value" },
        ],
    },
    {
        id: 204,
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
            { id: 2041, display: 'hidden', error: 'typeMismatch', message: "You must enter a valid response" },
            { id: 2042, display: 'hidden', error: 'valueMissing', message: "You must enter a value" },
            { id: 2043, display: 'hidden', error: 'tooShort', message: `Your must enter a value containing at least 8 character(s)` },
            { id: 2044, display: 'hidden', error: 'tooLong', message: `Your must enter a value containing at most 16 character(s)` },
        ],
    }
];

export default RegisterForm;