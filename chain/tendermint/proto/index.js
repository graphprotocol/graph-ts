import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import * as fs from 'fs'

const classRegexp = 'export class \\S*'
const endOfNamespaceRegexp = '}\n}'
const importAsProtoRegexp = 'import { Writer, Reader'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
let input = fs.readFileSync(path.resolve(__dirname, process.env.FILE_PATH)).toString()

function wrap() {
  updateImports()

  let match = input.match(endOfNamespaceRegexp)
  if (match.length !== 1) {
    console.error('Expected exactly one match for: %s', endOfNamespaceRegexp)
    return
  }

  let classNames = []
  let classes = [...input.matchAll(classRegexp)]
  for (let i = 0; i < classes.length; i++) {
    let className = classes[i][0]
    className = className.slice(13, className.length)
    classNames.push(className)
  }

  let file = input.slice(0, input.length - match[0].length - 1)
  file = file.concat('\n', wrapDecodingFunctions(classNames), '  ', match[0])

  const data = new Uint8Array(Buffer.from(file))
  fs.writeFile(process.env.FILE_PATH, data, (err) => {
    if (err) {
      throw err
    }
    console.log('File saved')
  })
}

function updateImports() {
  let matchImport = input.match(importAsProtoRegexp)
  if (matchImport.length !== 1) {
    console.error('Expected exactly one match for: %s', importAsProtoRegexp)
    return
  }
  input =
    importAsProtoRegexp +
    ', Protobuf' +
    input.slice(importAsProtoRegexp.length, input.length)

  let lines = input.split(/\r?\n/)
  if (lines[1] !== '') {
    input =
      lines[0] +
      '\n' +
      lines[1].slice(0, lines[1].length - 5) +
      `";\n` +
      lines.slice(2, lines.length).join('\n')
  }
}

function wrapDecodingFunctions(decodingFunctions) {
  let str = ''
  for (let i = 0; i < decodingFunctions.length; i++) {
    str += wrappedDecodingFunc(decodingFunctions[i])
  }
  return str.slice(0, str.length - 1)
}

function wrappedDecodingFunc(funcName) {
  return `    export function decode${funcName}(a: Uint8Array): ${funcName} {
      return Protobuf.decode<${funcName}>(a, ${funcName}.decode);
    }\n\n`
}

wrap()
