import $ from "jquery";

/**
 * Получение всех элементов, являющимися TextNode.
 * Используется некоторыми шутками для уменьшения влияния на существующее DOM-дерево.
 */
export function getTextNodes(
  root: any
): JQuery<HTMLElement | Text | Comment | Document> {
  return $(root)
    .find("*")
    .contents()
    .filter((_, node) => node.nodeType === Node.TEXT_NODE);
}
