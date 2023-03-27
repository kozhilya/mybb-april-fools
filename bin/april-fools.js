(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
define(["require", "exports"], function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AprilFoolsJokeClass = void 0;
  /**
   * Блок обработки перво-апрельских шуток
   *
   * @author Kozhilya
   */
  var AprilFoolsJokeClass = /** @class */function () {
    function AprilFoolsJokeClass() {
      /**
       * Перечисление всех шуток
       */
      this.jokes = {};
    }
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
     * Проверка вероятности
     *
     * @param {number} chance Вероятность срабатывания
     * @returns {boolean} Флаг срабатывания (true - сработало)
     */
    AprilFoolsJokeClass.prototype.check = function (chance) {
      return Math.random() < 0.01 * chance;
    };
    /**
     * Запуск шутки
     *
     * @param id
     * @param {boolean} forced
     */
    AprilFoolsJokeClass.prototype.start = function (id, forced) {
      if (forced === void 0) {
        forced = false;
      }
      if (!(id in this.jokes)) return;
      var joke = this.jokes[id];
      if (!forced && !this.check(joke.settings.chance)) {
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
  }();
  exports.AprilFoolsJokeClass = AprilFoolsJokeClass;
});

},{}],2:[function(require,module,exports){
"use strict";

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
define(["require", "exports"], function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.StopableJoke = exports.Joke = void 0;
  /**
   * Объект, описывающий шутку
   */
  var Joke = /** @class */function () {
    function Joke() {}
    return Joke;
  }();
  exports.Joke = Joke;
  /**
   * Объект, описывающий шутку, которая может быть остановлена
   */
  var StopableJoke = /** @class */function (_super) {
    __extends(StopableJoke, _super);
    function StopableJoke() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    return StopableJoke;
  }(Joke);
  exports.StopableJoke = StopableJoke;
});

},{}],3:[function(require,module,exports){
"use strict";

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
define(["require", "exports", "../joke"], function (require, exports, joke_1) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ShakeJokeSettings = exports.ShakeJoke = void 0;
  /**
   * Форумо-трясение
   *
   * Страница форума начинает трястись
   *
   * @author Kozhilya
   */
  var ShakeJoke = /** @class */function (_super) {
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
      this.items = $(this.settings.selector);
      this.items.each(function (_, elem) {
        var data = {};
        _this.settings.directions.forEach(function (d) {
          data[d] = parseInt($(elem).css('margin-' + d));
        });
        $(elem).data(_this.data_name, data);
      });
      this.interval_id = setInterval(function () {
        _this.items.each(function (_, elem) {
          var data = $(elem).data(_this.data_name);
          for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
            var entry = _a[_i];
            $(elem).css('margin-' + entry[0], _this.rand(entry[1]));
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
          $(elem).css('margin-' + d, data[d]);
        });
        $(elem).data(_this.data_name, data);
      });
    };
    return ShakeJoke;
  }(joke_1.StopableJoke);
  exports.ShakeJoke = ShakeJoke;
  var ShakeJokeSettings = /** @class */function () {
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
  }();
  exports.ShakeJokeSettings = ShakeJokeSettings;
});

},{}],4:[function(require,module,exports){
"use strict";

define(["require", "exports", "./handler", "./jokes/shake"], function (require, exports, handler_1, shake_1) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  window.AprilJokes = function (jokes) {
    var cl = new handler_1.AprilFoolsJokeClass();
    jokes.forEach(function (joke) {
      cl.add(new joke());
    });
    return cl;
  }([shake_1.ShakeJoke]);
});

},{}]},{},[1,2,3,4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaGFuZGxlci50cyIsInNyYy9qb2tlLnRzIiwic3JjL2pva2VzL3NoYWtlLnRzIiwic3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VDRUE7Ozs7O0VBS0EsSUFBQSxtQkFBQTtJQUFBLFNBQUEsb0JBQUE7TUE4REk7OztNQUdBLEtBQUEsS0FBSyxHQUFZLEVBQUU7SUFDdkI7SUFqRUk7Ozs7O0lBS0EsbUJBQUEsQ0FBQSxTQUFBLENBQUEsR0FBRyxHQUFILFVBQUksSUFBVTtNQUNWLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUk7SUFDOUIsQ0FBQztJQUVEOzs7OztJQUtBLG1CQUFBLENBQUEsU0FBQSxDQUFBLFdBQVcsR0FBWCxVQUFZLFFBQXFCO01BQzdCLEtBQW9CLElBQUEsRUFBQSxJQUF3QixFQUF4QixFQUFBLEdBQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBeEIsRUFBQSxHQUFBLEVBQUEsQ0FBQSxNQUF3QixFQUF4QixFQUFBLEVBQXdCLEVBQUU7UUFBekMsSUFBTSxLQUFLLEdBQUEsRUFBQSxDQUFBLEVBQUE7UUFDWixJQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ25CLElBQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEdBQUEsUUFBQSxDQUFBLFFBQUEsS0FBUSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsR0FBSyxZQUFZLENBQUU7O0lBRWpGLENBQUM7SUFFRDs7Ozs7O0lBTUEsbUJBQUEsQ0FBQSxTQUFBLENBQUEsS0FBSyxHQUFMLFVBQU0sTUFBYztNQUNoQixPQUFPLElBQUksQ0FBQyxNQUFN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QUFJLENBQUMsS0FBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7TUFDdEMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUNMLE9BQUEsU0FBQztFQUFELENBQUMsQ0FwRDhCLE1BQUEsQ0FBQSxZQUFZO0VBQTlCLE9BQUEsQ0FBQSxTQUFBLEdBQUEsU0FBQTtFQXNEYixJQUFBLGlCQUFBO0lBQUEsU0FBQSxrQkFBQTtNQUNJLEtBQUEsTUFBTSxHQUFXLENBQUM7TUFFbEI7OztNQUdBLEtBQUEsVUFBVSxHQUFhLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO01BRXhEOzs7TUFHQSxLQUFBLFFBQVEsR0FBVyxXQUFXO01BRTlCOzs7TUFHQSxLQUFBLFFBQVEsR0FBVyxHQUFHO01BRXRCOzs7TUFHQSxLQUFBLEtBQUssR0FBVyxHQUFHO0lBQ3ZCO0lBQUEsT0FBQSxpQkFBQztFQUFELENBQUMsRUF0QkQ7RUFBYSxPQUFBLENBQUEsaUJBQUEsR0FBQSxpQkFBQTs7Ozs7Ozs7Ozs7O0VDM0RaLE1BQWMsQ0FBQyxVQUFVLEdBQUksVUFBQyxLQUFvQjtJQUMvQyxJQUFNLEVBQUUsR0FBRyxJQUFJLFNBQUEsQ0FBQSxtQkFBbUIsRUFBRTtJQUVwQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtNQUNkLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUN0QixDQUFDLENBQUM7SUFFRixPQUFPLEVBQUU7RUFDYixDQUFDLENBQUUsQ0FDQyxPQUFBLENBQUEsU0FBUyxDQUNaLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgeyBKb2tlLCBKb2tlU2V0dGluZ3MgfSBmcm9tIFwiLi9qb2tlXCI7XHJcblxyXG4vKipcclxuICog0JHQu9C+0Log0L7QsdGA0LDQsdC+0YLQutC4INC/0LXRgNCy0L4t0LDQv9GA0LXQu9GM0YHQutC40YUg0YjRg9GC0L7QulxyXG4gKiBcclxuICogQGF1dGhvciBLb3poaWx5YVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFwcmlsRm9vbHNKb2tlQ2xhc3Mge1xyXG4gICAgLyoqXHJcbiAgICAgKiDQlNC+0LHQsNCy0LvQtdC90LjQtSDRiNGD0YLQutC4XHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBqb2tlXHJcbiAgICAgKi9cclxuICAgIGFkZChqb2tlOiBKb2tlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5qb2tlc1tqb2tlLmlkXSA9IGpva2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQl9Cw0L/QuNGB0Ywg0L3QvtCy0YvRhSDQvdCw0YHRgtGA0L7QtdC6XHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBzZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBzZXRTZXR0aW5ncyhzZXR0aW5nczogU2V0dGluZ3NNYXApOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIE9iamVjdC5lbnRyaWVzKHNldHRpbmdzKSkge1xyXG4gICAgICAgICAgICBjb25zdCBpZCA9IGVudHJ5WzBdO1xyXG4gICAgICAgICAgICBjb25zdCBqb2tlU2V0dGluZ3MgPSBlbnRyeVsxXTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuam9rZXNbaWRdLnNldHRpbmdzID0geyAuLi50aGlzLmpva2VzW2lkXS5zZXR0aW5ncywgLi4uam9rZVNldHRpbmdzIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/RgNC+0LLQtdGA0LrQsCDQstC10YDQvtGP0YLQvdC+0YHRgtC4XHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjaGFuY2Ug0JLQtdGA0L7Rj9GC0L3QvtGB0YLRjCDRgdGA0LDQsdCw0YLRi9Cy0LDQvdC40Y9cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSDQpNC70LDQsyDRgdGA0LDQsdCw0YLRi9Cy0LDQvdC40Y8gKHRydWUgLSDRgdGA0LDQsdC+0YLQsNC70L4pXHJcbiAgICAgKi9cclxuICAgIGNoZWNrKGNoYW5jZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgPCAwLjAxICogY2hhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JfQsNC/0YPRgdC6INGI0YPRgtC60LhcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGlkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZvcmNlZFxyXG4gICAgICovXHJcbiAgICBzdGFydChpZDogc3RyaW5nLCBmb3JjZWQ6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIGlmICghKGlkIGluIHRoaXMuam9rZXMpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGpva2UgPSB0aGlzLmpva2VzW2lkXTtcclxuXHJcbiAgICAgICAgaWYgKCFmb3JjZWQgJiYgIXRoaXMuY2hlY2soam9rZS5zZXR0aW5ncy5jaGFuY2UpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGpva2Uuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCX0LDQv9GD0YHQuiDQstGB0LXRhSDRiNGD0YLQvtC6XHJcbiAgICAgKi9cclxuICAgIHN0YXJ0QWxsKCkge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuam9rZXMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C10YDQtdGH0LjRgdC70LXQvdC40LUg0LLRgdC10YUg0YjRg9GC0L7QulxyXG4gICAgICovXHJcbiAgICBqb2tlczogSm9rZU1hcCA9IHt9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQntCx0YrQtdC60YIg0YXRgNCw0L3QtdC90LjRjyDRiNGD0YLQvtC6XHJcbiAqL1xyXG5pbnRlcmZhY2UgSm9rZU1hcCB7XHJcbiAgICBba2V5OiBzdHJpbmddOiBKb2tlO1xyXG59XHJcblxyXG4vKipcclxuICog0J7QsdGK0LXQutGCINC30LDQtNCw0L3QuNGPINC90LDRgdGC0YDQvtC10LpcclxuICovXHJcbmludGVyZmFjZSBTZXR0aW5nc01hcCB7XHJcbiAgICBba2V5OiBzdHJpbmddOiBKb2tlU2V0dGluZ3M7XHJcbn0iLCIvKipcclxuICog0J7QsdGK0LXQutGCINC90LDRgdGC0YDQvtC10Log0YjRg9GC0LrQuFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBKb2tlU2V0dGluZ3Mge1xyXG4gICAgLyoqXHJcbiAgICAgKiDQktC10YDQvtGP0YLQvdC+0YHRgtGMINGB0YDQsNCx0LDRgtGL0LLQsNC90LjRjyDQsiDQv9GA0L7RhtC10L3RgtCw0YUgKDAg0LTQu9GPINC+0YLQutC70Y7Rh9C10L3QuNGPKVxyXG4gICAgICovXHJcbiAgICBjaGFuY2U6IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqINCe0LHRitC10LrRgiwg0L7Qv9C40YHRi9Cy0LDRjtGJ0LjQuSDRiNGD0YLQutGDXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSm9rZSB7XHJcbiAgICAvKipcclxuICAgICAqINCY0LTQtdC90YLQuNGE0LjQutCw0YLQvtGAINGI0YPRgtC60LhcclxuICAgICAqL1xyXG4gICAgaWQ6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqINCd0LDRgdGC0YDQvtC50LrQuCDRiNGD0YLQutC4XHJcbiAgICAgKi9cclxuICAgIHNldHRpbmdzOiBKb2tlU2V0dGluZ3M7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQpNC70LDQsywg0YPQutCw0LfRi9Cy0LDRjtGJ0LjQuSwg0LTQvtC70LbQvdCwINC70Lgg0YjRg9GC0LrQsCDQsdGL0YLRjCDQt9Cw0L/Rg9GJ0LXQvdCwXHJcbiAgICAgKi9cclxuICAgIGVuYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQpNC70LDQsywg0YPQutCw0LfRi9Cy0LDRjtGJ0LjQuSwg0LzQvtC20LXRgiDQu9C4INGI0YPRgtC60LAg0LHRi9GC0Ywg0L7RgdGC0LDQvdC+0LLQu9C10L3QsFxyXG4gICAgICovXHJcbiAgICBpc19zdG9wYWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqINCX0LDQv9GD0YHQuiDRiNGD0YLQutC4XHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IHN0YXJ0KCk6IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQntCx0YrQtdC60YIsINC+0L/QuNGB0YvQstCw0Y7RidC40Lkg0YjRg9GC0LrRgywg0LrQvtGC0L7RgNCw0Y8g0LzQvtC20LXRgiDQsdGL0YLRjCDQvtGB0YLQsNC90L7QstC70LXQvdCwXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU3RvcGFibGVKb2tlIGV4dGVuZHMgSm9rZVxyXG57XHJcbiAgICAvKipcclxuICAgICAqINCe0YHRgtCw0L3QvtCy0LrQsCDRiNGD0YLQutC4LCDQtdGB0LvQuCDQstC+0LfQvNC+0LbQvdC+XHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IHN0b3AoKTogdm9pZDtcclxufSIsImltcG9ydCB7IEpva2UsIEpva2VTZXR0aW5ncywgU3RvcGFibGVKb2tlIH0gZnJvbSBcIi4uL2pva2VcIjtcclxuXHJcbi8qKlxyXG4gKiDQpNC+0YDRg9C80L4t0YLRgNGP0YHQtdC90LjQtVxyXG4gKiBcclxuICog0KHRgtGA0LDQvdC40YbQsCDRhNC+0YDRg9C80LAg0L3QsNGH0LjQvdCw0LXRgiDRgtGA0Y/RgdGC0LjRgdGMXHJcbiAqIFxyXG4gKiBAYXV0aG9yIEtvemhpbHlhXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2hha2VKb2tlIGV4dGVuZHMgU3RvcGFibGVKb2tlIHtcclxuXHJcbiAgICBzZXR0aW5nczogU2hha2VKb2tlU2V0dGluZ3M7XHJcblxyXG4gICAgcHJpdmF0ZSBpbnRlcnZhbF9pZDogTm9kZUpTLlRpbWVyO1xyXG5cclxuICAgIHByaXZhdGUgaXRlbXM6IEpRdWVyeTtcclxuXHJcbiAgICBwcml2YXRlIGRhdGFfbmFtZTogc3RyaW5nID0gJ2FwcmlsLWZvb2xzLXNoYWtlJztcclxuXHJcblxyXG4gICAgcmFuZChhOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBhICsgdGhpcy5zZXR0aW5ncy5mb3JjZSAqIChNYXRoLnJhbmRvbSgpICogMiAtIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSAkKHRoaXMuc2V0dGluZ3Muc2VsZWN0b3IpO1xyXG5cclxuICAgICAgICB0aGlzLml0ZW1zLmVhY2goKF8sIGVsZW0pID0+IHtcclxuICAgICAgICAgICAgbGV0IGRhdGE6IFNoYWtlSm9rZU1hcmdpbiA9IHt9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5kaXJlY3Rpb25zLmZvckVhY2goZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2RdID0gcGFyc2VJbnQoJChlbGVtKS5jc3MoJ21hcmdpbi0nICsgZCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoZWxlbSkuZGF0YSh0aGlzLmRhdGFfbmFtZSwgZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWxfaWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMuZWFjaCgoXywgZWxlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YTogU2hha2VKb2tlTWFyZ2luID0gJChlbGVtKS5kYXRhKHRoaXMuZGF0YV9uYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIE9iamVjdC5lbnRyaWVzKGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChlbGVtKS5jc3MoJ21hcmdpbi0nICsgZW50cnlbMF0sIHRoaXMucmFuZChlbnRyeVsxXSkpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIHRoaXMuc2V0dGluZ3MuaW50ZXJ2YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3AoKTogdm9pZCB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsX2lkKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLml0ZW1zLmVhY2goKF8sIGVsZW0pID0+IHtcclxuICAgICAgICAgICAgbGV0IGRhdGE6IFNoYWtlSm9rZU1hcmdpbiA9IHt9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5kaXJlY3Rpb25zLmZvckVhY2goZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAkKGVsZW0pLmNzcygnbWFyZ2luLScgKyBkLCBkYXRhW2RdKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKGVsZW0pLmRhdGEodGhpcy5kYXRhX25hbWUsIGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2hha2VKb2tlU2V0dGluZ3MgaW1wbGVtZW50cyBKb2tlU2V0dGluZ3Mge1xyXG4gICAgY2hhbmNlOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J3QsNC/0YDQsNCy0LvQtdC90LjQtSDRgtGA0Y/RgdC60LhcclxuICAgICAqL1xyXG4gICAgZGlyZWN0aW9uczogc3RyaW5nW10gPSBbJ3RvcCcsICdsZWZ0JywgJ2JvdHRvbScsICdsZWZ0J107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQodC10LvQtdC60YLQvtGAINCy0YHQtdGFINGN0LvQtdC80LXQvdGC0L7Qsiwg0LrQvtGC0L7RgNGL0LUg0LHRg9C00YPRgiDRgtGA0Y/RgdGC0LjRgdGMXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdG9yOiBzdHJpbmcgPSAnW2lkXj1wdW5dJztcclxuXHJcbiAgICAvKipcclxuICAgICAqINCn0LDRgdGC0L7RgtCwINGC0YDRj9GB0LrQuFxyXG4gICAgICovXHJcbiAgICBpbnRlcnZhbDogbnVtYmVyID0gMTAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KHQuNC70LAg0YLRgNGP0YHQutC4XHJcbiAgICAgKi9cclxuICAgIGZvcmNlOiBudW1iZXIgPSAwLjU7XHJcbn1cclxuXHJcbmludGVyZmFjZSBTaGFrZUpva2VNYXJnaW4ge1xyXG4gICAgW2tleTogc3RyaW5nXTogbnVtYmVyO1xyXG59IiwiaW1wb3J0IHsgQXByaWxGb29sc0pva2VDbGFzcyB9IGZyb20gXCIuL2hhbmRsZXJcIjtcclxuaW1wb3J0IHsgSm9rZSB9IGZyb20gXCIuL2pva2VcIjtcclxuaW1wb3J0IHsgU2hha2VKb2tlIH0gZnJvbSBcIi4vam9rZXMvc2hha2VcIjtcclxuXHJcbih3aW5kb3cgYXMgYW55KS5BcHJpbEpva2VzID0gKChqb2tlczogSm9rZUNsYXNzTGlzdCk6IEFwcmlsRm9vbHNKb2tlQ2xhc3MgPT4ge1xyXG4gICAgY29uc3QgY2wgPSBuZXcgQXByaWxGb29sc0pva2VDbGFzcygpO1xyXG5cclxuICAgIGpva2VzLmZvckVhY2goam9rZSA9PiB7XHJcbiAgICAgICAgY2wuYWRkKG5ldyBqb2tlKCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGNsO1xyXG59KShbXHJcbiAgICBTaGFrZUpva2UsXHJcbl0pO1xyXG5cclxuaW50ZXJmYWNlIEpva2VDbGFzc0xpc3QgZXh0ZW5kcyBBcnJheTxuZXcgKCkgPT4gSm9rZT4ge30iXX0=
