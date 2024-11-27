import React from "react";

import styles from "./DescriptionBlock.module.css";

interface IDescriptionBlock {
    children: React.ReactNode
};

const DescriptionBlock: React.FC<IDescriptionBlock> = ({ children }) => {
    return (
        <div className={styles.toolDescription}>
            { children }
        </div>  
    )
};

export default DescriptionBlock;