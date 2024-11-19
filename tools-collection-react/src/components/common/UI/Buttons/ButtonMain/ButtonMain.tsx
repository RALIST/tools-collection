import React from "react";

import styles from "./ButtonMain.module.css";

interface IButtonMain {
    children: string,
    onClick: () => void,
    active?: boolean,
    title?: string,
    ariaLabel?: string
};

const ButtonMain: React.FC<IButtonMain> = ({ children, onClick, active, title, ariaLabel}) => {
    return (
        <button
            className={`${styles.button} ${active && styles.active}`}
            onClick={onClick}
            title={title}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    ) 
};

export default ButtonMain;