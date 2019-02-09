class Index {
  constructor(index,generation){
    this.index = index;
    this.generation = generation;
  }
}

class GenerationalArena {
  constructor(){
    this.items = [];
    this.generation = 0;
    this.free_list_head = null;
    this.length = 0;
  }

  insert(v){
    // lets use the first free entry if we have one
    if(this.free_list_head !== null){
      let i = this.free_list_head;
      this.free_list_head = this.items[i].next_free;
      this.items[i] = {
        generation: this.generation,
        value: v,
      }
      this.length += 1;
      return new Index(i,this.generation);
    }

    this.items.push({
      generation: this.generation,
      value: v,
    });
    let idx = new Index(this.items.length-1,this.generation);
    this.length += 1;
    return idx;
  }

  contains(idx){
    return this.get(idx) !== undefined;
  }

  get(idx){
    let e = this.items[i.index];
    if(e && e.generation === i.generation){
        return e.v;
    }
    return undefined;
  }

  remove(idx){
    if(idx.index >= this.items.length){
      return undefined;
    }

    let e = this.items[idx.index];
    if(e.generation !== undefined && e.generation == idx.generation){
      this.generation += 1;
      this.items[idx.index] =  {
          next_free: this.free_list_head,
      }
      this.free_list_head = idx.index;
      this.length -= 1;
      return e.value;
    }
    return undefined;
  }

  *[Symbol.iterator]() {
    for(var i = 0 ;i < this.items.length; i++){
      let x = this.items[i];
      if(x.generation !== undefined){
          yield {index:new Index(i,x.generation),value:x.value};
      }
    }
  }

  indices(){
    let i = {items:this.items};
    i[Symbol.iterator] = function *iter(){
      for(var i = 0 ;i < this.items.length; i++){
        let x = this.items[i];
        if(x.generation !== undefined){
            yield new Index(i,x.generation);
        }
      }
    }
    return i;
  }

  values(){
    let i = {items:this.items};
    i[Symbol.iterator] = function *iter(){
      for(var i = 0 ;i < this.items.length; i++){
        let x = this.items[i];
        if(x.generation !== undefined){
            yield x.value;
        }
      }
    }
    return i;
  }
}
