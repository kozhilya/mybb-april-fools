import $ from 'jquery';

/**
 * Получение всех элементов, являющимися TextNode.
 * Используется некоторыми шутками для уменьшения
 * влияния на существующее DOM-дерево.
 *
 * @param {HTMLElement | JQuery<HTMLElement> | JQuery.Selector} root
 * Элемет, у которого необходимо найти текстовые ноды
 *
 * @return {JQuery<HTMLElement | Text | Comment | Document>}
 */
export function getTextNodes(
    root: HTMLElement | JQuery<HTMLElement> | JQuery.Selector,
)
    : JQuery<HTMLElement | Text | Comment | Document> {
  // Это очень странный код, но надо успокоить ESLint
  const $root = (typeof root === 'string') ? $(root) : $(root);

  return $root.
      find('*').
      contents().
      filter((_, node) => node.nodeType === Node.TEXT_NODE);
}

export let debugEnabled = ((scriptElement) => {
  if (!(scriptElement instanceof HTMLScriptElement)) {
    return false;
  }
  return !/\.min\.js$/.test(scriptElement.src);
})(document.currentScript);

/**
 * Отоброзить отладочное сообщение
 */
export function debug(...data: (string | number | object)[]) {
  if (!debugEnabled) return;
  console.log(...data);
}

/**
 * Включить отладку
 */
export function enableDebug() {
  debugEnabled = true;
}

/**
 * Проверка сенсорного экрана
 * @return {boolean}
 */
export function isTouchEnabled(): boolean {
  return 'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // eslint-disable-next-line
      ((navigator as any).msMaxTouchPoints ?? 0) > 0;
}

/**
 * Проверка, является ли переменная числом
 * @param {any} n Проверяемая переменная
 * @return {boolean} Результат проверки
 */
// eslint-disable-next-line
export function isNumber(n: any): boolean {
  return Number(n) === n;
}

/**
 * Проверка, является ли переменная целым числом
 * @param {any} n Проверяемая переменная
 * @return {boolean} Результат проверки
 */
// eslint-disable-next-line
export function isInt(n: any): boolean {
  return Number(n) === n && n % 1 === 0;
}

/**
 * Проверка, является ли переменная вещественным числом
 * @param {any} n Проверяемая переменная
 * @return {boolean} Результат проверки
 */
// eslint-disable-next-line
export function isFloat(n: any): boolean {
  return Number(n) === n && n % 1 !== 0;
}

/**
 * Тег литеральной функции, в которой вещественные числа будут
 * печататься с 2 точками после запятой
 * @param {TemplateStringsArray} strings
 * @param {any[]} values
 * @return {string}
 */
// eslint-disable-next-line
export function d2(strings: TemplateStringsArray, ...values: any[]): string {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += isFloat(values[i]) ? values[i].toFixed(2) : values[i];
    }
  }
  return result;
}
