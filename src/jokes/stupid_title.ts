import {Joke, JokeSettings} from '../joke';
import $ from 'jquery';
import {StupidTitleDefaultVariants} from '../data/stupid_title_variants';

/**
 * **Глупые статусы**
 *
 * Каждому пользователю даётся новый глупый статус
 *
 * @author Kozhilya
 */
export class StupidTitleJoke extends Joke<StupidTitleJokeSettings> {
  id = 'stupid_title';

  title = 'Глупые статусы';

  description = 'Каждому пользователю даётся новый глупый статус';

  _settings = new StupidTitleJokeSettings();

  private loadedGenders: { [key in string]: boolean } = null;
  private variantsGenerated = false;
  private seed = 0;

  /**
   * Загрузка полов, если они не определены
   */
  async loadGenders(): Promise<void> {
    const names = $('.pa-author a').
        map((_, elem) => elem.innerText).
        toArray().
        reduce((arr: string[], name: string) => {
          if (arr.indexOf(name) < 0) {
            arr.push(name);
          }
          return arr;
        }, []);

    const url =
        '/api.php?' +
        $.param({method: 'users.get', fields: 'username,sex', username: names});
    const response = await fetch(url);
    const json = await response.json();

    this.loadedGenders = {};

    if (json.error) {
      return;
    }

    json.response?.users.forEach(
        (element: { username: string, sex: string }) => {
          if (element.sex === '0') {
            return;
          }

          this.loadedGenders[element.username] = element.sex === '1';
        });
  }

  /**
   * Разрешение пола по имени
   * @param {string} name
   * @return {boolean}
   */
  resolveGender(name: string): boolean {
    if (this.settings.gender_resolver !== null) {
      return !!this.settings.gender_resolver.call(this, name);
    }

    if (name in this.loadedGenders) {
      return !!this.loadedGenders[name];
    }

    this.resetSeed();
    return this.selectRandom(name, {m: 1, f: 1}) === 'm';
  }

  /**
   * Запуск шутки
   */
  async start(): Promise<void> {
    if (!this.variantsGenerated) {
      StupidTitleDefaultVariants(this.settings.variants);
      this.variantsGenerated = true;
    }

    await this.loadGenders();

    const cache: {[key in string]: string} = {};

    $('.post-author').each((_, root) => {
      const name = $('.pa-author a', root).text();
      if (!name) {
        return;
      }

      if (!(name in cache)) {
        this.resetSeed();
        cache[name] = this.generatePhrase(name);
      }

      $('.pa-title', root).text(cache[name]);
    });
  }

  /**
   * Сгенерировать фразу
   * @param {string} name Имя, кому необходимо сгенерировать фразу
   * @return {string} Итоговая фраза
   */
  generatePhrase(name: string): string {
    const gender = this.resolveGender(name);
    const phrase = this.selectRandom(name, this.settings.schemas);

    return this.capitalizeFirst(
        phrase.replace(/\{(.+?)}/g, (_, type: string) => {
          const variants = this.buildVariants(type, gender);

          return this.selectRandom(name, variants);
        }),
    );
  }

  /**
   * Функция хеширования
   *
   * https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
   *
   * cyrb53 (c) 2018 bryc (github.com/bryc)
   * A fast and simple hash function with decent collision resistance.
   * Largely inspired by MurmurHash2/3, but with a focus on speed/simplicity.
   * Public domain. Attribution appreciated.
   *
   * @param {string} name Имя
   * @param {number} seed Зерно случайности
   * @param {limit} limit Максимальное значение
   * @return {number} Хеш-значение
   * @private
   */
  private prng(name: string, seed: number, limit: number): number {
    let h1 = 0xdeadbeef ^ seed;
    let h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < name.length; i++) {
      ch = name.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 =
        Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
        Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 =
        Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
        Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    const value = 4294967296 * (2097151 & h2) + (h1 >>> 0);

    return Math.floor(Math.pow(Math.sin(value), 2) * limit) % limit;
  }

  /**
   * Сброс зерна случайности
   * @private
   */
  private resetSeed(): void {
    const date = new Date();
    const time = date.getUTCHours() * 60 + date.getUTCMinutes();

    if (this.settings.change_frequency === 0) {
      this.seed = time * 60 + date.getUTCSeconds();
      return;
    }

    this.seed = Math.floor(time / this.settings.change_frequency);
  }

  /**
   * Выбор случайного слова
   * @param {string} name
   * @param {StupidTitleWeightedVariants} variants
   * @return {string}
   * @private
   */
  private selectRandom(
      name: string,
      variants: StupidTitleWeightedVariants,
  ): string {
    const elements = Object.keys(variants);
    const totalWeight = elements.reduce(
        (sum, element) => sum + variants[element],
        0,
    );
    const randomWeight = this.prng(name, this.seed++, totalWeight);

    let currentWeight = 0;
    for (const element of elements) {
      currentWeight += variants[element];
      if (randomWeight <= currentWeight) {
        return element;
      }
    }

    throw new Error('Тебя быть тут не должно...');
  }

  /**
   * Выбор случайной фразы
   * @param {string} type
   * @param {boolean} gender
   * @return {StupidTitleWeightedVariants}
   * @private
   */
  private buildVariants(
      type: string,
      gender: boolean,
  ): StupidTitleWeightedVariants {
    const result: StupidTitleWeightedVariants = {};
    const variants: StupidTitleVariant = this.settings.variants[type];

    for (const iterator of Object.entries(variants)) {
      const word = iterator[0];
      const wordSettings = iterator[1];

      if (!wordSettings.enabled || wordSettings.gender === !gender) {
        continue;
      }

      if (!this.settings.rude && wordSettings.rude) {
        continue;
      }

      result[word] = wordSettings.weight;
    }

    return result;
  }

  /**
   * Сделать первую буква слова заглавной
   * @param {string} str Слово
   * @return {string} Исправленное слово
   * @private
   */
  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

/**
 * Определение пола по имени.
 * @param {string} name Имя персонажа
 * @return {boolean | null} true, если мужской род; false, если женский род
 */
type GenderResolverFunction = (name: string) => (boolean | null);

/**
 * Класс настроек для шутки "Глупые статусы"
 */
export class StupidTitleJokeSettings implements JokeSettings {
  enabled: boolean = true;
  chance: number = 100;

  /**
   * Определение пола по имени.
   * По умолчанию род устанавливается случайным образом
   *
   * Если установлено значение `null`, система попытается загрузить пол,
   * установленный в настройках аккаунта. Если этот пол определить невозможно,
   * то он будет выбран случайно. Эта настройка позволяет изменить это
   * поведение, если ваш форум обладает ролевой системой, в которой пол
   * определяется иным образом.
   */
  gender_resolver: GenderResolverFunction | null = null;

  /**
   * Разрешить возможно оскорбительные варианты
   */
  rude: boolean = false;

  /**
   * Частота смены статусов (в минутах)
   * Установите значение 0, что бы обновление происходило при
   * каждом обновлении страницы
   */
  change_frequency: number = 5;

  /**
   * Разрешённые схемы формирования статусов
   *
   * {adj} - прилагательное
   * {noun} - имя существительно
   * {verb} - глагол
   * {adv} - наречие
   * {place} - дополнение места
   * {p} - знак препинания
   */
  schemas: StupidTitleWeightedVariants = {
    '{adj} {noun}{p}': 10,
    '{noun} {adj}{p}': 3,
    '{adj}, {adj} {noun}{p}': 10,
    '{adj} и очень {adj} {noun}{p}': 10,
    '{adj} {noun} {verb}{p}': 10,
    '{adj} {noun} {adv} {verb}{p}': 5,
    '{adj} {noun} {verb} {place}{p}': 5,
    '{adj} {noun} {adv} {verb} {place}{p}': 5,
  };

  /**
   * Вариант слов
   * Смотрите раздел описания скрипта, что бы настроить это поле
   */
  variants: StupidTitleVariants = {
    adj: {},
    noun: {},
    verb: {},
    place: {},
    adv: {},
    p: {
      '': new StupidTitleSetting({weight: 15}),
      '.': new StupidTitleSetting({weight: 10}),
      '...': new StupidTitleSetting({weight: 5}),
      '!': new StupidTitleSetting({weight: 5}),
      '!!!': new StupidTitleSetting({weight: 2}),
      '?': new StupidTitleSetting({weight: 2}),
      '?!': new StupidTitleSetting({weight: 1}),
    },
  };
}

export interface StupidTitleVariants {
  [key: string]: StupidTitleVariant;
}

interface StupidTitleVariant {
  [key: string]: StupidTitleSetting;
}

interface StupidTitleWeightedVariants {
  [key: string]: number;
}

type StupidTitleSettingInitializer = {
  weight?: number;
  enabled?: boolean;
  rude?: boolean;
  gender?: boolean | null;
}

/**
 * Класс настройки
 */
class StupidTitleSetting {
  weight: number = 10;

  enabled: boolean = true;

  rude: boolean = false;

  gender: boolean | null = null;

  /**
   * Создание класса
   * @param {StupidTitleSettingInitializer} options
   */
  constructor(options: StupidTitleSettingInitializer) {
    this.weight ??= options.weight;
    this.enabled ??= options.enabled;
    this.rude ??= options.rude;
    this.gender ??= options.gender;
  }
}

/**
 * Метод создания списка слов
 * @param {boolean | null} gender
 * @param {string} input
 * @return {StupidTitleVariant}
 * @constructor
 */
export function BuildStupidTitleVariant(
    gender: boolean | null,
    input: string,
): StupidTitleVariant {
  const result: StupidTitleVariant = {};
  const words = input.split(',').map((word) => word.trim());

  words.forEach((word) => {
    const cleanWord = word.replace(/[^А-ЯЁа-яёA-Za-z\- ]/g, '');

    if (cleanWord === '') {
      return;
    }

    result[cleanWord] = new StupidTitleSetting({
      gender,
      rude: word.indexOf('$') >= 0,
      enabled: word.indexOf('!') < 0,
      weight:
          10 *
          (word.indexOf('$') >= 0 ? 0.5 : 1) *
          (word.indexOf('%') >= 0 ? 0.5 : 1) *
          (word.indexOf('^') >= 0 ? 2 : 1),
    });
  });

  return result;
}

declare global {
  interface Window {
    BuildStupidTitleVariant(
        gender: boolean | null,
        input: string,
    ): StupidTitleVariant;
  }
}

window.BuildStupidTitleVariant = BuildStupidTitleVariant;

