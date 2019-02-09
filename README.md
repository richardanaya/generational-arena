# Generational Arena
This is an allocator inspired from:
* https://github.com/fitzgen/generational-arena
* https://www.youtube.com/watch?v=P9u8x13W7UE

This is a data structure that offers certain gaurantees.
* everytime an object is inserted into the arena, a completely unique index will be returned that will never be given again.
* whenever an index returned from arena is removed, space is freed to be re-used
* once an index is freed, attempting to use it to get a value from the arena will return `undefined`
* an index can be converted to and from a 64-bit integer represented as a big integer 
* an arena can hold max 2^32-1 items ( as limited by a javascript array )
* an arena can hold max 2^32-1 generations
* a generation increases on successful item removal
