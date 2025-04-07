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

const currentPage = "generator";
const PageDescription = dataPagesDescription[currentPage];
const category = "generator";
const toolsByCategory = dataToolsByCategory;
const pageIcon = dataCategoryInfo[category].icon;

const Generators: React.FC = () => {
  useEffect(() => {
    changeFavicon(pageIcon);
  }, []);

  return (
    <>
      {" "}
      {/* Use Fragment, remove the div below */}
      <MetaTags
        title="Online Generator Tools - Password, Lorem Ipsum, and More"
        description="Free online generator tools including secure password generator, lorem ipsum text generator, color palette generator, and sample data generators. Create random passwords, placeholder text, and test data easily."
        keywords="password generator, lorem ipsum generator, color palette generator, random generator, test data generator, secure password creator, dummy text generator, sample data generator, random number generator, mock data generator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Online Generator Tools",
          description:
            "Collection of free online generator tools for creating passwords, lorem ipsum text, color palettes, and sample data for testing and development.",
          url: window.location.href,
          applicationCategory: "UtilitiesApplication",
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

export default Generators;
