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

const currentPage = "math";
const PageDescription = dataPagesDescription[currentPage];
const category = "math";
const toolsByCategory = dataToolsByCategory;
const pageIcon = dataCategoryInfo[category].icon;

const MathTools: React.FC = () => {
  useEffect(() => {
    changeFavicon(pageIcon);
  }, []);

  return (
    <>
      {" "}
      {/* Use Fragment, remove the div below */}
      <MetaTags
        title="Math Tools - Free Online Math Calculators and Converters"
        description="Free online math tools including percentage calculator, scientific calculator, ratio calculator, and more. Simple, fast, and accurate calculations for everyday use."
        keywords="math tools, percentage calculator, scientific calculator, ratio calculator, math converter, online calculator, free math tools"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Math Tools Collection",
          description:
            "Collection of free online math tools and calculators for various calculations and conversions.",
          url: window.location.href,
          applicationCategory: "UtilityApplication",
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

export default MathTools;
