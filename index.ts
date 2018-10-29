// Export allocator functions for hosts to manage WASM memory
import { allocate_memory as allocate } from 'allocator/arena'
export const allocate_memory = allocate

/**
 * Host store interface.
 */
export declare namespace store {
  function get(entity: String, id: string): Entity | null
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
  function u64ArrayToHex(array: Uint64Array): string
  function u64ArrayToString(array: Uint64Array): string
  function stringToH160(s: String): Bytes

  //// Primitive to/from ethereum 256-bit number conversions.
  function i32ToBigInt(x: i32): Uint64Array
  function u32ToBigInt(x: i32): Uint64Array
  function bigIntToU32(x: Uint64Array): u32
  function bigIntToI32(x: Uint64Array): i32
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
}

/** A dynamically-sized byte array. */
export class Bytes extends ByteArray {
  constructor() {}
}

/** An Ethereum address (20 bytes). */
export class Address extends Bytes {
  constructor() {}

  static fromString(s: string): Address {
    return typeConversion.stringToH160(s) as Address
  }
}

/** An arbitrary size integer represented as an array of 64 bit values. */
export class BigInt extends U64Array {
  constructor() {}

  static fromI32(x: i32): BigInt {
    return typeConversion.i32ToBigInt(x) as BigInt
  }

  static fromU32(x: u32): BigInt {
    return typeConversion.u32ToBigInt(x) as BigInt
  }

  toI32(): i32 {
    return typeConversion.bigIntToI32(this)
  }

  toU32(): u32 {
    return typeConversion.bigIntToU32(this)
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
    assert(this.kind == EthereumValueKind.ADDRESS, 'EthereumValue is not an address')
    return changetype<Address>(this.data as u32)
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

  toI32(): i32 {
    assert(this.kind == EthereumValueKind.INT, 'EthereumValue is not an int.')
    let bigInt = changetype<BigInt>(this.data as u32)
    return bigInt.toI32()
  }

  toU32(): u32 {
    assert(this.kind == EthereumValueKind.UINT, 'EthereumValue is not a uint.')
    let bigInt = changetype<BigInt>(this.data as u32)
    return bigInt.toU32()
  }

  toBigInt(): BigInt {
    assert(
      this.kind == EthereumValueKind.INT || this.kind == EthereumValueKind.UINT,
      'EthereumValue is not an int or uint.'
    )
    return changetype<BigInt>(this.data as u32)
  }

  toString(): string {
    assert(this.kind == EthereumValueKind.STRING, 'EthereumValue is not a string.')
    return changetype<string>(this.data as u32)
  }

  toArray(): Array<EthereumValue> {
    assert(
      this.kind == EthereumValueKind.ARRAY || this.kind == EthereumValueKind.FIXED_ARRAY,
      'EthereumValue is not an array.'
    )
    return changetype<Array<EthereumValue>>(this.data as u32)
  }

  toBooleanArray(): Array<boolean> {
    assert(
      this.kind == EthereumValueKind.ARRAY || this.kind == EthereumValueKind.FIXED_ARRAY,
      'EthereumValue is not an array or fixed array.'
    )
    let valueArray = this.toArray()
    let out = new Array<boolean>(valueArray.length)
    for (let i: i32 = 0; i < valueArray.length; i++) {
      out[i] = valueArray[i].toBoolean()
    }
    return out
  }

  toBytesArray(): Array<Bytes> {
    assert(
      this.kind == EthereumValueKind.ARRAY || this.kind == EthereumValueKind.FIXED_ARRAY,
      'EthereumValue is not an array or fixed array.'
    )
    let valueArray = this.toArray()
    let out = new Array<Bytes>(valueArray.length)
    for (let i: i32 = 0; i < valueArray.length; i++) {
      out[i] = valueArray[i].toBytes()
    }
    return out
  }

  toAddressArray(): Array<Address> {
    assert(
      this.kind == EthereumValueKind.ARRAY || this.kind == EthereumValueKind.FIXED_ARRAY,
      'EthereumValue is not an array or fixed array.'
    )
    let valueArray = this.toArray()
    let out = new Array<Address>(valueArray.length)
    for (let i: i32 = 0; i < valueArray.length; i++) {
      out[i] = valueArray[i].toAddress()
    }
    return out
  }

  toStringArray(): Array<string> {
    assert(
      this.kind == EthereumValueKind.ARRAY || this.kind == EthereumValueKind.FIXED_ARRAY,
      'EthereumValue is not an array or fixed array.'
    )
    let valueArray = this.toArray()
    let out = new Array<string>(valueArray.length)
    for (let i: i32 = 0; i < valueArray.length; i++) {
      out[i] = valueArray[i].toString()
    }
    return out
  }

  toI32Array(): Array<i32> {
    assert(
      this.kind == EthereumValueKind.ARRAY || this.kind == EthereumValueKind.FIXED_ARRAY,
      'EthereumValue is not an array or fixed array.'
    )
    let valueArray = this.toArray()
    let out = new Array<i32>(valueArray.length)
    for (let i: i32 = 0; i < valueArray.length; i++) {
      out[i] = valueArray[i].toI32()
    }
    return out
  }

  toU32Array(): Array<u32> {
    assert(
      this.kind == EthereumValueKind.ARRAY || this.kind == EthereumValueKind.FIXED_ARRAY,
      'EthereumValue is not an array or fixed array.'
    )
    let valueArray = this.toArray()
    let out = new Array<u32>(valueArray.length)
    for (let i: i32 = 0; i < valueArray.length; i++) {
      out[i] = valueArray[i].toU32()
    }
    return out
  }

  toBigIntArray(): Array<BigInt> {
    assert(
      this.kind == EthereumValueKind.ARRAY || this.kind == EthereumValueKind.FIXED_ARRAY,
      'EthereumValue is not an array or fixed array.'
    )
    let valueArray = this.toArray()
    let out = new Array<BigInt>(valueArray.length)
    for (let i: i32 = 0; i < valueArray.length; i++) {
      out[i] = valueArray[i].toBigInt()
    }
    return out
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

  static fromI32(i: i32): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.INT
    token.data = BigInt.fromI32(i) as u64
    return token
  }

  static fromU32(u: u32): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.UINT
    token.data = BigInt.fromU32(u) as u64
    return token
  }

  static fromSignedBigInt(i: BigInt): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.INT
    token.data = i as u64
    return token
  }

  static fromUnsignedBigInt(i: BigInt): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.UINT
    token.data = i as u64
    return token
  }

  static fromString(s: string): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.STRING
    token.data = s as u64
    return token
  }

  static fromArray(values: Array<EthereumValue>): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.ARRAY
    token.data = values as u64
    return token
  }

  static fromBooleanArray(values: Array<boolean>): EthereumValue {
    let out = new Array<EthereumValue>(values.length)
    for (let i: i32 = 0; i < values.length; i++) {
      out[i] = EthereumValue.fromBoolean(values[i])
    }
    return EthereumValue.fromArray(out)
  }

  static fromBytesArray(values: Array<Bytes>): EthereumValue {
    let out = new Array<EthereumValue>(values.length)
    for (let i: i32 = 0; i < values.length; i++) {
      out[i] = EthereumValue.fromBytes(values[i])
    }
    return EthereumValue.fromArray(out)
  }

  static fromAddressArray(values: Array<Address>): EthereumValue {
    let out = new Array<EthereumValue>(values.length)
    for (let i: i32 = 0; i < values.length; i++) {
      out[i] = EthereumValue.fromAddress(values[i])
    }
    return EthereumValue.fromArray(out)
  }

  static fromStringArray(values: Array<string>): EthereumValue {
    let out = new Array<EthereumValue>(values.length)
    for (let i: i32 = 0; i < values.length; i++) {
      out[i] = EthereumValue.fromString(values[i])
    }
    return EthereumValue.fromArray(out)
  }

  static fromI32Array(values: Array<i32>): EthereumValue {
    let out = new Array<EthereumValue>(values.length)
    for (let i: i32 = 0; i < values.length; i++) {
      out[i] = EthereumValue.fromI32(values[i])
    }
    return EthereumValue.fromArray(out)
  }

  static fromU32Array(values: Array<u32>): EthereumValue {
    let out = new Array<EthereumValue>(values.length)
    for (let i: i32 = 0; i < values.length; i++) {
      out[i] = EthereumValue.fromU32(values[i])
    }
    return EthereumValue.fromArray(out)
  }

  static fromSignedBigIntArray(values: Array<BigInt>): EthereumValue {
    let out = new Array<EthereumValue>(values.length)
    for (let i: i32 = 0; i < values.length; i++) {
      out[i] = EthereumValue.fromSignedBigInt(values[i])
    }
    return EthereumValue.fromArray(out)
  }

  static fromUnsignedBigIntArray(values: Array<BigInt>): EthereumValue {
    let out = new Array<EthereumValue>(values.length)
    for (let i: i32 = 0; i < values.length; i++) {
      out[i] = EthereumValue.fromUnsignedBigInt(values[i])
    }
    return EthereumValue.fromArray(out)
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

  toBytes(): Bytes {
    assert(this.kind == ValueKind.BYTES, 'Value is not a byte array.')
    return changetype<Bytes>(this.data as u32)
  }

  toI32(): i32 {
    assert(this.kind == ValueKind.INT, 'Value is not an i32.')
    return this.data as i32
  }

  toU32(): u32 {
    assert(this.kind == ValueKind.INT, 'Value is not an u32.')
    return this.data as u32
  }

  toString(): string {
    assert(this.kind == ValueKind.STRING, 'Value is not a string.')
    return changetype<string>(this.data as u32)
  }

  toBigInt(): BigInt {
    assert(this.kind == ValueKind.BIGINT, 'Value is not a BigInt.')
    return changetype<BigInt>(this.data as u32)
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

  toU32Array(): Array<u32> {
    let values = this.toArray()
    let output = new Array<i32>(values.length)
    for (let i: i32 = 0; i < values.length; i++) {
      output[i] = values[i].toU32()
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

  static fromStringArray(input: Array<string>): Value {
    let output = new Array<Value>(input.length)
    for (let i: i32 = 0; i < input.length; i++) {
      output[i] = Value.fromString(input[i])
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

  static fromU32(n: u32): Value {
    let value = new Value()
    value.kind = ValueKind.UINT
    value.data = n as u64
    return value
  }

  static fromString(s: string): Value {
    let value = new Value()
    value.kind = ValueKind.STRING
    value.data = s as u64
    return value
  }
}

/**
 * Common representation for entity data, storing entity attributes
 * as `string` keys and the attribute values as dynamically-typed
 * `Value` objects.
 */
export class Entity extends TypedMap<string, Value> {
  constructor() {}

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
  hash: Bytes
  parentHash: Bytes
  unclesHash: Bytes
  author: Address
  stateRoot: Bytes
  transactionsRoot: Bytes
  receiptsRoot: Bytes
  number: BigInt
  gasUsed: BigInt
  gasLimit: BigInt
  timestamp: BigInt
  difficulty: BigInt
  totalDifficulty: BigInt
}

/**
 * An Ethereum transaction.
 */
export class EthereumTransaction {
  hash: Bytes
  blockHash: Bytes
  blockNumber: BigInt
  gasUsed: BigInt
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
