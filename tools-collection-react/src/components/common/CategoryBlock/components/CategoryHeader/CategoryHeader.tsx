import React from 'react';

import { ToolCategory } from '../../../../../types/tools';
import { dataCategoryInfo } from '../../../../../assets/data/dataCategoryInfo';

import styles from './CategoryHeader.module.css';

interface ICategoryHeader {
    category: ToolCategory
};

const categoryInfo = dataCategoryInfo;

const CategoryHeader: React.FC<ICategoryHeader> = ({ category }) => {
    return (
        <div className={styles.categoryHeader}>
            <span className={`${styles.icon} categoryHeaderIcon` } aria-hidden="true">
                {categoryInfo[category].icon}
            </span>
            
            <h2 className={styles.title} id={`${category}-heading`}>{categoryInfo[category].name}</h2>
        </div>
    )
};

export default CategoryHeader;