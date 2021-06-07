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

fs.copyFileSync('chain/ethereum.ts', 'test/temp_lib/chain/ethereum.ts')
fs.copyFileSync('index.ts', 'test/temp_lib/index.ts')

const OUTPUT_PATH = 'test/temp_out/test.wasm'

try {
  // TODO:testFile('test/bigint.ts')
  testFile('test/bytes.ts')
  // TODO: testFile('test/entity.ts')
} catch (e) {
  process.exitCode = 1
  throw e
} finally {
  // Cleanup
  fs.unlinkSync('test/temp_out/test.wasm')
  fs.rmdirSync('test/temp_out')
  fs.unlinkSync('test/temp_lib/index.ts')
  fs.unlinkSync('test/temp_lib/chain/ethereum.ts')
  fs.rmdirSync('test/temp_lib/chain')
  fs.rmdirSync('test/temp_lib')
}

function testFile (path) {
  if (asc.main([path, '--debug', '--lib', 'test', '-b', OUTPUT_PATH]) != 0) {
    throw Error('failed to compile')
  }

  let test_wasm = new Uint8Array(fs.readFileSync(OUTPUT_PATH))

  WebAssembly.instantiate(test_wasm, {
    index: {
      'typeConversion.bytesToHex': function() {},
    },
    env: {
      abort: function(_msg, _file, line, column) {
        console.error("abort called at index.ts:" + line + ":" + column)
      },
    },
  }).then((module) => {
    for (const [member, f] of Object.entries(module.instance.exports)) {
      if (typeof f === 'function' && member.startsWith('testB')) {
        console.info(`Running "${member}"...`)
        f.apply()
      }
    }
  })
}
