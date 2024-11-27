import React from "react";

import styles from "./Input.module.css";

interface IInput {
    id?: string,
    type: string,
    value: number | string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    min?: string,
    max?: string,
    placeholder?: string,
    readOnly?: boolean,
    ariaLabel?: string
}

const Input: React.FC<IInput> = ({ id, type, value, onChange, min, max, placeholder, readOnly, ariaLabel }) => {
    return (
        <input
            type={type}
            className={styles.input}
            id={id}
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            placeholder={placeholder}
            readOnly={readOnly}
            aria-label={ariaLabel}
        /> 
    ) 
};

export default Input;