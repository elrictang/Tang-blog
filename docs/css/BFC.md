---
title: BFC
categories:
    - 前端基础
tags: 
    - css
date: 2021-04-25
---

## 概念
BFC又叫块级格式化上下文，他提供了一个独立的环境，保证其内容元素布局以及相邻元素之间相关作用，同时也不影响外部的环境

## 渲染规则
1. BFC是一个独立的容器，其内部元素不会影响外部元素的布局，同理外部也不会影响内部元素布局。
2. BFC内部相邻元素垂直方向的外边距会产生重叠；不同BFC之间的外边距不会发生重叠。
3. BFC的区域不会与浮动元素的区域发生重叠。（使用于两栏自适应布局，父元素设为BFC, 左侧子元素设为浮动元素，右侧和父元素同宽）
4. 计算BFC高度的时候浮动元素参与高度计算。（体现为可以设置父元素为BFC可清除浮动）

## 如何创建
1. 绝对定位元素(position属性为fixed或者absolute)
2. 浮动元素（float属性不为none）
3. overflow属性不为visible
4. display属性为flex,inline-block, inline-flex, table-cell, table-flex等

