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

