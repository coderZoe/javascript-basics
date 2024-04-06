//聊一下JS中比较关键的promise

function getPromsie(delay){
    return new Promise((resolve,reject) =>{
        setTimeout(() => {
            resolve("ok")
        }, delay);
    })
}

getPromsie(5000).then((result) => console.log(result)) //5秒后打印ok

//上面就是一个很典型的js中promise demo  由于笔者很熟悉netty中的future-promise源码，而js得实现与此基本类似，所以类比说下理解：
//首先netty中的promise是通过setSuccess或者setFail来设置结果的，我们知道结果一旦设置就代表promise的完成 
//而一旦promise完成，就需要做两件事：1. 唤醒由于promise阻塞的线程 2. 执行注册的监听器
//其中netty promise中的setSuccess其实就是js中的resolve，一旦执行resolve就代表设置正常结果，而resolve得参数就是结果值
//netty promise中得setFail 其实就是js中得reject，一旦执行reject就代表设置异常结果
//netty中注册监听器是通过addListener，而js中通过.then注册正常返回时候得监听器，而通过.catch注册异常执行时得监听器
//netty中通过get来同步阻塞等待获取promise得结果，而js中是通过await  其中js中的await要和async函数一起使用，这是一种异步阻塞
async function promiseHandle(){
    try {
        const result = await getPromsie(10000)  //10s后返回ok
        console.log(result)
    } catch (error) {
        //promise执行异常会到这里
        console.error(error)
    }
}
promiseHandle()
console.log("hello")


//js中的生成器
function* gen(){
    yield 1;
    yield 2;
    yield 3;
}
const generator = gen()
console.log(generator.next().value)
console.log(generator.next().value)
console.log(generator.next().value)

//生成器其实具备一个功能：暂停和继续执行代码，可以看到yield会自动暂停代码的执行，当再次调用next的时候又会继续从之前暂停处执行代码
//这有些类似于线程的挂起和唤醒 通过这个功能，其实我们可以实现上面说的async与await（其实js底层的async和await其实就是通过生成器实现的）
function* asyncGen(){
    const result = yield new Promise(resolve =>{
        setTimeout(() => {
            resolve("asyncGen Promise Finish")
        }, 3000);
    });
    console.log(result)
}

const asyncGenerator = asyncGen()

function run(generator){
    let iteration = generator.next()
    if(!iteration.done){
        let promise = iteration.value
        promise.then(result =>{
            generator.next(result)
        })
    }
}

run(asyncGenerator)
//如上例所示：
//核心其实是如下几处： const result = yield new Promise(...)
//这里其实会先将yield右侧处的代码返回，也即如果调用asyncGen().next()会得到一个promise
//但注意的是，只会执行yield右侧的代码，左侧的const result = yield其实不会执行，下面的console.log(result)也不会执行
//那什么时候执行呢？下一次再调asyncGen().next()的时候。
//所以我们可以认为生成器其实具备暂停和恢复执行的能力，有些类似于其他编程语言中线程的挂起和唤醒
//既然具备这个能力，那只需要在promise没执行完的时候挂起，promise执行完后再恢复执行即可
//因此下一处核心其实是
// let iteration = generator.next()
// if(!iteration.done){
//     let promise = iteration.value
//     promise.then(result =>{
//         generator.next(result)
//     })
// }
//这里先拿到promise，如果promise没完成，就注册一个监听器，监听器执行的时间必然是promise完成的时间，
//此时在这个监听器里执行generator.next(result)，由于生成器被调用next会继续执行代码，也即执行下面的
//const result = yield... 和console.log(result) 需要注意的是，我们给next方法传入了一个参数
//而这个参数其实就可以作为上一次yield的返回结果，我们知道这个result就是promise的结果，将promise的结果作为yield的返回
//因此const result = yield ...其实result赋值的就是promise的结果 这就很像 const result = await promise

//最后我们总结下：
//T1时刻，通过调用生成器.next()返回一个Promise，这个promise没完成，我们给这个Promise注册一个.then监听器，
//监听器的内容是：一旦Promise完成，拿到Promise的结果，并将结果赋值给生成器的返回，并触发生成器继续执行代码对应的是.next(result)
//T2 时刻 Promise完成，此时执行监听器代码，将Promise结果返回，并将结果设置为生成器yield的返回结果 此时const result = yield...被执行
//然后result的结果就是Promise的结果，，再然后打印result





//js中的闭包
function closures(){
    let count = 0
    return function(){
        return ++count
    }
}

let adder = closures()
console.log("count ",adder())
console.log("count ",adder())
console.log("count ",adder())
console.log("count ",adder())

