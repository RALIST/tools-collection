import React from "react";

import styles from "./ButtonSecond.module.css";

interface IButtonSecond {
    children: string,
    onClick: () => void,
    size?: 'small',
    ariaLabel?: string
};

const ButtonSecond: React.FC<IButtonSecond> = ({ children, onClick, size, ariaLabel}) => {
    return (
        <button
            className={`${styles.button} ${size === 'small' ? styles.small : ''}`}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    ) 
};

export default ButtonSecond;