import React from "react";

import styles from "./ToolHeader.module.css";

interface IToolHeader {
    title: string,
    description: string
}

const ToolHeader: React.FC<IToolHeader> = ({ title, description }) => {
    return (
        <div className={styles.toolHeader}>
            <h2 className={styles.title}>{title}</h2>
            <p>{description}</p>
        </div>
    ) 
};

export default ToolHeader;

