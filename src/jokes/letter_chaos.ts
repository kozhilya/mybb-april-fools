import {Joke, JokeSettings} from '../joke';
import {getTextNodes} from '../common';

/**
 * **Буквенный хаос**
 *
 * Все буквы в словах, кроме первой и последней, перемешены
 *
 * @author Kozhilya
 */
export class LetterChaosJoke extends Joke<LetterChaosJokeSettings> {
  id = 'letter_chaos';

  title = 'Буквенный хаос';

  description = 'Все буквы в словах, кроме первой и последней, перемешены';

  _settings = new LetterChaosJokeSettings();

  punctuationSymbols: string[] | null = null;

  /**
   * Перемешивание букв в словах
   * @param {string} word
   * @return {string}
   * @private
   */
  private shuffleLetters(word: string): string {
    if (word.length < 3 || !this.check(this.settings.shuffle_chance)) {
      return word;
    }

    const characters = word.split('');

    const middleCharacters = characters.slice(1, -1);
    for (let i = middleCharacters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [middleCharacters[i], middleCharacters[j]] = [
        middleCharacters[j],
        middleCharacters[i],
      ];
    }

    return [
      characters[0],
      ...middleCharacters,
      characters[characters.length - 1],
    ].join('');
  }

  /**
   * Обработка текстовой ноды
   * @param {Text} node
   * @private
   */
  private processNode(node: Text) {
    node.textContent = node.textContent?.replace(
      /([А-Яа-яA-Za-z]+)/gm,
      (_: string, word: string) => this.shuffleLetters(word)
    );
  }

  /**
   * Запуск шутки
   */
  start(): void {
    const textNodes = getTextNodes(this.settings.selector);

    textNodes.each((_, node) => this.processNode(node as Text));
  }
}

/**
 * Класс настроек для шутки "Буквенный хаос"
 */
export class LetterChaosJokeSettings implements JokeSettings {
  enabled: boolean = true;

  chance: number = 20;

  /**
   * Селектор всех элементов, которые будут затронуты
   */
  selector: string = '.post-content';

  /**
   * Вероятность того, что буквы будут перемешаны
   */
  shuffle_chance: number = 50;
}
