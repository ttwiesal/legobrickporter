#!/usr/bin/env node

(function run() {
  const cliArguments = require('./cli-argument-parser.js')();
  global.cliArguments = cliArguments;

  if (cliArguments) {
    const fileContent = require('./file-loader.js')(cliArguments.order);
    console.log(fileContent);

    require('./convert-to-bricklinkid.js')
      .parseOrder(JSON.parse(fileContent))
      .then((order) => {
        console.log(order);
      });
  }
})();
