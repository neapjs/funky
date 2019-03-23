/**
 * Copyright (c) 2018, Neap Pty Ltd.
 * All rights reserved.
 * 
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/
const { assert } = require('chai')
const httpMocks = require('node-mocks-http')
const { app, cors } = require('../src/index')

describe('cors', () => {
	it('01 - Should set the response\'s origin header to the request\'s origin if it matches the configured list in CORS.', () => {
		const req = httpMocks.createRequest({
			method: 'GET',
			headers: {
				origin: 'http://localhost:8080',
				referer: 'http://localhost:8080'
			}
		})
		const res = httpMocks.createResponse()
		const corsSetup = cors({
			origins: ['http://boris.com', 'http://localhost:8080'],
			methods: ['GET', 'HEAD', 'OPTIONS', 'POST'],
			allowedHeaders: ['Authorization', 'Content-Type', 'Origin'],
			maxAge: 1296000
		})

		app.reset()
		app.all(corsSetup, (req, res) => res.status(200).send('Hello World'))
		return app.handleEvent()(req, res).then(() => {
			assert.isOk(req)
			assert.equal(res._getData(),'Hello World')
			const headers = res._getHeaders()
			assert.isOk(headers)
			assert.equal(headers['access-control-expose-headers'], 'Authorization, Content-Type, Origin')
			assert.equal(headers['access-control-allow-origin'], 'http://localhost:8080')
		})
	})
	it('02 - Should set the response\'s origin header to null if the origin does not match the configured list in CORS.', () => {
		const req = httpMocks.createRequest({
			method: 'GET',
			headers: {
				origin: 'http://localhost:8080',
				referer: 'http://localhost:8080'
			}
		})
		const res = httpMocks.createResponse()
		const corsSetup = cors({
			origins: ['http://boris.com'],
			methods: ['GET', 'HEAD', 'OPTIONS', 'POST'],
			allowedHeaders: ['Authorization', 'Content-Type', 'Origin'],
			maxAge: 1296000
		})

		app.reset()
		app.all(corsSetup, (req, res) => res.status(200).send('Hello World'))
		return app.handleEvent()(req, res).then(() => {
			assert.isOk(req)
			assert.equal(res._getData(),'Hello World')
			const headers = res._getHeaders()
			assert.isOk(headers)
			assert.equal(headers['access-control-expose-headers'], 'Authorization, Content-Type, Origin')
			assert.equal(headers['access-control-allow-origin'], 'null')
		})
	})
	it('03 - Should set a minimum set of CORS response\'s headers if the request is not an OPTIONS one.', () => {
		const req = httpMocks.createRequest({
			method: 'GET',
			headers: {
				origin: 'http://localhost:8080',
				referer: 'http://localhost:8080'
			}
		})
		const res = httpMocks.createResponse()
		const corsSetup = cors({
			origins: ['http://boris.com', 'http://localhost:8080'],
			methods: ['GET', 'HEAD', 'OPTIONS', 'POST'],
			allowedHeaders: ['Authorization', 'Content-Type', 'Origin'],
			maxAge: 1296000,
			credentials: true
		})

		app.reset()
		app.all(corsSetup, (req, res) => res.status(200).send('Hello World'))
		return app.handleEvent()(req, res).then(() => {
			assert.isOk(req)
			assert.equal(res._getData(),'Hello World')
			const headers = res._getHeaders()
			assert.isOk(headers)
			assert.equal(headers['access-control-expose-headers'], 'Authorization, Content-Type, Origin')
			assert.equal(headers['access-control-allow-origin'], 'http://localhost:8080')
			assert.equal(headers['access-control-allow-credentials'], 'true')
		})
	})
	it('04 - Should NOT set some CORS response\'s headers if the request is not an OPTIONS one.', () => {
		const req = httpMocks.createRequest({
			method: 'GET',
			headers: {
				origin: 'http://localhost:8080',
				referer: 'http://localhost:8080'
			}
		})
		const res = httpMocks.createResponse()
		const corsSetup = cors({
			origins: ['http://boris.com', 'http://localhost:8080'],
			methods: ['GET', 'HEAD', 'OPTIONS', 'POST'],
			allowedHeaders: ['Authorization', 'Content-Type', 'Origin'],
			maxAge: 1296000
		})

		app.reset()
		app.all(corsSetup, (req, res) => res.status(200).send('Hello World'))
		return app.handleEvent()(req, res).then(() => {
			assert.isOk(req)
			assert.equal(res._getData(),'Hello World')
			const headers = res._getHeaders()
			assert.isOk(headers)
			assert.equal(headers['access-control-expose-headers'], 'Authorization, Content-Type, Origin')
			assert.equal(headers['access-control-allow-origin'], 'http://localhost:8080')
			assert.isOk(!headers['access-control-allow-headers'])
			assert.isOk(!headers['access-control-allow-methods'])
			assert.isOk(!headers['access-control-max-age'])
		})
	})
	it('05 - Should set all CORS response\'s headers if the request is an OPTIONS one.', () => {
		const req = httpMocks.createRequest({
			method: 'OPTIONS',
			headers: {
				origin: 'http://localhost:8080',
				referer: 'http://localhost:8080'
			}
		})
		const res = httpMocks.createResponse()
		const corsSetup = cors({
			origins: ['http://boris.com', 'http://localhost:8080'],
			methods: ['GET', 'HEAD', 'OPTIONS', 'POST'],
			allowedHeaders: ['Authorization', 'Content-Type', 'Origin'],
			maxAge: 1296000
		})

		app.reset()
		app.all(corsSetup, (req, res) => res.status(200).send('Hello World'))
		return app.handleEvent()(req, res).then(() => {
			assert.isOk(req)
			const headers = res._getHeaders()
			assert.isOk(headers)
			assert.equal(headers['access-control-expose-headers'], 'Authorization, Content-Type, Origin')
			assert.equal(headers['access-control-allow-origin'], 'http://localhost:8080')
			assert.equal(headers['access-control-allow-headers'], 'Authorization, Content-Type, Origin')
			assert.equal(headers['access-control-allow-methods'], 'GET, HEAD, OPTIONS, POST')
			assert.equal(headers['access-control-max-age'], '1296000')
		})
	})
	it('06 - Should retrieves required response headers defined inside the config.json file.', () => {
		const req_01 = httpMocks.createRequest({
			method: 'GET',
			headers: {
				origin: 'http://localhost:8080',
				referer: 'http://localhost:8080'
			},
			_parsedUrl: {
				pathname: '/users/nicolas'
			}
		})
		const res_01 = httpMocks.createResponse()

		const req_02 = httpMocks.createRequest({
			method: 'POST',
			headers: {
				origin: 'http://localhost:8080',
				referer: 'http://localhost:8080'
			},
			_parsedUrl: {
				pathname: '/users/nicolas'
			},
			query: { lastname: 'dao' }
		})
		const res_02 = httpMocks.createResponse()

		const req_01_cors = cors({
			origins: ['http://boris.com', 'http://localhost:8080'],
			methods: ['GET', 'HEAD', 'OPTIONS'],
			allowedHeaders: ['Authorization', 'Content-Type', 'Origin'],
			maxAge: 1296000
		})

		app.reset()
		app.all('/Users/:username', req_01_cors, (req, res) => res.status(200).send(`Hello ${req.params.username}${req.params.lastname ? ` ${req.params.lastname}` : ''}`))

		const result_01 = app.handleEvent()(req_01, res_01).then(() => {
			assert.equal(res_01._getData(),'Hello nicolas')
			const headers = res_01._getHeaders()
			assert.isOk(headers)
			assert.equal(headers['access-control-expose-headers'], 'Authorization, Content-Type, Origin')
			assert.equal(headers['access-control-allow-origin'], 'http://localhost:8080')
		})
		const result_02 = app.handleEvent()(req_02, res_02).then(() => {
			assert.equal(res_02.statusCode, 200)
			assert.equal(res_01._getData(),'Hello nicolas')
			const headers = res_02._getHeaders()
			assert.isOk(headers)
			assert.equal(headers['access-control-expose-headers'], 'Authorization, Content-Type, Origin')
			assert.equal(headers['access-control-allow-origin'], 'http://localhost:8080')
		})

		return Promise.all([result_01, result_02])
	})
	it('07 - Should support parameterless CORS setup.', () => {
		const req = httpMocks.createRequest({
			method: 'GET',
			headers: {
				origin: 'http://localhost:8080',
				referer: 'http://localhost:8080'
			}
		})
		const res = httpMocks.createResponse()
		const corsSetup = cors()

		app.reset()
		app.all(corsSetup, (req, res) => res.status(200).send('Hello World'))
		return app.handleEvent()(req, res).then(() => {
			assert.isOk(req)
			assert.equal(res._getData(),'Hello World')
			const headers = res._getHeaders()
			assert.isOk(headers)
			assert.equal(headers['access-control-allow-origin'], 'http://localhost:8080')
		})
	})
})

