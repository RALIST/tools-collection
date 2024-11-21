import React from "react";

import { ToolsDescriptionAbout } from "../../../../../../../types/tools";

import styles from "./ToolDescriptionAbout.module.css";

interface IToolDescriptionAbout {
    about: ToolsDescriptionAbout
};

const ToolDescriptionAbout: React.FC<IToolDescriptionAbout> = ({ about }) => {
    return (
        <div className={styles.root}>
            <h3 className={styles.title}>{about.title}</h3>
            <p className={styles.description}>{about.description}</p>

            <ul className={styles.info}>
                { about.info.map((item) => (
                    <li key={item.title}><strong>{`${item.title}: `}</strong>{item.description}</li>
                ))}
            </ul>
        </div>
    ) 
};

export default ToolDescriptionAbout;