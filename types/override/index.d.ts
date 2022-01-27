// Re-declares the `assert` function defined by AssemblyScript directly. By using this
// definition, someone is now able to do something like this:
//
//     assert(value != null, "Value must never be null at that point")
//     value.something() // Cool, `value` is know to be `non-null` by the type checker
//
declare function assert<T>(isTrueish: T, message?: string): asserts isTrueish
