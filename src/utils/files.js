const fs = require('fs')
const { join } = require('path')
const fg = require('fast-glob')
	
/**
 * Checks if a file or folder exists
 * 
 * @param  {String} p 			Absolute path to file or folder
 * @return {Promise<Boolean>}   
 */
const fileExists = p => new Promise(onSuccess => fs.exists(p, yes => onSuccess(yes ? true : false)))

/**
 * Gets an array of files located under the 'folderPath'. 
 * 
 * @param  {String} 		  folderPath     		Absolute path to folder
 * @param  {String|[String]}  options.pattern 		Default is '*.*' which means all immediate files. 
 * @param  {String|[String]}  options.ignore 		
 * @return {[String]}         				
 */
const getFiles = (folderPath='', options={}) => Promise.resolve(null).then(() => {
	const pattern = options.pattern || '*.*'
	const ignore = options.ignore
	const patterns = (typeof(pattern) == 'string' ? [pattern] : pattern).map(p => join(folderPath, p))
	const opts = ignore ? { ignore:(typeof(ignore) == 'string' ? [ignore] : ignore).map(p => join(folderPath, p)) } : {}

	return fg(patterns,opts)
})

module.exports = {
	'get': getFiles,
	exists: fileExists
}