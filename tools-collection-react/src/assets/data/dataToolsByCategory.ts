import { Tool, ToolCategory } from "../../types/tools";

export const dataToolsByCategory: Record<ToolCategory, Tool[]> = {
    text: [
        {
            id: 'case-converter',
            name: 'Text Case Converter',
            description: 'Convert text between different cases',
            detailedDescription: 'Transform your text between different case styles including UPPERCASE, lowercase, Title Case, and Sentence case. Perfect for formatting titles, headings, and maintaining consistent text styling across your content.',
            icon: 'Aa',
            category: 'text',
            status: 'active',
            path: '/text-tools/case-converter'
        },
        {
            id: 'word-counter',
            name: 'Word Counter',
            description: 'Count words and characters',
            detailedDescription: 'Analyze your text with detailed statistics including word count, character count (with and without spaces), sentence count, and estimated reading time. Essential for content writers, students, and professionals working with word limits.',
            icon: '123',
            category: 'text',
            status: 'active',
            path: '/text-tools/word-counter'
        },
        {
            id: 'string-encoder',
            name: 'String Encoder',
            description: 'Encode and decode text',
            detailedDescription: 'Convert text between various encoding formats including Base64, URL encoding, and HTML entities. A must-have tool for developers working with different text encoding requirements.',
            icon: '{}',
            category: 'text',
            status: 'active',
            path: '/text-tools/string-encoder'
        }
    ],
    developer: [
        {
            id: 'json-formatter',
            name: 'JSON Formatter',
            description: 'Format and validate JSON',
            detailedDescription: 'A powerful tool for working with JSON data. Format, validate, and beautify JSON with customizable indentation. Features include syntax validation, key sorting, and minification capabilities. Essential for API development and debugging.',
            icon: '{}',
            category: 'developer',
            status: 'active',
            path: '/developer-tools/json-formatter'
        },
        {
            id: 'code-minifier',
            name: 'Code Minifier',
            description: 'Minify HTML, CSS, and JavaScript',
            detailedDescription: 'Optimize your code for production by removing unnecessary characters, whitespace, and comments. Supports HTML, CSS, and JavaScript minification. Reduce file sizes and improve load times while maintaining functionality.',
            icon: '📦',
            category: 'developer',
            status: 'active',
            path: '/developer-tools/code-minifier'
        },
        {
            id: 'regex-tester',
            name: 'Regex Tester',
            description: 'Test regular expressions',
            detailedDescription: 'Test and debug regular expressions with real-time matching and highlighting. Includes pattern explanation, match groups visualization, and common regex patterns library. Perfect for developing and testing string pattern matching.',
            icon: '.*',
            category: 'developer',
            status: 'active',
            path: '/developer-tools/regex-tester'
        },
        {
            id: 'code-beautifier',
            name: 'Code Beautifier',
            description: 'Format and beautify code',
            detailedDescription: 'Format and beautify your code with customizable styling options. Supports multiple languages and formatting standards. Maintain consistent code style across your projects with automatic indentation and syntax highlighting.',
            icon: '🎨',
            category: 'developer',
            status: 'active',
            path: '/developer-tools/code-beautifier'
        },
        {
            id: 'hash-generator',
            name: 'Hash Generator',
            description: 'Generate MD5, SHA-1, SHA-256 hashes',
            detailedDescription: 'Generate secure hash values using various algorithms including MD5, SHA-1, SHA-256, and more. Useful for data integrity verification, password hashing, and cryptographic applications.',
            icon: '#',
            category: 'developer',
            status: 'active',
            path: '/developer-tools/hash-generator'
        }
    ],
    converter: [
        {
            id: 'unit-converter',
            name: 'Unit Converter',
            description: 'Convert between different units',
            detailedDescription: 'Convert between various units of measurement including length (meters, feet, inches), weight (kilograms, pounds, ounces), and temperature (Celsius, Fahrenheit, Kelvin). Perfect for international projects and scientific calculations.',
            icon: '📏',
            category: 'converter',
            status: 'active',
            path: '/converters/unit-converter'
        },
        {
            id: 'color-picker',
            name: 'Color Picker',
            description: 'Pick and convert colors',
            detailedDescription: 'Transform colors between different formats including HEX (#RRGGBB), RGB (Red, Green, Blue), and HSL (Hue, Saturation, Lightness). Essential for web developers and designers working with different color systems.',
            icon: '🎨',
            category: 'converter',
            status: 'active',
            path: '/converters/color-converter'
        },
        {
            id: 'file-converter',
            name: 'File Converter',
            description: 'Convert between file formats',
            detailedDescription: '',
            icon: '📄',
            category: 'converter',
            status: 'coming-soon',
            path: '/converters/file-converter'
        }
    ],
    generator: [
        {
            id: 'password-generator',
            name: 'Password Generator',
            description: 'Generate secure passwords',
            detailedDescription: 'Create strong, secure passwords with customizable options for length, character types (uppercase, lowercase, numbers, symbols), and complexity requirements. Perfect for generating secure credentials that meet specific password policies and security standards.',
            icon: '🔐',
            category: 'generator',
            status: 'active',
            path: '/generators/password-generator'
        },
        {
            id: 'lorem-generator',
            name: 'Lorem Ipsum Generator',
            description: 'Generate placeholder text',
            detailedDescription: 'Generate professional placeholder text for mockups, designs, and layouts. Customize the amount of text (words, sentences, or paragraphs) and format to perfectly fit your design needs. Essential for designers and developers working on content-driven projects.',
            icon: '📝',
            category: 'generator',
            status: 'active',
            path: '/generators/lorem-generator'
        },
        {
            id: 'qr-generator',
            name: 'QR Code Generator',
            description: 'Create QR codes',
            detailedDescription: '',
            icon: '📱',
            category: 'generator',
            status: 'coming-soon',
            path: '/generators/qr-generator'
        }
    ],
    math: [
        {
            id: 'percentage-calculator',
            name: 'Percentage Calculator',
            description: 'Calculate percentages and ratios',
            detailedDescription: 'Calculate percentages and ratios',
            icon: '%',
            category: 'math',
            status: 'active',
            path: '/math-tools/percentage-calculator'
        },
        {
            id: 'scientific-calculator',
            name: 'Scientific Calculator',
            description: 'Advanced mathematical calculations',
            detailedDescription: 'Advanced mathematical calculations',
            icon: '🧮',
            category: 'math',
            status: 'active',
            path: '/math-tools/scientific-calculator'
        },
        {
            id: 'ratio-calculator',
            name: 'Ratio Calculator',
            description: 'Calculate and scale ratios',
            detailedDescription: 'Calculate and scale ratios',
            icon: '⚖️',
            category: 'math',
            status: 'coming-soon',
            path: '/math-tools/ratio-calculator'
        },
        {
            id: 'area-calculator',
            name: 'Area/Volume Calculator',
            description: 'Calculate geometric measurements',
            detailedDescription: 'Calculate geometric measurements',
            icon: '📐',
            category: 'math',
            status: 'coming-soon',
            path: '/math-tools/area-calculator'
        }
    ]
};