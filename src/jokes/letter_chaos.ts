import { Joke, JokeSettings, StopableJoke } from "../joke";
import $ from "jquery";
import { JokerClass } from "../joker";

/**
 * **Буквенный хаос**
 * 
 * Все буквы в словах, кроме первой и последней, перемешены.
 * 
 * @author Kozhilya
 */
export class LetterChaosJoke extends Joke {
    id = 'letter_chaos';

    title = 'Буквенный хаос';

    description = 'Все буквы в словах, кроме первой и последней, перемешены.';

    settings = new LetterChaosJokeSettings;

    punctuationSymbols: string[] | null = null;

    private shuffleLetters(word: string): string {
        // Check if the word has two or more letters
        if ((word.length < 3) || !this.check(this.settings.shuffle_chance)) {
            return word;
        }

        // Split the word into an array of characters
        const characters = word.split("");

        // Shuffle the characters between the first and last letters
        const middleCharacters = characters.slice(1, -1);
        for (let i = middleCharacters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [middleCharacters[i], middleCharacters[j]] = [middleCharacters[j], middleCharacters[i]];
        }

        // Join the shuffled characters back into a word
        return [characters[0], ...middleCharacters, characters[characters.length - 1]].join("");
    }

    private processNode(node: any) {
        node.textContent = node.textContent?.replace(/([А-Яа-яA-Za-z]+)/gm, this.shuffleLetters);
    }

    start(): void {
        const items = $(this.settings.selector).find('*').contents().filter((_, node) => node.nodeType === Node.TEXT_NODE);

        items.each((_, node) => this.processNode(node))
    }
}

export class LetterChaosJokeSettings implements JokeSettings {
    enabled: boolean = true;

    chance: number = 20;

    /**
     * Селектор всех элементов, которые будут затронуты
     */
    selector: string = '.post-content';

    /**
     * Вероятность того, что буквы будут перемешаны
     */
    shuffle_chance: number = 50;
}
