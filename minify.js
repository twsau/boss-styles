const postcss = require("postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const fs = require("fs");

const minifyCss = async (css) => {
  const output = await postcss([cssnano, autoprefixer]).process(css);
  const minifiedCss = await output;
  return minifiedCss;
};

const writeToFile = (css) => {
  fs.writeFile("./dist/boss-styles.min.css", css, (error) => {
    if (error) return console.error(error);
    console.log("success!");
  });
};

fs.readFile("./dist/boss-styles.css", "Utf8", (error, data) => {
  if (error) return console.error(error);
  minifyCss(data).then(({ css }) => writeToFile(css));
});
