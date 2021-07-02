// # Why
// We need this to allow global variables.
//
// # How
// This is a hacky workaround to make the lazy `offset` variable of
// the AS stub runtime be eagerly executed. It works by calling the
// `__alloc` function which uses the `offset`, so that its evaluated.
//
// Since we only call `__alloc` on the Rust (graph-node) side, the
// `offset` variable isn't evaluated, so if you compile the AS code
// without this file, the global vars stay after its declaration on
// the `_start` function of the generated `.wasm` file. This causes
// problems in the following allocations.
//
// The 0 argument is just because we need no memory to be allocated.
//
// # IMPORTANT
// This should be imported in EVERY file which uses outside namespaces (graph-node host-exports code),
// just to make sure no one imports a file directly and gets an error on global variables.
//
// # Reference
// - Runtimes in AS: https://www.assemblyscript.org/garbage-collection.html#runtime-variants
// - Variable in question: https://github.com/AssemblyScript/assemblyscript/blob/f4091b8f3b6b029d30cd917cf84d97421faadeeb/std/assembly/rt/stub.ts#L9
__alloc(0);
