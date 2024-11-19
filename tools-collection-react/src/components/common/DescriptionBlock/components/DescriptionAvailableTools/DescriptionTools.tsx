import React from "react";

import { ToolCategory } from "../../../../../types/tools";
import { dataToolsByCategory } from "../../../../../assets/data/dataToolsByCategory";

import styles from "./DescriptionTools.module.css";

interface IDescriptionTools {
    category: ToolCategory
};

const toolsByCategory = dataToolsByCategory;

const DescriptionTools: React.FC<IDescriptionTools> = ({ category }) => {
    const comingSoonList = toolsByCategory[category].filter((tool) => tool.status === 'coming-soon');

    return (
        <>
        <div className={styles.tools}>
            <h2>Available Tools:</h2>
            
            <div className={styles.toolDetails}>
                {toolsByCategory[category].map((tool) => (
                    tool.status === 'active' && (
                        <div key={tool.id}>
                            <h4>{tool.name}</h4>
                            <p>{tool.detailedDescription}</p>
                        </div>
                    )
                ))}
            </div>
        </div>

        { comingSoonList.length > 0 && (      
            <div className={styles.comingSoon}>
                <h3>Coming Soon:</h3>
                <ul>
                    {comingSoonList.map((tool) => <li key={tool.id}><strong>{tool.name}: </strong>{tool.description}</li>)}
                </ul>
            </div>
        )}
        </>
    ) 
};

export default DescriptionTools;