import {Joke, JokeSettings} from '../joke';
import {getTextNodes} from '../common';

/**
 * **Ад гуманитария**
 *
 * Все "тся" заменяются на "ться", а все "ться" на "тся"
 *
 * @author Kozhilya
 */
export class HumanitarianHellJoke extends Joke<HumanitarianHellJokeSettings> {
  id = 'humanitarian_hell';

  title = 'Ад гуманитария';

  description = 'Все "тся" заменяются на "ться", а все "ться" на "тся"';

  _settings = new HumanitarianHellJokeSettings();

  /**
   * Обработка текста
   *
   * @param {string} text Входная строка
   * @return {string} Итоговая строка
   */
  processText(text: string): string {
    return text.replace(/(ть?ся)/g, function(fnd) {
      return fnd.indexOf('ь') > 0 ? 'тся' : 'ться';
    });
  }

  /**
   * Запуск шутки
   */
  start(): void {
    const textNodes = getTextNodes(this.settings.selector);

    textNodes.each((_, elem) => {
      elem.textContent = this.processText(elem.textContent);
    });
  }
}

/**
 * Класс настроек для шутки "Ад гуманитария"
 */
export class HumanitarianHellJokeSettings implements JokeSettings {
  enabled: boolean = true;

  chance: number = 20;

  /**
   * Селектор всех элементов, которые будут затронуты
   */
  selector: HTMLElement | JQuery<HTMLElement> | string = '.post-content';
}
