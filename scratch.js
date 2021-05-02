// Builtin modules
const proc = require('process');
const fs = require('fs');

// Markdown-it plugins
const abbr = require("markdown-it-abbr");
const anc = require("markdown-it-anchor");
const attrs = require("markdown-it-attrs");
const embed = require("markdown-it-block-embed");
const fn = require("markdown-it-footnote");
const figs = require("markdown-it-implicit-figures");
const kbd = require("markdown-it-kbd");
const prism = require("markdown-it-prism");
const toc = require("markdown-it-table-of-contents");
const list = require("markdown-it-task-lists");

// Markdown
const md = require('markdown-it')('commonmark')
  .use(abbr) // Doesn't require special configuration
  .use(anc, {
    permalink: true
  })
  .use(attrs) // Doesn't require special configuration
  .use(embed, {
    containerClassName: 'video',

  })
  .use(fn) // Doesn't require special configuration
  .use(figs, {
    // <figure data-type="image">, default: false
    dataType: false,
    // <figcaption>alternative text</figcaption>, default: false
    figcaption: true,
    // <figure tabindex="1+n">..., default: false
    tabindex: false,
    // <a href="img.png"><img src="img.png"></a>, default: false
    link: false
  })
  .use(kbd)
  .use(prism)
  .use(toc)
  .use(list)


// EXAMPLE RENDERING TO CONSOLE
console.log(md.render('# Hello World'
+ '\n\n'
+ 'Wonder how **will this** work'));

// EXAMPLE READING AND PROCESSING A SINGLE FILE
// AND LOGGING THE RESULT TO CONSOLE
fs.readFile(proc.argv[2], 'utf8' , (err, content) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(md.render(content))
})

// EXAMPLE READING AND PROCESSING A SINGLE FILE
// AND WRITING THE RESULT TO A FILE

const fileToWrite = proc.argv[2];

fs.readFile(fileToWrite, 'utf8' , (err, content) => {
  if (err) {
    console.error(err)
    return
  }
  const processedFile = md.render(content);
  fs.writeFile(`${fileToWrite}-fragment.html`, processedFile, (err) => {
    if (err) {
      console.error(err);
    }
    // If we get to here we saved the file successfully
    console.info('File saved');
  })
})

// Use Streams to compose files
// Create a readable stream from the fragment
let readableStream = fs.createReadStream('src/fragments/hello.md-fragment.html');
// Create a writeable stream from the file we want to write to
let writableStream = fs.createWriteStream('dist/hello.html');

readableStream.setEncoding('utf8');

// As soon as we get data from the readable stream
readableStream.on('data', function(chunk) {
 // Write the top of the document
 writableStream.write(documentTop);
 // Write the chunks from the source document
 writableStream.write(chunk);
 // Write the bottom of the document
 writableStream.write(documentBottom);
});

readableStream.on('error', function(err) {
  console.log('There was an error in the file', err.stack);
})

readableStream.on('end', function() {
  console.log('file saved')
})
