import fs from 'fs'

const args: string[] = process.argv;

let inputFile;
if (args.length > 2){
    inputFile = args[2];
}

//#region : Interfaces
interface ISummary{
    paragraphCount?: number;
    sentanceCount?: number;
    wordCount?: number;
    averageWordsInSentance: string
    characterCount?: number;
    averageWordSize?: string;
    littleWords?: number;
    largerWords?: number;
}

const summary:ISummary = {
    paragraphCount: 0,
    sentanceCount: 0,
    wordCount: 0,
    averageWordsInSentance: '',
    characterCount: 0,
    averageWordSize: ''
}
//#endregion

// Read in the Article
let article = '';
try {
    if(inputFile){
        article = fs.readFileSync(inputFile, 'utf8');
        console.log('Reading File: ' + inputFile);
    } else {
        article = fs.readFileSync('./Day1.txt', 'utf8')
    }
} catch (err){
    console.error(err)
}

// Setting up dictionaries and other literary tools?
const indefiniteArticles = ['a','an', 'the'];
const pronouns = ['he', 'her', 'them', 'you'];
const posessivePronouns = ['his', 'hers', 'their', 'theirs', 'yours'];
const others = ['of', 'on', 'in', 'for', 'it', 'that', 'and', 'from', 'at'];
const stuff = ['these', 'those']
const littleWords = [...indefiniteArticles, ...pronouns, ...posessivePronouns, ...others, ...stuff];


// Basic Analysis
const paragraphs = article?.split('\n').filter(Boolean);
const sentances = article?.split(/\.|\?|\!/).filter(Boolean);
const words = article?.split(/\s/).filter(Boolean);
const averageWordsInSentance = words.length / sentances.length;
const totalCharInWords = words.map(w => w.length).reduce( (acc, current ) => acc + current,  0 );
const avgWordSize = (totalCharInWords / words.length).toFixed(2);
const countOfLittleWords = words.reduce((countOfLittleWords: number, currentWord): number => {
    if(littleWords.includes(currentWord.trim())){
        return countOfLittleWords+=1
    } else {
        return countOfLittleWords
    }
}, 0)
// Compile the Summary
summary.paragraphCount = paragraphs.length;
summary.sentanceCount = sentances.length;
summary.wordCount = words.length;
summary.characterCount = article.length;
summary.averageWordSize = avgWordSize;
summary.averageWordsInSentance = averageWordsInSentance.toFixed(2);
summary.littleWords = countOfLittleWords;
summary.largerWords = summary.wordCount - summary.littleWords;


// Output the summary
// console.log(article);
console.log(summary);