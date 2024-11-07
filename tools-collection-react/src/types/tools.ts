// Tool Categories
export type ToolCategory = 'text' | 'developer' | 'converter' | 'generator' | 'math';

// Tool Status
export type ToolStatus = 'active' | 'coming-soon';

// Base Tool Interface
export interface Tool {
    id: string;
    name: string;
    description: string;
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
