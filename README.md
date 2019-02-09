# Generational Arena
This is an allocator inspired from:
* https://github.com/fitzgen/generational-arena
* https://www.youtube.com/watch?v=P9u8x13W7UE

This is a data structure that offers certain gaurantees.
* everytime an object is inserted into the arena, a completely unique index will be returned that will never be given again.
