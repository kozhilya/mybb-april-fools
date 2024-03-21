import './types/mybb.d';
import {Joke, JokeSettings, StoppableJoke} from './joke';
import {JokerUI} from './ui';
import {debug} from './common';

/**
 * Блок обработки перво-апрельских шуток
 *
 * @author Kozhilya
 */
export class JokerClass {
  ui: JokerUI = new JokerUI(this);
  /**
   * Общие настройки системы
   */
  core_settings = new CoreSettings();

  /**
   * Перечисление всех шуток
   */
  jokes: JokeMap = {};

  /**
   * Получение полного списка настроек
   */
  get settings(): SettingsMap {
    const result: SettingsMap = {};

    result['core'] = this.core_settings;

    for (const entries of Object.entries(this.jokes)) {
      const id = entries[0];
      const joke = entries[1];

      result[id] = joke.settings;
    }

    return result;
  }

  /**
   * Запись новых настроек
   *
   * @param {SettingsMap} settings
   */
  set settings(settings: SettingsMap) {
    for (const entry of Object.entries(settings)) {
      const id = entry[0];
      const jokeSettings = entry[1];
      const targetSettings =
          id === 'core' ? this.core_settings : this.jokes[id].settings;

      Object.assign(targetSettings, jokeSettings);
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
   * Добавление шутки
   *
   * @param {Joke} joke Объект шутки
   */
  add(joke: Joke<JokeSettings>): void {
    this.jokes[joke.id] = joke;
  }

  /**
   * Регистрация новой шутки
   *
   * @param {string} id Идентификатор шутки
   * @param {JokeHandler} handler Метод, выполняющий шутку
   * @param {JokeSettings | null} [settings] Объект настроек шутки
   * @return {Joke<JokeSettings>} Объект шутки
   */
  addCustom(
      id: string,
      handler: JokeHandler,
      settings: JokeSettings | null = null,
  ): Joke<JokeSettings> {
    const joke = new (class extends Joke<JokeSettings> {
      id = id;

      title = 'Пользовательская шутка';

      description = 'Для шутки не определено описание';

      _settings = new JokeSettings();

      /**
       * Метод запуска шутки
       */
      start() {
        handler.call(this, this.settings);
      }
    })();

    joke.settings = settings;

    this.add(joke);

    return joke;
  }

  /**
   * Разблокировать систему
   */
  enable() {
    this.core_settings.enabled = true;
  }

  /**
   * Заблокировать систему
   */
  disable() {
    this.core_settings.enabled = false;
  }

  /**
   * Разблокировать все шутки
   */
  enableAll() {
    for (const key of Object.keys(this.jokes)) {
      this.jokes[key].enable();
    }
  }

  /**
   * Заблокировать все шутки
   */
  disableAll() {
    for (const key of Object.keys(this.jokes)) {
      this.jokes[key].disable();
    }
  }

  /**
   * Переключение шутки
   *
   * @param {string} jokeId ID шутки для переключения
   * @param {boolean} state Новое состояние
   */
  toggleJoke(jokeId: string, state: boolean) {
    const joke = this.jokes[jokeId];
    joke.settings.enabled = state;

    if (joke instanceof StoppableJoke && !state) {
      joke.stop();
    }

    this.saveUserStates();
  }

  /**
   * Сохранение пользовательских настроек
   */
  saveUserStates() {
    const states: { [key in string]: boolean } = {};

    for (const key of Object.keys(this.jokes)) {
      states[key] = this.jokes[key].settings.enabled;
    }

    fetch(
        '/api.php?' +
        $.param({
          method: 'storage.set',
          user_id: window.UserID,
          key: 'april-fools',
          token: window.ForumAPITicket,
          value: JSON.stringify(states),
          timer: 24 * 60,
        }),
    ).then((_) => {});
  }

  /**
   * Загрузка пользовательских настроек
   */
  async loadUserStates() {
    const response = await fetch(
        '/api.php?' +
        $.param({
          method: 'storage.get',
          user_id: window.UserID,
          key: 'april-fools',
        }),
    );
    const json = await response.json();

    if (json.error) {
      return;
    }

    const data = JSON.parse(json.response.storage.data['april-fools']);

    for (const key of Object.keys(this.jokes)) {
      this.jokes[key].settings.enabled = data[key];
    }
  }

  /**
   * Отчистка настроек пользователя
   */
  async clearUserStates() {
    await fetch(
        '/api.php?' +
        $.param({
          method: 'storage.delete',
          user_id: window.UserID,
          key: 'april-fools',
          token: window.ForumAPITicket,
        }),
    );

    return;
  }

  /**
   * Запуск шутки
   *
   * @param {string} jokeId ID шутки для запуска
   * @param {boolean} [forced] Принудительный запуск
   */
  start(jokeId: string, forced: boolean = false) {
    if (!(jokeId in this.jokes)) return;

    const joke = this.jokes[jokeId];

    if (!forced && (!joke.settings.enabled || !this.check(joke.settings.chance))
    ) {
      debug(joke.title, '- шутка не включена');
      return;
    }
    debug(joke.title, '- шутка включена');
    joke.start();
  }

  /**
   * Запуск всех шуток
   *
   * @param {boolean} [forced] Принудительный запуск
   */
  startAll(forced: boolean = false): void {
    for (const key of Object.keys(this.jokes)) {
      this.start(key, forced);
    }
  }

  /**
   * Стандартная проверка 1 апреля
   *
   * @return {boolean} Флаг, должна ли запускаться система
   */
  regularCheck(): boolean {
    if (!this.core_settings.enabled) {
      return false;
    }

    if (this.core_settings.testers.indexOf(window.UserID) >= 0) {
      return true;
    }

    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    if (month !== 4 || day !== 1) {
      return false;
    }

    return this.check(this.core_settings.chance);
  }

  /**
   * Стандартный запуск 1 апреля
   */
  async regularStart() {
    if (!this.regularCheck()) {
      return;
    }

    await this.loadUserStates();
    this.ui.show();
    this.startAll();
  }
}

type JokeHandler = () => void;

/**
 * Объект хранения шуток
 */
interface JokeMap {
  [key: string]: Joke<JokeSettings>;
}

/**
 * Объект задания настроек
 */
interface SettingsMap {
  [key: string]: JokeSettings;
}

/**
 * Общие правила системы
 */
class CoreSettings implements JokeSettings {
  chance = 100;
  enabled = true;

  /**
   * Список пользователей-тестировщиков
   */
  testers: number[] = [];
}
