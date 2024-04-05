//柯里化函数
function sum(a,b,c){
    return a+b+c
}
console.log(sum(1,2,3))

//柯里化函数其实就是将上面的多个参数函数改为一个参数的函数，并返回一个新函数继续调用
function curryingSum(a){
    return (b) =>{
        return (c) =>{
            return a+b+c
        }
    }
}
console.log(curryingSum(1)(2)(3))

//柯里化函数主要是针对 一些代码复用场景，比如：
let base3Sum = curryingSum(1)(2)
console.log(base3Sum(4))
console.log(base3Sum(7))

//自执行函数 一般都是匿名函数，主要是就用这一次的函数 但js的自执行函数坑挺多的，比如需要()括住整体表达式，还要加;
;(function (a,b){
    console.log(a+b)
})(1,2)


