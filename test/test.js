const fs = require('fs')
const asc = require('assemblyscript/cli/asc')

// Copy index.ts to a temporary subdirectory so that asc doesn't put all the
// index.ts exports in the global namespace.
if (!fs.existsSync('test/temp_lib')) {
  fs.mkdirSync('test/temp_lib')
}

if (!fs.existsSync('test/temp_out')) {
  fs.mkdirSync('test/temp_out')
}

if (!fs.existsSync('test/temp_lib/chain')) {
  fs.mkdirSync('test/temp_lib/chain')
}

if (!fs.existsSync('test/temp_lib/common')) {
  fs.mkdirSync('test/temp_lib/common')
}

fs.copyFileSync('common/datasource.ts', 'test/temp_lib/common/datasource.ts')
fs.copyFileSync('common/eager_offset.ts', 'test/temp_lib/common/eager_offset.ts')
fs.copyFileSync('common/json.ts', 'test/temp_lib/common/json.ts')
fs.copyFileSync('common/numbers.ts', 'test/temp_lib/common/numbers.ts')
fs.copyFileSync('common/collections.ts', 'test/temp_lib/common/collections.ts')
fs.copyFileSync('common/conversion.ts', 'test/temp_lib/common/conversion.ts')
fs.copyFileSync('common/value.ts', 'test/temp_lib/common/value.ts')
fs.copyFileSync('chain/ethereum.ts', 'test/temp_lib/chain/ethereum.ts')
fs.copyFileSync('index.ts', 'test/temp_lib/index.ts')
let output_path = 'test/temp_out/test.wasm'

const env = {
  abort: function (message, fileName, lineNumber, columnNumber) {
    console.log('aborted')
    console.log('message', message)
    console.log('fileName', fileName)
    console.log('lineNumber', lineNumber)
    console.log('columnNumber', columnNumber)
  },
}

try {
  testFile('test/bigInt.ts')
  testFile('test/bytes.ts')
  testFile('test/entity.ts')

  // Cleanup
  fs.unlinkSync('test/temp_lib/index.ts')
  fs.unlinkSync('test/temp_lib/common/eager_offset.ts')
  fs.unlinkSync('test/temp_lib/common/numbers.ts')
  fs.unlinkSync('test/temp_lib/common/collections.ts')
  fs.unlinkSync('test/temp_lib/common/conversion.ts')
  fs.unlinkSync('test/temp_lib/common/value.ts')
  fs.unlinkSync('test/temp_lib/common/datasource.ts')
  fs.unlinkSync('test/temp_lib/common/json.ts')
  fs.rmdirSync('test/temp_lib/common')
  fs.unlinkSync('test/temp_lib/chain/ethereum.ts')
  fs.rmdirSync('test/temp_lib/chain')
  fs.rmdirSync('test/temp_lib')
  fs.unlinkSync('test/temp_out/test.wasm')
  fs.rmdirSync('test/temp_out')
} catch (e) {
  console.error(e)
  process.exitCode = 1
  fs.unlinkSync('test/temp_lib/index.ts')
  fs.unlinkSync('test/temp_lib/common/numbers.ts')
  fs.unlinkSync('test/temp_lib/common/eager_offset.ts')
  fs.unlinkSync('test/temp_lib/common/collections.ts')
  fs.unlinkSync('test/temp_lib/common/conversion.ts')
  fs.unlinkSync('test/temp_lib/common/value.ts')
  fs.unlinkSync('test/temp_lib/common/datasource.ts')
  fs.unlinkSync('test/temp_lib/common/conversion.ts')
  fs.rmdirSync('test/temp_lib/common')
  fs.unlinkSync('test/temp_lib/chain/ethereum.ts')
  fs.rmdirSync('test/temp_lib/chain')
  fs.rmdirSync('test/temp_lib')
  fs.unlinkSync('test/temp_out/test.wasm')
  fs.rmdirSync('test/temp_out')
  throw e
}

function testFile(path) {
  if (asc.main(['--explicitStart', '--exportRuntime', '--runtime', 'stub', path, '--lib', 'test', '-b', output_path]) != 0) {
    throw Error('failed to compile')
  }
  let test_wasm = new Uint8Array(fs.readFileSync(output_path))

  WebAssembly.instantiate(test_wasm, {
    env,
    conversion: {
      'typeConversion.bytesToHex': function () {},
    },
  }).then((module) => {
    // Call AS start explicitly
    module.instance.exports._start()

    for (const [testName, testFn] of Object.entries(module.instance.exports)) {
      if (typeof testFn === 'function' && testName.startsWith('test')) {
        console.log(`Running "${testName}"...`)
        testFn()
      }
    }
  })
}
