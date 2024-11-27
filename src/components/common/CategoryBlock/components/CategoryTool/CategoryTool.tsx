import React from 'react';
import { Link } from 'react-router-dom';

import { Tool } from '../../../../../types/tools';

import styles from './CategoryTool.module.css';


interface ICategoryTool {
    tool: Tool
}

const CategoryTool: React.FC<ICategoryTool> = ({ tool }) => {
    return (
        <Link
            to={tool.path}
            className={`${styles.toolCard} ${tool.status === 'coming-soon' ? styles.comingSoon : ''}`}
            tabIndex={tool.status === 'coming-soon' ? -1 : 0}
            aria-label={`${tool.name} - ${tool.description}${tool.status === 'coming-soon' ? ' (Coming Soon)' : ''}`}
        >
            <span className={styles.toolIcon} aria-hidden="true">
                {tool.icon}
            </span>
            <div className={styles.toolInfo}>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
            </div>

            {tool.status === 'coming-soon' && (
                <span className={styles.statusBadge} aria-hidden="true">
                    Coming Soon
                </span>
            )}
        </Link>
    )
};

export default CategoryTool;