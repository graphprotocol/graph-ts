import { BigInt, ByteArray, Bytes } from 'temp_lib/index'

// Test some BigInt methods.
export function test(): void {
    let minusFiveBytes = new ByteArray(2)
    minusFiveBytes[0] = 251
    minusFiveBytes[1] = 255
    let minusFive = BigInt.fromSignedBytes(minusFiveBytes as Bytes)
    assert(minusFive == BigInt.fromI32(-5))
    assert(!minusFive.isZero() && minusFive.isI32())
    assert(minusFiveBytes.toU32() == 65531)
    assert(minusFiveBytes.toI32() == -5)

    let fiveBytes = new ByteArray(2)
    fiveBytes[0] = 5
    fiveBytes[1] = 0
    let five = BigInt.fromSignedBytes(fiveBytes as Bytes)
    assert(!five.isZero() && five.isI32())
    assert(five == BigInt.fromI32(5))
    assert(five != minusFive)
    assert(five == BigInt.fromUnsignedBytes(fiveBytes.subarray(0, 1) as Bytes))
    assert(fiveBytes.toU32() == 5)
    assert(fiveBytes.toI32() == 5)

    let x = new ByteArray(1)
    x[0] = 255
    assert(BigInt.fromUnsignedBytes(x as Bytes) == BigInt.fromI32(255))
    
    let zero = BigInt.fromSignedBytes(new ByteArray(0) as Bytes)
    assert(zero.isZero() && zero.isI32())
    assert(zero != five)
    assert(zero != minusFive)
    assert(minusFive < zero && minusFive <= zero)
    assert(five > zero && five >= zero)
    
    let aI32 = 77123455
    let a = BigInt.fromI32(aI32)
    assert(a == a && a.isI32() && a.toI32() == aI32)
    
    let bI32 = 48294181
    let b = BigInt.fromI32(bI32)
    assert(b == b && b.isI32() && b.toI32() == bI32)
    assert(b < a && b <= a)
    
    aI32 = 9292928
    a = BigInt.fromI32(9292928)
    assert(a == a && a.isI32() && a.toI32() == aI32)
    assert(a < b && a <= b)
    
    bI32 = -9717735
    b = BigInt.fromI32(bI32)
    assert(b == b && b.isI32() && b.toI32() == bI32)
    assert(b < a && b <= a)
    
    aI32 = 53499369
    a = BigInt.fromI32(aI32)
    assert(a == a && a.isI32() && a.toI32() == aI32)
    assert(b < a && b <= a)
    
    bI32 = 10242178
    b = BigInt.fromI32(bI32)
    assert(b == b && b.isI32() && b.toI32() == bI32)
    assert(b < a && b <= a)
    
    a = BigInt.fromI32(1000)
    b = BigInt.fromI32(900)
    assert(b < a && b <= a)

    a = BigInt.fromI32(123)
    b = BigInt.fromI32(124)
    assert(a < b && a <= b)
    assert(b > a && b >= a)

    a = BigInt.fromI32(I32.MIN_VALUE)
    b = BigInt.fromI32(I32.MAX_VALUE)
    assert(a < b && a <= b)
    assert(b > a && b >= a)
    assert(a.toI32() == -2147483648)
    assert(b.toI32() == 2147483647)

    // This is 8071860 in binary.
    let blockNumber = new ByteArray(3)
    blockNumber[0] = 180
    blockNumber[1] = 42
    blockNumber[2] = 123
    let blockNumberBigInt = blockNumber as BigInt
    let latestBlock = BigInt.fromI32(8200001)
    assert(!blockNumberBigInt.gt(latestBlock))
}
