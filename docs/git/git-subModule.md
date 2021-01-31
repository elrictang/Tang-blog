# git subModule
## 介绍
对于复杂项目需要将部分功能拆解成独立的模块，就需要使用git subModule来创建独立的子模块。
## 使用
1. 创建git子仓库后目录中会出现.gitmodules文件，含有子仓库的名称、路径等信息
```git
git add subModule <REPO_URL>
```
2. 初始化子仓库
```git
git subModule init
```
3. 更新子仓库
```git
git subModule update
```
4. 移除子模块
```git
git submodule deinit subModuleName
git rm subModuleName
```
