import { Joke, JokeSettings, StopableJoke } from "../joke";
import $ from "jquery";

/**
 * **Мама, Я сОшЛа С уМа!**
 * 
 * иМеНа ЗаБоРчИкОм
 * 
 * @author Kozhilya
 */
export class CrazyLettersJoke extends Joke {
    id = 'crazy_letters';

    title = 'Мама, Я сОшЛа С уМа!';

    description = 'иМеНа ЗаБоРчИкОм';

    settings = new CrazyLettersJokeSettings;

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
    enabled: boolean = true;

    chance: number = 20;

    /**
     * Селектор всех элементов, которые будут затронуты
     */
    selector: string = '.pa-author a';
}