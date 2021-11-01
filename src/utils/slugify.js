const slugify = require('@sindresorhus/slugify');

// slugify is called 1000s of times, let's memoize it
const memoizedSlugs = {};

module.exports = (string) => {
  if (string in memoizedSlugs) {
    return memoizedSlugs[string];
  } else {
    const slug = slugify(string, {
      decamelize: false,
      customReplacements: [['%', ' ']],
    });
    memoizedSlugs[string] = slug;
    return slug;
  }
};
