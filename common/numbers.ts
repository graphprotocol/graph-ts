import { Bytes, ByteArray } from './collections'
import { typeConversion } from './conversion'

/** Host interface for BigInt arithmetic */
export declare namespace bigInt {
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
export declare namespace bigDecimal {
  function plus(x: BigDecimal, y: BigDecimal): BigDecimal
  function minus(x: BigDecimal, y: BigDecimal): BigDecimal
  function times(x: BigDecimal, y: BigDecimal): BigDecimal
  function dividedBy(x: BigDecimal, y: BigDecimal): BigDecimal
  function equals(x: BigDecimal, y: BigDecimal): boolean
  function toString(bigDecimal: BigDecimal): string
  function fromString(s: string): BigDecimal
}

/** An Ethereum address (20 bytes). */
export class Address extends Bytes {
  static fromString(s: string): Address {
    return changetype<Address>(typeConversion.stringToH160(s))
  }
}

/** An arbitrary size integer represented as an array of bytes. */
export class BigInt extends Uint8Array {
  static fromI32(x: i32): BigInt {
    let byteArray = ByteArray.fromI32(x)
    return BigInt.fromByteArray(byteArray)
  }

  /**
   * `bytes` assumed to be little-endian. If your input is big-endian, call `.reverse()` first.
   */

  static fromSignedBytes(bytes: Bytes): BigInt {
    let byteArray = <ByteArray>bytes
    return BigInt.fromByteArray(byteArray)
  }

  static fromByteArray(byteArray: ByteArray): BigInt {
    return changetype<BigInt>(byteArray)
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
    let uint8Array = changetype<Uint8Array>(this)
    let byteArray = changetype<ByteArray>(uint8Array)
    return byteArray.toI32()
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
