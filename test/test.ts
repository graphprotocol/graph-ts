import { ByteArray } from 'temp_lib/index'

// `export` so this isn't considered dead code.
export function foo(): void {
    let a = new ByteArray(0)
    let b: string = a.toBase58()
}