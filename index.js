#!/usr/bin/env node

(function run() {
  const cliArguments = require('./cli-argument-parser.js')();
  global.cliArguments = cliArguments;

  if (cliArguments) {
    const fileContent = require('./file-loader.js')(cliArguments.order);

    require('./convert-to-bricklinkid.js')
      .parseOrder(JSON.parse(fileContent))
      .then((order) => {
        console.log(order);

        // write to csv file
        require('./exporter/bricklink-xml-generator.js')(order);
      });
  }
})();
