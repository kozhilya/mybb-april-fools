/**
 * Объект настроек шутки
 */
export interface JokeSettings {
    /**
     * Вероятность срабатывания в процентах
     */
    chance: number;
}

/**
 * Объект, описывающий шутку
 */
export abstract class Joke {
    /**
     * Идентификатор шутки
     */
    abstract id: string;

    /**
     * Настройки шутки
     */
    settings: JokeSettings;

    /**
     * Флаг, указывающий, должна ли шутка быть запущена
     */
    enabled: boolean = true;

    /**
     * Запуск шутки
     */
    abstract start(): void;
}

/**
 * Объект, описывающий шутку, которая может быть остановлена
 */
export abstract class StopableJoke extends Joke
{
    /**
     * Остановка шутки, если возможно
     */
    abstract stop(): void;
}