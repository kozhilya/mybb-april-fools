import { Joke, JokeSettings, StopableJoke } from "../joke";
import $ from "jquery";

/**
 * **Ад гуманитария**
 * 
 * Все "тся" заменяются на "ться", а все "ться" на "тся".
 * 
 * @author Kozhilya
 */
export class CrazyLettersJoke extends Joke {
    settings: CrazyLettersJokeSettings;

    start(): void {
        $(this.settings.selector).each((_, elem) => {
            let text = $(this).text();
            let result = '';

            for (let i = 0; i < text.length; i++) {
                result += text[i][(i % 2) ? 'toLowerCase' : 'toUpperCase']();
            }

            $(this).text(result);
        });
    }
}

export class CrazyLettersJokeSettings implements JokeSettings {
    chance: number = 20;

    /**
     * Селектор всех элементов, которые будут затронуты
     */
    selector: string = '.pa-author a';
}