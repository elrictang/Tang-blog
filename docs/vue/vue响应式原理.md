---
title: Vue响应式原理
categories:
    - vue
tags: 
    - vue
date: 2021-02-02
---

## 简介
Vue在初始化的时候会对data属性声明的对象进行初始化，这个初始化的过程涉及到数据的劫持和复写，使其在数据变化时动态执行我们预设的函数。
## Vue2.0
主要原理是使用了defineProperty中的get，set方法复写原有对象读写操作。同时使用原型对象重写数组的操作函数使其也具有响应式
```ts
/**
 * vue2.0响应式原理
 */

// 响应式入口
function reactive(target:any):any {
    if(typeof target !== "object" || typeof target === null) {
        return target;
    }
    if(Array.isArray(target)) {
        const newPrototype = Object.create(Array.prototype);
        target._proto_ = newPrototype;
    }
    // 遍历target对象
    for(let key in target) {
        bindReactive(target, key, target[key]);
    }
}

// 改写数组成响应式
function bindArrayReactive():void {
    const prototype:any[] = Array.prototype;
    const newPrototype = Object.create(prototype);
    const methods:string[] = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
    methods.forEach(function(method) {
        newPrototype[method] = function(args: any) {
            prototype[method].call(this, ...args);
            // 更新视图
            renderView();
        }
    });

}

// 绑定响应式
function bindReactive(target:any, key:any, value:any):void {
    reactive(value);
    Object.defineProperty(target, key, {
        get() {
            return value;
        },
        set(val) {
            if(val !== value) {
                value = val;
                // 更新视图
                renderView();
            }
        }
    })
}

// 触发相应渲染视图
function renderView():void{

}

// 调用过程V2
const data = {
    name: 'A',
    age: 18,
    hobbies: ['basketball', 'one-piece', 'football', 'hiking']
};

bindArrayReactive();
const reactiveData =  reactive(data);

```
## Vue3.0
主要原理是使用了ES6中Proxy代理和Reflect内置对象（该对象提供了拦截JavaScript操作的方法）

优点：Proxy支持监听原生数组；Proxy获取数据只会递归到所需层级，不会继续递归；可以监听数据的手动新增和删除
```ts
/**
 * Vue3.0响应式原理
 * 使用Proxy和Reflect实现响应式
 */

function bindReactiveV3(target:any) {
    if (typeof target !== "object" || target === null) {
        return target;
    }
    const handler = {
        get(obj: any, key:any) {
            const reflect = Reflect.get(obj, key);
            return bindReactiveV3(reflect);
        },
        set(obj: any, key:any, val: any) {
            if (val === Reflect.get(obj, key)) {
                return true;
            }
            const success = Reflect.set(obj, key, val);
            return success;
        },
        deleteProperty(obj:any, key:any) {
            const success = Reflect.deleteProperty(obj, key);
            return success;
        }
    }
    const proxy:any = new Proxy(target, handler);
    return proxy;
}

// 调用过程
const data = {
    name: 'A',
    age: 18,
    hobbies: ['basketball', 'one-piece', 'football', 'hiking']
};

const reactiveData =  bindReactiveV3(data);

```