# Generational Arena
This is an allocator inspired from:
* https://github.com/fitzgen/generational-arena
* https://www.youtube.com/watch?v=P9u8x13W7UE

# Example

```javascript
let {GenerationalArena} = require("generational-arena");
let a = new GenerationalArena();
let f = a.insert("foo")
let b = a.insert("bar")
a.contains(b) // returns true
a.get(b)      // returns "bar"
a.remove(f);  // returns "foo"
a.contains(f) // returns false
a.get(f)      // returns undefined
for(k of a.values()){
  console.log(k)     
}
// bar
for(k of a.indices()){
  console.log(k)     
}
// Index{...}
for(k of a.indices()){
  console.log(k)     
}
// {index:INdex{...},value:"bar"}
```

# Why?
This is a data structure that offers certain gaurantees and tradeoffs.
* everytime an object is inserted into the arena, a completely unique index will be returned that will never be given again.
* whenever an index returned from arena is removed, space is freed to be re-used
* once an index is freed, attempting to use it to get a value from the arena will return `undefined`
* an index can be converted to and from a 64-bit integer represented as a big integer
* an arena can hold max 2^32-1 items ( as limited by a javascript array )
* an arena can hold max 2^32-1 generations
* a generation increases on successful item removal
* memory isn't freed back to operating system, just freed to be reused

Why is something like this useful?
* being able to ask and release for memory with indexes without having to worry about if someone will mistakenly reuse a dead index
* an index convertable to 64-bit will be able to be sent across to a web assembly module
* useful in writing ECS engines to reuse memory for component allocation
