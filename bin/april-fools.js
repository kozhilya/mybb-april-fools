var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("joke", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StopableJoke = exports.Joke = void 0;
    /**
     * Объект, описывающий шутку
     */
    var Joke = /** @class */ (function () {
        function Joke() {
        }
        return Joke;
    }());
    exports.Joke = Joke;
    /**
     * Объект, описывающий шутку, которая может быть остановлена
     */
    var StopableJoke = /** @class */ (function (_super) {
        __extends(StopableJoke, _super);
        function StopableJoke() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StopableJoke;
    }(Joke));
    exports.StopableJoke = StopableJoke;
});
define("handler", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AprilFoolsJokeClass = void 0;
    /**
     * Блок обработки перво-апрельских шуток
     *
     * @author Kozhilya
     */
    var AprilFoolsJokeClass = /** @class */ (function () {
        function AprilFoolsJokeClass() {
            /**
             * Перечисление всех шуток
             */
            this.jokes = {};
        }
        /**
         * Проверка вероятности
         *
         * @param {number} chance Вероятность срабатывания
         * @returns {boolean} Флаг срабатывания (true - сработало)
         */
        AprilFoolsJokeClass.check = function (chance) {
            return Math.random() < 0.01 * chance;
        };
        /**
         * Добавление шутки
         *
         * @param joke
         */
        AprilFoolsJokeClass.prototype.add = function (joke) {
            this.jokes[joke.id] = joke;
        };
        /**
         * Запись новых настроек
         *
         * @param settings
         */
        AprilFoolsJokeClass.prototype.setSettings = function (settings) {
            for (var _i = 0, _a = Object.entries(settings); _i < _a.length; _i++) {
                var entry = _a[_i];
                var id = entry[0];
                var jokeSettings = entry[1];
                this.jokes[id].settings = __assign(__assign({}, this.jokes[id].settings), jokeSettings);
            }
        };
        /**
         * Запуск шутки
         *
         * @param id
         * @param {boolean} forced
         */
        AprilFoolsJokeClass.prototype.start = function (id, forced) {
            if (forced === void 0) { forced = false; }
            if (!(id in this.jokes))
                return;
            var joke = this.jokes[id];
            if (!forced && !AprilFoolsJokeClass.check(joke.settings.chance)) {
                return;
            }
            joke.start();
        };
        /**
         * Запуск всех шуток
         */
        AprilFoolsJokeClass.prototype.startAll = function () {
            for (var _i = 0, _a = Object.keys(this.jokes); _i < _a.length; _i++) {
                var key = _a[_i];
                this.start(key);
            }
        };
        return AprilFoolsJokeClass;
    }());
    exports.AprilFoolsJokeClass = AprilFoolsJokeClass;
});
define("jokes/shake", ["require", "exports", "joke", "jquery"], function (require, exports, joke_1, jquery_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ShakeJokeSettings = exports.ShakeJoke = void 0;
    jquery_1 = __importDefault(jquery_1);
    /**
     * **Форумо-трясение**
     *
     * Страница форума начинает трястись
     *
     * @author Kozhilya
     */
    var ShakeJoke = /** @class */ (function (_super) {
        __extends(ShakeJoke, _super);
        function ShakeJoke() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.data_name = 'april-fools-shake';
            return _this;
        }
        ShakeJoke.prototype.rand = function (a) {
            return a + this.settings.force * (Math.random() * 2 - 1);
        };
        ShakeJoke.prototype.start = function () {
            var _this = this;
            this.items = (0, jquery_1.default)(this.settings.selector);
            this.items.each(function (_, elem) {
                var data = {};
                _this.settings.directions.forEach(function (d) {
                    data[d] = parseInt((0, jquery_1.default)(elem).css('margin-' + d));
                });
                (0, jquery_1.default)(elem).data(_this.data_name, data);
            });
            this.interval_id = setInterval(function () {
                _this.items.each(function (_, elem) {
                    var data = (0, jquery_1.default)(elem).data(_this.data_name);
                    for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
                        var entry = _a[_i];
                        (0, jquery_1.default)(elem).css('margin-' + entry[0], _this.rand(entry[1]));
                    }
                });
            }, this.settings.interval);
        };
        ShakeJoke.prototype.stop = function () {
            var _this = this;
            clearInterval(this.interval_id);
            this.items.each(function (_, elem) {
                var data = {};
                _this.settings.directions.forEach(function (d) {
                    (0, jquery_1.default)(elem).css('margin-' + d, data[d]);
                });
                (0, jquery_1.default)(elem).data(_this.data_name, data);
            });
        };
        return ShakeJoke;
    }(joke_1.StopableJoke));
    exports.ShakeJoke = ShakeJoke;
    var ShakeJokeSettings = /** @class */ (function () {
        function ShakeJokeSettings() {
            this.chance = 1;
            /**
             * Направление тряски
             */
            this.directions = ['top', 'left', 'bottom', 'left'];
            /**
             * Селектор всех элементов, которые будут трястись
             */
            this.selector = '[id^=pun]';
            /**
             * Частота тряски
             */
            this.interval = 100;
            /**
             * Сила тряски
             */
            this.force = 0.5;
        }
        return ShakeJokeSettings;
    }());
    exports.ShakeJokeSettings = ShakeJokeSettings;
});
define("jokes/humanitarian_hell", ["require", "exports", "joke", "jquery"], function (require, exports, joke_2, jquery_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HumanitarianHellJokeSettings = exports.HumanitarianHellJoke = void 0;
    jquery_2 = __importDefault(jquery_2);
    /**
     * **Ад гуманитария**
     *
     * Все "тся" заменяются на "ться", а все "ться" на "тся".
     *
     * @author Kozhilya
     */
    var HumanitarianHellJoke = /** @class */ (function (_super) {
        __extends(HumanitarianHellJoke, _super);
        function HumanitarianHellJoke() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HumanitarianHellJoke.prototype.start = function () {
            (0, jquery_2.default)(this.settings.selector).each(function () {
                (0, jquery_2.default)(this).html((0, jquery_2.default)(this).html().replace(/(ть?ся)/g, function (fnd) {
                    return (fnd.indexOf('ь') > 0) ? 'тся' : 'ться';
                }));
            });
        };
        return HumanitarianHellJoke;
    }(joke_2.Joke));
    exports.HumanitarianHellJoke = HumanitarianHellJoke;
    var HumanitarianHellJokeSettings = /** @class */ (function () {
        function HumanitarianHellJokeSettings() {
            this.chance = 20;
            /**
             * Селектор всех элементов, которые будут затронуты
             */
            this.selector = '.post-content';
        }
        return HumanitarianHellJokeSettings;
    }());
    exports.HumanitarianHellJokeSettings = HumanitarianHellJokeSettings;
});
define("jokes/mirror", ["require", "exports", "joke", "jquery"], function (require, exports, joke_3, jquery_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MirrorJokeSettings = exports.MirrorJoke = void 0;
    jquery_3 = __importDefault(jquery_3);
    /**
     * **Зеркало**
     *
     * Элементы форума отражаются (по крайней мере, пытаются)
     *
     * @author Kozhilya
     */
    var MirrorJoke = /** @class */ (function (_super) {
        __extends(MirrorJoke, _super);
        function MirrorJoke() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MirrorJoke.prototype.start = function () {
            (0, jquery_3.default)('.post, .post h3, .post-links, .post-author, .post-content')
                .css('transform', 'scaleX(-1)').css('-moz-transform', 'scaleX(-1)').css('-moz-transform', 'scaleX(-1)').css('filter', 'FlipH').css('-ms-filter', '"FlipH"');
            (0, jquery_3.default)('.post-links, .post-links ul, .post h3 span').css('margin-left', '0');
            (0, jquery_3.default)('.post h3 span').css('margin-right', '25em');
        };
        return MirrorJoke;
    }(joke_3.Joke));
    exports.MirrorJoke = MirrorJoke;
    var MirrorJokeSettings = /** @class */ (function () {
        function MirrorJokeSettings() {
            this.chance = 30;
        }
        return MirrorJokeSettings;
    }());
    exports.MirrorJokeSettings = MirrorJokeSettings;
});
define("jokes/carnival", ["require", "exports", "joke", "jquery", "handler"], function (require, exports, joke_4, jquery_4, handler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CarnivalJokeSettings = exports.CarnivalJoke = void 0;
    jquery_4 = __importDefault(jquery_4);
    /**
     * **Зеркало**
     *
     * Элементы форума отражаются (по крайней мере, пытаются)
     *
     * @author Kozhilya
     */
    var CarnivalJoke = /** @class */ (function (_super) {
        __extends(CarnivalJoke, _super);
        function CarnivalJoke() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CarnivalJoke.prototype.start = function () {
            var _this = this;
            (0, jquery_4.default)(this.settings.selector).each(function (_, elem) {
                var filters = [];
                for (var _i = 0, _a = Object.entries(_this.settings.variants); _i < _a.length; _i++) {
                    var entry = _a[_i];
                    if (!handler_1.AprilFoolsJokeClass.check(_this.settings.variant_chance)) {
                        continue;
                    }
                    filters.push(entry[0].replace('{0}', Math.round(Math.random() * entry[1]).toString()));
                }
                if (filters.length > 0) {
                    (0, jquery_4.default)(elem).css('filter', filters.join(' '));
                }
            });
        };
        return CarnivalJoke;
    }(joke_4.Joke));
    exports.CarnivalJoke = CarnivalJoke;
    var CarnivalJokeSettings = /** @class */ (function () {
        function CarnivalJokeSettings() {
            this.chance = 30;
            /**
             * Селектор всех элементов, которые будут трястись
             */
            this.selector = 'img[src*="/avatars/"]';
            /**
             * Вероятность применения фильтра
             */
            this.variant_chance = 20;
            /**
             * Список фильтров и диапозона случайных параметров
             */
            this.variants = {
                'sepia({0}%)': 100,
                'saturate({0}%)': 100,
                'hue-rotate({0}deg)': 360,
                'invert({0}%)': 100,
            };
        }
        return CarnivalJokeSettings;
    }());
    exports.CarnivalJokeSettings = CarnivalJokeSettings;
});
define("jokes/crazy_letters", ["require", "exports", "joke", "jquery"], function (require, exports, joke_5, jquery_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CrazyLettersJokeSettings = exports.CrazyLettersJoke = void 0;
    jquery_5 = __importDefault(jquery_5);
    /**
     * **Ад гуманитария**
     *
     * Все "тся" заменяются на "ться", а все "ться" на "тся".
     *
     * @author Kozhilya
     */
    var CrazyLettersJoke = /** @class */ (function (_super) {
        __extends(CrazyLettersJoke, _super);
        function CrazyLettersJoke() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CrazyLettersJoke.prototype.start = function () {
            var _this = this;
            (0, jquery_5.default)(this.settings.selector).each(function (_, elem) {
                var text = (0, jquery_5.default)(_this).text();
                var result = '';
                for (var i = 0; i < text.length; i++) {
                    result += text[i][(i % 2) ? 'toLowerCase' : 'toUpperCase']();
                }
                (0, jquery_5.default)(_this).text(result);
            });
        };
        return CrazyLettersJoke;
    }(joke_5.Joke));
    exports.CrazyLettersJoke = CrazyLettersJoke;
    var CrazyLettersJokeSettings = /** @class */ (function () {
        function CrazyLettersJokeSettings() {
            this.chance = 20;
            /**
             * Селектор всех элементов, которые будут затронуты
             */
            this.selector = '.pa-author a';
        }
        return CrazyLettersJokeSettings;
    }());
    exports.CrazyLettersJokeSettings = CrazyLettersJokeSettings;
});
define("jokes/crazy_punctuation", ["require", "exports", "joke", "jquery"], function (require, exports, joke_6, jquery_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CrazyPunctuationJokeSettings = exports.CrazyPunctuationJoke = void 0;
    jquery_6 = __importDefault(jquery_6);
    /**
     * **Бешеные запятые**
     *
     * Запятые после слов
     *
     * @author Kozhilya
     */
    var CrazyPunctuationJoke = /** @class */ (function (_super) {
        __extends(CrazyPunctuationJoke, _super);
        function CrazyPunctuationJoke() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CrazyPunctuationJoke.prototype.transform = function (text) {
            var newText = "";
            for (var i = 0; i < text.length; i++) {
                var currentChar = text[i];
                var nextChar = text[i + 1];
                if (this.settings.symbols.includes(currentChar)) {
                    newText += currentChar;
                }
                else if (nextChar === " " || this.settings.symbols.includes(nextChar)) {
                    newText += currentChar;
                }
            }
            return newText;
        };
        CrazyPunctuationJoke.prototype.process = function (node) {
        };
        CrazyPunctuationJoke.prototype.start = function () {
            var items = (0, jquery_6.default)(this.settings.selector).find('*').contents().filter(function (_, node) { return node.nodeType === Node.TEXT_NODE; });
            items.each(function (_, node) {
                console.log(node);
            });
        };
        return CrazyPunctuationJoke;
    }(joke_6.Joke));
    exports.CrazyPunctuationJoke = CrazyPunctuationJoke;
    var CrazyPunctuationJokeSettings = /** @class */ (function () {
        function CrazyPunctuationJokeSettings() {
            this.chance = 20;
            /**
             * Селектор всех элементов, которые будут затронуты
             */
            this.selector = '.post-content';
            /**
             * Мигрирующие знаки
             */
            this.symbols = ',.;:?!-()[]{}\'"';
        }
        return CrazyPunctuationJokeSettings;
    }());
    exports.CrazyPunctuationJokeSettings = CrazyPunctuationJokeSettings;
});
define("main", ["require", "exports", "handler", "jokes/shake", "jokes/humanitarian_hell", "jokes/mirror", "jokes/carnival", "jokes/crazy_letters", "jokes/crazy_punctuation"], function (require, exports, handler_2, shake_1, humanitarian_hell_1, mirror_1, carnival_1, crazy_letters_1, crazy_punctuation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window.AprilJokes = (function (jokes) {
        var cl = new handler_2.AprilFoolsJokeClass();
        jokes.forEach(function (joke) {
            cl.add(new joke());
        });
        return cl;
    })([
        shake_1.ShakeJoke,
        humanitarian_hell_1.HumanitarianHellJoke,
        mirror_1.MirrorJoke,
        carnival_1.CarnivalJoke,
        crazy_letters_1.CrazyLettersJoke,
        crazy_punctuation_1.CrazyPunctuationJoke,
    ]);
});
