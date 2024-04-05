// 箭头函数
let consoleHello = () => {
    console.log("Hello")
}
consoleHello()

//其等价于
function consoleHello2() {
    console.log("Hello")
}
consoleHello2()
//或者
let consoleHello3 = function () {
    console.log("Hello")
}
consoleHello3()

//单参数
let consoleNum = x => console.log(x)
consoleNum(1)

//多参数
let consoleNumSum = (x, y) => console.log(x + y)
consoleNumSum(1, 2) //3

//箭头方法使用的注意场景：
//=======1.  应该使用的场景==========//
//1. 无需this的 箭头函数与普通函数最大的区别是箭头函数没有this上下文，而普通函数有this,其中普通函数的this指向调用时的环境 举例如下：

const person = {
    name: "Tom",
    say: function () {
        console.log(this.name)
    }
}
//由于say方法是普通函数，且调用它的环境是person，因此这里的this.name就是person.name
person.say() //Tom
//但如果要是
const person2 = {
    name: "Tom",
    say: () => {
        console.log(this.name)
    }
}
//此时say是箭头函数，没有上下文，那它的上下文就是全局对象，因此不存在name属性 
person2.say()   //undefined

//2. 回调函数中
const unsortedArray = [4, 7, 2, 6]
const sortedArray = unsortedArray.sort((a, b) => a - b)
console.log(sortedArray) //[2,4,6,7]
//或者
const person3 = {
    name: "Tom",
    say: function () {
        setTimeout(() => {
            console.log(this.name)
        }, 0)
    }
}
//say本身是普通函数，因此具有this是person3,say里的回调函数() =>{console.log(this.name)} 本身无this，因此继承say的this，也是person3，因此可以找到name
person3.say()   //Tom
//但如果是下面这样就有问题：因为person4CallBack是普通方法，他有this，它的this其实是全局对象
function person4CallBack() {
    console.log(this.name)
}

const person4 = {
    name: "Tom",
    say: function () {
        setTimeout(person4CallBack, 0)
    }
}
person4.say()   //undefined

//3.构造方法不能用箭头函数，因为无法继承this
const Person5 = (name) => {
    this.name = name
}
// const john = new Person5("John")    //会报错

const Person6 = function (name) {
    this.name = name
}
const marry = new Person6("Marry")
console.log(marry.name) //Marry

//4. arguments js中的arguments代表所有入参，是个数组，但箭头函数没有argumenst
function argumentsTest1(a,b){
    console.log(arguments[0])
}
argumentsTest1(1,2) //1

let argumentsTest2 = (a,b) =>{
    console.log(arguments[0])
}
argumentsTest2(1,2) //undefined 这里是由于运行环境是nodejs环境，全局变量有arguments，但不是入参参数上那个，如果是浏览器环境则报错

//5. 添加原型链方法也不应该使用箭头函数，如：
function PersonPrototype(name ,age){
    this.name = name
    this.age  = age
} 
PersonPrototype.prototype.say = () =>{
    console.log("say",this.name)
}
new PersonPrototype("Tom",18).say() //say undefined

PersonPrototype.prototype.say2 = function(){
    console.log("say2",this.name)
}
new PersonPrototype("Tom",18).say2() //say2 Tom

//6. 事件处理器
document.getElementById('myButton').addEventListener('click', function() {
    console.log(this); // 这里的 `this` 指向触发事件的元素，即 'myButton'
  })
document.getElementById('myButton').addEventListener('click', () => {
    console.log(this); // 这里的 `this` 不再指向触发事件的元素，而是指向定义事件处理器时的上下文 例如，如果在全局作用域中定义，则this可能是全局对象，如window）
  })

