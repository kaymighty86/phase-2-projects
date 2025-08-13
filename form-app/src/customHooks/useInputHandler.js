import { useState } from "react";

export function useInputHandler(defaultStateValue, validationFunction, validationError){
    const [value, setValue] = useState(defaultStateValue);
    const [error, setError] = useState(undefined);

    function handleOnChange(event){
        setValue(event.target.value);
        setError(undefined);
    }

    function handleInputBlur(){//when user exits the input element
        if(!validationFunction(value)){//valiate the input based on the validation function given if provided
            setError(validationError);
        }
    }

    return {
        value,
        setValue,
        handleOnChange,
        handleInputBlur,
        error
    }
}