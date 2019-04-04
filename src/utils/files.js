const fs = require('fs')
const { join } = require('path')
const _glob = require('glob')

const glob = (pattern, options) => new Promise((success, failure) => _glob(pattern, options, (err, files) => {
	if (err)
		failure(err)
	else
		success(files)
}))
	
/**
 * Checks if a file or folder exists
 * 
 * @param  {String} p 			Absolute path to file or folder
 * @return {Promise<Boolean>}   
 */
const fileExists = p => new Promise(onSuccess => fs.exists(p, yes => onSuccess(yes ? true : false)))

/**
 * [description]
 * @param  {String} 			src     			Absolute path to folder
 * @param  {String} 			options.pattern 	Default is '*.*' which means all immediate files. 
 * @param  {String} 			options.ignore 		[description]
 * @return {Promise<[String]>}         				
 */
const getFiles = (src='', options={}) => {
	const pattern = options.pattern || '*.*'
	const opts = options.ignore ? { ignore: options.ignore } : null
	return glob(join(src, pattern), opts)
}

module.exports = {
	'get': getFiles,
	exists: fileExists
}