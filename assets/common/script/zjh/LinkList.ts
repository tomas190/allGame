
class Item<T>{
    private _name: string;
    private _value: T;
    private _prev: Item<T>;//指向的上一个元素
    private _next: Item<T>;//指向的下一个元素
    constructor(val: T,name?:string){
        this._value = val;
        this._name = name;
        this._prev = null;
        this._next = null;
    }
    set name(name: string) {
        this._name = name;
    }
    get name(): string {
        return this._name;
    }
    set value(value: T) {
        this._value = value;
    }
    get value(): T {
        return this._value;
    }
    set prev(item: Item<T>) {
        this._prev = item;
    }
    get prev(): Item<T> {
        return this._prev;
    }
    set next(item: Item<T>) {
        this._next = item;
    }
    get next(): Item<T> {
        return this._next;
    }
}

class LinkList<T>{

    private _count: number = 0;//记录元素个数
    private _header: Item<T>;//头元素
    private _tail: Item<T>;//尾元素
    
    constructor(){
        this._header = new Item<T>(null);
        this._tail = new Item<T>(null);
        this._header.prev = this._header.next = this._tail;
        this._tail.prev = this._tail.next = this._header;
    }

    add(a:T){
       let item = new Item<T>(a);
       item.prev = this._tail.prev;
       item.next = this._tail;
       this._count++;
    }  

    insert(){

    }


}
export default new LinkList;