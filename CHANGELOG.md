# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.3](https://github.com/Anadian/regex-translator/compare/v0.2.2...v0.2.3) (2020-06-07)


### Documentation

* **README.md:** Added more badges. ([5335e06](https://github.com/Anadian/regex-translator/commit/5335e0608068b071cf69c927caf9098c2c50f438))


### Tests

* Debugging `cli_test.sh`. ([c58a125](https://github.com/Anadian/regex-translator/commit/c58a125b35b0af4adfd45730d0f04fda237f6cbe))
* Trying something new with adding an external cli test via `cli_test.sh` ([54e302d](https://github.com/Anadian/regex-translator/commit/54e302dc679861e06e3dc268818d66adf0c3f1c4))


### Chores

* Got `cli_test.sh` working and slightly improved coverage. ([9f442db](https://github.com/Anadian/regex-translator/commit/9f442dbc1246536643889bf1d5b3ce4e073e2dbb))

### [0.2.2](https://github.com/Anadian/regex-translator/compare/v0.2.1...v0.2.2) (2020-06-07)


### Features

* **source/main.js:** Implemented pasteboard output option. ([c2a5709](https://github.com/Anadian/regex-translator/commit/c2a57090cf79238bce00212c1bde28d0c9a99c77))


### Chores

* Removed the now-unneccessary "scripts" directory. ([1f77368](https://github.com/Anadian/regex-translator/commit/1f77368765ef4f62e500d155b42b00162b5b6759))


### Documentation

* **README.md:** Added API and updated contributing sections. ([c857229](https://github.com/Anadian/regex-translator/commit/c857229bdd6effc9fd0644a9ea8693d6a494008a))
* **README.md:** Added CLI section. ([4d9fdca](https://github.com/Anadian/regex-translator/commit/4d9fdca6d39bddf5f65f12e7e4fab7007e5944c2))
* Updated documentation comments and added `extract-documentation-comments` as a dev dependency. ([7529062](https://github.com/Anadian/regex-translator/commit/7529062baa5afcf1d0365913543d2ac55bbcc841))
* **README.md:** Added installation and usage sections. ([9730728](https://github.com/Anadian/regex-translator/commit/97307283a6e677abb504162957f5b085984f063e))

### [0.2.1](https://github.com/Anadian/regex-translator/compare/v0.2.0...v0.2.1) (2020-06-07)


### Features

* **source/main.js:** Added getMultiPartObjectFromInputString and implemented the full CLI. ([753b928](https://github.com/Anadian/regex-translator/commit/753b92880b9ccd52bb11689c83233ff56bed07c2))


### Tests

* Tests added for getMultiPartObjectFromInputString. ([9dc796d](https://github.com/Anadian/regex-translator/commit/9dc796d88d43817f7fbeeafb10626715e9cb0161))
* **main.test.js:** Rewrote all test to work in AVA. ([43cf16b](https://github.com/Anadian/regex-translator/commit/43cf16b84c97fb623afd3933ee8a3e40cba042d6))


### Chores

* Amazing everything seems to be working. ([aac339c](https://github.com/Anadian/regex-translator/commit/aac339c947dcc771e3564326835aebe8e74f5f09))
* Corrected test script in package.json and exported functions in source/main.js to work with AVA testing. ([83327cb](https://github.com/Anadian/regex-translator/commit/83327cbc37347e84689b9211cab68223861f7d41))
* Removed now-uneccessary files "CHANGES.md" and ".eslintrc.js". ([83a92a1](https://github.com/Anadian/regex-translator/commit/83a92a19fc6893aefc2f9b309f2bdb67771285b6))
* **package.json:** Moved eslint and standard-version config into package.json and added the "lint" and "update-travis-config" scripts. ([d9d530b](https://github.com/Anadian/regex-translator/commit/d9d530b0de883db763ca0279f7f15f3c5b5c39c7))
* Add ava and standard-version. ([8c3bd6e](https://github.com/Anadian/regex-translator/commit/8c3bd6e41d555ea0b6e65fb86dbc60296d3809e9))

## 0.2.0 (2020-06-05)

# Old CHANGES.md
- 2020-05-30 v0.0.0 First commit.
- 2020-06-01 v0.1.0 feat: Basic functioning implementation.
- 2020-06-01 v0.1.1 refactor(lint): Added eslint.
- 2020-06-04 v0.2.0 test(source/main.js): Core tests implemented with an idiomatic test suite, may switch to AVA soon.
