import React from "react";

import styles from "./DescriptionHeader.module.css";

interface IDescriptionHeader {
    title: string,
    description: string
};

const DescriptionHeader: React.FC<IDescriptionHeader> = ({ title, description }) => {
    return (
        <div>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>
        </div>
    )
};

export default DescriptionHeader;