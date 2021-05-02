// Builtin modules
const fs = require('fs');

// Markdown-it plugins
const abbr = require('markdown-it-abbr');
const anc = require('markdown-it-anchor');
const attrs = require('markdown-it-attrs');
const embed = require('markdown-it-block-embed');
const fn = require('markdown-it-footnote');
const figs = require('markdown-it-implicit-figures');
const kbd = require('markdown-it-kbd');
const prism = require('markdown-it-prism');
const toc = require('markdown-it-table-of-contents');
const list = require('markdown-it-task-lists');
const dl = require('markdown-it-deflist');
const admonition = require("markdown-it-admonition");

// Markdown
const md = require('markdown-it')()
  .use(abbr) // Doesn't require special configuration
  .use(anc, {
    permalink: true,
  })
  .use(attrs) // Doesn't require special configuration
  .use(embed, {
    containerClassName: 'video',
  })
  .use(fn) // Doesn't require special configuration
  .use(figs, {
    dataType: false,
    figcaption: true,
    tabindex: false,
    link: false,
  })
  .use(kbd) // Doesn't require special configuration
  .use(prism)
  // Include h1, h2 and h3 elements in the TOC
  .use(toc, {
    includeLevel: [1, 2, 3],
  })
  .use(list)
  .use(dl)
  .use(admonition);

// READING A DIRECTORY AND SAVING EACH CONVERTED HTML FILE

const dirToRead = process.argv[2];

// read the directory
fs.readdir(dirToRead, 'utf-8', (err, files) => {
  // if there's an error, log it to console and bail
  if (err) {
    console.error(err);
    process.exit(-1);
  }

  // For each file in the directory
  files.forEach((file) => {
    const fullPath = dirToRead + file;
    // Read it
    fs.readFile(fullPath, 'utf8', (err, content) => {
      // if there's an error, log it to console and bail
      if (err) {
        console.error(err);
        process.exit(-1);
      }
      // Otherwise run the file through the markdown renderer
      const processedFile = md.render(content);
      // and write the product to a new file
      fs.writeFile(`src/fragments/${file}-fragment.html`,
          processedFile, (err) => {
            // if there's an error, log it to console and bail
            if (err) {
              console.error(err);
              process.exit(-1);
            }
            // If we get to here we saved the file successfully
            // Tell the user
            // console.info(`${file} fragment saved successfully`);
          });
    });
  });
});

// string literal for the head of the regular HTML document
const documentTop = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="css/prism.css">
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
`;

// string literal for the footer of the regular HTML document
const documentBottom = `

<script src="js/prism.js"></script>
<script src="js/fontfaceobserver.js"></script>
  <script>
    const font = new FontFaceObserver('Recursive');

    font.load().then(function () {
      console.log('Font is available');
    }, function () {
      console.log('Font is not available');
    });
  </script>
  </body>
</html>`;


// READING A DIRECTORY AND SAVING EACH CONVERTED HTML FILE

const fragmentSourceDir = 'src/fragments/';

// read the directory
fs.readdir(fragmentSourceDir, 'utf-8', (err, files) => {
  // if there's an error, log it to console and bail
  if (err) {
    console.error(err);
    process.exit(-1);
  }

  // For each file in the directory
  files.forEach((file) => {
    const fullPath = fragmentSourceDir + file;
    const destination = `${file}-full.html`;
    // Read it
    fs.readFile(fullPath, 'utf8', (err, content) => {
      // if there's an error, log it to console and bail
      if (err) {
        console.error(err);
        process.exit(-1);
      }

      fs.writeFileSync(`dist/${destination}`, documentTop, 'utf-8');
      fs.appendFileSync(`dist/${destination}`, content, 'utf-8');
      fs.appendFileSync(`dist/${destination}`, documentBottom, 'utf-8');

      console.log(`${destination} file created`)
    })
  })
})
