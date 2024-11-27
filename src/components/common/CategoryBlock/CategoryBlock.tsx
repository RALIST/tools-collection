import React from 'react';

import { Tool, ToolCategory } from '../../../types/tools';
import CategoryTool from './components/CategoryTool/CategoryTool';
import CategoryHeader from './components/CategoryHeader/CategoryHeader';

import styles from './CategoryBlock.module.css';


interface ICategoryBlock {
    category: ToolCategory,
    toolsByCategory: Record<ToolCategory, Tool[]>,
};


const CategoryBlock: React.FC<ICategoryBlock> = ({ category, toolsByCategory }) => {
    return (
        <section className={styles.categoryRow} aria-labelledby={`${category}-heading`}>
            <CategoryHeader category={category} />
            
            <div className={styles.toolsList}>
                {toolsByCategory[category].map((tool) => (
                    <CategoryTool key={tool.id} tool={tool}/>
                ))}
            </div>
        </section>
    )
};

export default CategoryBlock;