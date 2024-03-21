
import {JokeSettings, StoppableJoke} from '../joke';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as CursorEffectsLib from 'cursor-effects';

/**
 * **Красивый курсор**
 *
 * Эффекты, следующие за курсором
 *
 * @author Tim Holman
 * @link https://tholman.com/cursor-effects/
 */
export class CursorEffectsJoke extends
    StoppableJoke<CursorEffectsJokeSettings> {
  id = 'cursor_effects';

  title = 'Красивый курсор';

  description = 'Эффекты, следующие за курсором';

  _settings = new CursorEffectsJokeSettings();

  active_cursor_effect: CursorEffectsLib.CursorEffectResult;

  /**
   * Разблокировать все варианты курсоров
   */
  enableAll() {
    for (const key of Object.keys(this.settings.effects)) {
      this.settings.effects[<CursorEffectsEnum>key].enabled = true;
    }
  }

  /**
   * Заблокировать все варианты курсоров
   */
  disableAll() {
    for (const key of Object.keys(this.settings.effects)) {
      this.settings.effects[<CursorEffectsEnum>key].enabled = false;
    }
  }

  /**
   * Получение веса отдельного эффекта
   * @param {CursorEffectsEnum} effect Тип эффекта
   * @return {number} Значение веса
   * @private
   */
  private weight(effect: CursorEffectsEnum): number {
    const s = this.settings.effects[effect];
    return s.enabled ? s.weight : 0;
  }

  /**
   * Получение случайного эффекта
   * @return {CursorEffectsEnum}
   */
  getRandomEffect(): CursorEffectsEnum {
    const elements = Object.values(CursorEffectsEnum).map(
      (e) => <CursorEffectsEnum>e
    );
    const totalWeight = elements.reduce(
      (sum, element) => sum + this.weight(element),
      0
    );
    const randomWeight = Math.random() * totalWeight;

    let currentWeight = 0;
    for (const element of elements) {
      currentWeight += this.weight(element);
      if (randomWeight <= currentWeight) {
        return element;
      }
    }

    throw new Error('Тебя быть тут не должно...');
  }

  /**
   * Запуск шутки
   */
  start(): void {
    const effect = this.getRandomEffect();
    const settings = this.settings.effects[effect];

    this.active_cursor_effect = resolveCursorEffectsEnum(effect, settings);
  }

  /**
   * Остановка шутки
   */
  stop(): void {
    this.active_cursor_effect.destroy();
  }
}

enum CursorEffectsEnum {
  Rainbow = 'rainbow',
  FairyDust = 'fairy_dust',
  SpringyEmoji = 'springy_emoji',
  Emoji = 'emoji',
  Ghost = 'ghost',
  Trailing = 'trailing',
  TextFlag = 'text_flag',
  FollowingDot = 'following_dot',
  Bubbles = 'bubbles',
  Snowflake = 'snowflake',
  Clock = 'clock',
}

/**
 * Получение эффекта
 * @param {CursorEffectsEnum | string} effect Тип эффекта
 * @param {CursorEffectsSetting} options Настройки эффекта
 * @return {CursorEffectsLib.CursorEffectResult}
 */
function resolveCursorEffectsEnum(
  effect: CursorEffectsEnum | string,
  options: CursorEffectsSetting
): CursorEffectsLib.CursorEffectResult {
  switch (effect) {
    case CursorEffectsEnum.Rainbow:
      return CursorEffectsLib.rainbowCursor(options);

    case CursorEffectsEnum.FairyDust:
      return CursorEffectsLib.fairyDustCursor(options);

    case CursorEffectsEnum.SpringyEmoji:
      return CursorEffectsLib.springyEmojiCursor(options);

    case CursorEffectsEnum.Emoji:
      return CursorEffectsLib.emojiCursor(options);

    case CursorEffectsEnum.Ghost:
      return CursorEffectsLib.ghostCursor(options);

    case CursorEffectsEnum.Trailing:
      return CursorEffectsLib.trailingCursor(options);

    case CursorEffectsEnum.TextFlag:
      return CursorEffectsLib.textFlag(options);

    case CursorEffectsEnum.FollowingDot:
      return CursorEffectsLib.followingDotCursor(options);

    case CursorEffectsEnum.Bubbles:
      return CursorEffectsLib.bubbleCursor(options);

    case CursorEffectsEnum.Snowflake:
      return CursorEffectsLib.snowflakeCursor(options);

    case CursorEffectsEnum.Clock:
      return CursorEffectsLib.clockCursor(options);
  }
}

/**
 * Класс настроек для шутки "Красивый курсор"
 */
export class CursorEffectsJokeSettings implements JokeSettings {
  enabled: boolean = true;

  chance: number = 100;

  effects: { [key in CursorEffectsEnum]?: CursorEffectsSetting } = {
    /**
     * Радужный след за курсором
     */
    [CursorEffectsEnum.Rainbow]:
      new (class extends CursorEffectsSetting {
        /**
         * Длина полосы
         */
        length: number = 20;

        /**
         * Ширина полосы
         */
        size: number = 3;

        /**
         * Цвета полос (сверху вниз)
         */
        colors: string[] = [
          '#9400D3',
          '#4B0082',
          '#0000FF',
          '#00FF00',
          '#FFFF00',
          '#FF7F00',
          '#FF0000',
        ];
      })(),

    /**
     * Цепочка из эмодзи "на резинке" под курсором
     */
    [CursorEffectsEnum.SpringyEmoji]:
      new (class extends CursorEffectsSetting {
        /**
         * Висящий эмодзи
         */
        emoji: string = '🤪';
      })(),

    /**
     * Падающие от курсора эмодзи
     */
    [CursorEffectsEnum.Emoji]: new (class extends CursorEffectsSetting {
      /**
       * Падающие эмодзи
       */
      emoji: string[] = ['🔥', '🐬', '🦆'];
    })(),

    /**
     * Падающие от курсора пылинки
     */
    [CursorEffectsEnum.FairyDust]:
      new (class extends CursorEffectsSetting {
        /**
         * Цвет пылинок
         */
        colors: string[] = ['#ff0000', '#00ff00', '#0000ff'];
      })(),

    /**
     * След "зависших" курсоров
     */
    [CursorEffectsEnum.Ghost]: new CursorEffectsSetting(),

    /**
     * След курсоров "на резинке"
     */
    [CursorEffectsEnum.Trailing]:
      new (class extends CursorEffectsSetting {
        /**
         * Количество элементов
         */
        particles: number = 15;

        /**
         * Скорость частиц
         */
        rate: number = 0.4;

        /**
         * Ссылка на картинку с курсором
         * Используйте `null`, что бы использовать картинку курсора по умолчанию
         */
        baseImageSrc: string | null = null;
      })(),

    /**
     * Текст, развивающийся флагом от курсора
     */
    [CursorEffectsEnum.TextFlag]:
      new (class extends CursorEffectsSetting {
        /**
         * Отображаемый текст
         */
        text: string = 'С днём смеха!';

        /**
         * Цвет текста
         */
        color: string = '#000000';

        /**
         * Шрифт текста
         */
        font: string = 'monospace';

        /**
         * Размер текста
         */
        textSize: number = 12;

        /**
         * Растояние между бквами
         */
        gap: number = 14;

        /**
         * Размер... чего-то.
         */
        size: number = 3;
      })(),

    /**
     * Точка, преследующая курсор
     */
    [CursorEffectsEnum.FollowingDot]:
      new (class extends CursorEffectsSetting {
        /**
         * Цвет догоняющей точки
         */
        color: string = '#323232a6';
      })(),

    /**
     * Пузырьки от курсора
     */
    [CursorEffectsEnum.Bubbles]: new CursorEffectsSetting(),

    /**
     * Снежинки, летящие от курсора
     *
     * Отключено, потому что сейчас не зима :D
     */
    [CursorEffectsEnum.Snowflake]:
      new (class extends CursorEffectsSetting {
        weight: number = 0;
      })(),

    /**
     * Циферблат вокруг курсора
     */
    [CursorEffectsEnum.Clock]: new (class extends CursorEffectsSetting {
      /**
       * Цвет даты
       */
      dateColor: string = 'blue';

      /**
       * Цвет циферблата
       */
      faceColor: string = 'black';

      /**
       * Цвет секундной стрелки
       */
      secondsColor: string = 'red';

      /**
       * Цвет минутной стрелки
       */
      minutesColor: string = 'black';

      /**
       * Цвет часовой стрелки
       */
      hoursColor: string = 'black';
    })(),
  };
}

/**
 * Восстановление класса CursorEffectsLib.DefaultOptions
 */
class DefaultOptions {
  readonly element?: HTMLElement;
}

/**
 * Класс настроек для курсора
 */
class CursorEffectsSetting extends DefaultOptions {
  /**
   * Флаг возможности срабатывания
   */
  enabled: boolean = true;

  /**
   * Весовой коэффициент вероятности курсора
   */
  weight: number = 50;
}
