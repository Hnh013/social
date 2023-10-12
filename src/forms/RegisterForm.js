const RegisterForm = [
    {
        id: 1,
        label: "First Name",
        attributes: {
            name: "firstname",
            type: "text",
            placeholder: "First Name",
            required: true
        }
    },
    {
        id: 2,
        label: "Last Name",
        name: "lastname",
        attributes: {
            type: "text",
            placeholder: "Last Name",
            name: "lastname",
            required: true
        }
    },
    {
        id: 3,
        label: "Email Address",
        attributes: {
            name: "email",
            type: "email",
            placeholder: "Email",
            required: true
        }
    },
    {
        id: 4,
        label: "Password",
        attributes: {
            name: "password",
            type: "password",
            placeholder: "********",
            required: true
        }
    }
];

export default RegisterForm;