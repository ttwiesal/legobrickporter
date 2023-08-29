#!/usr/bin/env node

const fs = require('fs');

(function run() {
  const cliArguments = require('./cli-argument-parser.js')();
  global.cliArguments = cliArguments;

  if (cliArguments) {
    const fileContent = require('./file-loader.js')(cliArguments.order);

    require('./convert-to-bricklinkid.js')
      .parseOrder(JSON.parse(fileContent))
      .then((order) => {
        console.log(order);

        const xml = require('./exporter/bricklink-xml-generator.js')(order);

        fs.writeFile(cliArguments.outputPath, xml, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
  }
})();
