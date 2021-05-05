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

9. 【ES2017】padStart()&padEnd()
字符串补全长度功能，
```js
"x".padStart(5, "ab") // ababx
"x".padStart(4, "ab") // abax
"x".padEnd(5, "ab") // xabab
"x".padEnd(4, "ab") // xaba
```

10. 【ES2017】trimStart & trimEnd
```js
const s = "  abc  ";
s.trim() // "abc"
s.trimStart() // "abc   "
s.trimEnd() // "   abc"
```
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

6.【ES2016】 指数运算符**
这个运算符属于右结合，多个运算连用时从右侧开始计算。
```js
2 ** 3 = 8;

let a = 2;
a **= 3; //  
```
7.【ES2020】BigInt
JavaScript所有类型的数值都保存为64位的浮点数。其中整数的数值精度只能达到53个二进制位，大于这个范围的数javascript是无法表示的。
大于2**1024的数会返回infinite。
```js
Math.pow(2, 53) + 1 === Math.pow(2, 53); // true
Math.pow(2, 1024) // Infinity
```

*BigInt只能用来表示整数，但是它没有任何位数的限制,为了与Number类型区分，需要在整数后面增加后缀n。*

```js
const a = 2172141653n;
const b = 15346349309n;
// BigInt 可以保持精度
a * b // 33334444555566667777n
// 普通整数无法保持精度
Number(a) * Number(b) // 33334444555566670000
```

*它与普通整数属于两种值。*
```js
1n === 1 // false
```
*可以使用Boolean、Number、String三个方法将BigInt转为对应类型*
```js
!0n // true
!1n // false
Boolean(0n) // false
Boolean(1n) // true
Number(1n) // 1
String(1n) // "1"
```
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
9. 扩展运算符
...代表扩展运算符,用于将数组转变为参数序列
常见用途如下所示
* 代替函数的apply方法
```js
// ES5
Math.max.apply(null, [10, 5, 15]);
// ES6
Math.max(...[10, 5, 15]);
// 等价于
Math.max(10, 15, 5);
```
* 数组复制
```js
// ES5
const a = [1, 2];
const b = a.concat();
// ES6
const b = [...a];
```
* 数组合并
```js
// ES5
const a = [1, 2];
const b = [3];
const c = [4, 5];
const d = a.concat(b, c);
// ES6
const d = [...a, ...b, ...c];
```
* 和解构赋值生成数组
```js
// ES5
const a = list[0];
const b = list.slice(1);
// ES6
const [a, ...b] = list;
```
### 对象的扩展
1. 对象的简洁表示法
ES6允许大括里直接写入变量可以作为属性名和属性值。
```js
// 对象属性
const foo = "bar";
const bar = { foo };

// 对象方法简写
const a = {
    method() {
        console.log("hello");
    }
};
const a = {
    methods: function() {
        console.log("hello");
    }
}
```
2. 属性名表达式
ES6允许字面量定义对象时键名使用表达式
```js
const a = {
    ["c" + "v"]: "花泽香菜"
};
a.cv // "花泽香菜"
```
3. 方法的name属性
```js
const a = {
    say() {
        console.log("hello");
    }
}
a.say.name // "say"
```
4. 属性的可枚举性和遍历
```js
const attrName = "foo";
// 获取对象属性的描述对象
Object.getOwnPropertyDescriptor(obj, attrName);
```
可枚举性（enumerable）是对象当前属性的一种特征描述。当该属性为false表示某些操作下会忽略当前属性。
> for ... in
> Object.keys(obj)
> JSON.stringify(obj)
> Object.assign(obj);

属性遍历的常见方法
> for ... in: 遍历对象自身和继承的所有可枚举属性。
> Object.keys(obj): 返回一个数组，包含对象自身的(不含继承)所有可枚举属性。
> Object.getOwnPropertyNames(obj)：返回一个数组，包含对象自身（不含继承）的所有可枚举以及不可枚举属性（不含symbol属性）。
> Object.getOwnPropertySymbols(obj)：返回一个数组，包含对象自身（不含继承）的所有symbol属性的键名。
> Reflect.ownKeys(obj): 返回一个数组，包含对象自身（不含继承）的所有属性，包括所有可枚举属性和不可枚举属性；也包括所有字符串键名的属性和symbol键名的属性。

5. super关键字
this关键字总是指向当前函数所在的当前对象；ES6新增了super关键字总是指向当前对象的原型。
> super关键字表示原型对象时，只能用在对象的方法中。
```js
const proto = {
    foo: "hello"
};

const obj = {
    foo: "world",
    find() {
        return super.foo
    }
}

Object.setPrototypeOf(obj, proto);
obj.find() // "hello"
```

6. 【ES2018】对象扩展符
对象的扩展运算符用于取出对象的所有可枚举属性，可以用于对象拷贝，可以用于对象合并。
扩展运算符的解构赋值得到对象属于浅拷贝，此外也不能复制继承自原型对象的属性。

7. 【ES2020】链判断运算符
如果要判断读取一个对象的属性，一般需要先判断这个对象是否存在。当属性层级过深时判断就会更加繁琐。链判断运算符（?.）就是为了解决这个问题的。
```js
// ES5
const list = res && res.data && res.data.list;
// ES6
const list = res?.data?.list;
```
8. 【ES2020】null判断运算符
读取对象属性的时候如果我们需要在该属性为undefined或者null的情况下设置默认值，我们一般会使用||或运算。但是当前面的值为0或者false时也会通过或运算直接采用默认值。null运算符（??）就是为了解决这个问题，??的行为和||基本一致，但是只有当运算符左侧的值为null或者undefined的下才会使用右侧的值。
```js
// 基础用法
const a = 1 || "暂无数据" // 1
const b = 0 || "暂无数据" // "暂无数据"，实际上此类情况下我们是希望返回0
const c = 0 ?? "暂无数据" // 0
// null判断运算符可以和链判断运算符连用
const list = res?.data?.list ?? [];
```

9. Object.is()
用于比较两个值是否相等，和===行为基本一致，用于统一javascript中同值相等的判断。==存在类型转换问题，===中NaN不等于自身且+0===-0。

10. Object.assign()【浅拷贝】
用于对象合并，将源对象自身的所有可枚举属性赋值到目标对象。
数值和布尔值都会被忽略，只有字符串的包装对象，会产生可枚举属性。
```js
const v1 = 'abc';
const v2 = true;
const v3 = 10;
const obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
```

可用于对象拷贝
```js
// 仅拷贝对象自身属性
function clone(origin) {
    return Object.assign({}, origin);
}

// 同时拷贝对象自己以及继承的属性
function clone(origin) {
    const originPrototype = Object.getPrototypeOf(origin);
    return Object.assign(Object.create(originPrototype), origin);
}
```

### 函数的扩展

1. 函数参数的默认值
```js
// ES5
function (x, y) {
    y = y || 0;
    console.log(x, y);
}
// ES6
function(x, y = 0) {
    console.log(x, y);
}
```
2. rest参数
ES6引入了rest参数（形式为...变量名）用于获取函数多余的参数，这样就可以替代argument。rest只能作为函数的最后一个参数
The rest parameter syntax allows a function to accept an indefinite number of arguments as an array, providing a way to represent variadic functions in JavaScript.
rest参数语法允许函数可以接收一个由未知长度的变量序列组成的数组作为参数，提供了一种可以在js中代表可变函数的一种方式
```js
// argument
function sortNumbers() {
    return Array.prototype.slice.call(arguments).sort();
}
// ES6
function sortNumber(...rest) {
    return rest.sort();
}
```
3. 严格模式
ES2016规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

4. name属性
返回函数的函数名。ES5中匿名函数复制给变量，该变量name属性为空，ES6则返回函数名；对于具名函数ES5、ES6都是直接返回函数名。

5. 箭头模式
作用：简化函数
```js
// 返回一个对象
let getTempItem = id => ({ id: id, name: "Temp" });
```
6. 尾调用优化

7. 【ES2017】函数参数的尾逗号

8. 【ES2019】Function.prototype.toString()
以前返回原始代码时会省略注释，修改后要求和原始代码保持完全一致。

9. 【ES2019】允许try...catch中catch省略参数
```js
// ES5
try {

} catch(e) {
    console.log(e);
}

// ES6 参数可省略
try {

} catch {

}
```

### Symbol
ES5中对象的属性名都是字符串，容易出现属性命名冲突的问题，ES6中引入了一种新的原始数据类型symbol，它代表这独一无二的值。他是js
的第七种数据类型（前六中分别是String、Number、Boolean、Undefined、null、Object）
```js
const a = symbol();
const b = symbol();
a === b // false
```
> 对于一个对象由多个模块组成的情况下，用symbol作为属性名会十分合适，可以防止键名被覆盖。

symbol.for()会登记在全局环境中供搜索，而symbol()则不会。
```js
symbol.for("bar") === symbol.for("bar"); // true
symbol("bar") !== symbol("bar"); // true
```
### Proxy

proxy就是用于修改对象某些操作的默认行为，相当于在对象外层增加一层代理，当对象被外界访问时会被该代理拦截并执行自定义的逻辑。

proxy支持的拦截操作如下：
get()、set()、has()、deleteProperty()、ownKeys()、getOwnPropertyDescriptor()、defineProperty()、getPropertyOf()、setProperty()、apply()、constructor()、preventExtensions()、isExtensible()

### Reflect

Reflect和Proxy一样也是ES6为了操作对象而引入的API
1. 将Object上一些属于语言内的方法放到Reflect对象上
2. 修复以前Object一些方法返回值异常的情况