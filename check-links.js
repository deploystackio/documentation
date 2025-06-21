// check-links.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read a markdown file and extract all markdown links
const extractLinks = (content) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const links = [];
    let match;
    
    while ((match = linkRegex.exec(content)) !== null) {
        links.push({
            text: match[1],
            url: match[2],
            full: match[0]
        });
    }
    
    return links;
};

// Check if a local file exists
const checkLocalFile = (linkPath, filePath) => {
    // Check for internal links (starting with / but not external URLs)
    if (linkPath.startsWith('/') && !linkPath.startsWith('//') && !linkPath.startsWith('http')) {
        // Remove hash fragment before checking file existence
        const [baseUrl] = linkPath.split('#');
        
        // Map the URL to the actual file location
        // Since our URLs are now root-level but files are in docs/
        const actualFilePath = path.join(process.cwd(), 'docs', baseUrl.substring(1));
        
        // Try both .mdx and .md extensions
        const possiblePaths = [
            actualFilePath + '.mdx',
            actualFilePath + '.md',
            path.join(actualFilePath, 'index.mdx'),
            path.join(actualFilePath, 'index.md')
        ];
        
        for (const possiblePath of possiblePaths) {
            try {
                fs.accessSync(possiblePath, fs.constants.F_OK);
                console.log(`  ✅ ${linkPath}`);
                return true;
            } catch (err) {
                // Continue to next possible path
            }
        }
        
        console.log(`  ❌ ${linkPath} → File not found (checked: ${possiblePaths.map(p => path.relative(process.cwd(), p)).join(', ')})`);
        return false;
    }
    return null; // not a local file
};

// Check external URL
const checkExternalUrl = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'HEAD',
            timeout: 5000
        });
        if (response.ok) {
            console.log(`  ✅ ${url}`);
            return true;
        } else {
            console.log(`  ❌ ${url} → Status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.log(`  ❌ ${url} → Error: ${error.message}`);
        return false;
    }
};

// Process a single markdown file
const processFile = async (filePath) => {
    const relativePath = path.relative(process.cwd(), filePath);
    console.log(`\nFILE: ${relativePath}`);
    
    const content = fs.readFileSync(filePath, 'utf8');
    const links = extractLinks(content);
    
    if (links.length === 0) {
        console.log('  No hyperlinks found!\n');
        return true;
    }

    console.log(`  ${links.length} links found:`);
    
    let allValid = true;
    for (const link of links) {
        if (link.url.startsWith('/') && !link.url.startsWith('//') && !link.url.startsWith('http')) {
            // Internal link (root-level)
            const isValid = checkLocalFile(link.url, filePath);
            if (!isValid) allValid = false;
        } else if (link.url.startsWith('http')) {
            const isValid = await checkExternalUrl(link.url);
            if (!isValid) allValid = false;
        } else if (link.url.startsWith('#')) {
            // Skip same-file anchors
            console.log(`  ➡️  ${link.url} (same-file anchor)`);
        } else {
            console.log(`  ⚠️  ${link.url} → Skipped (not a local or HTTP link)`);
        }
    }
    
    console.log('');
    return allValid;
};

// Process all markdown files in docs directory
const processDirectory = async (dir) => {
    let allValid = true;
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            const isValid = await processDirectory(filePath);
            if (!isValid) allValid = false;
        } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
            const isValid = await processFile(filePath);
            if (!isValid) allValid = false;
        }
    }
    
    return allValid;
};

// Start processing
console.log('📝 Checking markdown links...\n');
processDirectory('docs').then(allValid => {
    if (!allValid) {
        console.log('❌ Some links are invalid!');
        process.exit(1);
    }
    console.log('✅ All links are valid!');
});
