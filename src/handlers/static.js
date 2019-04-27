const co = require('co')
const { static:expressStatic } = require('express')
const { resolve, basename, extname } = require('path')
const { files } = require('../utils')
const fs = require('fs')

const staticHandler = (folder, options) => {
	if (!folder)
		throw new Error('Missing required argument \'folder\'.')
	const { defaultPage='index.html' } = options || {}
	const defaultPageValid = defaultPage && extname(defaultPage)
	let handler = expressStatic(folder)
	handler.type = 'static'
	handler.config = app => co(function *() {
		const folderPath = resolve(folder)
		const _files = (yield files.get(folderPath, { pattern:'**/*.*' })) || []
		_files.forEach(f => {
			const relPath = f.replace(folderPath,'')
			if (defaultPageValid && basename(f) == defaultPage) {
				const aliasPath = relPath.split('/').slice(0,-1).join('/')
				app.get(aliasPath || '/', (req,res) => fs.readFile(f, (err,data) => {
					if (data)
						res.status(200).send(data.toString())
					else
						res.status(404).send('File not found')
				}))
			}
			app.get(relPath, handler)
		})
	})
	return handler
}

module.exports = staticHandler