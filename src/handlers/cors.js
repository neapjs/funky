/**
 * Copyright (c) 2018, Neap Pty Ltd.
 * All rights reserved.
 * 
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/
const vary = require('vary')

const ALL_METHODS = ['CONNECT', 'DEBUG', 'DELETE', 'DONE', 'GET', 'HEAD', 'HTTP', 'HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2', 'OPTIONS', 'ORIGIN', 'ORIGINS', 'PATCH', 'POST', 'PUT', 'QUIC', 'REST', 'SESSION', 'SHOULD', 'SPDY', 'TRACE', 'TRACK']
const ALL_EXPOSE_HEADERS = 'Accept, Accept-CH, Accept-Charset, Accept-Datetime, Accept-Encoding, Accept-Ext, Accept-Features, Accept-Language, Accept-Params, Accept-Ranges, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Expose-Headers, Access-Control-Max-Age, Access-Control-Request-Headers, Access-Control-Request-Method, Age, Allow, Alternates, Authentication-Info, Authorization, C-Ext, C-Man, C-Opt, C-PEP, C-PEP-Info, CONNECT, Cache-Control, Compliance, Connection, Content-Base, Content-Disposition, Content-Encoding, Content-ID, Content-Language, Content-Length, Content-Location, Content-MD5, Content-Range, Content-Script-Type, Content-Security-Policy, Content-Style-Type, Content-Transfer-Encoding, Content-Type, Content-Version, Cookie, Cost, DAV, DELETE, DNT, DPR, Date, Default-Style, Delta-Base, Depth, Derived-From, Destination, Differential-ID, Digest, ETag, Expect, Expires, Ext, From, GET, GetProfile, HEAD, HTTP-date, Host, IM, If, If-Match, If-Modified-Since, If-None-Match, If-Range, If-Unmodified-Since, Keep-Alive, Label, Last-Event-ID, Last-Modified, Link, Location, Lock-Token, MIME-Version, Man, Max-Forwards, Media-Range, Message-ID, Meter, Negotiate, Non-Compliance, OPTION, OPTIONS, OWS, Opt, Optional, Ordering-Type, Origin, Overwrite, P3P, PEP, PICS-Label, POST, PUT, Pep-Info, Permanent, Position, Pragma, ProfileObject, Protocol, Protocol-Query, Protocol-Request, Proxy-Authenticate, Proxy-Authentication-Info, Proxy-Authorization, Proxy-Features, Proxy-Instruction, Public, RWS, Range, Referer, Refresh, Resolution-Hint, Resolver-Location, Retry-After, Safe, Sec-Websocket-Extensions, Sec-Websocket-Key, Sec-Websocket-Origin, Sec-Websocket-Protocol, Sec-Websocket-Version, Security-Scheme, Server, Set-Cookie, Set-Cookie2, SetProfile, SoapAction, Status, Status-URI, Strict-Transport-Security, SubOK, Subst, Surrogate-Capability, Surrogate-Control, TCN, TE, TRACE, Timeout, Title, Trailer, Transfer-Encoding, UA-Color, UA-Media, UA-Pixels, UA-Resolution, UA-Windowpixels, URI, Upgrade, User-Agent, Variant-Vary, Vary, Version, Via, Viewport-Width, WWW-Authenticate, Want-Digest, Warning, Width, X-Content-Duration, X-Content-Security-Policy, X-Content-Type-Options, X-CustomHeader, X-DNSPrefetch-Control, X-Forwarded-For, X-Forwarded-Port, X-Forwarded-Proto, X-Frame-Options, X-Modified, X-OTHER, X-PING, X-PINGOTHER, X-Powered-By, X-Requested-With'

/**
 * Create the Express-like middleware that will add headers to the response as well as check for CORS
 * compliant request.
 * @param  {Object} options.headers Headers that should be added to all responses regardless of what happens
 */
const cors = (config) => {
	config = config || {}
	const { allowedHeaders, origins, methods, credentials, maxAge } = config
	const originList = (origins || ['*']).map(x => x.toLowerCase().trim())
	const allOriginsAllowed = originList.some(x => x == '*')
	const addOriginToVary = !allOriginsAllowed && originList.length > 0
	let headers = {
		'Access-Control-Allow-Methods' : (methods || ALL_METHODS).map(x => x.toUpperCase()).join(', '),
		'Access-Control-Allow-Origin': allOriginsAllowed ? '*' : originList.join(', ')
		//'Access-Control-Request-Headers': '',
		//'Access-Control-Expose-Headers': '',
	}
	if (credentials !== undefined)
		headers['Access-Control-Allow-Credentials'] = credentials ? true : false
	if (maxAge)
		headers['Access-Control-Max-Age'] = maxAge
	if (allowedHeaders && allowedHeaders.length > 0)
		headers['Access-Control-Allow-Headers'] = (allowedHeaders || []).join(', ')

	return (req, res, next) => {
		const requestOrigin = ((req.headers || {}).origin || '').trim()
		const requestAllowed = allOriginsAllowed || originList.some(x => x == requestOrigin)
		const creds = headers['Access-Control-Allow-Credentials']
		const _allowedHeaders = headers['Access-Control-Allow-Headers']
		const _maxAge = headers['Access-Control-Max-Age']

		// 1. For all requests, set Origin
		res.set('Access-Control-Allow-Origin', requestAllowed ? requestOrigin : null)
		// 2. For all requests, set Credential boolean if it was defined.
		if (creds)
			res.set('Access-Control-Allow-Credentials', creds)
		// 3. For all requests, set Expose-Headers if it was defined.
		if (_allowedHeaders)
			res.set('Access-Control-Expose-Headers', _allowedHeaders || ALL_EXPOSE_HEADERS)

		// 4. For OPTIONS requests, add more headers
		const method = req.method && req.method.toUpperCase && req.method.toUpperCase()
		if (method == 'OPTIONS') {
			// 4.1. For OPTIONS requests, set Methods
			res.set('Access-Control-Allow-Methods', headers['Access-Control-Allow-Methods'])
			// 4.2. For OPTIONS requests, set Allow-Headers if it was defined.
			if (_allowedHeaders)
				res.set('Access-Control-Allow-Headers', _allowedHeaders)
			// 4.3. For OPTIONS requests, set Max-Age if it was defined.
			if (_maxAge)
				res.set('Access-Control-Max-Age', _maxAge)
			if (addOriginToVary && res.headers)
				vary(res, 'Origin')

			res.status(200).send()
		}
		else if (addOriginToVary && res.headers)
			vary(res, 'Origin')

		next()
	}
}

module.exports = cors