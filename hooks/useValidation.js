import React, { useState, useEffect } from 'react';

const useValidation = (stateInicial, validate, fn) => {

    const [values, saveValues ] = useState(stateInicial);
    const [errors, saveErrors ] = useState({});
    const [ submitForm, saveSubmitForm ] = useState(false);

    useEffect(() => {
        if(submitForm) {
            const noErrors = Object.keys(errors).length === 0;

            if(noErrors) {
                fn(); // Fn = Function running in component
            }
            saveSubmitForm(false);
        }
    }, [errors]);

    // Function that handles change 
    const handleChange = e => {
        saveValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }

    // Function to submit
    const handleSubmit = e => {
        e.preventDefault();
        const errorsValidation = validate(values);
        saveErrors(errorsValidation);
        saveSubmitForm(true);
    }


    // Function to blur
    const handleBlur = () => {
        const errorsValidation = validate(values);
        saveErrors(errorsValidation);
    }

    return {
        values, 
        errors, 
        handleSubmit,
        handleChange,
        handleBlur
    }
}
 
export default useValidation;