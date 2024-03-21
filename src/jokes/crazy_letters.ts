import {Joke, JokeSettings} from '../joke';
import $ from 'jquery';

/**
 * **Мама, Я сОшЛа С уМа!**
 *
 * иМеНа ЗаБоРчИкОм
 *
 * @author Kozhilya
 */
export class CrazyLettersJoke extends Joke<CrazyLettersJokeSettings> {
  id = 'crazy_letters';

  title = 'Мама, Я сОшЛа С уМа!';

  description = 'иМеНа ЗаБоРчИкОм';

  _settings = new CrazyLettersJokeSettings();

  /**
   * Запуск шутки
   */
  start(): void {
    $(this.settings.selector).each((_, elem) => {
      const text = $(elem).text();
      let result = '';

      for (let i = 0; i < text.length; i++) {
        result += text[i][i % 2 ? 'toLowerCase' : 'toUpperCase']();
      }

      $(this).text(result);
    });
  }
}

/**
 * Класс настроек для шутки "Мама, Я сОшЛа С уМа!"
 */
export class CrazyLettersJokeSettings implements JokeSettings {
  enabled: boolean = true;

  chance: number = 20;

  /**
   * Селектор всех элементов, которые будут затронуты
   */
  selector: string = '.pa-author a';
}
