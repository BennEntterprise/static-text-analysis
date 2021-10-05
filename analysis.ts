console.log('Hello');

import fs from 'fs'

let article;
try {
    article = fs.readFileSync('./Day1.txt', 'utf8')
} catch (err){
    console.error(err)
}

console.log(article);
    
