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

const currentPage = "converter";
const PageDescription = dataPagesDescription[currentPage];
const category = "converter";
const toolsByCategory = dataToolsByCategory;
const pageIcon = dataCategoryInfo[category].icon;

const Converters: React.FC = () => {
  useEffect(() => {
    changeFavicon(pageIcon);
  }, []);

  return (
    <>
      {" "}
      {/* Use Fragment, remove the div below */}
      <MetaTags
        title="Online Conversion Tools - Unit, Color, and Time Converters"
        description="Free online conversion tools for units, colors, and time. Convert between different measurement units, color formats (HEX, RGB, HSL), time zones, and more with our easy-to-use converters."
        keywords="unit converter, color converter, time converter, measurement converter, color picker, hex to rgb, rgb to hex, unit conversion calculator, metric converter, imperial converter, timezone converter, online converter tools"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Online Conversion Tools",
          description:
            "Comprehensive collection of free online conversion tools including unit converter, color picker, and time zone converter.",
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

export default Converters;
