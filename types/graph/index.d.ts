/**
 * Manually allocate memory via the AssemblyScript built-in allocator
 *
 * **Important** You should never call that by ourself, this is for internal usage only.
 */
declare function __alloc(byteCount: number): usize;