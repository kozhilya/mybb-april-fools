import {Joke, JokeSettings} from '../joke';
import {getTextNodes} from '../common';

/**
 * **Латинизация**
 *
 * Все символы на странице или только в постах или еще где-то местами -
 * латиницей вместо кириллицы и наоборот
 *
 * @author Идея: Alex_63
 * @author Kozhilya
 */
export class LatinizationJoke extends Joke<LatinizationJokeSettings> {
  id = 'latinization';

  title = 'Латинизация';

  description = 'Все символы на странице или только в постах ' +
      'или еще где-то местами - латиницей вместо кириллицы и наоборот';

  _settings = new LatinizationJokeSettings();

  /**
   * Запуск шутки
   */
  start(): void {
    const textNodes = getTextNodes(this.settings.selector);

    textNodes.each((_, node) => this.processNode(node as Text));
  }

  /**
   * Латинизация или кириллизация слова
   * @param {string} word
   * @return {string}
   * @private
   */
  private latinize(word: string): string {
    if (/[а-яА-ЯёЁ0-9_-]+/.test(word)) {
      // Кириллица в латиницу
      for (const [ru, en] of Object.entries(this.settings.ruToEn)) {
        word = word.replace(new RegExp(ru, 'g'), en).
            replace(new RegExp(ru.toUpperCase(), 'gi'), en.toUpperCase());
      }
    } else if (/[a-zA-Z0-9_-]+/.test(word)) {
      // Латиница в кириллицу
      for (const [en, ru] of Object.entries(this.settings.enToRu)) {
        word = word.replace(new RegExp(en, 'g'), ru).
            replace(new RegExp(en.toUpperCase(), 'gi'), ru.toUpperCase());
      }
    }

    return word;
  }

  /**
   * Обработка текстовой ноды
   * @param {Text} node
   * @private
   */
  private processNode(node: Text) {
    node.textContent = node.textContent?.replace(
        /([А-Яа-яA-Za-z]+)/gm,
        (_: string, word: string) => this.latinize(word),
    );
  }
}

/**
 * Класс настроек для шутки "Латинизация"
 */
export class LatinizationJokeSettings implements JokeSettings {
  enabled: boolean = true;

  chance: number = 10;

  /**
   * Селектор, в котором может изменяться текст
   */
  selector: string = '.post-content';

  /**
   * Правила преобразования из кириллицы в латиницу
   */
  ruToEn: { [key in string]: string } = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
    'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
    'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
    'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
    'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
    'ш': 'sh', 'щ': 'shch', 'ъ': 'ie', 'ы': 'y', 'ь': '',
    'э': 'e', 'ю': 'u', 'я': 'ya',
  };

  /**
   * Правила преобразования из латиницы в кириллицу
   */
  enToRu: { [key in string]: string } = {
    'a': 'а', 'b': 'б', 'c': 'с', 'd': 'д', 'e': 'е',
    'f': 'ф', 'gh': 'ж', 'g': 'г', 'h': 'х', 'i': 'и',
    'j': 'й', 'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н',
    'o': 'о', 'p': 'п', 'q': 'кью', 'r': 'р', 's': 'с',
    't': 'т', 'u': 'ю', 'v': 'в', 'w': 'в', 'x': 'кс',
    'y': 'ы', 'z': 'з',
  };
}
