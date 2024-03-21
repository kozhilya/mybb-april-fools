import {JokeSettings, StoppableJoke} from '../joke';
import $ from 'jquery';

/**
 * **Форумо-трясение**
 *
 * Страница форума начинает трястись
 *
 * @author Kozhilya
 */
export class ShakeJoke extends StoppableJoke<ShakeJokeSettings> {
  id = 'shake';

  title = 'Форумо-трясение';

  description = 'Страница форума начинает трястись';

  _settings = new ShakeJokeSettings();

  private intervalId: NodeJS.Timeout;

  private items: JQuery;

  private dataName: string = 'april-fools-shake';

  /**
   * Выбор случайной амплитуды
   * @param {number} a
   * @return {number}
   */
  rand(a: number): number {
    return a + this.settings.force * (Math.random() * 2 - 1);
  }

  /**
   * Запуск шутки
   */
  start(): void {
    this.items = $(this.settings.selector);

    this.items.each((_, elem) => {
      const data: ShakeJokeMargin = {};

      this.settings.directions.forEach((d) => {
        data[d] = parseInt($(elem).css('margin-' + d));
      });

      $(elem).data(this.dataName, data);
    });

    this.intervalId = setInterval(() => {
      this.items.each((_, elem) => {
        const data: ShakeJokeMargin = $(elem).data(this.dataName);

        for (const entry of Object.entries(data)) {
          $(elem).css('margin-' + entry[0], this.rand(entry[1]));
        }
      });
    }, this.settings.interval);
  }

  /**
   * Остновка шутки
   */
  stop(): void {
    clearInterval(this.intervalId);

    this.items.each((_, elem) => {
      const data: ShakeJokeMargin = {};

      this.settings.directions.forEach((d) => {
        $(elem).css('margin-' + d, data[d]);
      });

      $(elem).data(this.dataName, data);
    });
  }
}

/**
 * Класс настроек для шутки "Форумо-трясение"
 */
export class ShakeJokeSettings implements JokeSettings {
  enabled: boolean = false;

  chance: number = 1;

  /**
   * Направление тряски (тряска происходит путём изменения перечисленных
   * направлений margin на значение ±force от стандартного значения)
   */
  directions: string[] = ['top', 'left', 'bottom', 'left'];

  /**
   * Сила тряски - насколько отклоняется элемент от стандартного значения
   */
  force: number = 0.5;

  /**
   * Селектор всех элементов, которые будут трястись
   */
  selector: string = '[id^=pun]';

  /**
   * Частота тряски
   */
  interval: number = 100;
}

export interface ShakeJokeMargin {
  [key: string]: number;
}
