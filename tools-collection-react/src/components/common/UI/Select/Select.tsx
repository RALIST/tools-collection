import React from "react";

import styles from "./Select.module.css";

interface Option {
    value: string | number,
    name: string
}

interface ISelect {
    id?: string,
    value: string | number,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    optionsList: Option[],
    ariaLabel?: string
}

const Select: React.FC<ISelect> = ({ id, value, onChange, optionsList, ariaLabel }) => {
    return (
        <select
            className={styles.select}
            id={id}
            value={value}
            onChange={onChange}
            aria-label={ariaLabel}
        >
            { optionsList.map((option) => (
                <option key={option.value} value={option.value}>{option.name}</option>
            ))}
        </select>
    ) 
};

export default Select;