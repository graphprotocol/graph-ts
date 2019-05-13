const fs = require("fs");
const asc = require("assemblyscript/cli/asc");

// Copy index.ts to a temporary subdirectory so that asc doesn't put all the
// index.ts exports in the global namespace.
fs.mkdirSync("test/temp_lib");
fs.copyFileSync("index.ts", "test/temp_lib/index.ts");
let output_path = "test/temp_out/test.wasm"

try {
    const env = {
      abort: function(message, fileName, lineNumber, columnNumber) {
        console.log("aborted")
      }
    }

  if (asc.main(["test/test.ts", "--lib", "test", "--validate", "-b", output_path]) != 0) {
    throw Error("failed to compile")
  }
  let test_wasm = new Uint8Array(fs.readFileSync(output_path))
 
  WebAssembly.instantiate(test_wasm, {
    env,
    index: {
      "typeConversion.bytesToHex": function() {}
    }
  }).then(module => {
    module.instance.exports.test();
  });

  fs.unlinkSync("test/temp_lib/index.ts");
  fs.rmdirSync("test/temp_lib");
  fs.unlinkSync(output_path);
} catch(e) {
  process.exitCode = 1
  fs.unlinkSync("test/temp_lib/index.ts");
  fs.rmdirSync("test/temp_lib");
  fs.unlinkSync(output_path);
  throw e
}
