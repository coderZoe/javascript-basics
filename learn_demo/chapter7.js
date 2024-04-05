//数组

//=======1. 数组添加删除元素=====//


//1. slice与splice 见chapter6

//2. pop和push
let fruits = ["Apple", "Orange", "Banana"]
fruits.push("Pear")
console.log(fruits)
fruits.pop()
console.log(fruits)

//3. shift和unshift
//shift删除头元素
fruits.shift()
console.log(fruits)
//unshift插入头元素
fruits.unshift("Apple", "Cherry")
console.log(fruits)
//4. concat 连接两个数组  不会修改原数组，而是会返回一个新数组
let doc = [".docs", ".xlsx", ".md"]
let array1 = doc.concat(fruits)
console.log(array1)


//5. map传入一个方法，方法会返回元素，源数组里的每个元素执行方法，然后返回的元素收集起来创建一个新数组 类似于Java流中的map
let sfruits = fruits.map(element => "s" + element)
console.log(sfruits)

//6. filter 与Java流中的filter功能类似
let filterFruits = fruits.filter(element => element.startsWith("A"))
console.log(filterFruits)

//7. reduce reduce每个元素迭代执行，然后返回一个最终结果
let reduceResult = fruits.reduce((result, element) => result + element)    //AppleCherryOrangeBanana
console.log(reduceResult)

//8. reduceRight 与reduce基本一样，但是倒着 从右向左使用
let reduceRightResult = fruits.reduceRight((result, element) => result + element)    //BananaOrangeCherryApple
console.log(reduceRightResult)

//9. every 测试方法中的每个元素是否都通过了测试，返回bool，通过filter也可以实现，filter过滤结果与原数组一样就是every通过
let everyResult = fruits.every(element => element.length > 2)   //true
console.log(everyResult)
//与下面等效果
let everyFilterResult = fruits.filter(element => element.length > 2).length == fruits.length
console.log(everyFilterResult)

//10. some 有一个通过就行
let someResult = fruits.some(element => element.startsWith("App"))
console.log(someResult)
//与下面等效
let someFilterResult = fruits.filter(element => element.startsWith("App")).length > 0
console.log(someFilterResult)

//11. find 找到第一个满足条件的元素并返回
let findResult = fruits.find(element => element.length > 5)
console.log(findResult)


//12. 排序 sort
let unsortArray = [1, 4, 2, 7, 3, 8, 5]
let sortArray = unsortArray.sort((a, b) => a - b)
console.log(sortArray)  //[1, 2, 3, 4, 5, 7, 8]

//===========2. 数组遍历 ===============//
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i])
}

//for of用于遍历数组 for of迭代的是值 for in迭代的是key
for (let i of fruits) {
    console.log(i)
}
//或者直接调用for-each方法，这应该是数组原型链支持的方法，方法支持多个参数
fruits.forEach((element, index) => {
    console.log(element, index)
});



//3. ============ rest与spread ================= //
//rest与spread的语法都是剩余运算符... 但rest用于将多个参数合并为一个数组，而spread用于将一个数组/对象展开为单个元素，举例如下：

//rest用于将多个元素合成一个数组，下例中就是将1，2，3，4，5元素合成数组element
function sum(start, ...element) {
    return start + element.reduce((result, item) => result + item)
}

console.log(sum(0, 1, 2, 3, 4, 5)) //15


//spread用于将数组/对象拆为单个元素，比如下例中将数组sumItem自动拆为x,y,z
function sum2(x, y, z) {
    return x + y + z
}
let sumItem = [1, 2, 3]
console.log(sum(...sumItem))

let spreadArray1 = [3, 4, 5]
let spreadArray2 = [1, 2, ...spreadArray1, 6, 7]
console.log(spreadArray2)

let stu1 = {
    age: 1,
    name: "Tom",
    sex: "Man"
}
let stu2 = {
    ...stu1
}
console.log(JSON.stringify(stu2))


//=============4. 解构 ============//
//js中的解构主要用于从数组或对象中解析出元素
//数组解构如下：
let animals = ["mouse", "cat", "dog"]
let [a, b, c] = animals;
console.log(a, b, c) //mouse cat dog
let [d, , e] = animals;
console.log(d, e) //mouse dog

//对象解构如下：
let person = {
    name: "Tom",
    age: 18,
    sex: "Man"
}
let { name, age, sex } = person;
console.log(name, age, sex) //Tom 18 Man

//指定属性映射
let { name: personName, age: PersonAge } = person
console.log(personName, PersonAge) //Tom 18

//方法参数是解构
function consolePerson({ name, age }) {
    console.log(name, age)
}
consolePerson(person) //Tom 18

function consoleAnimal([a, b]) {
    console.log(a, b)
}
consoleAnimal(animals) //mouse cat

//替换
let num1 = 10;
let num2 = 20;
[num1, num2] = [num2, num1]
console.log(num1, num2) //20 10

//默认值
let animals2 = ["Lion", "Tigger"]
let [a2 = "a2", b2 = "b2", c2 = "c2"] = animals2
console.log(a2, b2, c2) //Lion Tigger c2

let person2 = {
    name: "Marry",
    sex: "Woman"
}
let { name: Person2Name = "Test", age: Person2Age = -1, sex: Person2Sex = "Test" } = person2
console.log(Person2Name, Person2Age, Person2Sex)  //Marry -1 Woman

function consolePerson2({ name, age = 10 }) {
    console.log(name, age)
}
consolePerson2(person)  //Tom 18
consolePerson2(person2) //Marry 10



//================== 5.JSON ==================//
const personData = {
    "personsJsonArray": [
        { "name": "Tom", "age": 18 },
        { "name": "Marry", "age": 16 },
        { "name": "John", "age": 28 },
        { "name": "Peter", "age": 38 }
    ]
}
console.log(personData.personsJsonArray[0].name)

//parse与stringify
const personObj = [
    {
        name: "Tom",
        age: 18
    },
    {
        name: "Marry",
        age: 28
    },
    {
        name: "John",
        age: 38
    }
]
console.log(JSON.stringify(personObj))  //[{"name":"Tom","age":18},{"name":"Marry","age":28},{"name":"John","age":38}]

let personJson = '[{"name":"Tom","age":18},{"name":"Marry","age":28},{"name":"John","age":38}]';
console.log(JSON.parse(personJson)[1].name) //Marry
