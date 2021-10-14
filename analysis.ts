import fs from 'fs'

// Interfaces
interface ISummary{
    paragraphCount?: number;
    sentanceCount?: number;
    wordCount?: number;
    characterCount?: number;
    averageWordSize?: string;
}

const summary:ISummary = {
    paragraphCount: 0,
    sentanceCount: 0,
    wordCount: 0,
    characterCount: 0,
    averageWordSize: ''
}

// Read in the Article
let article = '';
try {
    article = fs.readFileSync('./Day1.txt', 'utf8')
} catch (err){
    console.error(err)
}

// Basic Analysis
const paragraphs = article?.split('\n').filter(Boolean);
const sentances = article?.split('.').filter(Boolean);
const words = article?.split(/\s/).filter(Boolean);
const totalCharInWords = words.map(w => w.length).reduce( (acc, current ) => acc + current,  0 )
const avgWordSize = (totalCharInWords / words.length).toFixed(2);

// Compile the Summary
summary.paragraphCount = paragraphs.length;
summary.sentanceCount = sentances.length;
summary.wordCount = words.length;
summary.characterCount = article.length;
summary.averageWordSize = avgWordSize;

// Output the summary
// console.log(article);
console.log(summary);