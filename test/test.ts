import { BigInt, ByteArray, Bytes } from 'temp_lib/index'

// Test some BigInt methods.
export function test(): void {
    let minus_five_bytes = new ByteArray(2)
    minus_five_bytes[0] = 251
    minus_five_bytes[1] = 255
    let minus_five = BigInt.fromSignedBytes(minus_five_bytes as Bytes)
    assert(minus_five.isI32())
    assert(minus_five == BigInt.fromI32(-5))
    assert(!minus_five.isZero() && minus_five.isI32())

    let five_bytes = new ByteArray(2)
    five_bytes[0] = 5
    five_bytes[1] = 0
    let five = BigInt.fromSignedBytes(five_bytes as Bytes)
    assert(!five.isZero() && five.isI32())
    assert(five == BigInt.fromI32(5))
    assert(five != minus_five)

    let zero = BigInt.fromSignedBytes(new ByteArray(0) as Bytes)
    assert(zero.isZero() && zero.isI32())
    assert(zero != five)
    assert(zero != minus_five)
    assert(minus_five < zero && minus_five <= zero)
    assert(five > zero && five >= zero)
}
