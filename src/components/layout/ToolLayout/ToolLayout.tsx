import React, { useEffect } from "react";

import { ToolName } from "../../../types/tools";
import { dataToolsDescription } from "../../../assets/data/dataToolsDescription";
import MetaTags from "../../common/MetaTags/MetaTags";
import ToolHeader from "./components/ToolHeader/ToolHeader";
import ToolDescription from "./components/ToolDescription/ToolDescription";

import styles from "./ToolLayout.module.css";
import { changeFavicon } from "../../../utils/changeFavicon";

interface ToolLayoutProps {
  toolName: ToolName;
  children: React.ReactNode;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({ toolName, children }) => {
  const toolDescription = dataToolsDescription[toolName];

  const canonicalUrl = `https://usefulonlinetools.com${window.location.pathname}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: toolDescription.title,
    description: toolDescription.description,
    keywords: toolDescription.keywords || undefined, // Add keywords, omit if empty
    url: canonicalUrl,
    applicationCategory: "WebApplication", // Could potentially be more specific, e.g., "Utilities"
    operatingSystem: "All", // Indicates web-based, OS-agnostic
    permissions: "none", // Assuming no special browser permissions required
    author: {
      // Added author
      "@type": "Organization", // Or "Person" if applicable
      name: "Useful Online Tools",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD", // Standard currency code
    },
  };

  useEffect(() => {
    changeFavicon(toolDescription.favicon);
  }, [toolDescription]);

  return (
    <div className={styles.toolLayout}>
      <div className={styles.tool}>
        <MetaTags
          title={toolDescription.title}
          description={toolDescription.description}
          keywords={toolDescription.keywords}
          canonicalUrl={canonicalUrl}
          structuredData={structuredData}
        />

        <ToolHeader
          title={toolDescription.title}
          description={toolDescription.description}
        />

        <div className={styles.toolContent}>{children}</div>
      </div>

      <ToolDescription tool={toolDescription} />
    </div>
  );
};

export default ToolLayout;
