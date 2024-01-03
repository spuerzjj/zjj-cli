const fs = require('fs-extra')
const inquirer = require('inquirer')
const path = require('path')
const Generator = require('./Generator')

// create方法
module.exports = async function (name, options) {
	const targetDir = path.resolve(process.cwd(), name)

	// 判断指定的项目目录是否已经存在了
	if (fs.existsSync(targetDir)) {
		// 强制创建，清空目录
		if (options.force) {
			await fs.remove(targetDir)
		}

		// 询问用户，是否确定要覆盖
		let { action } = await inquirer.prompt([
			{
				name: 'action',
				type: 'list',
				message: 'Target directory already exists',
				choices: [
					{
						name: 'Overwrite',
						value: true
					},
					{
						name: 'Cancel',
						value: false
					}
				]
			}
		])

		// Cancel
		if (!action) {
			return
		}

		// Overwrite
		await fs.remove(targetDir)
	}

	// 创建模板
	const generator = new Generator(name, targetDir)
	await generator.create()
}
