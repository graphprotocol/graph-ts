import { BigInt, ByteArray, Bytes } from 'temp_lib/index'

// Test some BigInt methods.
export function test(): void {
    let bytes = new ByteArray(4)
    bytes[0] = 5
    bytes[1] = 0
    let five = BigInt.fromSignedBytes(bytes as Bytes)
    assert(!five.isZero())

    let zero = BigInt.fromSignedBytes(new ByteArray(0) as Bytes)
    assert(zero.isZero())
    assert(zero != five)
}
