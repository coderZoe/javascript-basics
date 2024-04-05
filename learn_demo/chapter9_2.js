//函数的属性

//1. arguments 函数的所有参数
function sum(...elements){
    let count = 0;
    //arguments不是严格意义上的数组，因此不能使用数组的reduce map filter等方法
    for(arg of arguments){
        count+=arg
    }
    return count;
}
console.log(sum(1,2,3)) //6
//2. arguments.callee 返回正在执行的函数
function fa(){
    console.log("fa")
    return arguments.callee;
}
function fb(){
    console.log("fb")
    return arguments.callee;
}
//返回方法本身，再使用()调用方法
fa()()()
fb()()()

//3. arguments.length 参数长度
//4. constructor 构造函数
//5. prototype 原型

//我们需要回顾一下构造方法：
function Person(name,age){
    this.name = name;
    this.age = age;
}
let tom = new Person("tom",18)
console.log(JSON.stringify(tom))
//上面我们使用了new关键字，但new的实现其实如下：
//其核心思想其实就是原型链，Object.create()方法需要传入一个原型，而每个方法都是有原型属性的
function _new(constructor,...params){
    let obj = Object.create(constructor.prototype)
    let result = constructor.apply(obj,params)
    return (typeof result === 'object' && result != null) ? result : obj;
}

let marry = _new(Person,"Marry",20)
console.log(JSON.stringify(marry))

//关于原型链，这里解释一下 在js中每个函数都有个原型属性
//当这个函数是构造函数的时候，实际上new的时候就如上，let obj = Object.create(constructor.prototype)
//造出来的对象的原型就是构造函数的原型，所以函数原型其实往往只有函数是构造函数时有意义

//最后这里再补充下call apply和bind的区别
//首先call和apply功能基本相似，它们都是允许你指令函数运行时的上下文(this)，区别是call是正常传入参数，但apply的参数用数组组合起来，举例如下：

function sayHello(address,sex){
    console.log(this.name,this.age,address,sex)
}
let peter = {
    name: "Peter",
    age: 12
}
let zoe = {
    name: "Zoe",
    age: 16
}
sayHello.call(peter,"翻斗花园","男")
sayHello.call(zoe,"青青草原","女")
//apply是将参数放在了数组里 相对来说我还是更喜欢call
sayHello.apply(peter,["翻斗花园","男"])
sayHello.apply(zoe,["青青草原","女"])

//bind其实是对上面的两步拆解，先绑定一个上下文this，返回返回一个新的函数，再可以调用这个函数，举例如下：
let peterSayHello = sayHello.bind(peter)
peterSayHello("翻斗花园","男")
let zoeSayHelllo = sayHello.bind(zoe)
zoeSayHelllo("青青草原","女")


//可以看到无论是bind还是call或者apply 它们的核心思想都是从别的对象上借一个方法用在自己的对象上
//bind的好处是返回一个借过后的方法，方便后续利用，而不像call和apply是一次性的
