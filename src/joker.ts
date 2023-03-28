import { Joke, JokeSettings } from "./joke";

/**
 * Блок обработки перво-апрельских шуток
 * 
 * @author Kozhilya
 */
export class JokerClass {
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
     * Добавление шутки
     * 
     * @param joke Объект шутки
     */
    add(joke: Joke): void {
        this.jokes[joke.id] = joke;
    }

    /**
     * Регистрация новой шутки
     * 
     * @param id Идентификатор шутки
     * @param handler Метод, выполняющий шутку
     * @param settings Объект настроек шутки
     */
    addCustom(id: string, handler: Function, settings: JokeSettings|null = null) {
        const joke = new class extends Joke {
            id = id;

            settings: JokeSettings = { chance: 10, enabled: true };

            start() {
                handler.call(this, this.settings);
            }
        };

        Object.assign(joke.settings, settings ?? {});

        this.add(joke);
    }

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
     * @param settings
     */
    set settings(settings: SettingsMap) {
        for (const entry of Object.entries(settings)) {
            const id = entry[0];
            const jokeSettings = entry[1];
            const targetSettings = (id === 'core') ? this.core_settings : this.jokes[id].settings;

            Object.assign(targetSettings, jokeSettings);
        }
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
     * Запуск шутки
     * 
     * @param id
     * @param {boolean} forced
     */
    start(id: string, forced: boolean = false) {
        if (!(id in this.jokes))
            return;

        const joke = this.jokes[id];

        if (!forced && (!joke.settings.enabled || !this.check(joke.settings.chance))) {
            return;
        }

        joke.start();
    }

    /**
     * Запуск всех шуток
     */
    startAll(forced: boolean = false): void {
        for (const key of Object.keys(this.jokes)) {
            this.start(key, forced);
        }
    }

    regularStart(): void {
        const today = new Date();
        const month = today.getMonth() + 1; // Note that getMonth() returns 0-indexed month, so we need to add 1
        const day = today.getDate();

        if (month !== 4 || day !== 1 || !this.core_settings.enabled || !this.check(this.core_settings.chance)) {
            return;
        }

        this.startAll();
    }

    /**
     * Общие настройки системы
     */
    core_settings = new CoreSettings;

    /**
     * Перечисление всех шуток
     */
    jokes: JokeMap = {}
}

/**
 * Объект хранения шуток
 */
interface JokeMap {
    [key: string]: Joke;
}

/**
 * Объект задания настроек
 */
interface SettingsMap {
    [key: string]: JokeSettings;
}

class CoreSettings implements JokeSettings {
    chance = 100;
    enabled = true;
}