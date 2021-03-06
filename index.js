/* eslint-disable require-jsdoc */
// Builtin modules
const fs = require('fs');
// const path = require('path');

const markdown = require('markdown-it');
const markdownOptions = {
  html: true,
  linkify: true,
};

const fn = require('markdown-it-footnote');

const attrs = require('markdown-it-attrs');

const container = require('markdown-it-container');

const abbr = require('markdown-it-abbr');

const embed = require('markdown-it-block-embed');
const embedOptions = {
  youtube: {
    width: 560,
    height: 315,
  },
  vimeo: {
    width: 640,
    height: 360,
  },
  vine: {
    width: 600,
    height: 600,
  },
};

const figs = require('markdown-it-implicit-figures');
figsOptions = {
  dataType: false,
  figcaption: true,
  tabindex: false,
  link: false,
};

const kbd = require('markdown-it-kbd');

const list = require('markdown-it-task-lists');

const dl = require('markdown-it-deflist');

function getHeadingLevel(tagName) {
  if (tagName[0].toLowerCase() === 'h') {
    tagName = tagName.slice(1);
  }

  return parseInt(tagName, 10);
}

function markdownItHeadingLevel(md, options) {
  const firstLevel = options.firstLevel;

  if (typeof firstLevel === 'string') {
    firstLevel = getHeadingLevel(firstLevel);
  }

  if (!firstLevel || isNaN(firstLevel)) {
    return;
  }

  const levelOffset = firstLevel - 1;
  if (levelOffset < 1 || levelOffset > 6) {
    return;
  }

  md.core.ruler.push('adjust-heading-levels', function(state) {
    const tokens = state.tokens;
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type !== 'heading_close') {
        continue;
      }

      const headingOpen = tokens[i - 2];
      const headingClose = tokens[i];

      const currentLevel = getHeadingLevel(headingOpen.tag);
      const tagName = 'h' + Math.min(currentLevel + levelOffset, 6);

      headingOpen.tag = tagName;
      headingClose.tag = tagName;
    }
  });
};


const md = markdown(markdownOptions)
    .use(markdownItHeadingLevel, {
      firstLevel: 2,
    })
    .use(abbr)
    .use(attrs)
    .use(container, 'info')
    .use(container, 'success')
    .use(container, 'warning')
    .use(container, 'error')
    .use(dl)
    .use(embed, embedOptions)
    .use(fn)
    .use(figs, figsOptions)
    .use(kbd)
    .use(list)
    ;

// READING A DIRECTORY AND SAVING EACH CONVERTED HTML FILE

// The directory we wan to read is the third argument in
// in the command line or the string './src/md/' if there
// is no argument in the command line
const dirToRead = process.argv[2] || './src/md/';

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
<article class="container">
`;

// string literal for the footer of the regular HTML document
const documentBottom = `
</article> <!-- container -->
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
    const result = file.split('.md')[0];
    const destination = `${result}.html`;
    // Read it
    fs.readFile(fullPath, 'utf8', (err, content) => {
      // if there's an error, log it to console and bail
      if (err) {
        console.error(err);
        process.exit(-1);
      } else {
        const fileOutput = documentTop + content + documentBottom;
        fs.writeFile(`src/fragments/${destination}`, fileOutput, (err) => {});

        // fs.writeFileSync(`dist/${destination}`, documentTop, 'utf-8');
        // fs.appendFileSync(`dist/${destination}`, content, 'utf-8');
        // fs.appendFileSync(`dist/${destination}`, documentBottom, 'utf-8');

        // console.log(`${destination} file created`);
      }
    });
  });
});

