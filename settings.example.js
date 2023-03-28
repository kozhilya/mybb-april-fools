/**
 * Отключение всех шуток
 */
window.AprilJokes.disableAll();

/**
 * Отключение всех эффектов курсора
 */
window.AprilJokes.jokes.cursor.disableAll();

window.AprilJokes.settings = {
    /**
     * Глобальные настройки
     */
    core: {
        /**
         * Активность шутки.
         * Установите это значение `false`, что бы отключить шутку.
         * Если `true`, то шутка будет обработана как обычно.
         */
        enabled: true,
        
        /**
         * Вероятность срабатывания в процентах.
         * Если установлено значение `100`, шутка будет срабатывать всегда.
         * Если установлено значение `0`, шутка никогда не сработает.
         * Лучше отключать шутку, используя enabled = false!
         */
        chance: 100,
    },
    
    /**
     * Форумо-трясение
     * 
     * Страница форума начинает трястись.
     * 
     * @author Kozhilya
     */
    shake: {
        enabled: true,
        chance: 1,

        /**
         * Направление тряски
         */
        directions: ['top', 'left', 'bottom', 'left'],

        /**
         * Сила тряски
         */
        force: 0.5,

        /**
         * Селектор всех элементов, которые будут трястись
         */
        selector: '[id^=pun]',

        /**
         * Частота тряски
         */
        interval: 100,
    },

    /**
     * Зеркало
     * 
     * Элементы форума отражаются (по крайней мере, пытаются)
     * 
     * @author Kozhilya
     */
    mirror: {
        enabled: false,
        chance: 30,
    },

    /**
     * Карнавал
     * 
     * Аватарки приобретают интересные цвета
     * 
     * @author Kozhilya
     */
    carnival: {
        enabled: true,
        chance: 30,

        /**
         * Селектор всех элементов, которые будут перекрашены.
         */
        selector: 'img[src*="/avatars/"]',

        /**
         * Вероятность применения фильтра (может сработать нескольк раз).
         */
        variant_chance: 20,

        /**
         * Список фильтров и диапозона случайных параметров.
         */
        variants: {
            'sepia({0}%)': 100,
            'saturate({0}%)': 100,
            'hue-rotate({0}deg)': 360,
            'invert({0}%)': 100,
        },
    },

    /**
     * Ад гуманитария
     * 
     * Все "тся" заменяются на "ться", а все "ться" на "тся"
     * 
     * @author Kozhilya
     */
    humanitarian_hell: {
        enabled: true,
        chance: 20,

        /**
         * Селектор всех элементов, которые будут затронуты.
         */
        selector: '.post-content',
    },

    /**
     * Мама, Я сОшЛа С уМа!
     * 
     * иМеНа ЗаБоРчИкОм
     * 
     * @author Kozhilya
     */
    crazy_letters: {
        enabled: true,
        chance: 20,

        /**
         * Селектор всех элементов, которые будут затронуты.
         */
        selector: '.pa-author a'
    },

    /**
     * **Буквенный хаос**
     * 
     * Все буквы в словах, кроме первой и последней, перемешены.
     * 
     * @author Kozhilya
     */
    letter_chaos: {
        enabled: true,
        chance: 20,

        /**
         * Селектор всех элементов, которые будут затронуты
         */
        selector: '.post-content',

        /**
         * Вероятность того, что буквы будут перемешаны
         */
        shuffle_chance: 50,
    },

    /**
     * **Красивый курсор**
     * 
     * Эффекты, следующие за курсором
     * 
     * @author Tim Holman
     * @author Kozhilya
     * 
     * @link https://tholman.com/cursor-effects/
     */
    cursor: {
        enabled: true,
        chance: 100,

        /**
         * Список эффектов курсора
         */
        effects: {
            /**
             * Радужный след за курсором
             */
            rainbow: {
                enabled: true,
                weight: 50,

                /**
                 * Длина полосы
                 */
                length: 20,

                /**
                 * Ширина полосы
                 */
                size: 3,

                /**
                 * Цвета полос (сверху вниз)
                 */
                colors: [
                    "#9400D3",
                    "#4B0082",
                    "#0000FF",
                    "#00FF00",
                    "#FFFF00",
                    "#FF7F00",
                    "#FF0000"
                ],
            },

            /**
             * Цепочка из эмодзи "на резинке" под курсором
             */
            springy_emoji: {
                enabled: true,
                weight: 50,
                
                /**
                 * Висящий эмодзи
                 */
                emoji: "🤪",
            },

            /**
             * Падающие от курсора эмодзи
             */
            emoji: {
                enabled: true,
                weight: 50,
                
                /**
                 * Падающие эмодзи
                 */
                emoji: ["🔥", "🐬", "🦆"],
            },

            /**
             * Падающие от курсора пылинки
             */
            fairy_dust: {
                enabled: true,
                weight: 50,
                
                /**
                 * Цвет пылинок
                 */
                colors: ["#ff0000", "#00ff00", "#0000ff"],
            },

            /**
             * След "зависших" курсоров
             */
            ghost: {
                enabled: true,
                weight: 50,
            },

            /**
             * След курсоров "на резинке"
             */
            trailing: {
                enabled: true,
                weight: 50,
                
                /**
                 * Количество элементов
                 */
                particles: 15,

                /**
                 * Скорость частиц
                 */
                rate: 0.4,

                /**
                 * Ссылка на картинку с курсором
                 * Используйте `null`, что бы использовать картинку курсора по умолчанию
                 */
                baseImageSrc: null,
            },

            /**
             * Текст, развивающийся флагом от курсора
             */
            text_flag: {
                enabled: true,
                weight: 50,
                
                /**
                 * Отображаемый текст
                 */
                text: "С днём смеха!",

                /**
                 * Цвет текста
                 */
                color: "#000000",

                /**
                 * Шрифт текста
                 */
                font: "monospace",

                /**
                 * Размер текста
                 */
                textSize: 12,

                /**
                 * Растояние между бквами
                 */
                gap: 14,
            },

            /**
             * Точка, преследующая курсор
             */
            following_dot: {
                enabled: true,
                weight: 50,
                
                /**
                 * Цвет догоняющей точки
                 */
                color: "#323232a6",
            },

            /**
             * Пузырьки от курсора
             */
            bubbles: {
                enabled: true,
                weight: 50,
            },

            /**
             * Снежинки, летящие от курсора
             * 
             * Отключено, потому что сейчас не зима :D
             */
            snowflake: {
                enabled: false,
                weight: 50,
            },

            /**
             * Циферблат вокруг курсора
             */
            clock: {
                enabled: true,
                weight: 50,
                
                /**
                 * Цвет даты
                 */
                dateColor: string = "blue",

                /**
                 * Цвет циферблата
                 */
                faceColor: string = "black",
                
                /**
                 * Цвет секундной стрелки
                 */
                secondsColor: string = "red",
                
                /**
                 * Цвет минутной стрелки
                 */
                minutesColor: string = "black",
                
                /**
                 * Цвет часовой стрелки
                 */
                hoursColor: string = "black",
            },
        },
    },
}