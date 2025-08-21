import { useState } from "react";
import { validationsClient } from "../utils/validations";

export function useClientForm (initialValues){ 
    const [values, setValues] = useState(initialValues);
    const [error, setError] = useState({})

    const handleChange = (e) => { 
        const { id, value } = e.target;
        setValues({ ...values, [id]: value });
    }

    const validate = () => { 
        const errs = validationsClient(values);
        setError(errs);
        return Object.keys(errs).length === 0;
    }
    const resetForm = () => {
      setValues(initialValues);
      setError({});
    };

    return { values, error, handleChange, validate, resetForm };
}