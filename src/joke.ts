/**
 * Объект настроек шутки
 */
export class JokeSettings {
  /**
   * Флаг блокировки срабатывания
   */
  enabled: boolean = true;

  /**
   * Вероятность срабатывания в процентах
   */
  chance: number = 20;
}

/**
 * Объект, описывающий шутку
 */
export abstract class Joke<T extends JokeSettings> {
  /**
   * Идентификатор шутки
   */
  abstract id: string;

  /**
   * Заголовок шутки
   */
  abstract title: string;

  /**
   * Описание шутки
   */
  abstract description: string;

  /**
   * Настройки шутки
   */
  _settings: T;

  /**
   * Получение полного списка настроек
   */
  get settings(): T {
    return this._settings;
  }

  /**
   * Запись новых настроек
   *
   * @param {JokeSettings} settings
   */
  set settings(settings: T) {
    for (const entry of Object.entries(settings)) {
      const id = entry[0];
      const value = entry[1];

      switch (id) {
        case 'name':
        case 'title':
          this.title = value;
          break;

        case 'description':
          this.description = value;
          break;

        default:
          // eslint-disable-next-line
          (this._settings as any)[id] = value;
      }
    }
  }

  /**
   * Проверка вероятности
   *
   * @param {number} chance Вероятность срабатывания
   * @return {boolean} Флаг срабатывания (true - сработало)
   */
  check(chance: number): boolean {
    return Math.random() < 0.01 * chance;
  }

  /**
   * Разблокировать шутку
   */
  enable() {
    this.settings.enabled = true;
  }

  /**
   * Заблокировать шутку
   */
  disable() {
    this.settings.enabled = false;
  }

  /**
   * Переключить блокировку шутки
   * @param {boolean | null} [value] Новое значение
   */
  toggle(value: boolean | null = null) {
    this.settings.enabled = value === null ? !this.settings.enabled : value;
  }

  /**
   * Запуск шутки
   */
  abstract start(): void;
}

/**
 * Объект, описывающий шутку, которая может быть остановлена
 */
export abstract class StoppableJoke<T extends JokeSettings> extends Joke<T> {
  /**
   * Остановка шутки, если возможно
   */
  abstract stop(): void;
}
