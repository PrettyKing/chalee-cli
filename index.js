#!/usr/bin/env node

const CLI = require('./src/CLI');

// 运行 CLI
if (require.main === module) {
  const cli = new CLI();
  cli.run().catch(console.error);
}

module.exports = CLI;