import { ToolName, ToolsDescriptionTool } from "../../types/tools";

// For Exemplar

// toolName: {
    // title: '',
    // description: '',
    // keywords: '',
    // favicon: '',  
    // about: {
    //     title: '',
    //     description: '',
    //     info: [
    //         {title: '', description: ''},
    //     ]
    // },
    // useCases: {
    //     title: '',
    //     cases: [
    //         ''
    //     ]
    // },
    // FAQ: [
    //     {
    //         question: '',
    //         answer: ''
    //     }
    // ]
// },

export const dataToolsDescription: Record<ToolName, ToolsDescriptionTool> = {

    // Text Tools

    caseConverter: {
        title: 'Text Case Converter',
        description: 'Convert text between UPPERCASE, lowercase, Title Case, and Sentence case formats.',
        keywords: '',
        favicon: 'Aa',                    
        about: {
            title: 'About Text Case Converter',
            description: 'Our Text Case Converter is a powerful tool that helps you quickly transform your text into different cases:',
            info: [
                {title: 'UPPERCASE:', description: 'Converts all letters to capital letters'},
                {title: 'lowercase:', description: 'Converts all letters to small letters'},
                {title: 'Title Case:', description: 'Capitalizes the first letter of each word'},
                {title: 'Sentence case:', description: 'Capitalizes the first letter of each sentence'}
            ]
        },
        useCases: {
            title: 'Use Cases',
            cases: [
                'Formatting titles and headings',
                'Preparing text for social media posts',
                'Standardizing text formatting in documents',
                'Creating consistent styling for website content'
            ]
        },
        FAQ: [
            {
                question: 'Why should I minify my code?',
                answer: "Minifying your code reduces file size, which leads to faster loading times and better performance for your website. It's especially important for production environments where every byte counts."
            },
            {
                question: 'Is the minified code still readable?',
                answer: 'Minified code is optimized for machines, not humans. It removes all unnecessary characters while maintaining functionality. For development, you should keep your original, readable code and use minified versions only for production.'
            },
            {
                question: 'Will minification break my code?',
                answer: "Our minifier is designed to preserve functionality while reducing file size. However, it's always recommended to test your minified code thoroughly before deploying to production."
            }
        ]
    },
    wordCounte: {
        title: 'Word Counter',
        description: 'Count words, characters, sentences, and estimate reading time.',
        keywords: '',
        favicon: '123',
        about: {
            title: 'About Word & Character Counter',
            description: 'Our Word & Character Counter is a comprehensive text analysis tool that provides detailed statistics about your text:',
            info: [
                {title: 'Word Count:', description: 'Total number of words in your text'},
                {title: 'Character Count:', description: 'Total number of characters including spaces'},
                {title: 'Characters (no spaces):', description: 'Number of characters excluding spaces'},
                {title: 'Sentence Count:', description: 'Number of sentences in your text'},
                {title: 'Paragraph Count:', description: 'Number of paragraphs in your text'},
                {title: 'Reading Time:', description: 'Estimated time to read the text (based on average reading speed)'}
            ]
        },
        useCases: {
            title: 'Use Cases',
            cases: [
                'Checking essay or article length requirements',
                'Monitoring social media post character limits',
                'Analyzing text content for SEO purposes',
                'Estimating reading time for content'
            ]
        },
        FAQ: null
    },
    stringEncoder: {
        title: 'String Encoder',
        description: 'Encode and decode text using various methods like Base64, URL encoding, and HTML entities.',
        keywords: '',
        favicon: '{}',
        about: {
            title: 'About String Encoder/Decoder',
            description: 'Our String Encoder/Decoder tool supports multiple encoding methods commonly used in web development and data handling:',
            info: [
                {title: 'Base64 Encoding:', description: 'Convert binary data to ASCII text format'},
                {title: 'URL Encoding:', description: 'Encode special characters for use in URLs'},
                {title: 'HTML Entities:', description: 'Convert special characters to HTML entities'}
            ]
        },
        useCases: {
            title: 'Use Cases',
            cases: [
                'Encoding data for web APIs and HTTP requests',
                'Creating safe URLs with special characters',
                'Converting special characters for HTML display',
                'Debugging encoded data in web applications'
            ]
        },
        FAQ: null
    },

    // Developer Tools

    jsonFormatter: {
        title: 'JSON Formatter',
        description: 'Format, minify, and validate your JSON data. Perfect for debugging and cleaning up JSON data from various sources.',
        keywords: '',
        favicon: '{}',
        about: {
            title: 'About JSON Formatter & Validator',
            description: 'Our JSON tool provides several essential functions for working with JSON data:',
            info: [
                {title: 'Format JSON:', description: 'Beautify JSON with proper indentation and spacing'},
                {title: 'Minify JSON:', description: 'Remove unnecessary whitespace to reduce file size'},
                {title: 'Validate JSON:', description: 'Check if your JSON is valid and well-formed'},
                {title: 'Copy JSON:', description: 'Quickly copy the formatted or minified JSON to clipboard'}
            ]
        },
        useCases: {
            title: 'Use Cases',
            cases: [
                'Debugging API responses',
                'Cleaning up JSON configuration files',
                'Validating JSON data before use',
                'Preparing JSON for production use'
            ]
        },
        FAQ: [
            {
                question: 'What is JSON formatting?',
                answer: 'JSON formatting is the process of adding proper indentation and line breaks to JSON data to make it more readable and easier to understand.'
            },
            {
                question: 'Why should I minify JSON?',
                answer: 'Minifying JSON removes unnecessary whitespace and formatting, reducing file size and improving load times in web applications.'
            },
            {
                question: 'Is this tool free to use?',
                answer: 'Yes, our JSON formatter and validator is completely free to use. Premium features are available for additional functionality.'
            }
        ]
    },
    codeMinifier: {
        title: 'Code Minifier',
        description: 'Minify JavaScript, CSS, and HTML code to reduce file size.',
        keywords: '',
        favicon: '📦',
        about: {
            title: 'About Code Minifier',
            description: 'Our Code Minifier tool helps optimize your web assets by:',
            info: [
                {title: '', description: 'Removing unnecessary whitespace and comments'},
                {title: '', description: 'Shortening variable names (in JavaScript)'},
                {title: '', description: 'Combining multiple files'},
                {title: '', description: 'Optimizing code structure'}
            ]
        },
        useCases: null,
        FAQ: [
            {
                question: 'Why should I minify my code?',
                answer: "Minifying your code reduces file size, which leads to faster loading times and better performance for your website. It's especially important for production environments where every byte counts."
            },
            {
                question: 'Is the minified code still readable?',
                answer: 'Minified code is optimized for machines, not humans. It removes all unnecessary characters while maintaining functionality. For development, you should keep your original, readable code and use minified versions only for production.'
            },
            {
                question: 'Will minification break my code?',
                answer: "Our minifier is designed to preserve functionality while reducing file size. However, it's always recommended to test your minified code thoroughly before deploying to production."
            }
        ]
    },
    regexTester: {
        title: 'Regex Tester',
        description: 'Test and debug regular expressions with real-time matching.',
        keywords: '',
        favicon: '.*',
        about: {
            title: 'About Regex Tester',
            description: 'Our Regex Tester provides these essential features:',
            info: [
                {title: '', description: 'Real-time pattern matching'},
                {title: '', description: 'Match highlighting with group support'},
                {title: '', description: 'Detailed pattern explanation'},
                {title: '', description: 'Common regex reference guide'}
            ]
        },
        useCases: null,
        FAQ: [
            {
                question: 'What are regular expressions?',
                answer: 'Regular expressions (regex) are patterns used to match character combinations in strings. They are powerful tools for text searching, validation, and manipulation.'
            },
            {
                question: 'What are regex flags?',
                answer: `Flags modify how the regex pattern matching behaves. Common flags include:\n
                        g (global) - Find all matches\n
                        i (case-insensitive) - Ignore case\n
                        m (multiline) - ^ and $ match start/end of lines\n
                        s (dotall) - Dot matches newlines\n
                        u (unicode) - Enable unicode support`
            },
            {
                question: 'How do I use capturing groups?',
                answer: 'Capturing groups are created by wrapping part of your pattern in parentheses (). They allow you to extract specific parts of the match and reference them later.'
            }
        ]
    },
    codeBeautifier: {
        title: 'Code Beautifier',
        description: 'Format and beautify code with proper indentation.',
        keywords: '',
        favicon: '🎨',
        about: {
            title: 'About Code Beautifier',
            description: 'Our Code Beautifier tool helps improve code readability by:',
            info: [
                {title: '', description: 'Adding proper indentation and spacing'},
                {title: '', description: 'Formatting code according to best practices'},
                {title: '', description: 'Organizing code structure'},
                {title: '', description: 'Preserving code functionality'}
            ]
        },
        useCases: null,
        FAQ: [
            {
                question: 'Why should I beautify my code?',
                answer: 'Beautifying code makes it more readable and maintainable. Well-formatted code is easier to understand, debug, and collaborate on with other developers.'
            },
            {
                question: 'Does beautifying affect code functionality?',
                answer: 'No, code beautification only changes the formatting and appearance of your code. The functionality remains exactly the same.'
            },
            {
                question: 'What are the recommended indent settings?',
                answer: 'Most style guides recommend using either 2 or 4 spaces for indentation. Using spaces instead of tabs helps maintain consistent formatting across different editors.'
            }
        ]
    },
    hashGenerator: {
        title: 'Hash Generator',
        description: 'Generate various types of hash values from text input.',
        keywords: '',
        favicon: '#',
        about: {
            title: 'About Hash Generator',
            description: 'Our Hash Generator tool supports multiple hash algorithms:',
            info: [
                {title: 'MD5:', description: 'Fast but not cryptographically secure'},
                {title: 'SHA-1:', description: 'Legacy algorithm, better than MD5'},
                {title: 'SHA-256:', description: 'Secure and widely used'},
                {title: 'SHA-512:', description: 'Most secure, longest output'}
            ]
        },
        useCases: null,
        FAQ: [
            {
                question: 'What is a hash value?',
                answer: 'A hash value is a fixed-size string of characters generated from input data using a mathematical function. It\'s unique to the input and any change in the input produces a completely different hash.'
            },
            {
                question: 'Which hash algorithm should I use?',
                answer: 'For security purposes, SHA-256 or SHA-512 are recommended. MD5 and SHA-1 are faster but considered cryptographically broken and should only be used for checksums or non-security purposes.'
            },
            {
                question: 'Is the file content uploaded to your server?',
                answer: 'No, all hash calculations are performed locally in your browser. Your files and text are never sent to our servers, ensuring complete privacy.'
            }
        ]
    },

    // Converter Tools

    unitConverter: {
        title: 'Unit Converter',
        description: 'Convert between different units of measurement.',
        keywords: '',
        favicon: '📏',
        about: {
            title: 'About Unit Converter',
            description: 'Our Unit Converter tool supports various measurement types and units:',
            info: [
                {title: '', description: 'Length: Meters, Kilometers, Centimeters, Miles, Feet, Inches'},
                {title: '', description: 'Weight: Kilograms, Grams, Pounds, Ounces'},
                {title: '', description: 'Temperature: Celsius, Fahrenheit, Kelvin'},
            ]
        },
        useCases: {
            title: 'Use Cases',
            cases: [
                'Converting measurements for international recipes',
                'Converting units for scientific calculations',
                'Converting dimensions for DIY projects',
                'Converting temperature between different scales'
            ]
        },
        FAQ: null
    },
    colorConverter: {
        title: 'Color Converter',
        description: 'Convert between different color formats (HEX, RGB, HSL, HSV, CMYK).',
        keywords: '',
        favicon: '🎨',
        about: {
            title: 'About Color Picker',
            description: 'Our Color Picker tool supports multiple color formats commonly used in design and development:',
            info: [
                {title: 'HEX:', description: 'Six-digit hexadecimal color code (e.g., #FF0000)'},
                {title: 'RGB:', description: 'Red, Green, Blue values (e.g., rgb(255, 0, 0))'},
                {title: 'HSL:', description: 'Hue, Saturation, Lightness values (e.g., hsl(0, 100%, 50%))'}
            ]
        },
        useCases: {
            title: '',
            cases: [
                'Selecting colors for web design',
                'Converting between color formats for development',
                'Creating color palettes for digital art',
                'Matching colors for brand consistency'
            ]
        },
        FAQ: null
    },
    timeConverter: {
        title: 'Time Converter',
        description: 'Convert between different time formats and timezones.',
        keywords: '',
        favicon: '',
        about: null,
        useCases: null,
        FAQ: null
    },

    // Generator Tools

    passwordGenerator: {
        title: 'Password Generator',
        description: 'Generate secure, random passwords with customizable options. Perfect for creating strong passwords for your accounts.',
        keywords: '',
        favicon: '🔐',
        about: {
            title: 'About Password Generator',
            description: 'Our Password Generator creates strong, random passwords with these customizable options:',
            info: [
                {title: 'Uppercase Letters:', description: 'Include capital letters (A-Z)'},
                {title: 'Numbers:', description: 'Include digits (0-9)'},
                {title: 'Special Characters:', description: 'Include symbols (!@#$%^&*)'},
                {title: 'Password Length:', description: 'Choose between 8-32 characters'}
            ]
        },
        useCases: {
            title: 'Password Security Tips',
            cases: [
                'Use a different password for each account',
                'Include a mix of different character types',
                'Make passwords at least 12 characters long',
                'Never share your passwords with others',
                'Consider using a password manager',
                'Enable two-factor authentication when available'
            ]
        },
        FAQ: [
            {
                question: 'What makes a strong password?',
                answer: 'A strong password should be at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special characters. It should also be unique and not used across multiple accounts.'
            },
            {
                question: 'Are the generated passwords secure?',
                answer: 'Yes, our password generator uses a cryptographically secure random number generator to create unpredictable passwords that are extremely difficult to guess or crack.'
            },
            {
                question: 'How often should I change my passwords?',
                answer: 'Security experts recommend changing passwords every 3-6 months, or immediately if there\'s any suspicion of a security breach.'
            }
        ]
    },
    loremIpsumGenerator: {
        title: 'Lorem Ipsum Generator',
        description: 'Generate placeholder text for your designs and layouts.',
        keywords: '',
        favicon: '📝',
        about: {
            title: 'About Lorem Ipsum Generator',
            description: 'Our Lorem Ipsum Generator creates placeholder text with these customizable options:',
            info: [
                {title: 'Number of Paragraphs:', description: 'Choose how many paragraphs to generate (1-10)'},
                {title: 'Paragraph Length:', description: 'Select short, medium, or long paragraphs'},
                {title: 'Classic Start:', description: 'Option to begin with the traditional "Lorem ipsum..." text'}
            ]
        },
        useCases: {
            title: '',
            cases: [
                ''
            ]
        },
        FAQ: [
            {
                question: 'What is Lorem Ipsum?',
                answer: 'Lorem Ipsum is dummy text that has been the industry\'s standard placeholder text since the 1500s. It\'s used in layouts and visual mockups to demonstrate how text will look without the distraction of meaningful content.'
            },
            {
                question: 'Why use Lorem Ipsum?',
                answer: 'Lorem Ipsum helps designers and developers focus on layout and design elements without being distracted by readable content. It maintains a more-or-less normal distribution of letters, making it look like readable English.'
            },
            {
                question: 'Is this tool free to use?',
                answer: 'Yes, our Lorem Ipsum generator is completely free to use. Premium features are available for additional functionality and an ad-free experience.'
            }
        ]
    },

    // Math Tools

    percentageCalculator: {
        title: 'Percentage Calculator',
        description: 'Free online percentage calculator. Calculate percentages, percentage changes, ratios, and more with this easy-to-use tool.',
        keywords: 'percentage calculator, percent calculator, percentage increase calculator, percentage decrease calculator, percentage change calculator, calculate ratio, math tools',
        favicon: '%',
        about: null,
        useCases: null,
        FAQ: null,
    },
    scientificCalculator: {
        title: 'Scientific Calculator',
        description: '',
        keywords: '',
        favicon: '🧮',
        about: null,
        useCases: null,
        FAQ: null,
    }
    
};
