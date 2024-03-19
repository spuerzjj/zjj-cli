# ZJJ-CLI

## 项目概述

一个脚手架项目，可以快速的生成项目模板

## 功能特性

1. 通过commander，inquirer等插件实现与用户的交互
2. 借助于github的api，获取用于用户选择的repo列表，tag列表
3. 确定模板后后下载到当前目录

### 1. 如何与用户交互
- commander，负责注册识别命令，这里主要就是一个create命令
- inquirer，向用户问询并提供选项让用户选择
### 2. 主要使用了哪些api
- 查询repos列表，https://api.github.com/orgs/${org}/repos
- 查询tags列表，https://api.github.com/repos/${org}/${repo}/tags
- 下载模板，这里使用了download-git-repo库

### 3. 如果我要使用，需要哪些准备工作
1. 需要在github创建一个组织，替换掉代码我的zjjZone
2. 在组织中上传一些repo
3. 需要在每个repo打上tag

## 如何使用

### 1. 安装依赖

```bash
npm install
```

### 2. 关联/取消关联

```bash
npm link

npm unlink -g 
```

### 3. 在任意目录去创建项目

```bash
zli create prjectName
```
