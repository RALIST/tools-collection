import React from "react";

import { ToolsDescriptionFAQ } from "../../../../../../../types/tools";

import styles from "./ToolDescriptionFAQ.module.css";

interface IToolDescriptionFAQ {
    FAQ: ToolsDescriptionFAQ
};

const ToolDescriptionFAQ: React.FC<IToolDescriptionFAQ> = ({ FAQ }) => {
    return (
        <div className={styles.root}>
            <h3 className={styles.title}>Frequently Asked Questions</h3>

            {FAQ.map((item) => (
                <details className={styles.fqa} key={item.question}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                </details>
            ))}
        </div>
    ) 
};

export default ToolDescriptionFAQ;