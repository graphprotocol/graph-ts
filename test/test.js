// Tests that index.ts compiles without erros.

const fs = require("fs");
const asc = require("assemblyscript/cli/asc");

// Copy index.ts to a temporary subdirectory so that asc doesn't put all the
// index.ts exports in the global namespace.
fs.mkdirSync("test/temp_lib");
fs.copyFileSync("index.ts", "test/temp_lib/index.ts");

try {
  asc.main(["test/test.ts", "--lib", "test", "--validate", "--noTreeShaking"]);
} finally {
  fs.unlinkSync("test/temp_lib/index.ts");
  fs.rmdirSync("test/temp_lib");
}
