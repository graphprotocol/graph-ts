import { ByteArray, Bytes } from 'temp_lib/index'

// Test some Bytes methods.
export function test(): void {
    let longArray = new ByteArray(5)
    longArray[0] = 251
    longArray[1] = 255
    longArray[2] = 251
    longArray[3] = 255
    longArray[4] = 0
    assert(longArray.toU32() == 4294705147)
    assert(longArray.toI32() == 4294705147)

    let bytes = Bytes.fromHexString("0x56696b746f726961")
    assert(bytes[0] = 0x56)
    assert(bytes[1] = 0x69)
    assert(bytes[2] = 0x6b)
    assert(bytes[3] = 0x74)
    assert(bytes[4] = 0x6f)
    assert(bytes[5] = 0x72)
    assert(bytes[6] = 0x69)
    assert(bytes[7] = 0x61)

    assert(ByteArray.fromI32(1) == ByteArray.fromI32(1))
    assert(ByteArray.fromI32(1) != ByteArray.fromI32(2))
}
