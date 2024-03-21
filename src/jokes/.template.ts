import {Joke, JokeSettings} from '../joke';
import $ from 'jquery';

/**
 * **Шаблон**
 *
 * Описание
 *
 * @author Kozhilya
 */
export class TemplateJoke extends Joke<TemplateJokeSettings> {
  id = '';

  title = '';

  description = '';

  _settings = new TemplateJokeSettings();

  /**
   * Запуск шутки
   */
  start(): void {

  }
}

/**
 * Класс настроек для шутки ""
 */
export class TemplateJokeSettings implements JokeSettings {
  enabled: boolean = true;

  chance: number = 100;
}
