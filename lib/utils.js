const ora = require('ora')

// 封装loading的外壳
async function wrapLoading(fn, message, ...args) {
	const spinner = ora(message)
	spinner.start()
	try {
		const result = await fn(...args)
		spinner.succeed()
		return result
	} catch (error) {
		spinner.fail('Request failed, please refetch...')
		throw error
	}
}

module.exports = {
	wrapLoading
}
