//字符串数组操作

//============= 1. slice与splice ===============//

//slice与splice的区别 用于字符串处理
//首先slice与splice最大的区别是slice不改变源数组，操作后会返回一个新的数组  splice是直接修改源数组

let languages = ["JavaScript","Python","Java","PHP","Golang"]
let slice1 = languages.slice(1,3)   //Python Java
console.log(slice1)

//splice用于插入/删除/替换元素 比较复杂
//首先函数接收1-n个参数，splice(index,count,item1,....,itemn)
//第一个参数index是从何除开始操作（删除/添加） 
//第二个参数是要删除几个元素，从index开始从后数，要删除几个参数，count可以为0，此时代表删除0个元素
//后面的第3-n个元素代表要插入的元素，从index开始向后插入
//举几个常见案例
//1. 删除
let languages2 = ["JavaScript","Python","Java","PHP","Golang"]
languages2.splice(1,1)
console.log(languages2)     //JavaScript Java PHP Golang

//2. 替换
let languages3 = ["JavaScript","Python","Java","PHP","Golang"]
languages3.splice(1,1,"Rust")
console.log(languages3)     //JavaScript Rust Java PHP Golang

//3. 插入
let languages4 = ["JavaScript","Python","Java","PHP","Golang"]
languages4.splice(1,0,"Rust")
console.log(languages4)     //JavaScript Rust Python Java PHP Golang


//================2.  字串包含 ==============//
//1. 使用正则匹配，这里不再演示

//2. 使用indexOf
let str1 = "hello world"
let subStr1 = "world"
let isSub = str1.indexOf(subStr1) != -1
console.log(isSub)

//3. 使用includes
let str2 = "hello world"
let subStr2 = "wor";
console.log(str2.includes(subStr2))

//=========3. 检测是否以XX开头或者结尾 =========
let str3 = "hello world"
let startStr = "hello"
let endStr = "world"
console.log(str3.startsWith(startStr))
console.log(str3.endsWith(endStr))