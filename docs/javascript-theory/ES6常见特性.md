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
#### codePointAt()

javascript内部字符以UTF-16存储。charAt可以获取字符串指定索引的字符；对于常规的两个字节表示的字符，可以用charCodeAt可以正确获得字符；对于四个字节代表的字符，charCodeAt只能返回前两个和后两个字节对应的值；ES6提供的codePointAt可以正确处理四个字节代表的字符。
说明：charCodeAt和codePointAt处理两个字节存储的字符时结果一致；四个字节的字符码点需要使用codePointAt获取。

#### fromCodePoint()
String.fromCharCode()不能处理四个字节存储的字符；ES6提供了fromCodePoint()来正确识别编号大于0xFFFF的字符。

#### at
ES5中charAt方法不能识别码点大于0xFFFFF的字符；ES6提供了at方法可以识别Unicode编码大于0xFFFFF的字符并正确返回。

#### 正则表示的u修饰符
可以使正则表达式中能正确识别码点大于0xFFFFF的字符
```js
function codePointLength(text) {
    var result = text.match(/[\s\S]/gu);
    return result ? result.length : 0;
}
```

#### 正则表达式y修饰符（粘连修饰符）
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

#### 判断一个字符串是否含有一个字符串
传统ES5中只有indexOf()来判断，ES6中提供了三个新的方法用于判断字符传是否被包含
-includes(): 返回Boolean，表示是否包含传入字符串
-startWith(): 返回Boolean,表示参数字符是否在源字符串的头部
-endWith(): 返回Boolean，表示参数字符是否在源字符串的尾部

#### repeat
表示将一个字符串重复n次，并返回一个新的字符串
```js
"x".repeat(3)
// "xxx"
```

#### 模板字符串
ES6提出的模板字符串使用``表示，是一种增强版的字符串。可以当作普通字符串使用；可以用来定义多行字符串；也可以在字符串中嵌入变量。

### 数值的扩展

### 数组的扩展

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