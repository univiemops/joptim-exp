# Changelog

## [0.1.21](https://github.com/univiemops/joptim-exp/compare/v0.1.20...v0.1.21) (2024-07-28)


### Features

* many adapations for sampling plan 7/2024, eye-tracking temporarily removed. ([951814b](https://github.com/univiemops/joptim-exp/commit/951814b578a308be72802c5bfe1f3e1a1a4a9d4c))
* new API call for number of trials, no more random index for trial (frontend requests the next trial in order) ([c93868f](https://github.com/univiemops/joptim-exp/commit/c93868f51a262697e2ef88528f1a3f22690a244d))
* number of trials is given by backend ([59bf4a0](https://github.com/univiemops/joptim-exp/commit/59bf4a03b7a18e41f0126d7b3dd824f6572579fe))
* use different task and worker order for the left and the right solution ([8a48fc9](https://github.com/univiemops/joptim-exp/commit/8a48fc93522eb5557d194a7da213b244c9d71fca))


### Bug Fixes

* dockerfile and docker-compose ([4ade6b8](https://github.com/univiemops/joptim-exp/commit/4ade6b864d69dec2efb815298d46ec628217db96))
* GPT4o suggestion ([0dff24d](https://github.com/univiemops/joptim-exp/commit/0dff24d00bb6a44d83bd745166a2a61059d26454))
* remove install ([7f5be35](https://github.com/univiemops/joptim-exp/commit/7f5be35c078b856b8d33bf59e283f61718a728e8))
* websockets ([978e455](https://github.com/univiemops/joptim-exp/commit/978e45597c843ea399824d84cc7b31a2966ba350))

## [0.1.20](https://github.com/univiemops/joptim-exp/compare/v0.1.19...v0.1.20) (2024-04-30)


### Bug Fixes

* Change button label to 'Duplicated solutions' ([8b16a00](https://github.com/univiemops/joptim-exp/commit/8b16a0013eac1e6532c8db069dff0301cde7f8a5))

## [0.1.19](https://github.com/univiemops/joptim-exp/compare/v0.1.18...v0.1.19) (2024-04-30)


### Bug Fixes

* add 'definitely' to clear preference buttons, remove choice state ([5a27d7c](https://github.com/univiemops/joptim-exp/commit/5a27d7c97f2b22324630c21de68ebefd33d1e645))
* mention the red 'identical' button in the instructions ([5117315](https://github.com/univiemops/joptim-exp/commit/51173155885ad4dadf4df74a8af5f0fa943fbad8))

## [0.1.18](https://github.com/univiemops/joptim-exp/compare/v0.1.17...v0.1.18) (2024-04-16)


### Features

* change rating scale in preferance trials ([3661dac](https://github.com/univiemops/joptim-exp/commit/3661dac24129c422f1498397c3f4a11d9cb1fd33))


### Bug Fixes

* correct spelling. ([3d0ef76](https://github.com/univiemops/joptim-exp/commit/3d0ef7661ee5f9406722c5a12d79ce90873955fd))

## [0.1.17](https://github.com/univiemops/joptim-exp/compare/v0.1.16...v0.1.17) (2024-03-12)


### Features

* **backend:** add download endpoint for eyetracking ([393fc12](https://github.com/univiemops/joptim-exp/commit/393fc12c352a372cee8f49ada970e0873b2b95e2))


### Bug Fixes

* **database:** remove rrweb and eyetracking tables ([0d14a3d](https://github.com/univiemops/joptim-exp/commit/0d14a3da7f99009f6d4722e4605f22f4e07c473b))
* **replay:** sort dropdown list ([bdd354b](https://github.com/univiemops/joptim-exp/commit/bdd354bd4d732287d97cf64adfdfe5ac653dbcd6))
* **text:** improved no webcam text ([66bd65a](https://github.com/univiemops/joptim-exp/commit/66bd65aebc2dc52e3d79c1d5b3519abdf6e6d430))

## [0.1.16](https://github.com/univiemops/joptim-exp/compare/v0.1.15...v0.1.16) (2024-03-11)


### Bug Fixes

* **rrweb:** wait until websocket is open to successfully send the full snapshot after a reconnect ([9e6a4d3](https://github.com/univiemops/joptim-exp/commit/9e6a4d31fd3c93f4e6aeea814ea6016c6f7d0497))

## [0.1.15](https://github.com/univiemops/joptim-exp/compare/v0.1.14...v0.1.15) (2024-03-08)


### Features

* add reconnect mechanism to websocket when connection is lost. ([dd7e9e2](https://github.com/univiemops/joptim-exp/commit/dd7e9e2c527d37b7a4c17eb335bcdc9317b989ef))
* **backend:** add timeout to websocket testconnection ([ba0a19d](https://github.com/univiemops/joptim-exp/commit/ba0a19d956fa9f9236be1c2c4c393df19f16bccd))


### Bug Fixes

* correct call to new api-endpoint ([2aa2bc2](https://github.com/univiemops/joptim-exp/commit/2aa2bc2db46b23dd7d633eaa7f0e56db8c13b526))
* **text:** two children with the same key ([2ecb6d3](https://github.com/univiemops/joptim-exp/commit/2ecb6d310e0df1c188e8b5f4df84a59368f17ec9))

## [0.1.14](https://github.com/univiemops/joptim-exp/compare/v0.1.13...v0.1.14) (2024-03-03)


### Bug Fixes

* **replay:** improve resize for height ([cf0ecff](https://github.com/univiemops/joptim-exp/commit/cf0ecff218fbae627b96994465d77b00e2ec9557))

## [0.1.13](https://github.com/univiemops/joptim-exp/compare/v0.1.12...v0.1.13) (2024-03-03)


### Features

* **replay:** resize replayer frame when viewport changes ([384d671](https://github.com/univiemops/joptim-exp/commit/384d6711679e3b602190ff307985f66fa2a69fdc))


### Bug Fixes

* **replay:** change aspect ratio from 4/3 to 3/2 ([f088728](https://github.com/univiemops/joptim-exp/commit/f0887287ddc7c0d972a26884fe6afd3160c72c4d))

## [0.1.12](https://github.com/univiemops/joptim-exp/compare/v0.1.11...v0.1.12) (2024-03-02)


### Bug Fixes

* **replay:** dropdown text alignment and color ([dff36e5](https://github.com/univiemops/joptim-exp/commit/dff36e54e194b1353407b0426275a7b89c1d2701))
* **replay:** improve layout ([e8f2e66](https://github.com/univiemops/joptim-exp/commit/e8f2e66fdd094a0e239e319fa273abf48b56709f))

## [0.1.11](https://github.com/univiemops/joptim-exp/compare/v0.1.10...v0.1.11) (2024-03-02)


### Bug Fixes

* **replay:** rolled back to tables api call (mixed content problems) ([f41d1cf](https://github.com/univiemops/joptim-exp/commit/f41d1cfb43559006c35928059fbcca4344af598c))

## [0.1.10](https://github.com/univiemops/joptim-exp/compare/v0.1.9...v0.1.10) (2024-03-02)


### Bug Fixes

* **replay:** changed response type to avoid mixed content blocking ([3ec432c](https://github.com/univiemops/joptim-exp/commit/3ec432ccb318300d7a1c2ef8122191eca6cdfbb5))

## [0.1.9](https://github.com/univiemops/joptim-exp/compare/v0.1.8...v0.1.9) (2024-03-02)


### Bug Fixes

* **replay:** blocked loading mixed active content ([39daf44](https://github.com/univiemops/joptim-exp/commit/39daf44ae8bc5491def59c387d27add41b34b3f2))

## [0.1.8](https://github.com/univiemops/joptim-exp/compare/v0.1.7...v0.1.8) (2024-03-02)


### Features

* **replay:** add basic info in dropdown about participants' progress ([e71f066](https://github.com/univiemops/joptim-exp/commit/e71f0668bef7e88e4b9c827967e09227fd7cbcc8))


### Bug Fixes

* **replay:** use persistent API call instead of debug call /tables/user ([a8422c8](https://github.com/univiemops/joptim-exp/commit/a8422c8755541f78ea333121cff36e7f33863385))
* **types:** merged type definitions inside experiment.tsx and moved them to types.ts ([6d005e5](https://github.com/univiemops/joptim-exp/commit/6d005e53265eab12cbda0f144d3bd97414234cfe))

## [0.1.7](https://github.com/univiemops/joptim-exp/compare/v0.1.6...v0.1.7) (2024-03-02)


### Features

* **database:** add script to delete all information of a participant ([793f581](https://github.com/univiemops/joptim-exp/commit/793f5814cdc82c6d248f148e9c16f594cd61a19a))

## [0.1.6](https://github.com/univiemops/joptim-exp/compare/v0.1.5...v0.1.6) (2024-03-01)


### Bug Fixes

* **replay:** add missing key prop for element in iterator ([7b2c21d](https://github.com/univiemops/joptim-exp/commit/7b2c21d379702e4e0431fb229d71d02164034e58))

## [0.1.5](https://github.com/univiemops/joptim-exp/compare/v0.1.4...v0.1.5) (2024-03-01)


### Features

* **replay:** dropdown selection instead of textinput field ([a97b95a](https://github.com/univiemops/joptim-exp/commit/a97b95a3976986f6a1994026a9c11f5a1b8a2aeb))

## [0.1.4](https://github.com/univiemops/joptim-exp/compare/v0.1.3...v0.1.4) (2024-02-29)


### Bug Fixes

* **text:** changed strategy question ([be697b2](https://github.com/univiemops/joptim-exp/commit/be697b2891cfa2af4d44f1abc1be362f728f5bdd))
* **text:** full-&gt;filled ([f3369c6](https://github.com/univiemops/joptim-exp/commit/f3369c685ea3aadd60d01b929ef2c7d0463698c3))
* **text:** typo ([f50f06f](https://github.com/univiemops/joptim-exp/commit/f50f06f31a69dc3ac2f5c8c0fdf819b77adda7b5))

## [0.1.3](https://github.com/univiemops/joptim-exp/compare/v0.1.2...v0.1.3) (2024-02-28)


### Bug Fixes

* update consent form ([93eb574](https://github.com/univiemops/joptim-exp/commit/93eb574c6415899060521a6108e811e83d0953ff))

## [0.1.2](https://github.com/univiemops/joptim-exp/compare/v0.1.1...v0.1.2) (2024-02-28)


### Bug Fixes

* **text:** change verbs in consent form to american english, correct hyphenation, remove whitespace ([1e6414a](https://github.com/univiemops/joptim-exp/commit/1e6414a044e882d089954134c4ec12177b15be59))

## [0.1.1](https://github.com/univiemops/joptim-exp/compare/v0.1.0...v0.1.1) (2024-02-24)


### Bug Fixes

* flipped tasks, workers at submit ([e79cd91](https://github.com/univiemops/joptim-exp/commit/e79cd91091d9663ac2a23b257b85069dbd9728b5))
* two separate webgazer processes ([24510df](https://github.com/univiemops/joptim-exp/commit/24510dff733db57426c686cf21dba9e111a43edd))
* type check ([fdee259](https://github.com/univiemops/joptim-exp/commit/fdee2599f583742a69ba97b8f8e63d9deb2b624d))
* wrong arg ([0aad098](https://github.com/univiemops/joptim-exp/commit/0aad098b9b04e6510aca4c60447a3c1750f5e7f6))
