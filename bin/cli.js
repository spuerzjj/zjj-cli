#! /usr/bin/env node
const { program } = require('commander')

// description
program.version('1.0.0', '-v, -V, -version').description('脚手架')

// create命令
program
	.command('create <app-name>')
	.description('create a new project')
	.option('-f, --force', 'overwrite target directory if it exist')
	.action((name, options) => {
		require('../lib/create')(name, options)
	}) 

// 解析参数
program.parse(process.argv)
