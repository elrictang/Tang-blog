---
title: ES6重要特性
categories:
    - 前端基础
tags: 
    - javascript
date: 2021-04-11
---

## promise

### 概述
promise是一种异步解决方案，最早有社区提出，现在已加入ES6规范。它比传统的回调函数更加优雅，可以像同步操作一样书写异步函数，解决了回调函数多层嵌套的问题。

promise有两个特点，具体如下：
1. 它内部的状态一共有pending、fullfilled、rejected三种，且不受外界影响。
2. 状态一旦改变是不可逆的，状态变化只有两种情况从pending->fullfilled，pending->rejected。

### 常见方法

1. Promise.all()
2. Promise.race()
3. Promise.settled()
4. Promise.any()

### 实现原理

1. promiseA+规范
> 内部有三个状态，分别为pending, fullfilled、rejected, 且只有两种状态变化pending-> fullfilled, pending ->
 rejected, 且状态变化之后不可逆。
> thenable: promise需要有then方法来存取当前（or最终）的值或者原因，且then返回的对象也是promise对象，支持链式调用。then
```js
promise.then(onFulfilled, onRejected);
```
> promi