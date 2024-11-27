import React from "react";

import { ToolsDescriptionUseCases } from "../../../../../../../types/tools";

import styles from "./ToolDescriptionUseCases.module.css";

interface IToolDescriptionUseCases {
    useCases: ToolsDescriptionUseCases;
};

const ToolDescriptionUseCases: React.FC<IToolDescriptionUseCases> = ({ useCases }) => {
    return (
        <div className={styles.root}>
            <h3 className={styles.title}>{useCases.title}</h3>

            <ul className={styles.cases}>
                { useCases.cases.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    ) 
};

export default ToolDescriptionUseCases;