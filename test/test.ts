import { BigInt, ByteArray, Bytes } from 'temp_lib/index'

// Test some BigInt methods.
export function test(): void {
    let minus_five_bytes = new ByteArray(2)
    minus_five_bytes[0] = 251
    minus_five_bytes[1] = 255
    assert(minus_five_bytes.toU32() == 65531)
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
    assert(five == BigInt.fromUnsignedBytes(five_bytes.subarray(0, 1) as Bytes))
    assert(five_bytes.toU32() == 5)

    let x = new ByteArray(1)
    x[0] = 255
    assert(BigInt.fromUnsignedBytes(x as Bytes) == BigInt.fromI32(255))

    let zero = BigInt.fromSignedBytes(new ByteArray(0) as Bytes)
    assert(zero.isZero() && zero.isI32())
    assert(zero != five)
    assert(zero != minus_five)
    assert(minus_five < zero && minus_five <= zero)
    assert(five > zero && five >= zero)

    let a = BigInt.fromI32(77123455)
    assert(a == a && a.isI32())

    let b = BigInt.fromI32(48294181)
    assert(b == b && b.isI32())
    assert(a < b && a <= b)

    a = BigInt.fromI32(9292928)
    assert(a == a && a.isI32())
    assert(a < b && a <= b)

    b = BigInt.fromI32(-9717735)
    assert(b == b && b.isI32())
    assert(b < a && b <= a)

    a = BigInt.fromI32(53499369)
    assert(a == a && a.isI32())
    assert(b < a && b <= a)

    b = BigInt.fromI32(10242178)
    assert(b == b && b.isI32())
    assert(b < a && b <= a)

    a = BigInt.fromI32(1000)
    b = BigInt.fromI32(900)
    assert(b < a && b <= a)
}
