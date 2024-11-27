// Tool Categories
export type ToolCategory = 'text' | 'developer' | 'converter' | 'generator' | 'math';

// Tool Status
export type ToolStatus = 'active' | 'coming-soon';

// Base Tool Interface
export interface Tool {
    id: string;
    name: string;
    description: string;
    detailedDescription: string;
    icon: string;
    category: ToolCategory;
    status: ToolStatus;
    path: string;
}

// Category Interface
export interface Category {
    id: ToolCategory;
    name: string;
    icon: string;
    description: string;
}

// Tool Collections
export interface ToolCollections {
    text: Tool[];
    developer: Tool[];
    converter: Tool[];
    generator: Tool[];
    math: Tool[];
}

// Tool-specific Types
export interface TextCaseOptions {
    uppercase: boolean;
    lowercase: boolean;
    titleCase: boolean;
    sentenceCase: boolean;
}

export interface HashOptions {
    md5: boolean;
    sha1: boolean;
    sha256: boolean;
    sha512: boolean;
}

export interface GeneratorOptions {
    length?: number;
    includeNumbers?: boolean;
    includeSymbols?: boolean;
    includeUppercase?: boolean;
    includeLowercase?: boolean;
}

// Theme Types
export interface Theme {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    border: string;
}


// dataToolsDescription Types

export type ToolName = 
    // Text Tools
    'caseConverter' |
    'wordCounte' |
    'stringEncoder' |

    // Developer Tools
    'jsonFormatter' |
    'codeMinifier' |
    'regexTester' |
    'codeBeautifier' |
    'hashGenerator' |

    // Converter Tools
    'unitConverter' |
    'colorConverter' |
    'timeConverter' |

    // Generator Tools
    'passwordGenerator' |
    'loremIpsumGenerator' |

    // Math Tools
    'percentageCalculator' |
    'scientificCalculator'
;

interface AboutInfoItem {
    title: string;
    description: string;
};

interface FAQItem {
    question: string;
    answer: string;
};

export interface ToolsDescriptionAbout {
    title: string;
    description: string;
    info: AboutInfoItem[];
};

export interface ToolsDescriptionUseCases {
    title: string;
    cases: string[];
};

export type ToolsDescriptionFAQ = FAQItem[];

export interface ToolsDescriptionTool {
    title: string;
    description: string;
    keywords: string;
    favicon: string;
    about: ToolsDescriptionAbout | null;
    useCases: ToolsDescriptionUseCases | null;
    FAQ: ToolsDescriptionFAQ | null;
};