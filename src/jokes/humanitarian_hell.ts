import { Joke, JokeSettings, StopableJoke } from "../joke";
import $ from "jquery";

/**
 * **Ад гуманитария**
 * 
 * Все "тся" заменяются на "ться", а все "ться" на "тся"
 * 
 * @author Kozhilya
 */
export class HumanitarianHellJoke extends Joke {
    id = 'humanitarian_hell';
    
    settings = new HumanitarianHellJokeSettings;

    start(): void {
        $(this.settings.selector).each(function () {
            $(this).html($(this).html().replace(/(ть?ся)/g, function (fnd) {
                return (fnd.indexOf('ь') > 0) ? 'тся' : 'ться';
            }));
        });
    }
}

export class HumanitarianHellJokeSettings implements JokeSettings {
    chance: number = 20;

    /**
     * Селектор всех элементов, которые будут затронуты
     */
    selector: string = '.post-content';
}