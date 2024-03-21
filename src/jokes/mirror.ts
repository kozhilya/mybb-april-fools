import {Joke, JokeSettings} from '../joke';
import $ from 'jquery';

/**
 * **Зеркало**
 *
 * Элементы форума отражаются (по крайней мере, пытаются)
 *
 * @author Kozhilya
 */
export class MirrorJoke extends Joke<MirrorJokeSettings> {
  id = 'mirror';

  title = 'Зеркало';

  description = 'Элементы форума отражаются (по крайней мере, пытаются)';

  _settings = new MirrorJokeSettings();

  /**
   * Запуск шутки
   */
  start(): void {
    $('.post, .post h3, .post-links, .post-author, .post-content')
      .css('transform', 'scaleX(-1)')
      .css('-moz-transform', 'scaleX(-1)')
      .css('-moz-transform', 'scaleX(-1)')
      .css('filter', 'FlipH')
      .css('-ms-filter', '"FlipH"');
    $('.post-links, .post-links ul, .post h3 span').css('margin-left', '0');
    $('.post h3 span').css('margin-right', '25em');
  }
}

/**
 * Класс настроек для шутки "Зеркало"
 */
export class MirrorJokeSettings implements JokeSettings {
  enabled: boolean = false;

  chance: number = 30;
}
