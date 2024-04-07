//对象代理 有些类似于aop或者继承对象 然后重写父类方法 总之就是对原对象的代理增强
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}
let tom = new Person("tom", 12)

let proxyHandler = {
    //重写原来的get
    get(target, property) {
        console.log("this is proxy obj get")
        return target[property]
    }
}

let proxyTom = new Proxy(tom, proxyHandler)
console.log(proxyTom.name)

//js中反射
Person.prototype.sayHello = function (arg) {
    console.log("hello i am ", this.name, arg)
}
tom.sayHello("nice to meet you")
Reflect.apply(tom.sayHello, tom, ["nice to meet you too"])