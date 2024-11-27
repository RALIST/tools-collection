import React from "react";

import styles from "./Checkbox.module.css";

interface ICheckbox {
    checked: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    label: string
}

const Checkbox: React.FC<ICheckbox> = ({ checked, onChange, label}) => {
    return (
        <label className={styles.label}>
            <input
                className={styles.checkbox}
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            {label}
        </label>
    ) 
};

export default Checkbox;