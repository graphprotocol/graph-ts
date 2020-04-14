import { Address, BigInt, Bytes, Wrapped } from '..'

/** Host Ethereum interface */
export declare namespace ethereum {
  function call(call: SmartContractCall): Array<Value> | null
}

export namespace ethereum {
  /** Type hint for Ethereum values. */
  export enum ValueKind {
    ADDRESS = 0,
    FIXED_BYTES = 1,
    BYTES = 2,
    INT = 3,
    UINT = 4,
    BOOL = 5,
    STRING = 6,
    FIXED_ARRAY = 7,
    ARRAY = 8,
    TUPLE = 9,
  }

  /**
   * Pointer type for Ethereum value data.
   *
   * Big enough to fit any pointer or native `this.data`.
   */
  export type ValuePayload = u64

  /**
   * A dynamically typed value used when accessing Ethereum data.
   */
  export class Value {
    kind: ValueKind
    data: ValuePayload

    toAddress(): Address {
      assert(this.kind == ValueKind.ADDRESS, 'Ethereum value is not an address')
      return changetype<Address>(this.data as u32)
    }

    toBoolean(): boolean {
      assert(this.kind == ValueKind.BOOL, 'Ethereum value is not a boolean.')
      return this.data != 0
    }

    toBytes(): Bytes {
      assert(
        this.kind == ValueKind.FIXED_BYTES || this.kind == ValueKind.BYTES,
        'Ethereum value is not bytes.',
      )
      return changetype<Bytes>(this.data as u32)
    }

    toI32(): i32 {
      assert(
        this.kind == ValueKind.INT || this.kind == ValueKind.UINT,
        'Ethereum value is not an int or uint.',
      )
      let bigInt = changetype<BigInt>(this.data as u32)
      return bigInt.toI32()
    }

    toBigInt(): BigInt {
      assert(
        this.kind == ValueKind.INT || this.kind == ValueKind.UINT,
        'Ethereum value is not an int or uint.',
      )
      return changetype<BigInt>(this.data as u32)
    }

    toString(): string {
      assert(this.kind == ValueKind.STRING, 'Ethereum value is not a string.')
      return changetype<string>(this.data as u32)
    }

    toArray(): Array<Value> {
      assert(
        this.kind == ValueKind.ARRAY || this.kind == ValueKind.FIXED_ARRAY,
        'Ethereum value is not an array.',
      )
      return changetype<Array<Value>>(this.data as u32)
    }

    toTuple(): Tuple {
      assert(this.kind == ValueKind.TUPLE, 'Ethereum value is not a tuple.')
      return changetype<Tuple>(this.data as u32)
    }

    toTupleArray<T extends Tuple>(): Array<T> {
      assert(
        this.kind == ValueKind.ARRAY || this.kind == ValueKind.FIXED_ARRAY,
        'Ethereum value is not an array.',
      )
      let valueArray = this.toArray()
      let out = new Array<T>(valueArray.length)
      for (let i: i32 = 0; i < valueArray.length; i++) {
        out[i] = valueArray[i].toTuple() as T
      }
      return out
    }

    toBooleanArray(): Array<boolean> {
      assert(
        this.kind == ValueKind.ARRAY || this.kind == ValueKind.FIXED_ARRAY,
        'Ethereum value is not an array or fixed array.',
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
        this.kind == ValueKind.ARRAY || this.kind == ValueKind.FIXED_ARRAY,
        'Ethereum value is not an array or fixed array.',
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
        this.kind == ValueKind.ARRAY || this.kind == ValueKind.FIXED_ARRAY,
        'Ethereum value is not an array or fixed array.',
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
        this.kind == ValueKind.ARRAY || this.kind == ValueKind.FIXED_ARRAY,
        'Ethereum value is not an array or fixed array.',
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
        this.kind == ValueKind.ARRAY || this.kind == ValueKind.FIXED_ARRAY,
        'Ethereum value is not an array or fixed array.',
      )
      let valueArray = this.toArray()
      let out = new Array<i32>(valueArray.length)
      for (let i: i32 = 0; i < valueArray.length; i++) {
        out[i] = valueArray[i].toI32()
      }
      return out
    }

    toBigIntArray(): Array<BigInt> {
      assert(
        this.kind == ValueKind.ARRAY || this.kind == ValueKind.FIXED_ARRAY,
        'Ethereum value is not an array or fixed array.',
      )
      let valueArray = this.toArray()
      let out = new Array<BigInt>(valueArray.length)
      for (let i: i32 = 0; i < valueArray.length; i++) {
        out[i] = valueArray[i].toBigInt()
      }
      return out
    }

    static fromAddress(address: Address): Value {
      assert(address.length == 20, 'Address must contain exactly 20 bytes')

      let token = new Value()
      token.kind = ValueKind.ADDRESS
      token.data = address as u64
      return token
    }

    static fromBoolean(b: boolean): Value {
      let token = new Value()
      token.kind = ValueKind.BOOL
      token.data = b ? 1 : 0
      return token
    }

    static fromBytes(bytes: Bytes): Value {
      let token = new Value()
      token.kind = ValueKind.BYTES
      token.data = bytes as u64
      return token
    }

    static fromFixedBytes(bytes: Bytes): Value {
      let token = new Value()
      token.kind = ValueKind.FIXED_BYTES
      token.data = bytes as u64
      return token
    }

    static fromI32(i: i32): Value {
      let token = new Value()
      token.kind = ValueKind.INT
      token.data = BigInt.fromI32(i) as u64
      return token
    }

    static fromSignedBigInt(i: BigInt): Value {
      let token = new Value()
      token.kind = ValueKind.INT
      token.data = i as u64
      return token
    }

    static fromUnsignedBigInt(i: BigInt): Value {
      let token = new Value()
      token.kind = ValueKind.UINT
      token.data = i as u64
      return token
    }

    static fromString(s: string): Value {
      let token = new Value()
      token.kind = ValueKind.STRING
      token.data = s as u64
      return token
    }

    static fromArray(values: Array<Value>): Value {
      let token = new Value()
      token.kind = ValueKind.ARRAY
      token.data = values as u64
      return token
    }

    static fromTuple(values: Tuple): Value {
      let token = new Value()
      token.kind = ValueKind.TUPLE
      token.data = values as u64
      return token
    }

    static fromTupleArray(values: Array<Tuple>): Value {
      let out = new Array<Value>(values.length)
      for (let i: i32 = 0; i < values.length; i++) {
        out[i] = Value.fromTuple(values[i])
      }
      return Value.fromArray(out)
    }

    static fromBooleanArray(values: Array<boolean>): Value {
      let out = new Array<Value>(values.length)
      for (let i: i32 = 0; i < values.length; i++) {
        out[i] = Value.fromBoolean(values[i])
      }
      return Value.fromArray(out)
    }

    static fromBytesArray(values: Array<Bytes>): Value {
      let out = new Array<Value>(values.length)
      for (let i: i32 = 0; i < values.length; i++) {
        out[i] = Value.fromBytes(values[i])
      }
      return Value.fromArray(out)
    }

    static fromFixedBytesArray(values: Array<Bytes>): Value {
      let out = new Array<Value>(values.length)
      for (let i: i32 = 0; i < values.length; i++) {
        out[i] = Value.fromFixedBytes(values[i])
      }
      return Value.fromArray(out)
    }

    static fromAddressArray(values: Array<Address>): Value {
      let out = new Array<Value>(values.length)
      for (let i: i32 = 0; i < values.length; i++) {
        out[i] = Value.fromAddress(values[i])
      }
      return Value.fromArray(out)
    }

    static fromStringArray(values: Array<string>): Value {
      let out = new Array<Value>(values.length)
      for (let i: i32 = 0; i < values.length; i++) {
        out[i] = Value.fromString(values[i])
      }
      return Value.fromArray(out)
    }

    static fromI32Array(values: Array<i32>): Value {
      let out = new Array<Value>(values.length)
      for (let i: i32 = 0; i < values.length; i++) {
        out[i] = Value.fromI32(values[i])
      }
      return Value.fromArray(out)
    }

    static fromSignedBigIntArray(values: Array<BigInt>): Value {
      let out = new Array<Value>(values.length)
      for (let i: i32 = 0; i < values.length; i++) {
        out[i] = Value.fromSignedBigInt(values[i])
      }
      return Value.fromArray(out)
    }

    static fromUnsignedBigIntArray(values: Array<BigInt>): Value {
      let out = new Array<Value>(values.length)
      for (let i: i32 = 0; i < values.length; i++) {
        out[i] = Value.fromUnsignedBigInt(values[i])
      }
      return Value.fromArray(out)
    }
  }

  /**
   * Common representation for Ethereum tuples / Solidity structs.
   *
   * This base class stores the tuple/struct values in an array. The Graph CLI
   * code generation then creates subclasses that provide named getters to
   * access the members by name.
   */
  export class Tuple extends Array<Value> {}

  /**
   * An Ethereum block.
   */
  export class Block {
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
    size: BigInt | null
  }

  /**
   * An Ethereum transaction.
   */
  export class Transaction {
    hash: Bytes
    index: BigInt
    from: Address
    to: Address | null
    value: BigInt
    gasUsed: BigInt
    gasPrice: BigInt
    input: Bytes
  }

  /**
   * Common representation for Ethereum smart contract calls.
   */
  export class Call {
    to: Address
    from: Address
    block: Block
    transaction: Transaction
    inputValues: Array<EventParam>
    outputValues: Array<EventParam>
  }

  /**
   * Common representation for Ethereum smart contract events.
   */
  export class Event {
    address: Address
    logIndex: BigInt
    transactionLogIndex: BigInt
    logType: string | null
    block: Block
    transaction: Transaction
    parameters: Array<EventParam>
  }

  /**
   * A dynamically-typed Ethereum event parameter.
   */
  export class EventParam {
    name: string
    value: Value
  }

  export class SmartContractCall {
    contractName: string
    contractAddress: Address
    functionName: string
    functionSignature: string
    functionParams: Array<Value>

    constructor(
      contractName: string,
      contractAddress: Address,
      functionName: string,
      functionSignature: string,
      functionParams: Array<Value>,
    ) {
      this.contractName = contractName
      this.contractAddress = contractAddress
      this.functionName = functionName
      this.functionSignature = functionSignature
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

    call(name: string, signature: string, params: Array<Value>): Array<Value> {
      let call = new SmartContractCall(this._name, this._address, name, signature, params)
      let result = ethereum.call(call)
      assert(
        result != null,
        'Call reverted, probably because an `assert` or `require` in the contract failed, ' +
          'consider using `try_' +
          name +
          '` to handle this in the mapping.',
      )
      return result as Array<Value>
    }

    tryCall(
      name: string,
      signature: string,
      params: Array<Value>,
    ): CallResult<Array<Value>> {
      let call = new SmartContractCall(this._name, this._address, name, signature, params)
      let result = ethereum.call(call)
      if (result == null) {
        return new CallResult()
      } else {
        return CallResult.fromValue(result as Array<Value>)
      }
    }
  }

  export class CallResult<T> {
    // `null` indicates a reverted call.
    private _value: Wrapped<T> | null

    constructor() {
      this._value = null
    }

    static fromValue<T>(value: T): CallResult<T> {
      let result = new CallResult<T>()
      result._value = new Wrapped(value)
      return result
    }

    get reverted(): bool {
      return this._value == null
    }

    get value(): T {
      assert(
        !this.reverted,
        'accessed value of a reverted call, ' +
          'please check the `reverted` field before accessing the `value` field',
      )
      return (this._value as Wrapped<T>).inner
    }
  }
}
