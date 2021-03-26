---
title: ES6常见特性
categories:
    - 前端基础
tags: 
    - javascript
date: 2021-03-11
---

## 概述
ES6时ECMAScript的简称，于2015年6月正式发布，是JavaScript的语言标准，相比于ES5提供了更加强大的功能和新特性。

## ES6

### 块级作用域let、const
let、const声明的变量仅在当前代码块有效，相当于创建了块级作用域，适用for循环计数器
let声明的变量值可更改，const声明的变量值不可更改(引用类型是指地址不可更改)
var存在变量提升现象；而let、const不存在

### 解构赋值（Destructuring）
1. 定义

类似模式匹配，只要等号两边的模式相同左边的变量就会被赋予相应的值

2.  特性

>解构只能用于数组或者对象，解构不成功则变量的值会变成undefined
```js
let [a, b, c] = [1, 2];
// a = 1; b = 2; c = undefined;
```
>解构赋值允许指定默认值
```js
let [a, b=2] = [1]
// a = 1; b =2;
```
>只要某种数据解构实现了Iterator接口，都可以采用数组形式的解构赋值

>对象的解构赋值和数组形式的区别是需要保证变量和属性同名
```js
var { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"
```
3. 用途
* 交换变量的值
```
[x, y] = [y, x];
```

* 函数参数的定义
```js
function f({x, y, z}) { ... }
```

* 函数参数指定默认值
```js
function f({x=1, y=2, z=3}) { ... }
```

* 加载模块指定方法
```
import { Scroll } from "cube-ui"
```

* 解析Map数据解构
```js
const map = new Map();
map.set(a, 1);
map.set(b, 2);
for (let [key, value] of map) {
    console.log(`${key} is ${value}`);
}
for (let [,value] of map) {
    console.log(value);
}
```

### 字符串的扩展
1. codePointAt()

javascript内部字符以UTF-16存储。charAt可以获取字符串指定索引的字符；对于常规的两个字节表示的字符，可以用charCodeAt可以正确获得字符；对于四个字节代表的字符，charCodeAt只能返回前两个和后两个字节对应的值；ES6提供的codePointAt可以正确处理四个字节代表的字符。
说明：charCodeAt和codePointAt处理两个字节存储的字符时结果一致；四个字节的字符码点需要使用codePointAt获取。
2. fromCodePoint()
String.fromCharCode()不能处理四个字节存储的字符；ES6提供了fromCodePoint()来正确识别编号大于0xFFFF的字符。

3. at
ES5中charAt方法不能识别码点大于0xFFFFF的字符；ES6提供了at方法可以识别Unicode编码大于0xFFFFF的字符并正确返回。

4. 正则表示的u修饰符
可以使正则表达式中能正确识别码点大于0xFFFFF的字符
```js
function codePointLength(text) {
    var result = text.match(/[\s\S]/gu);
    return result ? result.length : 0;
}
```

5. 正则表达式y修饰符（粘连修饰符）
和g修饰符一样都是用作全局匹配；不同点在于g只保证剩余位置中存在匹配；而y修饰符匹配必须从剩余的第一个位置开始。
```js
var s = "aaa_aa_a";
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]

r1.exec(s) // ["aa"]
r2.exec(s) // null
```

6.  判断一个字符串是否含有一个字符串
传统ES5中只有indexOf()来判断，ES6中提供了三个新的方法用于判断字符传是否被包含
-includes(): 返回Boolean，表示是否包含传入字符串
-startWith(): 返回Boolean,表示参数字符是否在源字符串的头部
-endWith(): 返回Boolean，表示参数字符是否在源字符串的尾部

7. repeat
表示将一个字符串重复n次，并返回一个新的字符串
```js
"x".repeat(3)
// "xxx"
```

8. 模板字符串
ES6提出的模板字符串使用``表示，是一种增强版的字符串。可以当作普通字符串使用；可以用来定义多行字符串；也可以在字符串中嵌入变量。

### 数值的扩展

1. 二进制和八进制新的表示法
ES6增加二进制和八进制表示法，分别用0b和0o前缀表示
```js
0b111110111 === 503 // true
0o767 === 503 // true
```
2. Number.isFinite(), Number.isNaN()
增加Number.isFinite()方法判断数字是否有限
增加Number.isNaN()方法判断一个值是否为NaN

3. Number.parseInt(), Number.parseFloat()
ES6将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。

4. Number.isInteger()和安全整数
增加Number.isInteger()判断一个数值是否为整数
```js
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger(25.1) // false
Number.isInteger("15") // false
Number.isInteger(true) // false
```
javascript能够准确表示的整数范围是-2^53 ~ 2^53之间；ES6引入MAX_SAFE_INTEGER和MIN_SAFE_INTEGER两个常量表示边界；使用Number.isSafeInteger()来判断一个整数是否在有效范围之内。

5. Math对象扩展
Math.trunc()用于去除一个数的整数部分
Math.sign()用于判断一个数字的整数，参数为正数时返回+1，为负时返回-1，为0时返回0
### 数组的扩展
1. Array.from
Array.from用于将两类对象转为真正的数组：类数组对象(array-like),如querySelectorAll返回的类数组DOM对象还有arguments函数参数对象；可遍历对象(iterable)，如ES6的Set和Map结构。

任何有length属性的对象都可以通过Array.from方法转为数组，类数组对象的本质特征就是具有length属性
只要部署了Itereator接口的数据结构，Array.from都能将其转为数组；扩展运算符...背后调用的就是遍历器接口（Symbol.iterator）
应用：Array.from()可以将字符串转为数组并返回其长度；可避免javascript将大于\uFFFF的Unicode字符算作两个字符的问题。
```js
// 类数组
let pEls = document.querySelectorAll('p');
// ES5
Array.prototype.slice.call(pELs);
// ES6-Array.from()
Array.from(pEls).forEach(pEl => {
    console.log(pEl);
});

// 遍历器
Array.from(new Set([2,3,1,2]));
```
2. Array.of
Array.of()可以将一组值转为数组，该方法的主要目的时弥补构造函数Array()处理不同参数时的行为不一致问题,只有参数个数不少于两个时Array才会返回有参数组成的新数组。比如参数为一个时(new Array(4))会把其看成初始化的长度而不是数组成员。
```js
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3] ,而Array(3) === [empty * 3]
Array.of(3).length // 1
```

3. Array.fill
Array.fill使用给定值填充数组，通常用于空数组的初始化。它可接收第二、第三的参数，用于指定填充的起止位置。
```js
[1,3,4].fill(8); // [8,8,8]
new Array(3).fill(7) // [7,7,7]
```
4. find & findIndex
这两个方法都是用于找出满足条件的第一个元素，相比indexOf而言可以识别NaN
find找出数组中第一个符合条件的数组元素
```js
[1,3,6,9].find((val, index, arr) => {
    return val > 5
});  // 6
```
findIndex用法与find一致。返回第一个符合条件的数组元素的位置
```js
[1,3,6,9].findIndex((val, index, arr) => {
    return val > 5
}); // 2
```

5. keys()|values()|entries()
ES6提供三个新的方法用于遍历数组，他们都返回一个遍历器，可以用for...of循环进行遍历。其中keys返回的键名的遍历器；values返回键值遍历器；entries返回键值对遍历器
```js
for(let index of ['a', 'b'].keys()) {
    console.log(index)
}

for(let [index, elem] of ["a", "b"].entries()) {
    console.log()indx, elem;
}
```
如果不使用for...of循环可以手动调用遍历器对象的next方法进行遍历。
```js
const letters = ["c","b","d"];
const entries = letters.entries();
console.log(entries.next().value); // [0, "c"]
console.log(entries.next().value); // [1, "b"]
console.log(entries.next().value); // [2, "d"]
```
6. Array.prototype.includes() 【ES7】
返回一个布尔值，表示某个数组是否包含给定的值。
```js
[1,2,3].includes(3) // true
[1,2,NaN].includes(NaN) // true
```

7. 数组推导（array comprehension）
ES6提供简洁写法，允许直接通过现有数组生成新的数组，这被称为数组推导
```js
// 条件判断
for (i of [1,4,2,3,-8]) if (i < 3) i];
// 等价于
[1,4,2,3,-8].filter(function(i) { return i < 3 });
```
```js
// 单个循环
const a1 = [1,2,3,4];
const a2 = [for (i of a1) i*2]; // [2, 4, 6, 8]
// 多个循环
const b1 = ["x1", "y1"];
const b2 = ["x2", "y2"];
const b3 = ["x3", "y3"];
[for (q of b1) for(w of b2) for(r of b3) console.log(q + w + r)]; 

```
8. Array.observe & Array.unObserve
这两个方法用于监听（取消监听）数组的变化，指定回调函数。

它们的用法与Object.observe和Object.unobserve方法完全一致，也属于ES7的一部分，请参阅《对象的扩展》一章。唯一的区别是，对象可监听的变化一共有六种，而数组只有四种：add、update、delete、splice（数组的length属性发生变化）。

### 对象的扩展

### 函数的扩展

1. 箭头函数

### Set & Map

### Iterator & for...of

### Generator函数

### Promise对象

### Class & Module


## ES7

###

### Array.proptotype.includes

### Exponentiation Operator

## ES8

### padStart/padEnd

### Object.values()

### Object.entries()