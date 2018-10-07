// Export allocator functions for hosts to manage WASM memory
import { allocate_memory as allocate } from 'allocator/arena'
export const allocate_memory = allocate

/**
 * Host store interface.
 */
export declare namespace store {
  function get(entity: string, id: string): Entity | null
  function set(entity: string, id: string, data: Entity): void
  function remove(entity: string, id: string): void
}

/** Host Ethereum interface */
declare namespace ethereum {
  function call(call: SmartContractCall): Array<EthereumValue>
}

/** Host IPFS interface */
export declare namespace ipfs {
  function cat(hash: String): Bytes
}

/** Host crypto utilities interface */
export declare namespace crypto {
  function keccak256(input: ByteArray): ByteArray
}

/** Host JSON interface */
export declare namespace json {
  function fromBytes(data: Bytes): JSONValue
  function toI64(decimal: string): i64
  function toU64(decimal: string): u64
  function toF64(decimal: string): f64
  function toBigInt(decimal: string): BigInt
}

/** Host type conversion interface */
declare namespace typeConversion {
  function bytesToString(bytes: ByteArray): string
  function bytesToHex(bytes: Uint8Array): string
  function u64ArrayToHex(array: U64Array): string
  function u64ArrayToString(array: U64Array): string
  function h256ToH160(h: H256): H160
  function h160ToH256(h: H160): H256
  function u256ToH160(u: U64Array): H160
  function u256ToH256(u: U64Array): H256
  function int256ToBigInt(u: U64Array): BigInt
  function stringToH160(s: String): H160
  function bigIntToInt256(i: BigInt): U64Array

  // Primitive to/from ethereum 256-bit number conversions.
  function u64ToU256(x: u64): U64Array
  function i64ToU256(x: i64): U64Array
  function u256ToU8(x: U64Array): u8
  function u256ToU16(x: U64Array): u16
  function u256ToU32(x: U64Array): u32
  function u256ToU64(x: U64Array): u64
  function u256ToI8(x: U64Array): i8
  function u256ToI16(x: U64Array): i16
  function u256ToI32(x: U64Array): i32
  function u256ToI64(x: U64Array): i64
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
    this.entries = new Array<TypedMapEntry<K, V>>()
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
}

/**
 * Byte array
 */
export class ByteArray extends Uint8Array {
  toHex(): string {
    return typeConversion.bytesToHex(this)
  }

  toString(): string {
    return typeConversion.bytesToString(this)
  }
}

/** U64Array */
export class U64Array extends Uint64Array {
  toHex(): string {
    return typeConversion.u64ArrayToHex(this)
  }

  toString(): string {
    return typeConversion.u64ArrayToString(this)
  }

  toAddress(): Address {
    return typeConversion.u256ToH160(this) as Address
  }
}

/** An Ethereum address (20 bytes). */
export class Address extends ByteArray {
  static fromString(s: String): Address {
    return changetype<Address>(typeConversion.stringToH160(s))
  }
}

/** An arbitrary size integer. */
export class BigInt extends ByteArray {}

/** A dynamically-sized byte array. */
export class Bytes extends ByteArray {}

/** A 160-bit hash. */
export class H160 extends ByteArray {
  static fromString(s: String): H160 {
    return typeConversion.stringToH160(s)
  }
}

/** A 256-bit hash. */
export class H256 extends ByteArray {}

/** A signed 128-bit integer. */
export class I128 extends U64Array {}

/** A signed 256-bit integer. */
export class I256 extends U64Array {

  static fromI64(x: i64): I256 {
    return changetype<I256>(typeConversion.i64ToU256(x))
  }

  toI8(): i8 {
    return typeConversion.u256ToI8(this)
  }

  toI16(): i16 {
    return typeConversion.u256ToI16(this)
  }

  toI32(): i32 {
    return typeConversion.u256ToI32(this)
  }

  toI64(): i64 {
    return typeConversion.u256ToI64(this)
  }
}

/** An unsigned 128-bit integer. */
export class U128 extends U64Array {}

/** An unsigned 256-bit integer. */
export class U256 extends U64Array {
  
  static fromU64(x: u64): U256 {
    return changetype<U256>(typeConversion.u64ToU256(x))
  }

  toU8(): u8 {
    return typeConversion.u256ToU8(this)
  }

  toU16(): u16 {
    return typeConversion.u256ToU16(this)
  }

  toU32(): u32 {
    return typeConversion.u256ToU32(this)
  }

  toU64(): u64 {
    return typeConversion.u256ToU64(this)
  }
}

/** Type hint for Ethereum values. */
export enum EthereumValueKind {
  ADDRESS,
  FIXED_BYTES,
  BYTES,
  INT,
  UINT,
  BOOL,
  STRING,
  FIXED_ARRAY,
  ARRAY,
}

/**
 * Pointer type for EthereumValue data.
 *
 * Big enough to fit any pointer or native `this.data`.
 */
export type EthereumValuePayload = u64

/**
 * A dynamically typed value used when accessing Ethereum data.
 */
export class EthereumValue {
  kind: EthereumValueKind
  data: EthereumValuePayload

  toAddress(): Address {
    assert(
      this.kind == EthereumValueKind.ADDRESS ||
        this.kind == EthereumValueKind.UINT ||
        this.kind == EthereumValueKind.INT,
      'EthereumValue is not an address, uint or int.'
    )
    if (this.kind == EthereumValueKind.ADDRESS) {
      return changetype<Address>(this.data as u32)
    } else if (this.kind == EthereumValueKind.UINT) {
      return typeConversion.u256ToH160(this.toU256()) as Address
    } else if (this.kind == EthereumValueKind.INT) {
      return typeConversion.u256ToH160(this.toI128()) as Address
    }
    throw new Error('Type conversion from ' + this.kind + ' to address not supported')
  }

  toBoolean(): boolean {
    assert(this.kind == EthereumValueKind.BOOL, 'EthereumValue is not a boolean.')
    return this.data != 0
  }

  toBytes(): Bytes {
    assert(
      this.kind == EthereumValueKind.FIXED_BYTES || this.kind == EthereumValueKind.BYTES,
      'EthereumValue is not bytes.'
    )
    return changetype<Bytes>(this.data as u32)
  }

  toI8(): i8 {
    assert(
      this.kind == EthereumValueKind.INT,
      'EthereumValue is not an int.'
    )
    let i256 = changetype<I256>(this.data as u32)
    return i256.toI8()
  }

  toI16(): i16 {
    assert(
      this.kind == EthereumValueKind.INT,
      'EthereumValue is not an int.'
    )
    let i256 = changetype<I256>(this.data as u32)
    return i256.toI16()
  }

  toI32(): i32 {
    assert(
      this.kind == EthereumValueKind.INT,
      'EthereumValue is not an int.'
    )
    let i256 = changetype<I256>(this.data as u32)
    return i256.toI32()
  }

  toI64(): i64 {
    assert(
      this.kind == EthereumValueKind.INT,
      'EthereumValue is not an int.'
    )
    let i256 = changetype<I256>(this.data as u32)
    return i256.toI64()
  }

  toI128(): I128 {
    assert(
      this.kind == EthereumValueKind.INT,
      'EthereumValue is not an int or uint.'
    )
    return changetype<I128>(this.data as u32)
  }

  toI256(): I256 {
    assert(
      this.kind == EthereumValueKind.INT,
      'EthereumValue is not an int.'
    )
    return changetype<I256>(this.data as u32)
  }

  toU8(): u8 {
    assert(
      this.kind == EthereumValueKind.UINT,
      'EthereumValue is not an uint.'
    )
    let u256 = changetype<U256>(this.data as u32)
    return u256.toU8()
  }

  toU16(): u16 {
    assert(
      this.kind == EthereumValueKind.UINT,
      'EthereumValue is not an uint.'
    )
    let u256 = changetype<U256>(this.data as u32)
    return u256.toU16()
  }

  toU32(): u32 {
    assert(
      this.kind == EthereumValueKind.UINT,
      'EthereumValue is not an uint.'
    )
    let u256 = changetype<U256>(this.data as u32)
    return u256.toU32()
  }

  toU64(): u64 {
    assert(
      this.kind == EthereumValueKind.UINT,
      'EthereumValue is not an uint.'
    )
    let u256 = changetype<U256>(this.data as u32)
    return u256.toU64()
  }

  toU128(): U128 {
    assert(
      this.kind == EthereumValueKind.INT || this.kind == EthereumValueKind.UINT,
      'EthereumValue is not an int or uint.'
    )
    return changetype<U128>(this.data as u32)
  }

  toU256(): U256 {
    assert(
      this.kind == EthereumValueKind.INT || this.kind == EthereumValueKind.UINT,
      'EthereumValue is not an int or uint.'
    )
    return changetype<U256>(this.data as u32)
  }

  toU256Array(): Array<U256> {
    assert(
      this.kind == EthereumValueKind.ARRAY || this.kind == EthereumValueKind.FIXED_ARRAY,
      'EthereumValue is not an array or fixed array.'
    )
    let valueArray = this.toArray()
    let u256Array = new Array<U256>()
    for (let i: i32 = 0; i < valueArray.length; i++) {
      u256Array.push(valueArray[i].toU256())
    }
    return u256Array
  }

  toString(): string {
    assert(this.kind == EthereumValueKind.STRING, 'EthereumValue is not a string.')
    return changetype<string>(this.data as u32)
  }

  toArray(): Array<EthereumValue> {
    assert(
      this.kind == EthereumValueKind.FIXED_ARRAY || this.kind == EthereumValueKind.ARRAY,
      'EthereumValue is not an array.'
    )
    return changetype<Array<EthereumValue>>(this.data as u32)
  }

  static fromAddress(address: Address): EthereumValue {
    assert(address.length == 20, 'Address must contain exactly 20 bytes')

    let token = new EthereumValue()
    token.kind = EthereumValueKind.ADDRESS
    token.data = address as u64
    return token
  }

  static fromBoolean(b: boolean): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.BOOL
    token.data = b ? 1 : 0
    return token
  }

  static fromBytes(bytes: Bytes): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.BYTES
    token.data = bytes as u64
    return token
  }

  static fromFixedBytes(bytes: Bytes): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.FIXED_BYTES
    token.data = bytes as u64
    return token
  }

  static fromI8(i: i8): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.INT
    token.data = I256.fromI64(i as i64) as u64
    return token
  }

  static fromI16(i: i16): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.INT
    token.data = I256.fromI64(i as i64) as u64
    return token
  }

  static fromI32(i: i32): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.INT
    token.data = I256.fromI64(i as i64) as u64
    return token
  }

  static fromI64(i: i64): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.INT
    token.data = I256.fromI64(i) as u64
    return token
  }

  static fromI128(i: I128): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.INT
    token.data = i as u64
    return token
  }

  static fromI256(i: I256): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.INT
    token.data = i as u64
    return token
  }

  static fromU8(u: u8): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.UINT
    token.data = U256.fromU64(u as u64) as u64
    return token
  }

  static fromU16(u: u16): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.UINT
    token.data = U256.fromU64(u as u64) as u64
    return token
  }

  static fromU32(u: u32): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.UINT
    token.data = U256.fromU64(u as u64) as u64
    return token
  }

  static fromU64(u: u64): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.UINT
    token.data = U256.fromU64(u) as u64
    return token
  }

  static fromU128(u: U128): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.UINT
    token.data = u as u64
    return token
  }

  static fromU256(u: U256): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.UINT
    token.data = u as u64
    return token
  }

  static fromString(s: string): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.STRING
    token.data = s as u64
    return token
  }

  static fromArray(arr: EthereumValue): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.ARRAY
    token.data = arr as u64
    return token
  }
}

/**
 * Enum for supported value types.
 */
export enum ValueKind {
  STRING,
  INT,
  FLOAT,
  BOOL,
  ARRAY,
  NULL,
  BYTES,
  BIGINT,
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
    assert(this.kind == ValueKind.BOOL, 'Value is not a boolean.')
    return this.data != 0
  }

  toBigInt(): BigInt {
    assert(this.kind == ValueKind.BIGINT, 'Value is not an I256, U256 or BigInt.')
    return changetype<BigInt>(this.data as u32)
  }

  toBytes(): Bytes {
    assert(this.kind == ValueKind.BYTES, 'Value is not a byte array.')
    return changetype<Bytes>(this.data as u32)
  }

  toI32(): i32 {
    assert(this.kind == ValueKind.INT, 'Value is not an i32.')
    return this.data as i32
  }

  toString(): string {
    assert(this.kind == ValueKind.STRING, 'Value is not a string.')
    return changetype<string>(this.data as u32)
  }

  toArray(): Array<Value> {
    assert(this.kind == ValueKind.ARRAY, 'Value is not an array.')
    return changetype<Array<Value>>(this.data as u32)
  }

  toI256(): I256 {
    assert(this.kind == ValueKind.BIGINT, 'Value is not an I256.')
    return typeConversion.bigIntToInt256(changetype<BigInt>(this.data as u32))
  }

  toU256(): U256 {
    assert(this.kind == ValueKind.BIGINT, 'Value is not an U256.')
    return typeConversion.bigIntToInt256(changetype<BigInt>(this.data as u32))
  }

  static fromAddress(address: Address): Value {
    let value = new Value()
    value.kind = ValueKind.BYTES
    value.data = address as u64
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

  static fromI256(i: I256): Value {
    let value = new Value()
    value.kind = ValueKind.BIGINT
    value.data = typeConversion.int256ToBigInt(i) as u64
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

  static fromU256(n: U256): Value {
    let value = new Value()
    value.kind = ValueKind.BIGINT
    value.data = typeConversion.int256ToBigInt(n) as u64
    return value
  }

  static fromString(s: string): Value {
    let value = new Value()
    value.kind = ValueKind.STRING
    value.data = s as u64
    return value
  }

  static fromArray(array: Array<Value>): Value {
    let value = new Value()
    value.kind = ValueKind.ARRAY
    value.data = array as u64
    return value
  }
}

/**
 * Common representation for entity data, storing entity attributes
 * as `string` keys and the attribute values as dynamically-typed
 * `Value` objects.
 */
export class Entity extends TypedMap<string, Value> {
  getAddress(key: string): Address {
    return this.get(key).toAddress()
  }

  getBoolean(key: string): boolean {
    return this.get(key).toBoolean()
  }

  getBigInt(key: string): BigInt {
    return this.get(key).toBigInt()
  }

  getBytes(key: string): Bytes {
    return this.get(key).toBytes()
  }

  getI32(key: string): i32 {
    return this.get(key).toI32()
  }

  getString(key: string): string {
    return this.get(key).toString()
  }

  getArray(key: string): Array<Value> {
    return this.get(key).toArray()
  }

  getI256(key: string): I256 {
    return this.get(key).toI256()
  }

  getU256(key: string): U256 {
    return this.get(key).toU256()
  }

  setString(key: string, value: string): void {
    this.set(key, Value.fromString(value))
  }

  setInt(key: string, value: i32): void {
    this.set(key, Value.fromI32(value))
  }

  setBoolean(key: string, value: boolean): void {
    this.set(key, Value.fromBoolean(value))
  }

  setBytes(key: string, value: Bytes): void {
    this.set(key, Value.fromBytes(value))
  }

  setBigInt(key: string, value: BigInt): void {
    this.set(key, Value.fromBigInt(value))
  }

  setAddress(key: string, value: Address): void {
    this.set(key, Value.fromAddress(value))
  }

  setI256(key: string, value: I256): void {
    this.set(key, Value.fromI256(value))
  }

  setU256(key: string, value: U256): void {
    this.set(key, Value.fromU256(value))
  }

  setArray(key: string, array: Array<Value>): void {
    this.set(key, Value.fromArray(array))
  }

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
}

/**
 * An Ethereum block.
 */
export class EthereumBlock {
  hash: H256
  parentHash: H256
  unclesHash: H256
  author: Address
  stateRoot: H256
  transactionsRoot: H256
  receiptsRoot: H256
  number: U128
  gasUsed: U256
  gasLimit: U256
  timestamp: U256
  difficulty: U256
  totalDifficulty: U256
}

/**
 * An Ethereum transaction.
 */
export class EthereumTransaction {
  hash: H256
  blockHash: H256
  blockNumber: U256
  gasUsed: U256
}

/**
 * Common representation for Ethereum smart contract events.
 */
export class EthereumEvent {
  address: Address
  block: EthereumBlock
  transaction: EthereumTransaction
  parameters: Array<EthereumEventParam>
}

/**
 * A dynamically-typed Ethereum event parameter.
 */
export class EthereumEventParam {
  name: string
  value: EthereumValue
}

class SmartContractCall {
  contractName: string
  contractAddress: Address
  functionName: string
  functionParams: Array<EthereumValue>

  constructor(
    contractName: string,
    contractAddress: Address,
    functionName: string,
    functionParams: Array<EthereumValue>
  ) {
    this.contractName = contractName
    this.contractAddress = contractAddress
    this.functionName = functionName
    this.functionParams = functionParams
  }
}

/**
 * Low-level interaction with Ethereum smart contracts
 */
export class SmartContract {
  _name: string
  _address: Address

  protected constructor(name: string, address: Address) {
    this._name = name
    this._address = address
  }

  call(name: string, params: Array<EthereumValue>): Array<EthereumValue> {
    let call = new SmartContractCall(this._name, this._address, name, params)
    return ethereum.call(call)
  }
}

/** Type hint for JSON values. */
export enum JSONValueKind {
  NULL,
  BOOL,
  NUMBER,
  STRING,
  ARRAY,
  OBJECT,
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
