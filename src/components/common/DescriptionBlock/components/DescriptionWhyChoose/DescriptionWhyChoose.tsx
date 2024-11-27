import React from "react";

import styles from "./DescriptionWhyChoose.module.css";

interface WhyChooseItem {
    title: string,
    description: string
};

interface IDescriptionWhyChoose {
    whyChooseTitle: string,
    whyChooseList: WhyChooseItem[]
};

const DescriptionWhyChoose: React.FC<IDescriptionWhyChoose> = ({ whyChooseTitle, whyChooseList }) => {
    return (
        <div className={styles.whyChoose}>
            <h2>{whyChooseTitle}</h2>
            <ul>
                {whyChooseList.map((item) => (
                    <li key={item.title}>
                        <strong>{item.title}</strong> {item.description}
                    </li>
                ))}
            </ul>
        </div>
    ) 
};

export default DescriptionWhyChoose;