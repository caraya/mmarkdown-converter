# Hello cruel world

[[toc]]

Term 1

:   Definition 1

Term 2 with *inline markup*

:   Definition 2

Third paragraph of definition 2.

This is an experiement to see if things work out the way they are supposed to and how well we can replace gulp with you[^1][^2].

## Tables

Markdown-it claims it supports tables out of the box. Let's see

!!! warning This might not work
**This doesn't work with the commonmark preset**
!!!

!!! question what table formatting works for markdown-it
I have no clue but it should be interesting to research further
!!!

| Heading 1 | Heading 2
| --------- | ---------
| Cell 1    | Cell 2
| Cell 3    | Cell 4

## Prism

This won't work because we don't have the stylesheets and code attached to it but we can test that it doesn't error out

```js
console.log('hey');

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
```

## Figures instead of plain images

![Example of a tagged Github release](https://res.cloudinary.com/dfh6ihzvj/images/v1619121250/publishing-project.rivendellweb.net/tag-release-github1/tag-release-github1.png)

## Abbreviations

*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.

## Styles and Lists

Make sure the CSS works, as with anything else needing a stylesheet, it won't work, we're just generating a fragment

* item
  * nested item {.a}
{.b}

{.c}

## Tasks lists

* [ ] unchecked item 1
* [ ] unchecked item 2
* [ ] unchecked item 3
* [x] checked item 4

## Another code block to test something


```js
console.log('hey');

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
```

[^1]: Here is the footnote.

[^2]: Here's another one
