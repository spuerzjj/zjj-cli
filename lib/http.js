const axios = require('axios')

axios.interceptors.response.use(res => {
	return res.data
})

// 获取模板列表
async function getRepoList() {
	return axios.get('https://api.github.com/orgs/zjjZone/repos')
}

// 获取tag
async function getTagList(repo) {
	return axios.get(`https://api.github.com/repos/zjjZone/${repo}/tags`)
}

// 获取releases
async function getReleaseList(repo) {
	return axios.get(`https://api.github.com/repos/zjjZone/${repo}/releases`)
}

module.exports = {
	getRepoList,
	getTagList,
	getReleaseList
}
