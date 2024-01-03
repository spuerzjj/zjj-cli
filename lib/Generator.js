const dgr = require('download-git-repo')
const util = require('util')
const inquirer = require('inquirer')
const chalk = require('chalk')
const { wrapLoading } = require('./utils')
const { getRepoList, getTagList } = require('./http')

class Generator {
	constructor(name, targetDir) {
		this.name = name
		this.targetDir = targetDir
		this.downloadGitRepo = util.promisify(dgr)
	}

	// 核心创建逻辑
	async create() {
		try {
			// 1. 获取模板名称
			const repo = await this.getRepo()
			// 2. 获取tag名称，其实就是版本号
			const tag = await this.getTag(repo)
			// 3. 下载
			// await this.download(repo, tag)
		} catch (error) {
			console.error('An error occurred during project creation:', error)
		}
	}

	// 获取用户选择的模板
	async getRepo() {
		// 1. 拉模板
		const repoList = await wrapLoading(
			getRepoList,
			'waiting for fetch templates...'
		)
		if (!repoList) {
			throw new Error('No vaild template, please check your zone')
		}
		const repos = repoList.map(item => {
			return {
				name: `${item.name}${
					item.description ? `   [${item.description}]` : ''
				}`,
				value: item.name
			}
		})
		// 2. 让用户去选
		const { repo } = await inquirer.prompt([
			{
				name: 'repo',
				type: 'list',
				message: `Please choose a template to create project ${this.name}:`,
				choices: repos
			}
		])

		return repo
	}

	// 获取用户选择的版本
	// 1. 基于repo 的结果，拉取
	// 2. 让用户选择
	async getTag(repo) {
		// 1. 拉tag
		const tagList = await wrapLoading(
			getTagList,
			'waiting for fetch tags...',
			repo
		)
		if (!tagList || !tagList.length) {
			throw new Error('No vaild tags, please check your zone')
		}

		const tags = tagList.map(item => item.name)

		const { tag } = await inquirer.prompt([
			{
				name: 'tag',
				type: 'list',
				message: `Please choose a tag:`,
				choices: tags
			}
		])

		return tag
	}

	// 1. 拼接下载地址
	// 2. 下载
	async download(repo, tag) {
		const requestUrl = `zjjZone/${repo}${tag ? '#' + tag : ''}`
		await wrapLoading(
			this.downloadGitRepo,
			'waiting download template',
			requestUrl,
			this.targetDir
		)

		console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
	}
}

module.exports = Generator
