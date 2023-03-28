import { Joke, JokeSettings, StopableJoke } from "../joke";
import $ from "jquery";
import { Interface } from "readline";
// import * as cursor_effects from "cursor-effects";
const cursor_effects = require("cursor-effects");

/**
 * **Красивый курсор**
 * 
 * Эффекты, следующие за курсором
 * 
 * @author Tim Holman
 * @link https://tholman.com/cursor-effects/
 */
export class CursorEffectsJoke extends StopableJoke {
    id = 'cursor_effects';

    settings = new CursorEffectsJokeSettings;

    active_cursor_effect: any;
    
    /**
     * Разблокировать все варианты курсоров
     */
    enableAll() {
        for (const key of Object.keys(this.settings.effects)) {
            this.settings.effects[<CursorEffectsEnum> key].enabled = true;
        }
    } 
    
    /**
     * Заблокировать все варианты курсоров
     */
    disableAll() {
        for (const key of Object.keys(this.settings.effects)) {
            this.settings.effects[<CursorEffectsEnum> key].enabled = false;
        }
    }

    private weight(effect: CursorEffectsEnum): number {
        const s = this.settings.effects[effect];
        return s.enabled ? s.weight : 0;
    }

    getRandomEffect(): CursorEffectsEnum {
        const elements = Object.keys(CursorEffectsEnum).map(e => <CursorEffectsEnum>e);
        const totalWeight = elements.reduce((sum, element) => sum + this.weight(element), 0);
        const randomWeight = Math.random() * totalWeight;
        
        let currentWeight = 0;
        for (const element of elements) {
            currentWeight += this.weight(element);
            if (randomWeight <= currentWeight) {
                return element;
            }
        }

        throw new Error("Тебя быть тут не должно...");
    }
   
    start(): void {
        const effect = this.getRandomEffect();
        const settings = this.settings.effects[effect];

        this.active_cursor_effect =  resolveCursorEffectsEnum(effect, settings);
    }

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
    Clock = 'clock'
}

function resolveCursorEffectsEnum(effect: CursorEffectsEnum|string, options: CursorEffectsSetting): any {
    switch (effect) {
        case CursorEffectsEnum.Rainbow:
            return cursor_effects.rainbowCursor(options);

        case CursorEffectsEnum.FairyDust:
            return cursor_effects.fairyDustCursor(options);

        case CursorEffectsEnum.SpringyEmoji:
            return cursor_effects.springyEmojiCursor(options);

        case CursorEffectsEnum.Emoji:
            return cursor_effects.emojiCursor(options);

        case CursorEffectsEnum.Ghost:
            return cursor_effects.ghostCursor(options);

        case CursorEffectsEnum.Trailing:
            return cursor_effects.trailingCursor(options);

        case CursorEffectsEnum.TextFlag:
            return cursor_effects.textFlag(options);

        case CursorEffectsEnum.FollowingDot:
            return cursor_effects.followingDotCursor(options);

        case CursorEffectsEnum.Bubbles:
            return cursor_effects.bubbleCursor(options);

        case CursorEffectsEnum.Snowflake:
            return cursor_effects.snowflakeCursor(options);

        case CursorEffectsEnum.Clock:
            return cursor_effects.clockCursor(options);
    }
}

export class CursorEffectsJokeSettings implements JokeSettings {
    enabled: boolean = true;

    chance: number = 100;

    effects: { [key in CursorEffectsEnum]?: CursorEffectsSetting } = {
        /**
         * Радужный след за курсором
         */
        [CursorEffectsEnum.Rainbow]: new class extends DefaultCursorEffectsSetting {
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
                "#9400D3",
                "#4B0082",
                "#0000FF",
                "#00FF00",
                "#FFFF00",
                "#FF7F00",
                "#FF0000"
            ];
        },

        /**
         * Цепочка из эмодзи "на резинке" под курсором
         */
        [CursorEffectsEnum.SpringyEmoji]: new class extends DefaultCursorEffectsSetting {
            /**
             * Висящий эмодзи
             */
            emoji: string = "🤪"
        },

        /**
         * Падающие от курсора эмодзи
         */
        [CursorEffectsEnum.Emoji]: new class extends DefaultCursorEffectsSetting {
            /**
             * Падающие эмодзи
             */
            emoji: string[] = ["🔥", "🐬", "🦆"]
        },

        /**
         * Падающие от курсора пылинки
         */
        [CursorEffectsEnum.FairyDust]: new class extends DefaultCursorEffectsSetting {
            /**
             * Цвет пылинок
             */
            colors: string[] = ["#ff0000", "#00ff00", "#0000ff"];
        },

        /**
         * След "зависших" курсоров
         */
        [CursorEffectsEnum.Ghost]: new DefaultCursorEffectsSetting,

        /**
         * След курсоров "на резинке"
         */
        [CursorEffectsEnum.Trailing]: new class extends DefaultCursorEffectsSetting {
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
        },

        /**
         * Текст, развивающийся флагом от курсора
         */
        [CursorEffectsEnum.TextFlag]: new class extends DefaultCursorEffectsSetting {
            /**
             * Отображаемый текст
             */
            text: string = "С днём смеха!";

            /**
             * Цвет текста
             */
            color: string = "#000000";

            /**
             * Шрифт текста
             */
            font: string = "monospace";

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

        },

        /**
         * Точка, преследующая курсор
         */
        [CursorEffectsEnum.FollowingDot]: new class extends DefaultCursorEffectsSetting {
            /**
             * Цвет догоняющей точки
             */
            color: string = "#323232a6";
        },
        
        /**
         * Пузырьки от курсора
         */
        [CursorEffectsEnum.Bubbles]: new DefaultCursorEffectsSetting,

        /**
         * Снежинки, летящие от курсора
         * 
         * Отключено, потому что сейчас не зима :D
         */
        [CursorEffectsEnum.Snowflake]: new class extends DefaultCursorEffectsSetting {
            weight: number = 0;
        },

        /**
         * Циферблат вокруг курсора
         */
        [CursorEffectsEnum.Clock]: new class extends DefaultCursorEffectsSetting {
            /**
             * Цвет даты
             */
            dateColor: string = "blue";

            /**
             * Цвет циферблата
             */
            faceColor: string = "black";
            
            /**
             * Цвет секундной стрелки
             */
            secondsColor: string = "red";
            
            /**
             * Цвет минутной стрелки
             */
            minutesColor: string = "black";
            
            /**
             * Цвет часовой стрелки
             */
            hoursColor: string = "black";
        },
    };
}

interface CursorEffectsSetting {
    [key: string]: any;
}

class DefaultCursorEffectsSetting implements CursorEffectsSetting {
    /**
     * Флаг возможности срабатывания
     */
    enabled: boolean = true;

    /**
     * Весовой коэффициент вероятности курсора
     */
    weight: number = 50;
}
