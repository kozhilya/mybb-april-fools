import { Joke, JokeSettings } from "./joke";

/**
 * Блок обработки перво-апрельских шуток
 * 
 * @author Kozhilya
 */
export class AprilFoolsJokeClass {
    /**
     * Добавление шутки
     * 
     * @param joke
     */
    add(joke: Joke): void {
        this.jokes[joke.id] = joke;
    }

    /**
     * Запись новых настроек
     * 
     * @param settings
     */
    setSettings(settings: SettingsMap): void {
        for (const entry of Object.entries(settings)) {
            const id = entry[0];
            const jokeSettings = entry[1];

            this.jokes[id].settings = { ...this.jokes[id].settings, ...jokeSettings };
        }
    }

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
     * Запуск шутки
     * 
     * @param id
     * @param {boolean} forced
     */
    start(id: string, forced: boolean = false) {
        if (!(id in this.jokes))
            return;

        const joke = this.jokes[id];

        if (!forced && !this.check(joke.settings.chance)) {
            return;
        }

        joke.start();
    }

    /**
     * Запуск всех шуток
     */
    startAll() {
        for (const key of Object.keys(this.jokes)) {
            this.start(key);
        }
    }

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