// For testing isolated compilation.
import 'allocator/arena'

// Ethereum support
export * from './chain/ethereum'

/**
 * Host store interface.
 */
export declare namespace store {
  function get(entity: string, id: string): Entity | null
  function set(entity: string, id: string, data: Entity): void
  function remove(entity: string, id: string): void
}

/** Host IPFS interface */
export declare namespace ipfs {
  function cat(hash: string): Bytes | null
  function map(hash: string, callback: string, userData: Value, flags: string[]): void
}

export namespace ipfs {
  export function mapJSON(hash: string, callback: string, userData: Value): void {
    map(hash, callback, userData, ['json'])
  }
}

/** Host crypto utilities interface */
export declare namespace crypto {
  function keccak256(input: ByteArray): ByteArray
}

/** Host JSON interface */
export declare namespace json {
  function fromBytes(data: Bytes): JSONValue
  function try_fromBytes(data: Bytes): Result<JSONValue, boolean>
  function toI64(decimal: string): i64
  function toU64(decimal: string): u64
  function toF64(decimal: string): f64
  function toBigInt(decimal: string): BigInt
}

/** Host type conversion interface */
declare namespace typeConversion {
  function bytesToString(bytes: Uint8Array): string
  function bytesToHex(bytes: Uint8Array): string
  function bigIntToString(bigInt: Uint8Array): string
  function bigIntToHex(bigInt: Uint8Array): string
  function stringToH160(s: string): Bytes
  function bytesToBase58(n: Uint8Array): string
}

/** Host interface for BigInt arithmetic */
declare namespace bigInt {
  function plus(x: BigInt, y: BigInt): BigInt
  function minus(x: BigInt, y: BigInt): BigInt
  function times(x: BigInt, y: BigInt): BigInt
  function dividedBy(x: BigInt, y: BigInt): BigInt
  function dividedByDecimal(x: BigInt, y: BigDecimal): BigDecimal
  function mod(x: BigInt, y: BigInt): BigInt
  function pow(x: BigInt, exp: u8): BigInt
  function fromString(s: string): BigInt
  function bitOr(x: BigInt, y: BigInt): BigInt
  function bitAnd(x: BigInt, y: BigInt): BigInt
  function leftShift(x: BigInt, bits: u8): BigInt
  function rightShift(x: BigInt, bits: u8): BigInt
}

/** Host interface for BigDecimal */
declare namespace bigDecimal {
  function plus(x: BigDecimal, y: BigDecimal): BigDecimal
  function minus(x: BigDecimal, y: BigDecimal): BigDecimal
  function times(x: BigDecimal, y: BigDecimal): BigDecimal
  function dividedBy(x: BigDecimal, y: BigDecimal): BigDecimal
  function equals(x: BigDecimal, y: BigDecimal): boolean
  function toString(bigDecimal: BigDecimal): string
  function fromString(s: string): BigDecimal
}

/** Host interface for managing data sources */
export declare namespace dataSource {
  function create(name: string, params: Array<string>): void
  function createWithContext(
    name: string,
    params: Array<string>,
    context: DataSourceContext,
  ): void

  // Properties of the data source that fired the event.
  function address(): Address
  function network(): string
  function context(): DataSourceContext
}

/**
 * Special function for ENS name lookups, not meant for general purpose use.
 * This function will only be useful if the graph-node instance has additional
 * data loaded **
 */
export declare namespace ens {
  function nameByHash(hash: string): string | null
}

export declare namespace arweave {
  /** Returns `null` if the transaction is not found. */
  function transactionData(txId: string): Bytes | null
}
export declare namespace box {
  /** Returns `null` if the profile is not found. */
  function profile(address: string): TypedMap<string, JSONValue> | null
}

function format(fmt: string, args: string[]): string {
  let out = ''
  let argIndex = 0
  for (let i: i32 = 0, len: i32 = fmt.length; i < len; i++) {
    if (
      i < len - 1 &&
      fmt.charCodeAt(i) == 0x7b /* '{' */ &&
      fmt.charCodeAt(i + 1) == 0x7d /* '}' */
    ) {
      if (argIndex >= args.length) {
        throw Error('Too few arguments for format string: ' + fmt)
      } else {
        out += args[argIndex++]
        i++
      }
    } else {
      out += fmt[i]
    }
  }
  return out
}

// Host interface for logging
export declare namespace log {
  // Host export for logging, providing basic logging functionality
  export function log(level: Level, msg: string): void
}

export namespace log {
  export enum Level {
    CRITICAL = 0,
    ERROR = 1,
    WARNING = 2,
    INFO = 3,
    DEBUG = 4,
  }

  /**
   * Logs a critical message that terminates the subgraph.
   *
   * @param msg Format string a la "Value = {}, other = {}".
   * @param args Format string arguments.
   */
  export function critical(msg: string, args: Array<string>): void {
    log(Level.CRITICAL, format(msg, args))
  }

  /**
   * Logs an error message.
   *
   * @param msg Format string a la "Value = {}, other = {}".
   * @param args Format string arguments.
   */
  export function error(msg: string, args: Array<string>): void {
    log(Level.ERROR, format(msg, args))
  }

  /** Logs a warning message.
   *
   * @param msg Format string a la "Value = {}, other = {}".
   * @param args Format string arguments.
   */
  export function warning(msg: string, args: Array<string>): void {
    log(Level.WARNING, format(msg, args))
  }

  /** Logs an info message.
   *
   * @param msg Format string a la "Value = {}, other = {}".
   * @param args Format string arguments.
   */
  export function info(msg: string, args: Array<string>): void {
    log(Level.INFO, format(msg, args))
  }

  /** Logs a debug message.
   *
   * @param msg Format string a la "Value = {}, other = {}".
   * @param args Format string arguments.
   */
  export function debug(msg: string, args: Array<string>): void {
    log(Level.DEBUG, format(msg, args))
  }
}

/**
 * The result of an operation, with a corresponding value and error type.
 */
export class Result<V, E> {
  _value: Wrapped<V> | null
  _error: Wrapped<E> | null

  get isOk(): boolean {
    return this._value !== null
  }

  get isError(): boolean {
    return this._error !== null
  }

  get value(): V {
    assert(this._value != null, 'Trying to get a value from an error result')
    return (this._value as Wrapped<V>).inner
  }

  get error(): E {
    assert(this._error != null, 'Trying to get an error from a successful result')
    return (this._error as Wrapped<E>).inner
  }
}

/**
 * TypedMap entry.
 */
export class TypedMapEntry<K, V> {
  key: K
  value: V

  constructor(key: K, value: V) {
    this.key = key
    this.value = value
  }
}

/** Typed map */
export class TypedMap<K, V> {
  entries: Array<TypedMapEntry<K, V>>

  constructor() {
    this.entries = new Array<TypedMapEntry<K, V>>(0)
  }

  set(key: K, value: V): void {
    let entry = this.getEntry(key)
    if (entry !== null) {
      entry.value = value
    } else {
      let entry = new TypedMapEntry<K, V>(key, value)
      this.entries.push(entry)
    }
  }

  getEntry(key: K): TypedMapEntry<K, V> | null {
    for (let i: i32 = 0; i < this.entries.length; i++) {
      if (this.entries[i].key == key) {
        return this.entries[i]
      }
    }
    return null
  }

  get(key: K): V | null {
    for (let i: i32 = 0; i < this.entries.length; i++) {
      if (this.entries[i].key == key) {
        return this.entries[i].value
      }
    }
    return null
  }

  isSet(key: K): bool {
    for (let i: i32 = 0; i < this.entries.length; i++) {
      if (this.entries[i].key == key) {
        return true
      }
    }
    return false
  }
}

/**
 * Byte array
 */
export class ByteArray extends Uint8Array {
  /**
   * Returns bytes in little-endian order.
   */
  static fromI32(x: i32): ByteArray {
    let self = new ByteArray(4)
    self[0] = x as u8
    self[1] = (x >> 8) as u8
    self[2] = (x >> 16) as u8
    self[3] = (x >> 24) as u8
    return self
  }

  /**
   * Input length must be even.
   */
  static fromHexString(hex: string): ByteArray {
    assert(hex.length % 2 == 0, 'input ' + hex + ' has odd length')
    // Skip possible `0x` prefix.
    if (hex.length >= 2 && hex[0] == '0' && hex[1] == 'x') {
      hex = hex.substr(2)
    }
    let output = new Bytes(hex.length / 2)
    for (let i = 0; i < hex.length; i += 2) {
      output[i / 2] = I8.parseInt(hex.substr(i, 2), 16)
    }
    return output
  }

  static fromUTF8(string: String): ByteArray {
    // AssemblyScript counts a null terminator, we don't want that.
    let len = string.lengthUTF8 - 1
    let utf8 = string.toUTF8()
    let bytes = new ByteArray(len)
    for (let i: i32 = 0; i < len; i++) {
      bytes[i] = load<u8>(utf8 + i)
    }
    return bytes
  }

  toHex(): string {
    return typeConversion.bytesToHex(this)
  }

  toHexString(): string {
    return typeConversion.bytesToHex(this)
  }

  toString(): string {
    return typeConversion.bytesToString(this)
  }

  toBase58(): string {
    return typeConversion.bytesToBase58(this)
  }

  /**
   * Interprets the byte array as a little-endian U32.
   * Throws in case of overflow.
   */

  toU32(): u32 {
    for (let i = 4; i < this.length; i++) {
      if (this[i] != 0) {
        assert(false, 'overflow converting ' + this.toHexString() + ' to u32')
      }
    }
    let paddedBytes = new Bytes(4)
    paddedBytes[0] = 0
    paddedBytes[1] = 0
    paddedBytes[2] = 0
    paddedBytes[3] = 0
    let minLen = paddedBytes.length < this.length ? paddedBytes.length : this.length
    for (let i = 0; i < minLen; i++) {
      paddedBytes[i] = this[i]
    }
    let x: u32 = 0
    x = (x | paddedBytes[3]) << 8
    x = (x | paddedBytes[2]) << 8
    x = (x | paddedBytes[1]) << 8
    x = x | paddedBytes[0]
    return x
  }

  /**
   * Interprets the byte array as a little-endian I32.
   * Throws in case of overflow.
   */

  toI32(): i32 {
    let isNeg = this.length > 0 && this[this.length - 1] >> 7 == 1
    let padding = isNeg ? 255 : 0
    for (let i = 4; i < this.length; i++) {
      if (this[i] != padding) {
        assert(false, 'overflow converting ' + this.toHexString() + ' to i32')
      }
    }
    let paddedBytes = new Bytes(4)
    paddedBytes[0] = padding
    paddedBytes[1] = padding
    paddedBytes[2] = padding
    paddedBytes[3] = padding
    let minLen = paddedBytes.length < this.length ? paddedBytes.length : this.length
    for (let i = 0; i < minLen; i++) {
      paddedBytes[i] = this[i]
    }
    let x: i32 = 0
    x = (x | paddedBytes[3]) << 8
    x = (x | paddedBytes[2]) << 8
    x = (x | paddedBytes[1]) << 8
    x = x | paddedBytes[0]
    return x
  }

  @operator('==')
  equals(other: ByteArray): boolean {
    if (this.length != other.length) {
      return false
    }
    for (let i = 0; i < this.length; i++) {
      if (this[i] != other[i]) {
        return false
      }
    }
    return true
  }

  @operator('!=')
  notEqual(other: ByteArray): boolean {
    return !(this == other)
  }
}

/** A dynamically-sized byte array. */
export class Bytes extends ByteArray {}

/** An Ethereum address (20 bytes). */
export class Address extends Bytes {
  static fromString(s: string): Address {
    return typeConversion.stringToH160(s) as Address
  }
}

/** An arbitrary size integer represented as an array of bytes. */
export class BigInt extends Uint8Array {
  static fromI32(x: i32): BigInt {
    return (ByteArray.fromI32(x) as Uint8Array) as BigInt
  }

  /**
   * `bytes` assumed to be little-endian. If your input is big-endian, call `.reverse()` first.
   */

  static fromSignedBytes(bytes: Bytes): BigInt {
    return (bytes as Uint8Array) as BigInt
  }

  /**
   * `bytes` assumed to be little-endian. If your input is big-endian, call `.reverse()` first.
   */

  static fromUnsignedBytes(bytes: Bytes): BigInt {
    let signedBytes = new BigInt(bytes.length + 1)
    for (let i = 0; i < bytes.length; i++) {
      signedBytes[i] = bytes[i]
    }
    signedBytes[bytes.length] = 0
    return signedBytes
  }

  toHex(): string {
    return typeConversion.bigIntToHex(this)
  }

  toHexString(): string {
    return typeConversion.bigIntToHex(this)
  }

  toString(): string {
    return typeConversion.bigIntToString(this)
  }

  static fromString(s: string): BigInt {
    return bigInt.fromString(s)
  }

  toI32(): i32 {
    return ((this as Uint8Array) as ByteArray).toI32()
  }

  toBigDecimal(): BigDecimal {
    return new BigDecimal(this)
  }

  isZero(): boolean {
    return this == BigInt.fromI32(0)
  }

  isI32(): boolean {
    return BigInt.fromI32(i32.MIN_VALUE) <= this && this <= BigInt.fromI32(i32.MAX_VALUE)
  }

  abs(): BigInt {
    return this < BigInt.fromI32(0) ? -this : this
  }

  sqrt(): BigInt {
    let x = this
    let z = x.plus(BigInt.fromI32(1)).div(BigInt.fromI32(2))
    let y = x
    while (z < y) {
      y = z
      z = x.div(z).plus(z).div(BigInt.fromI32(2))
    }

    return y
  }

  // Operators

  @operator('+')
  plus(other: BigInt): BigInt {
    return bigInt.plus(this, other)
  }

  @operator('-')
  minus(other: BigInt): BigInt {
    return bigInt.minus(this, other)
  }

  @operator('*')
  times(other: BigInt): BigInt {
    return bigInt.times(this, other)
  }

  @operator('/')
  div(other: BigInt): BigInt {
    return bigInt.dividedBy(this, other)
  }

  divDecimal(other: BigDecimal): BigDecimal {
    return bigInt.dividedByDecimal(this, other)
  }

  @operator('%')
  mod(other: BigInt): BigInt {
    return bigInt.mod(this, other)
  }

  @operator('==')
  equals(other: BigInt): boolean {
    return BigInt.compare(this, other) == 0
  }

  @operator('!=')
  notEqual(other: BigInt): boolean {
    return !(this == other)
  }

  @operator('<')
  lt(other: BigInt): boolean {
    return BigInt.compare(this, other) == -1
  }

  @operator('>')
  gt(other: BigInt): boolean {
    return BigInt.compare(this, other) == 1
  }

  @operator('<=')
  le(other: BigInt): boolean {
    return !(this > other)
  }

  @operator('>=')
  ge(other: BigInt): boolean {
    return !(this < other)
  }

  @operator.prefix('-')
  neg(): BigInt {
    return BigInt.fromI32(0) - this
  }

  @operator('|')
  bitOr(other: BigInt): BigInt {
    return bigInt.bitOr(this, other)
  }

  @operator('&')
  bitAnd(other: BigInt): BigInt {
    return bigInt.bitAnd(this, other)
  }

  @operator('<<')
  leftShift(bits: u8): BigInt {
    return bigInt.leftShift(this, bits)
  }

  @operator('>>')
  rightShift(bits: u8): BigInt {
    return bigInt.rightShift(this, bits)
  }

  /// Limited to a low exponent to discourage creating a huge BigInt.
  pow(exp: u8): BigInt {
    return bigInt.pow(this, exp)
  }

  /**
   * Returns −1 if a < b, 1 if a > b, and 0 if A == B
   */
  static compare(a: BigInt, b: BigInt): i32 {
    // Check if a and b have the same sign.
    let aIsNeg = a.length > 0 && a[a.length - 1] >> 7 == 1
    let bIsNeg = b.length > 0 && b[b.length - 1] >> 7 == 1

    if (!aIsNeg && bIsNeg) {
      return 1
    } else if (aIsNeg && !bIsNeg) {
      return -1
    }

    // Check how many bytes of a and b are relevant to the magnitude.
    let aRelevantBytes = a.length
    while (
      aRelevantBytes > 0 &&
      ((!aIsNeg && a[aRelevantBytes - 1] == 0) ||
        (aIsNeg && a[aRelevantBytes - 1] == 255))
    ) {
      aRelevantBytes -= 1
    }
    let bRelevantBytes = b.length
    while (
      bRelevantBytes > 0 &&
      ((!bIsNeg && b[bRelevantBytes - 1] == 0) ||
        (bIsNeg && b[bRelevantBytes - 1] == 255))
    ) {
      bRelevantBytes -= 1
    }

    // If a and b are positive then the one with more relevant bytes is larger.
    // Otherwise the one with less relevant bytes is larger.
    if (aRelevantBytes > bRelevantBytes) {
      return aIsNeg ? -1 : 1
    } else if (bRelevantBytes > aRelevantBytes) {
      return aIsNeg ? 1 : -1
    }

    // We now know that a and b have the same sign and number of relevant bytes.
    // If a and b are both negative then the one of lesser magnitude is the
    // largest, however since in two's complement the magnitude is flipped, we
    // may use the same logic as if a and b are positive.
    let relevantBytes = aRelevantBytes
    for (let i = 1; i <= relevantBytes; i++) {
      if (a[relevantBytes - i] < b[relevantBytes - i]) {
        return -1
      } else if (a[relevantBytes - i] > b[relevantBytes - i]) {
        return 1
      }
    }

    return 0
  }
}

export class BigDecimal {
  digits: BigInt
  exp: BigInt

  constructor(bigInt: BigInt) {
    this.digits = bigInt
    this.exp = BigInt.fromI32(0)
  }

  static fromString(s: string): BigDecimal {
    return bigDecimal.fromString(s)
  }

  toString(): string {
    return bigDecimal.toString(this)
  }

  truncate(decimals: i32): BigDecimal {
    let digitsRightOfZero = this.digits.toString().length + this.exp.toI32()
    let newDigitLength = decimals + digitsRightOfZero
    let truncateLength = this.digits.toString().length - newDigitLength
    if (truncateLength < 0) {
      return this
    } else {
      for (let i = 0; i < truncateLength; i++) {
        this.digits = this.digits.div(BigInt.fromI32(10))
      }
      this.exp = BigInt.fromI32(decimals * -1)
      return this
    }
  }

  @operator('+')
  plus(other: BigDecimal): BigDecimal {
    return bigDecimal.plus(this, other)
  }

  @operator('-')
  minus(other: BigDecimal): BigDecimal {
    return bigDecimal.minus(this, other)
  }

  @operator('*')
  times(other: BigDecimal): BigDecimal {
    return bigDecimal.times(this, other)
  }

  @operator('/')
  div(other: BigDecimal): BigDecimal {
    return bigDecimal.dividedBy(this, other)
  }

  @operator('==')
  equals(other: BigDecimal): boolean {
    return BigDecimal.compare(this, other) == 0
  }

  @operator('!=')
  notEqual(other: BigDecimal): boolean {
    return !(this == other)
  }

  @operator('<')
  lt(other: BigDecimal): boolean {
    return BigDecimal.compare(this, other) == -1
  }

  @operator('>')
  gt(other: BigDecimal): boolean {
    return BigDecimal.compare(this, other) == 1
  }

  @operator('<=')
  le(other: BigDecimal): boolean {
    return !(this > other)
  }

  @operator('>=')
  ge(other: BigDecimal): boolean {
    return !(this < other)
  }

  @operator.prefix('-')
  neg(): BigDecimal {
    return new BigDecimal(new BigInt(0)) - this
  }

  /**
   * Returns −1 if a < b, 1 if a > b, and 0 if A == B
   */
  static compare(a: BigDecimal, b: BigDecimal): i32 {
    let diff = a - b
    if (diff.digits.isZero()) {
      return 0
    }
    return diff.digits > BigInt.fromI32(0) ? 1 : -1
  }
}

/**
 * Enum for supported value types.
 */
export enum ValueKind {
  STRING = 0,
  INT = 1,
  BIGDECIMAL = 2,
  BOOL = 3,
  ARRAY = 4,
  NULL = 5,
  BYTES = 6,
  BIGINT = 7,
}

/**
 * Pointer type for Value data.
 *
 * Big enough to fit any pointer or native `this.data`.
 */
export type ValuePayload = u64

/**
 * A dynamically typed value.
 */
export class Value {
  kind: ValueKind
  data: ValuePayload

  toAddress(): Address {
    assert(this.kind == ValueKind.BYTES, 'Value is not an address.')
    return changetype<Address>(this.data as u32)
  }

  toBoolean(): boolean {
    if (this.kind == ValueKind.NULL) {
      return false
    }
    assert(this.kind == ValueKind.BOOL, 'Value is not a boolean.')
    return this.data != 0
  }

  toBytes(): Bytes {
    assert(this.kind == ValueKind.BYTES, 'Value is not a byte array.')
    return changetype<Bytes>(this.data as u32)
  }

  toI32(): i32 {
    if (this.kind == ValueKind.NULL) {
      return 0
    }
    assert(this.kind == ValueKind.INT, 'Value is not an i32.')
    return this.data as i32
  }

  toString(): string {
    assert(this.kind == ValueKind.STRING, 'Value is not a string.')
    return changetype<string>(this.data as u32)
  }

  toBigInt(): BigInt {
    assert(this.kind == ValueKind.BIGINT, 'Value is not a BigInt.')
    return changetype<BigInt>(this.data as u32)
  }

  toBigDecimal(): BigDecimal {
    assert(this.kind == ValueKind.BIGDECIMAL, 'Value is not a BigDecimal.')
    return changetype<BigDecimal>(this.data as u32)
  }

  toArray(): Array<Value> {
    assert(this.kind == ValueKind.ARRAY, 'Value is not an array.')
    return changetype<Array<Value>>(this.data as u32)
  }

  toBooleanArray(): Array<boolean> {
    let values = this.toArray()
    let output = new Array<boolean>(values.length)
    for (let i: i32; i < values.length; i++) {
      output[i] = values[i].toBoolean()
    }
    return output
  }

  toBytesArray(): Array<Bytes> {
    let values = this.toArray()
    let output = new Array<Bytes>(values.length)
    for (let i: i32 = 0; i < values.length; i++) {
      output[i] = values[i].toBytes()
    }
    return output
  }

  toStringArray(): Array<string> {
    let values = this.toArray()
    let output = new Array<string>(values.length)
    for (let i: i32 = 0; i < values.length; i++) {
      output[i] = values[i].toString()
    }
    return output
  }

  toI32Array(): Array<i32> {
    let values = this.toArray()
    let output = new Array<i32>(values.length)
    for (let i: i32 = 0; i < values.length; i++) {
      output[i] = values[i].toI32()
    }
    return output
  }

  toBigIntArray(): Array<BigInt> {
    let values = this.toArray()
    let output = new Array<BigInt>(values.length)
    for (let i: i32 = 0; i < values.length; i++) {
      output[i] = values[i].toBigInt()
    }
    return output
  }

  toBigDecimalArray(): Array<BigDecimal> {
    let values = this.toArray()
    let output = new Array<BigDecimal>(values.length)
    for (let i: i32 = 0; i < values.length; i++) {
      output[i] = values[i].toBigDecimal()
    }
    return output
  }

  static fromBooleanArray(input: Array<boolean>): Value {
    let output = new Array<Value>(input.length)
    for (let i: i32 = 0; i < input.length; i++) {
      output[i] = Value.fromBoolean(input[i])
    }
    return Value.fromArray(output)
  }

  static fromBytesArray(input: Array<Bytes>): Value {
    let output = new Array<Value>(input.length)
    for (let i: i32 = 0; i < input.length; i++) {
      output[i] = Value.fromBytes(input[i])
    }
    return Value.fromArray(output)
  }

  static fromI32Array(input: Array<i32>): Value {
    let output = new Array<Value>(input.length)
    for (let i: i32 = 0; i < input.length; i++) {
      output[i] = Value.fromI32(input[i])
    }
    return Value.fromArray(output)
  }

  static fromBigIntArray(input: Array<BigInt>): Value {
    let output = new Array<Value>(input.length)
    for (let i: i32 = 0; i < input.length; i++) {
      output[i] = Value.fromBigInt(input[i])
    }
    return Value.fromArray(output)
  }

  static fromBigDecimalArray(input: Array<BigDecimal>): Value {
    let output = new Array<Value>(input.length)
    for (let i: i32 = 0; i < input.length; i++) {
      output[i] = Value.fromBigDecimal(input[i])
    }
    return Value.fromArray(output)
  }

  static fromStringArray(input: Array<string>): Value {
    let output = new Array<Value>(input.length)
    for (let i: i32 = 0; i < input.length; i++) {
      output[i] = Value.fromString(input[i])
    }
    return Value.fromArray(output)
  }

  static fromAddressArray(input: Array<Address>): Value {
    let output = new Array<Value>(input.length)
    for (let i: i32 = 0; i < input.length; i++) {
      output[i] = Value.fromAddress(input[i])
    }
    return Value.fromArray(output)
  }

  static fromArray(input: Array<Value>): Value {
    let value = new Value()
    value.kind = ValueKind.ARRAY
    value.data = input as u64
    return value
  }

  static fromBigInt(n: BigInt): Value {
    let value = new Value()
    value.kind = ValueKind.BIGINT
    value.data = n as u64
    return value
  }

  static fromBoolean(b: boolean): Value {
    let value = new Value()
    value.kind = ValueKind.BOOL
    value.data = b ? 1 : 0
    return value
  }

  static fromBytes(bytes: Bytes): Value {
    let value = new Value()
    value.kind = ValueKind.BYTES
    value.data = bytes as u64
    return value
  }

  static fromNull(): Value {
    let value = new Value()
    value.kind = ValueKind.NULL
    return value
  }

  static fromI32(n: i32): Value {
    let value = new Value()
    value.kind = ValueKind.INT
    value.data = n as u64
    return value
  }

  static fromString(s: string): Value {
    let value = new Value()
    value.kind = ValueKind.STRING
    value.data = s as u64
    return value
  }

  static fromAddress(s: Address): Value {
    let value = new Value()
    value.kind = ValueKind.BYTES
    value.data = s as u64
    return value
  }

  static fromBigDecimal(n: BigDecimal): Value {
    let value = new Value()
    value.kind = ValueKind.BIGDECIMAL
    value.data = n as u64
    return value
  }
}

/**
 * Common representation for entity data, storing entity attributes
 * as `string` keys and the attribute values as dynamically-typed
 * `Value` objects.
 */
export class Entity extends TypedMap<string, Value> {
  unset(key: string): void {
    this.set(key, Value.fromNull())
  }

  /** Assigns properties from sources to this Entity in right-to-left order */
  merge(sources: Array<Entity>): Entity {
    var target = this
    for (let i = 0; i < sources.length; i++) {
      let entries = sources[i].entries
      for (let j = 0; j < entries.length; j++) {
        target.set(entries[j].key, entries[j].value)
      }
    }
    return target
  }

  setString(key: string, value: string): void {
    this.set(key, Value.fromString(value))
  }

  setI32(key: string, value: i32): void {
    this.set(key, Value.fromI32(value))
  }

  setBigInt(key: string, value: BigInt): void {
    this.set(key, Value.fromBigInt(value))
  }

  setBytes(key: string, value: Bytes): void {
    this.set(key, Value.fromBytes(value))
  }

  setBoolean(key: string, value: bool): void {
    this.set(key, Value.fromBoolean(value))
  }

  setBigDecimal(key: string, value: BigDecimal): void {
    this.set(key, Value.fromBigDecimal(value))
  }

  getString(key: string): string {
    return this.get(key).toString()
  }

  getI32(key: string): i32 {
    return this.get(key).toI32()
  }

  getBigInt(key: string): BigInt {
    return this.get(key).toBigInt()
  }

  getBytes(key: string): Bytes {
    return this.get(key).toBytes()
  }

  getBoolean(key: string): boolean {
    return this.get(key).toBoolean()
  }

  getBigDecimal(key: string): BigDecimal {
    return this.get(key).toBigDecimal()
  }
}

/** Context for dynamic data sources */
export class DataSourceContext extends Entity {}

/** Type hint for JSON values. */
export enum JSONValueKind {
  NULL = 0,
  BOOL = 1,
  NUMBER = 2,
  STRING = 3,
  ARRAY = 4,
  OBJECT = 5,
}

/**
 * Pointer type for JSONValue data.
 *
 * Big enough to fit any pointer or native `this.data`.
 */
export type JSONValuePayload = u64

export class JSONValue {
  kind: JSONValueKind
  data: JSONValuePayload

  isNull(): boolean {
    return this.kind == JSONValueKind.NULL
  }

  toBool(): boolean {
    assert(this.kind == JSONValueKind.BOOL, 'JSON value is not a boolean.')
    return this.data != 0
  }

  toI64(): i64 {
    assert(this.kind == JSONValueKind.NUMBER, 'JSON value is not a number.')
    let decimalString = changetype<string>(this.data as u32)
    return json.toI64(decimalString)
  }

  toU64(): u64 {
    assert(this.kind == JSONValueKind.NUMBER, 'JSON value is not a number.')
    let decimalString = changetype<string>(this.data as u32)
    return json.toU64(decimalString)
  }

  toF64(): f64 {
    assert(this.kind == JSONValueKind.NUMBER, 'JSON value is not a number.')
    let decimalString = changetype<string>(this.data as u32)
    return json.toF64(decimalString)
  }

  toBigInt(): BigInt {
    assert(this.kind == JSONValueKind.NUMBER, 'JSON value is not a number.')
    let decimalString = changetype<string>(this.data as u32)
    return json.toBigInt(decimalString)
  }

  toString(): string {
    assert(this.kind == JSONValueKind.STRING, 'JSON value is not a string.')
    return changetype<string>(this.data as u32)
  }

  toArray(): Array<JSONValue> {
    assert(this.kind == JSONValueKind.ARRAY, 'JSON value is not an array.')
    return changetype<Array<JSONValue>>(this.data as u32)
  }

  toObject(): TypedMap<string, JSONValue> {
    assert(this.kind == JSONValueKind.OBJECT, 'JSON value is not an object.')
    return changetype<TypedMap<string, JSONValue>>(this.data as u32)
  }
}

/**
 * Base class for data source templates. Allows to dynamically create
 * data sources from templates at runtime.
 */
export class DataSourceTemplate {
  /**
   * Dynamically creates a data source from the template with the
   * given name, using the parameter strings to configure the new
   * data source.
   */
  static create(name: string, params: Array<string>): void {
    dataSource.create(name, params)
  }

  static createWithContext(
    name: string,
    params: Array<string>,
    context: DataSourceContext,
  ): void {
    dataSource.createWithContext(name, params, context)
  }
}

// This is used to wrap a generic so that it can be unioned with `null`, working around limitations
// with primitives.
export class Wrapped<T> {
  inner: T

  constructor(inner: T) {
    this.inner = inner
  }
}
