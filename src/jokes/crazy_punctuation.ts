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
    id = 'crazy_punctuation';

    settings = new CrazyPunctuationJokeSettings;

    punctuationSymbols: string[]|null = null;

    private shufflePunctuation(text: string): string {
        if (this.punctuationSymbols === null) {
            this.punctuationSymbols = this.settings.symbols.split('');
        }
        const words = text.split(" ");

        const shuffledWords = words.map(word => {
            const characters = word.split("");

            // Filter out any non-punctuation characters
            const punctuation = characters.filter(char => this.punctuationSymbols.includes(char));

            // Shuffle the punctuation array
            const shuffledPunctuation = punctuation.sort(() => Math.random() - 0.5);

            // Loop through each character in the word and replace punctuation with shuffled punctuation
            let index = 0;
            return characters.map(char => {
                if (this.punctuationSymbols.includes(char)) {
                    return shuffledPunctuation[index++];
                }
                return char;
            }).join("");
        });

        // Join the shuffled words array into a single string with spaces
        return shuffledWords.join(" ");
    }

    start(): void {
        const items = $(this.settings.selector).find('*').contents().filter((_, node) => node.nodeType === Node.TEXT_NODE);

        items.each((_, node) => {
            node.textContent = this.shufflePunctuation(node.textContent);
        })
    }
}

export class CrazyPunctuationJokeSettings implements JokeSettings {
    chance: number = 20;

    /**
     * Селектор всех элементов, которые будут затронуты
     */
    selector: string = '.post-content p';

    /**
     * Мигрирующие знаки
     */
    symbols: string = ',.;:?!-()[]{}\'"';


}