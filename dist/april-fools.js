/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/handler.ts":
/*!************************!*\
  !*** ./src/handler.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AprilFoolsJokeClass\": () => (/* binding */ AprilFoolsJokeClass)\n/* harmony export */ });\n/* harmony import */ var _joke__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./joke */ \"./src/joke.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n/**\n * Блок обработки перво-апрельских шуток\n *\n * @author Kozhilya\n */\nvar AprilFoolsJokeClass = /** @class */ (function () {\n    function AprilFoolsJokeClass() {\n        this.core_settings = new CoreSettings;\n        /**\n         * Перечисление всех шуток\n         */\n        this.jokes = {};\n    }\n    /**\n     * Проверка вероятности\n     *\n     * @param {number} chance Вероятность срабатывания\n     * @returns {boolean} Флаг срабатывания (true - сработало)\n     */\n    AprilFoolsJokeClass.check = function (chance) {\n        return Math.random() < 0.01 * chance;\n    };\n    /**\n     * Добавление шутки\n     *\n     * @param joke\n     */\n    AprilFoolsJokeClass.prototype.add = function (joke) {\n        this.jokes[joke.id] = joke;\n    };\n    AprilFoolsJokeClass.prototype.addCustom = function (id, handler, settings) {\n        if (settings === void 0) { settings = null; }\n        var joke = new /** @class */ (function (_super) {\n            __extends(class_1, _super);\n            function class_1() {\n                var _this = _super !== null && _super.apply(this, arguments) || this;\n                _this.id = id;\n                _this.settings = { chance: 10 };\n                return _this;\n            }\n            class_1.prototype.start = function () {\n                handler.call(this, this.settings);\n            };\n            return class_1;\n        }(_joke__WEBPACK_IMPORTED_MODULE_0__.Joke));\n        Object.assign(joke.settings, settings !== null && settings !== void 0 ? settings : {});\n        this.add(joke);\n    };\n    Object.defineProperty(AprilFoolsJokeClass.prototype, \"settings\", {\n        get: function () {\n            var result = {};\n            result['core'] = this.core_settings;\n            for (var _i = 0, _a = Object.entries(this.jokes); _i < _a.length; _i++) {\n                var entries = _a[_i];\n                var id = entries[0];\n                var joke = entries[1];\n                result[id] = joke.settings;\n            }\n            return result;\n        },\n        /**\n         * Запись новых настроек\n         *\n         * @param settings\n         */\n        set: function (settings) {\n            for (var _i = 0, _a = Object.entries(settings); _i < _a.length; _i++) {\n                var entry = _a[_i];\n                var id = entry[0];\n                var jokeSettings = entry[1];\n                var targetSettings = (id === 'core') ? this.core_settings : this.jokes[id].settings;\n                Object.assign(targetSettings, jokeSettings);\n            }\n        },\n        enumerable: false,\n        configurable: true\n    });\n    /**\n     * Запуск шутки\n     *\n     * @param id\n     * @param {boolean} forced\n     */\n    AprilFoolsJokeClass.prototype.start = function (id, forced) {\n        if (forced === void 0) { forced = false; }\n        if (!(id in this.jokes))\n            return;\n        var joke = this.jokes[id];\n        if (!forced && !AprilFoolsJokeClass.check(joke.settings.chance)) {\n            return;\n        }\n        joke.start();\n    };\n    /**\n     * Запуск всех шуток\n     */\n    AprilFoolsJokeClass.prototype.startAll = function (forced) {\n        if (forced === void 0) { forced = false; }\n        for (var _i = 0, _a = Object.keys(this.jokes); _i < _a.length; _i++) {\n            var key = _a[_i];\n            this.start(key, forced);\n        }\n    };\n    AprilFoolsJokeClass.prototype.regularStart = function () {\n        var today = new Date();\n        var month = today.getMonth() + 1; // Note that getMonth() returns 0-indexed month, so we need to add 1\n        var day = today.getDate();\n        if (month === 4 && day === 1 && AprilFoolsJokeClass.check(this.core_settings.chance)) {\n            this.startAll();\n        }\n    };\n    return AprilFoolsJokeClass;\n}());\n\n/**\n *\n */\nvar CoreSettings = /** @class */ (function () {\n    function CoreSettings() {\n        this.chance = 100;\n    }\n    return CoreSettings;\n}());\n\n\n//# sourceURL=webpack://mybb-april-fools/./src/handler.ts?");

/***/ }),

/***/ "./src/joke.ts":
/*!*********************!*\
  !*** ./src/joke.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Joke\": () => (/* binding */ Joke),\n/* harmony export */   \"StopableJoke\": () => (/* binding */ StopableJoke)\n/* harmony export */ });\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n/**\n * Объект, описывающий шутку\n */\nvar Joke = /** @class */ (function () {\n    function Joke() {\n        /**\n         * Флаг, указывающий, должна ли шутка быть запущена\n         */\n        this.enabled = true;\n    }\n    return Joke;\n}());\n\n/**\n * Объект, описывающий шутку, которая может быть остановлена\n */\nvar StopableJoke = /** @class */ (function (_super) {\n    __extends(StopableJoke, _super);\n    function StopableJoke() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    return StopableJoke;\n}(Joke));\n\n\n\n//# sourceURL=webpack://mybb-april-fools/./src/joke.ts?");

/***/ }),

/***/ "./src/jokes/carnival.ts":
/*!*******************************!*\
  !*** ./src/jokes/carnival.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CarnivalJoke\": () => (/* binding */ CarnivalJoke),\n/* harmony export */   \"CarnivalJokeSettings\": () => (/* binding */ CarnivalJokeSettings)\n/* harmony export */ });\n/* harmony import */ var _joke__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../joke */ \"./src/joke.ts\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../handler */ \"./src/handler.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\n\n/**\n * **Карнавал**\n *\n * Аватарки приобретают интересные цвета\n *\n * @author Kozhilya\n */\nvar CarnivalJoke = /** @class */ (function (_super) {\n    __extends(CarnivalJoke, _super);\n    function CarnivalJoke() {\n        var _this = _super !== null && _super.apply(this, arguments) || this;\n        _this.id = 'carnival';\n        _this.settings = new CarnivalJokeSettings;\n        return _this;\n    }\n    CarnivalJoke.prototype.start = function () {\n        var _this = this;\n        jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.settings.selector).each(function (_, elem) {\n            var filters = [];\n            for (var _i = 0, _a = Object.entries(_this.settings.variants); _i < _a.length; _i++) {\n                var entry = _a[_i];\n                if (!_handler__WEBPACK_IMPORTED_MODULE_2__.AprilFoolsJokeClass.check(_this.settings.variant_chance)) {\n                    continue;\n                }\n                filters.push(entry[0].replace('{0}', Math.round(Math.random() * entry[1]).toString()));\n            }\n            if (filters.length > 0) {\n                jquery__WEBPACK_IMPORTED_MODULE_1___default()(elem).css({ 'filter': filters.join(' ') });\n            }\n        });\n    };\n    return CarnivalJoke;\n}(_joke__WEBPACK_IMPORTED_MODULE_0__.Joke));\n\nvar CarnivalJokeSettings = /** @class */ (function () {\n    function CarnivalJokeSettings() {\n        this.chance = 30;\n        /**\n         * Селектор всех элементов, которые будут трястись\n         */\n        this.selector = 'img[src*=\"/avatars/\"]';\n        /**\n         * Вероятность применения фильтра\n         */\n        this.variant_chance = 20;\n        /**\n         * Список фильтров и диапозона случайных параметров\n         */\n        this.variants = {\n            'sepia({0}%)': 100,\n            'saturate({0}%)': 100,\n            'hue-rotate({0}deg)': 360,\n            'invert({0}%)': 100,\n        };\n    }\n    return CarnivalJokeSettings;\n}());\n\n\n\n//# sourceURL=webpack://mybb-april-fools/./src/jokes/carnival.ts?");

/***/ }),

/***/ "./src/jokes/crazy_letters.ts":
/*!************************************!*\
  !*** ./src/jokes/crazy_letters.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CrazyLettersJoke\": () => (/* binding */ CrazyLettersJoke),\n/* harmony export */   \"CrazyLettersJokeSettings\": () => (/* binding */ CrazyLettersJokeSettings)\n/* harmony export */ });\n/* harmony import */ var _joke__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../joke */ \"./src/joke.ts\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\n/**\n * **Ад гуманитария**\n *\n * Все \"тся\" заменяются на \"ться\", а все \"ться\" на \"тся\".\n *\n * @author Kozhilya\n */\nvar CrazyLettersJoke = /** @class */ (function (_super) {\n    __extends(CrazyLettersJoke, _super);\n    function CrazyLettersJoke() {\n        var _this = _super !== null && _super.apply(this, arguments) || this;\n        _this.id = 'crazy_letters';\n        _this.settings = new CrazyLettersJokeSettings;\n        return _this;\n    }\n    CrazyLettersJoke.prototype.start = function () {\n        var _this = this;\n        jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.settings.selector).each(function (_, elem) {\n            var text = jquery__WEBPACK_IMPORTED_MODULE_1___default()(_this).text();\n            var result = '';\n            for (var i = 0; i < text.length; i++) {\n                result += text[i][(i % 2) ? 'toLowerCase' : 'toUpperCase']();\n            }\n            jquery__WEBPACK_IMPORTED_MODULE_1___default()(_this).text(result);\n        });\n    };\n    return CrazyLettersJoke;\n}(_joke__WEBPACK_IMPORTED_MODULE_0__.Joke));\n\nvar CrazyLettersJokeSettings = /** @class */ (function () {\n    function CrazyLettersJokeSettings() {\n        this.chance = 20;\n        /**\n         * Селектор всех элементов, которые будут затронуты\n         */\n        this.selector = '.pa-author a';\n    }\n    return CrazyLettersJokeSettings;\n}());\n\n\n\n//# sourceURL=webpack://mybb-april-fools/./src/jokes/crazy_letters.ts?");

/***/ }),

/***/ "./src/jokes/crazy_punctuation.ts":
/*!****************************************!*\
  !*** ./src/jokes/crazy_punctuation.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CrazyPunctuationJoke\": () => (/* binding */ CrazyPunctuationJoke),\n/* harmony export */   \"CrazyPunctuationJokeSettings\": () => (/* binding */ CrazyPunctuationJokeSettings)\n/* harmony export */ });\n/* harmony import */ var _joke__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../joke */ \"./src/joke.ts\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\n/**\n * **Бешеные запятые**\n *\n * Запятые после слов\n *\n * @author Kozhilya\n */\nvar CrazyPunctuationJoke = /** @class */ (function (_super) {\n    __extends(CrazyPunctuationJoke, _super);\n    function CrazyPunctuationJoke() {\n        var _this = _super !== null && _super.apply(this, arguments) || this;\n        _this.id = 'crazy_punctuation';\n        _this.settings = new CrazyPunctuationJokeSettings;\n        return _this;\n    }\n    CrazyPunctuationJoke.prototype.transform = function (text) {\n        var newText = \"\";\n        for (var i = 0; i < text.length; i++) {\n            var currentChar = text[i];\n            var nextChar = text[i + 1];\n            if (this.settings.symbols.includes(currentChar)) {\n                newText += currentChar;\n            }\n            else if (nextChar === \" \" || this.settings.symbols.includes(nextChar)) {\n                newText += currentChar;\n            }\n        }\n        return newText;\n    };\n    CrazyPunctuationJoke.prototype.process = function (node) {\n    };\n    CrazyPunctuationJoke.prototype.start = function () {\n        var items = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.settings.selector).find('*').contents().filter(function (_, node) { return node.nodeType === Node.TEXT_NODE; });\n        items.each(function (_, node) {\n            console.log(node);\n        });\n    };\n    return CrazyPunctuationJoke;\n}(_joke__WEBPACK_IMPORTED_MODULE_0__.Joke));\n\nvar CrazyPunctuationJokeSettings = /** @class */ (function () {\n    function CrazyPunctuationJokeSettings() {\n        this.chance = 20;\n        /**\n         * Селектор всех элементов, которые будут затронуты\n         */\n        this.selector = '.post-content';\n        /**\n         * Мигрирующие знаки\n         */\n        this.symbols = ',.;:?!-()[]{}\\'\"';\n    }\n    return CrazyPunctuationJokeSettings;\n}());\n\n\n\n//# sourceURL=webpack://mybb-april-fools/./src/jokes/crazy_punctuation.ts?");

/***/ }),

/***/ "./src/jokes/humanitarian_hell.ts":
/*!****************************************!*\
  !*** ./src/jokes/humanitarian_hell.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"HumanitarianHellJoke\": () => (/* binding */ HumanitarianHellJoke),\n/* harmony export */   \"HumanitarianHellJokeSettings\": () => (/* binding */ HumanitarianHellJokeSettings)\n/* harmony export */ });\n/* harmony import */ var _joke__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../joke */ \"./src/joke.ts\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\n/**\n * **Ад гуманитария**\n *\n * Все \"тся\" заменяются на \"ться\", а все \"ться\" на \"тся\".\n *\n * @author Kozhilya\n */\nvar HumanitarianHellJoke = /** @class */ (function (_super) {\n    __extends(HumanitarianHellJoke, _super);\n    function HumanitarianHellJoke() {\n        var _this = _super !== null && _super.apply(this, arguments) || this;\n        _this.id = 'humanitarian_hell';\n        _this.settings = new HumanitarianHellJokeSettings;\n        return _this;\n    }\n    HumanitarianHellJoke.prototype.start = function () {\n        jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.settings.selector).each(function () {\n            jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).html(jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).html().replace(/(ть?ся)/g, function (fnd) {\n                return (fnd.indexOf('ь') > 0) ? 'тся' : 'ться';\n            }));\n        });\n    };\n    return HumanitarianHellJoke;\n}(_joke__WEBPACK_IMPORTED_MODULE_0__.Joke));\n\nvar HumanitarianHellJokeSettings = /** @class */ (function () {\n    function HumanitarianHellJokeSettings() {\n        this.chance = 20;\n        /**\n         * Селектор всех элементов, которые будут затронуты\n         */\n        this.selector = '.post-content';\n    }\n    return HumanitarianHellJokeSettings;\n}());\n\n\n\n//# sourceURL=webpack://mybb-april-fools/./src/jokes/humanitarian_hell.ts?");

/***/ }),

/***/ "./src/jokes/mirror.ts":
/*!*****************************!*\
  !*** ./src/jokes/mirror.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MirrorJoke\": () => (/* binding */ MirrorJoke),\n/* harmony export */   \"MirrorJokeSettings\": () => (/* binding */ MirrorJokeSettings)\n/* harmony export */ });\n/* harmony import */ var _joke__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../joke */ \"./src/joke.ts\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\n/**\n * **Зеркало**\n *\n * Элементы форума отражаются (по крайней мере, пытаются)\n *\n * @author Kozhilya\n */\nvar MirrorJoke = /** @class */ (function (_super) {\n    __extends(MirrorJoke, _super);\n    function MirrorJoke() {\n        var _this = _super !== null && _super.apply(this, arguments) || this;\n        _this.id = 'mirror';\n        _this.settings = new MirrorJokeSettings;\n        return _this;\n    }\n    MirrorJoke.prototype.start = function () {\n        jquery__WEBPACK_IMPORTED_MODULE_1___default()('.post, .post h3, .post-links, .post-author, .post-content')\n            .css('transform', 'scaleX(-1)').css('-moz-transform', 'scaleX(-1)').css('-moz-transform', 'scaleX(-1)').css('filter', 'FlipH').css('-ms-filter', '\"FlipH\"');\n        jquery__WEBPACK_IMPORTED_MODULE_1___default()('.post-links, .post-links ul, .post h3 span').css('margin-left', '0');\n        jquery__WEBPACK_IMPORTED_MODULE_1___default()('.post h3 span').css('margin-right', '25em');\n    };\n    return MirrorJoke;\n}(_joke__WEBPACK_IMPORTED_MODULE_0__.Joke));\n\nvar MirrorJokeSettings = /** @class */ (function () {\n    function MirrorJokeSettings() {\n        this.chance = 30;\n    }\n    return MirrorJokeSettings;\n}());\n\n\n\n//# sourceURL=webpack://mybb-april-fools/./src/jokes/mirror.ts?");

/***/ }),

/***/ "./src/jokes/shake.ts":
/*!****************************!*\
  !*** ./src/jokes/shake.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ShakeJoke\": () => (/* binding */ ShakeJoke),\n/* harmony export */   \"ShakeJokeSettings\": () => (/* binding */ ShakeJokeSettings)\n/* harmony export */ });\n/* harmony import */ var _joke__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../joke */ \"./src/joke.ts\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\n/**\n * **Форумо-трясение**\n *\n * Страница форума начинает трястись\n *\n * @author Kozhilya\n */\nvar ShakeJoke = /** @class */ (function (_super) {\n    __extends(ShakeJoke, _super);\n    function ShakeJoke() {\n        var _this = _super !== null && _super.apply(this, arguments) || this;\n        _this.id = 'shake';\n        _this.settings = new ShakeJokeSettings;\n        _this.data_name = 'april-fools-shake';\n        return _this;\n    }\n    ShakeJoke.prototype.rand = function (a) {\n        return a + this.settings.force * (Math.random() * 2 - 1);\n    };\n    ShakeJoke.prototype.start = function () {\n        var _this = this;\n        this.items = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.settings.selector);\n        this.items.each(function (_, elem) {\n            var data = {};\n            _this.settings.directions.forEach(function (d) {\n                data[d] = parseInt(jquery__WEBPACK_IMPORTED_MODULE_1___default()(elem).css('margin-' + d));\n            });\n            jquery__WEBPACK_IMPORTED_MODULE_1___default()(elem).data(_this.data_name, data);\n        });\n        this.interval_id = setInterval(function () {\n            _this.items.each(function (_, elem) {\n                var data = jquery__WEBPACK_IMPORTED_MODULE_1___default()(elem).data(_this.data_name);\n                for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {\n                    var entry = _a[_i];\n                    jquery__WEBPACK_IMPORTED_MODULE_1___default()(elem).css('margin-' + entry[0], _this.rand(entry[1]));\n                }\n            });\n        }, this.settings.interval);\n    };\n    ShakeJoke.prototype.stop = function () {\n        var _this = this;\n        clearInterval(this.interval_id);\n        this.items.each(function (_, elem) {\n            var data = {};\n            _this.settings.directions.forEach(function (d) {\n                jquery__WEBPACK_IMPORTED_MODULE_1___default()(elem).css('margin-' + d, data[d]);\n            });\n            jquery__WEBPACK_IMPORTED_MODULE_1___default()(elem).data(_this.data_name, data);\n        });\n    };\n    return ShakeJoke;\n}(_joke__WEBPACK_IMPORTED_MODULE_0__.StopableJoke));\n\nvar ShakeJokeSettings = /** @class */ (function () {\n    function ShakeJokeSettings() {\n        this.chance = 1;\n        /**\n         * Направление тряски\n         */\n        this.directions = ['top', 'left', 'bottom', 'left'];\n        /**\n         * Селектор всех элементов, которые будут трястись\n         */\n        this.selector = '[id^=pun]';\n        /**\n         * Частота тряски\n         */\n        this.interval = 100;\n        /**\n         * Сила тряски\n         */\n        this.force = 0.5;\n    }\n    return ShakeJokeSettings;\n}());\n\n\n\n//# sourceURL=webpack://mybb-april-fools/./src/jokes/shake.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handler */ \"./src/handler.ts\");\n/* harmony import */ var _jokes_shake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jokes/shake */ \"./src/jokes/shake.ts\");\n/* harmony import */ var _jokes_humanitarian_hell__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./jokes/humanitarian_hell */ \"./src/jokes/humanitarian_hell.ts\");\n/* harmony import */ var _jokes_mirror__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./jokes/mirror */ \"./src/jokes/mirror.ts\");\n/* harmony import */ var _jokes_carnival__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./jokes/carnival */ \"./src/jokes/carnival.ts\");\n/* harmony import */ var _jokes_crazy_letters__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./jokes/crazy_letters */ \"./src/jokes/crazy_letters.ts\");\n/* harmony import */ var _jokes_crazy_punctuation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./jokes/crazy_punctuation */ \"./src/jokes/crazy_punctuation.ts\");\n\n\n\n\n\n\n\nwindow.AprilJokes = (function (jokes) {\n    var cl = new _handler__WEBPACK_IMPORTED_MODULE_0__.AprilFoolsJokeClass();\n    jokes.forEach(function (joke) {\n        cl.add(new joke());\n    });\n    cl.regularStart();\n    return cl;\n})([\n    _jokes_shake__WEBPACK_IMPORTED_MODULE_1__.ShakeJoke,\n    _jokes_humanitarian_hell__WEBPACK_IMPORTED_MODULE_2__.HumanitarianHellJoke,\n    _jokes_mirror__WEBPACK_IMPORTED_MODULE_3__.MirrorJoke,\n    _jokes_carnival__WEBPACK_IMPORTED_MODULE_4__.CarnivalJoke,\n    _jokes_crazy_letters__WEBPACK_IMPORTED_MODULE_5__.CrazyLettersJoke,\n    _jokes_crazy_punctuation__WEBPACK_IMPORTED_MODULE_6__.CrazyPunctuationJoke,\n]);\n\n\n//# sourceURL=webpack://mybb-april-fools/./src/main.ts?");

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = jQuery;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;