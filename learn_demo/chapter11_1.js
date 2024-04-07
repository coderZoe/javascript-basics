//ES6中新增class 且在class中新增constructor构造方法

class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}
let tom = new Person("Tom", 12)
console.log(JSON.stringify(tom))

let { name, age } = tom;
console.log(name, age)

//clone对象
//浅clone
//1. 扩展运算符
let address = {
    city: "LA",
    country: "USA"
}
tom.address = address;
let marry = { ...tom }
marry.name = "Marry"
marry.age = 16
marry.address.city = "NewYork"
console.log(JSON.stringify(marry))
console.log(JSON.stringify(tom))
//2. Object.assign()
let perter = Object.assign({}, tom)
perter.name = "Peter"
perter.address.city = "WT"
console.log(JSON.stringify(tom))
console.log(JSON.stringify(perter))

//其中Object.assign功能更强大 Object.assign(target, ...sources)

const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

const returnedTarget = Object.assign(target, source);

console.log(target); // { a: 1, b: 3, c: 5 }
console.log(returnedTarget); // { a: 1, b: 3, c: 5 }

//深拷贝
let john = JSON.parse(JSON.stringify(tom))
john.name = "John"
john.address.city = "BeiJing"
john.address.country = "China"
console.log(JSON.stringify(tom))
console.log(JSON.stringify(john))

//深拷贝的实现

function deepClone(obj) {
    let cloneObj = {}
    for (const property in obj) {
        //深层对象，递归拷贝
        if (typeof obj[property] === "object" && obj[property] != null) {
            cloneObj[property] = deepClone(obj[property])
        } else {
            cloneObj[property] = obj[property]
        }
    }
    return cloneObj
}
let jeffy = deepClone(tom)
jeffy.name = "jeffy"
jeffy.address.country = "France"
console.log(JSON.stringify(tom))
console.log(JSON.stringify(jeffy))


//map与object
let myPerson = {
    name: "javascript",
    age: 20
}

//对象遍历
console.log("============")
for (const property in myPerson) {
    if (myPerson.hasOwnProperty(property)) {
        console.log(property, myPerson[property])
    }
}
for (const [key, value] of Object.entries(myPerson)) {
    console.log(`${key}:${value}`)
}

for (const value of Object.values(myPerson)) {
    console.log(value)
}
for (const key of Object.keys(myPerson)) {
    console.log(key)
}

console.log("xxxxxxxxxxxxxxxxxxxxx")
let myMap = new Map()
//js中map通过get和set
myMap.set("name", "javascript")
myMap.set("age", 20)

//这里用了解构来遍历key value
for (const [key, value] of myMap) {
    console.log(key, value)
}
//只遍历key
for (const key of myMap.keys()) {
    console.log(key)
}
//只遍历value
for (const value of myMap.values()) {
    console.log(value)
}






