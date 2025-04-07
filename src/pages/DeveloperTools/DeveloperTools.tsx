import React, { useEffect } from "react";

import { dataToolsByCategory } from "../../assets/data/dataToolsByCategory";
import { dataPagesDescription } from "../../assets/data/dataPagesDescription";
import { dataCategoryInfo } from "../../assets/data/dataCategoryInfo";
import { changeFavicon } from "../../utils/changeFavicon";
import MetaTags from "../../components/common/MetaTags/MetaTags";
import CategoryBlock from "../../components/common/CategoryBlock/CategoryBlock";
import DescriptionBlock from "../../components/common/DescriptionBlock/DescriptionBlock";
import DescriptionHeader from "../../components/common/DescriptionBlock/components/DescriptionHeader/DescriptionHeader";
import DescriptionTools from "../../components/common/DescriptionBlock/components/DescriptionAvailableTools/DescriptionTools";
import DescriptionWhyChoose from "../../components/common/DescriptionBlock/components/DescriptionWhyChoose/DescriptionWhyChoose";

const currentPage = "developer";
const PageDescription = dataPagesDescription[currentPage];
const category = "developer";
const toolsByCategory = dataToolsByCategory;
const pageIcon = dataCategoryInfo[category].icon;

const DeveloperTools: React.FC = () => {
  useEffect(() => {
    changeFavicon(pageIcon);
  }, []);

  return (
    <>
      {" "}
      {/* Use a Fragment, remove the div below */}
      <MetaTags
        title="Free Online Developer Tools - JSON, Code Formatting, Regex & More"
        description="Essential developer tools including JSON formatter, code beautifier, minifier, regex tester, and hash generator. Streamline your development workflow with our free online utilities."
        keywords="developer tools, json formatter, code beautifier, code minifier, regex tester, hash generator, online development tools, web developer utilities, code formatter, json validator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Developer Tools Collection",
          description:
            "Comprehensive suite of online developer tools for code formatting, testing, and optimization.",
          url: window.location.href,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Any",
          permissions: "browser",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }}
      />
      <CategoryBlock category={category} toolsByCategory={toolsByCategory} />
      <DescriptionBlock>
        <DescriptionHeader
          title={PageDescription.title}
          description={PageDescription.description}
        />

        <DescriptionTools category={category} />

        <DescriptionWhyChoose
          whyChooseList={PageDescription.whyChooseList}
          whyChooseTitle={PageDescription.whyChooseTitle}
        />
      </DescriptionBlock>
    </> // Add closing Fragment
  );
};

export default DeveloperTools;
