---
title: js中的this理解
categories:
    - 前端基础
tags: 
    - javascript
date: 2020-11-24
---

this是函数运行时所在的对象（环境）。
扩展： ECMAScript中的类型分为语言类型和规范类型。
语言类型是开发者可以直接使用操作的：String、Number、Boolean、Object、Undefined、null。
规范类型：是用来用算法描述ECMAScript语言结构和语言类型的：Reference、List、Property Descriptor、Lexical Environment。Reference和this的指向密切相关，具体可参考[https://github.com/mqyqingfeng/Blog/issues/7](https://github.com/mqyqingfeng/Blog/issues/7)


this常用情况：对象中的方法，事件绑定 ，构造函数 ，定时器，函数对象的call()、apply() 方法；

## 对象中的方法
this指向取决于函数调用的位置


## 事件绑定
this指向取决于函数调用对象


## 定时器
this指向window全局对象


## 构造函数
this指向实例化的对象


## 箭头函数
箭头函数不会创建this，会从上层作用域中继承this；通过apply、call、bind只能传递参数，无法改变this指向。
PS: 箭头函数特点
1.this指向由定义时决定，继承上一层作用域且无法改变
2.箭头函数没有原型
3.箭头函数不可作为构造函数






