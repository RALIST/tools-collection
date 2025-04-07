// scripts/generate-sitemap.js
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

// Define your routes here
const routes = [
    { url: '/', changefreq: 'weekly', priority: 1.0 },
    { url: '/text-tools', changefreq: 'weekly', priority: 0.9 },
    { url: '/developer-tools', changefreq: 'weekly', priority: 0.9 },
    { url: '/converters', changefreq: 'weekly', priority: 0.9 },
    { url: '/generators', changefreq: 'weekly', priority: 0.9 },
    { url: '/math-tools', changefreq: 'weekly', priority: 0.9 }, // Added missing category

    // Text Tools
    { url: '/text-tools/case-converter', changefreq: 'monthly', priority: 0.8 },
    { url: '/text-tools/word-counter', changefreq: 'monthly', priority: 0.8 },
    { url: '/text-tools/string-encoder', changefreq: 'monthly', priority: 0.8 },

    // Developer Tools
    { url: '/developer-tools/json-formatter', changefreq: 'monthly', priority: 0.8 },
    { url: '/developer-tools/code-beautifier', changefreq: 'monthly', priority: 0.8 },
    { url: '/developer-tools/code-minifier', changefreq: 'monthly', priority: 0.8 },
    { url: '/developer-tools/regex-tester', changefreq: 'monthly', priority: 0.8 },
    { url: '/developer-tools/hash-generator', changefreq: 'monthly', priority: 0.8 },
    { url: '/developer-tools/keccak-sha3-generator', changefreq: 'monthly', priority: 0.8 },
    { url: '/developer-tools/hmac-generator', changefreq: 'monthly', priority: 0.8 },

    // Converters
    { url: '/converters/color-converter', changefreq: 'monthly', priority: 0.8 },
    { url: '/converters/unit-converter', changefreq: 'monthly', priority: 0.8 },
    { url: '/converters/time-converter', changefreq: 'monthly', priority: 0.8 },

    // Generators
    { url: '/generators/lorem-generator', changefreq: 'monthly', priority: 0.8 },
    { url: '/generators/password-generator', changefreq: 'monthly', priority: 0.8 },

    // Math Tools (Added missing tools)
    { url: '/math-tools/percentage-calculator', changefreq: 'monthly', priority: 0.8 },
    { url: '/math-tools/scientific-calculator', changefreq: 'monthly', priority: 0.8 },
];

// Base URL of your site
const hostname = 'https://usefulonlinetools.com'; // Replace with your actual domain if different

// Path to output sitemap.xml
const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');

async function generateSitemap() {
    const stream = new SitemapStream({ hostname });
    const writeStream = createWriteStream(sitemapPath);

    stream.pipe(writeStream);

    routes.forEach(route => {
        stream.write(route);
    });

    stream.end();

    await streamToPromise(stream);
    console.log(`Sitemap generated successfully at ${sitemapPath}`);
}

generateSitemap().catch(error => {
    console.error('Error generating sitemap:', error);
    process.exit(1);
});