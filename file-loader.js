// load file from filesystem

const fs = require("fs");
const path = require("path");

const loadFile = (filePath) => {
  const fileContent = fs.readFileSync(
    path.resolve(__dirname, filePath),
    "utf8"
  );
  return fileContent;
};

module.exports = loadFile;
