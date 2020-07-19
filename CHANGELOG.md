# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.8.0](https://github.com/neapjs/funky/compare/v0.7.0...v0.8.0) (2020-07-19)


### Features

* Add support for decoding JSON fields in 'multipart/form-data' requests ([082e091](https://github.com/neapjs/funky/commit/082e09164a9f740270174d9425852e9a3a1686d4))

## [0.7.0](https://github.com/neapjs/funky/compare/v0.6.6...v0.7.0) (2020-07-18)


### Features

* Add support for 'service' metadata to indicate which service is starting when the server starts listening on a specific port ([355cbfa](https://github.com/neapjs/funky/commit/355cbfab6931e42ff1cb3f6dfe9a7353f2b3f12f))

### [0.6.6](https://github.com/neapjs/funky/compare/v0.6.3...v0.6.6) (2020-07-16)


### Bug Fixes

* Vulnerabilities ([6235c2b](https://github.com/neapjs/funky/commit/6235c2b897074ddeb39f9d3ac8282a6229e9649c))

### [0.6.3](https://github.com/neapjs/funky/compare/v0.6.2...v0.6.3) (2019-12-09)


### Bug Fixes

* improve the start message ([e3328cb](https://github.com/neapjs/funky/commit/e3328cb))



### [0.6.2](https://github.com/neapjs/funky/compare/v0.6.1...v0.6.2) (2019-10-15)


### Bug Fixes

* 17 of 17 vulnerabilities in 2359 scanned packages + document how to use it in an AWS lambda environment ([d4e0796](https://github.com/neapjs/funky/commit/d4e0796))



### [0.6.1](https://github.com/neapjs/funky/compare/v0.6.0...v0.6.1) (2019-08-14)


### Bug Fixes

* Explicitely defining the host in the listen functin does not work ([c54fa29](https://github.com/neapjs/funky/commit/c54fa29))



## [0.6.0](https://github.com/neapjs/funky/compare/v0.5.2...v0.6.0) (2019-08-14)


### Bug Fixes

* Fail to deploy to AWS lambda using 'sls deploy' ([5155444](https://github.com/neapjs/funky/commit/5155444))



### [0.5.2](https://github.com/neapjs/funky/compare/v0.5.1...v0.5.2) (2019-07-11)


### Bug Fixes

* security alerts. Upgrade lodash to >= 4.17.13 ([5cc2a5b](https://github.com/neapjs/funky/commit/5cc2a5b))



<a name="0.5.1"></a>
## [0.5.1](https://github.com/neapjs/funky/compare/v0.5.0...v0.5.1) (2019-07-11)


### Bug Fixes

* Deocded input from textarea only keep the first line. All others are missing. ([6875628](https://github.com/neapjs/funky/commit/6875628))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/neapjs/funky/compare/v0.4.0...v0.5.0) (2019-04-30)


### Features

* 'src/handlers/static.js' - Add support for serving specific files only rather all of them. ([41f3440](https://github.com/neapjs/funky/commit/41f3440))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/neapjs/funky/compare/v0.3.0...v0.4.0) (2019-04-27)


### Features

* Method:'staticHandler'. Add support for defining default page when URI such as https//neap.co are specified ([db08e67](https://github.com/neapjs/funky/commit/db08e67))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/neapjs/funky/compare/v0.2.8...v0.3.0) (2019-04-23)


### Features

* Add support for a new signature on the app.listen api ([9cb6965](https://github.com/neapjs/funky/commit/9cb6965))



<a name="0.2.8"></a>
## [0.2.8](https://github.com/neapjs/funky/compare/v0.2.7...v0.2.8) (2019-04-23)


### Bug Fixes

* Running app.listen outside of the main js file does not start the server ([722775f](https://github.com/neapjs/funky/commit/722775f))



<a name="0.2.7"></a>
## [0.2.7](https://github.com/neapjs/funky/compare/v0.2.6...v0.2.7) (2019-04-21)


### Features

* Remove useless close function ([6655818](https://github.com/neapjs/funky/commit/6655818))



<a name="0.2.6"></a>
## [0.2.6](https://github.com/neapjs/funky/compare/v0.2.5...v0.2.6) (2019-04-20)


### Features

* Add support for closing the server ([d4da0cb](https://github.com/neapjs/funky/commit/d4da0cb))



<a name="0.2.5"></a>
## [0.2.5](https://github.com/neapjs/funky/compare/v0.2.4...v0.2.5) (2019-04-14)


### Bug Fixes

* The static handler does not return all the files ([ded8f19](https://github.com/neapjs/funky/commit/ded8f19))



<a name="0.2.4"></a>
## [0.2.4](https://github.com/neapjs/funky/compare/v0.2.3...v0.2.4) (2019-04-14)


### Bug Fixes

* Static handler does not resolve the folder path properly ([45505ce](https://github.com/neapjs/funky/commit/45505ce))



<a name="0.2.3"></a>
## [0.2.3](https://github.com/neapjs/funky/compare/v0.2.2...v0.2.3) (2019-04-08)


### Bug Fixes

* Parameterless cors should work as a passthrough ([ec0f765](https://github.com/neapjs/funky/commit/ec0f765))



<a name="0.2.2"></a>
## [0.2.2](https://github.com/neapjs/funky/compare/v0.2.1...v0.2.2) (2019-04-04)


### Features

* Add support for static website ([6d8afa5](https://github.com/neapjs/funky/commit/6d8afa5))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/neapjs/funky/compare/v0.2.0...v0.2.1) (2019-03-23)


### Bug Fixes

* CORS does not support parameterless constructor ([2f370a7](https://github.com/neapjs/funky/commit/2f370a7))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/neapjs/funky/compare/v0.1.4...v0.2.0) (2019-03-17)


### Features

* Allow to not specify the app name in the listen API ([fa11160](https://github.com/neapjs/funky/commit/fa11160))



<a name="0.1.4"></a>
## [0.1.4](https://github.com/neapjs/funky/compare/v0.1.3...v0.1.4) (2019-02-09)


### Bug Fixes

* Vulnerability issue ([9d874b3](https://github.com/neapjs/funky/commit/9d874b3))



<a name="0.1.3"></a>
## [0.1.3](https://github.com/neapjs/funky/compare/v0.1.2...v0.1.3) (2018-10-01)


### Bug Fixes

* 'listen' fails when the port is a string ([b015992](https://github.com/neapjs/funky/commit/b015992))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/neapjs/funky/compare/v0.1.1...v0.1.2) (2018-10-01)



<a name="0.1.1"></a>
## [0.1.1](https://github.com/neapjs/funky/compare/v0.1.0...v0.1.1) (2018-09-30)



<a name="0.1.0"></a>
# 0.1.0 (2018-09-30)


### Bug Fixes

* Provider 'google-function' is not supported ([aebe1f8](https://github.com/neapjs/funky/commit/aebe1f8))


### Features

* 1st commit ([68ed0bb](https://github.com/neapjs/funky/commit/68ed0bb))
