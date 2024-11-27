import React from "react";

import { dataCategoryInfo } from "../../../../../assets/data/dataCategoryInfo";
import { ToolCategory } from "../../../../../types/tools";

import styles from "./DescriptionCategories.module.css";

const categoryInfo = dataCategoryInfo;

const DescriptionCategories: React.FC = () => {
    return (
        <div className={styles.descriptionCategories}>
            <h2 className={styles.title}>Our Tool Categories</h2>

            <div className={styles.details}>
                {(Object.keys(categoryInfo) as ToolCategory[]).map((category) => (
                    <div className={styles.categoryDetail} key={categoryInfo[category].name}>
                        <h3 className={styles.categoryTitle}>{categoryInfo[category].name}</h3>
                        <p className={styles.categoryDescription}>{categoryInfo[category].description}</p>
                    </div>
                ))}
            </div>
        </div>
    ) 
};

export default DescriptionCategories;