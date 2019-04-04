/**
 * Copyright (c) 2018, Neap Pty Ltd.
 * All rights reserved.
 * 
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/
const { assert } = require('chai')
const { legacy: { appendQuery } } = require('../src/utils')

describe('utils', () => {
	describe('#appendQuery', () => {
		it('Should append query string to URL.', () => {
			assert.equal(appendQuery('https://neap.co', 'name=hello&age=34'), 'https://neap.co?name=hello&age=34', '01')
			assert.equal(appendQuery('https://neap.co', '?name=hello&age=34'), 'https://neap.co?name=hello&age=34', '02')
			assert.equal(appendQuery('https://neap.co', { name: 'hello', age:34 }), 'https://neap.co?name=hello&age=34', '03')
			assert.equal(appendQuery('https://neap.co'), 'https://neap.co', '04')
		})
	})
})