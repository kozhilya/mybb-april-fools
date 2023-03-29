/**
 * Объект настроек шутки
 */
export interface JokeSettings {
    /**
     * Флаг блокировки срабатывания
     */
    enabled: boolean;

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
    settings: JokeSettings;

    /**
     * Проверка вероятности
     * 
     * @param {number} chance Вероятность срабатывания
     * @returns {boolean} Флаг срабатывания (true - сработало)
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
     * @param value Новое значение
     */
    toggle(value: boolean|null = null) {
        this.settings.enabled = (value === null) ? !this.settings.enabled : value;
    }

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

