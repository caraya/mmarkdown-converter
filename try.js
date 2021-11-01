const str = 'what-makes-the-web-move-forward.md-fragment.html-full';
// const str = 'readme.md-fragment.html-full.html';

// this will return string before the word programming
const result = str.split('.md')[0];
console.log(`${result}.html`);
