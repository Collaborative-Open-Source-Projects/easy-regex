import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load regex patterns from JSON
const regexFilePath = path.resolve(__dirname, '../utils/regexPatterns.json');

const regexData = JSON.parse(fs.readFileSync(regexFilePath, 'utf-8'));
// Convert JSON to a Map for optimized lookups
const REGEX_MAP = new Map();

// Flatten JSON structure into a single-level Map
Object.entries(regexData).forEach(([category, patterns]) => {
    Object.entries(patterns).forEach(([key, value]) => {
        REGEX_MAP.set(key, value);
    });
});

export function buildRegex(patterns) {
    if (!Array.isArray(patterns)) {
        throw new Error('Patterns must be an array');
    }

    let regexParts = [];

    patterns.forEach((pattern) => {
        if (REGEX_MAP.has(pattern.type)) {
            let value = REGEX_MAP.get(pattern.type);

            regexParts.push(value);
        } else {
            console.warn(`Unknown pattern type: ${pattern.type}`);
        }
    });

    return regexParts.join('');
}
