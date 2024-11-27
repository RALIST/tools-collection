import React from "react";

import { ToolsDescriptionTool } from "../../../../../types/tools";
import ToolDescriptionAbout from "./components/ToolDescriptionAbout/ToolDescriptionAbout";
import ToolDescriptionUseCases from "./components/ToolDescriptionUseCases/ToolDescriptionUseCases";
import ToolDescriptionFAQ from "./components/ToolDescriptionFAQ/ToolDescriptionFAQ";

import styles from "./ToolDescription.module.css";

interface IToolDescription {
    tool: ToolsDescriptionTool
};

const ToolDescription: React.FC<IToolDescription> = ({ tool }) => {
    if ( !tool.about && !tool.useCases && !tool.FAQ ) return null

    return (
        <div className={styles.root}>
            { tool.about && (
                <ToolDescriptionAbout about={tool.about}/>
            )}

            { tool.useCases && (
                <ToolDescriptionUseCases useCases={tool.useCases} />
            )}

            { tool.FAQ && (
                <ToolDescriptionFAQ FAQ={tool.FAQ}/>
            )}
        </div>
    ) 
};

export default ToolDescription;