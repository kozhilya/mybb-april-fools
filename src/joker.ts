import { stat } from "fs";
import { Joke, JokeSettings, StopableJoke } from "./joke";
import { JokerUI } from "./ui";

/**
 * Блок обработки перво-апрельских шуток
 * 
 * @author Kozhilya
 */
export class JokerClass {
    ui: JokerUI = new JokerUI(this);

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
    addCustom(id: string, handler: Function, settings: JokeSettings|null = null): Joke {
        const joke = new class extends Joke {
            id = id;

            title = 'Пользовательская шутка';

            description = 'Для шутки не определено описание';

            settings: JokeSettings = { chance: 10, enabled: true };

            start() {
                handler.call(this, this.settings);
            }
        };

        Object.assign(joke.settings, settings ?? {});

        this.add(joke);

        return joke;
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
     * Переключение шутки
     */
    toggleJoke(joke_id: string, state: boolean) {
        const joke = this.jokes[joke_id];
        joke.settings.enabled = state;

        if (joke instanceof StopableJoke && !state) {
            joke.stop();
        }

        this.saveUserStates();
    }

    /**
     * Сохранение пользовательских настроек
     */
    saveUserStates() {
        const states: any = {};
        
        for (const key of Object.keys(this.jokes)) {
            states[key] = this.jokes[key].settings.enabled;
        }

        fetch('/api.php?' + $.param({
            method: 'storage.set',
            user_id: (<any> window).UserID,
            key: 'april-fools',
            token: (<any> window).ForumAPITicket,
            value: JSON.stringify(states),
            timer: 24 * 60
        }));
    }

    /**
     * Загрузка пользовательских настроек
     */
    async loadUserStates() {
        const response = await fetch('/api.php?' + $.param({
            method: 'storage.get',
            user_id: (<any> window).UserID,
            key: 'april-fools',
        }));
        const json = await response.json();

        if (json.error) {
            return;
        }

        const data = JSON.parse(json.response.storage.data['april-fools']);

        for (const key of Object.keys(this.jokes)) {
            this.jokes[key].settings.enabled = data[key];
        }
    }

    async clearUserStates() {
        await fetch('/api.php?' + $.param({
            method: 'storage.delete',
            user_id: (<any> window).UserID,
            key: 'april-fools',
            token: (<any> window).ForumAPITicket,
        }));

        return;
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

    regularCheck(): boolean {
        if (!this.core_settings.enabled) {
            return false;
        }

        if (this.core_settings.testers.indexOf((<any> window).UserID) >= 0) {
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

    async regularStart() {
        if (!this.regularCheck()) {
            return;
        }

        await this.loadUserStates();
        this.ui.show();
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

    testers: number[] = [];
}