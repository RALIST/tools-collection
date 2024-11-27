import React from "react";

import styles from "./Textarea.module.css";

interface ITextarea {
    value: string,
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    placeholder: string,
    rows: number,
    readOnly?: boolean,
    spellCheck?: boolean,
    ariaLabel?: string
};

const Textarea: React.FC<ITextarea> = ({ value, onChange, placeholder, rows, readOnly, spellCheck, ariaLabel}) => {
    return (
        <textarea
            className={styles.textarea}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            readOnly={readOnly}
            spellCheck={spellCheck}
            aria-label={ariaLabel}
        />
    ) 
};

export default Textarea;


