import { Joke, JokeSettings, StopableJoke } from "../joke";
import $ from "jquery";

/**
 * **Бешеные запятые**
 * 
 * Запятые после слов
 * 
 * @author Kozhilya
 */
export class CrazyPunctuationJoke extends Joke {
    settings: CrazyPunctuationJokeSettings;

    private transform(text: string): string {
        let newText = "";

        for (let i = 0; i < text.length; i++) {
            const currentChar = text[i];
            const nextChar = text[i + 1];

            if (this.settings.symbols.includes(currentChar)) {
                newText += currentChar;
            } else if (nextChar === " " || this.settings.symbols.includes(nextChar)) {
                newText += currentChar;
            }
        }

        return newText;
    }

    private process(node: any): void {

    }

    start(): void {
        const items = $(this.settings.selector).find('*').contents().filter((_, node) => node.nodeType === Node.TEXT_NODE);

        items.each((_, node) => {
            console.log(node);
        })
    }
}

export class CrazyPunctuationJokeSettings implements JokeSettings {
    chance: number = 20;

    /**
     * Селектор всех элементов, которые будут затронуты
     */
    selector: string = '.post-content';

    /**
     * Мигрирующие знаки
     */
    symbols: string = ',.;:?!-()[]{}\'"';


}