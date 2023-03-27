import { Joke, JokeSettings, StopableJoke } from "../joke";
import $ from "jquery";

/**
 * **Зеркало**
 * 
 * Элементы форума отражаются (по крайней мере, пытаются)
 * 
 * @author Kozhilya
 */
export class MirrorJoke extends Joke {
    settings: MirrorJokeSettings;

    start(): void {
        $('.post, .post h3, .post-links, .post-author, .post-content')
            .css('transform', 'scaleX(-1)').css('-moz-transform', 'scaleX(-1)').css('-moz-transform', 'scaleX(-1)').css('filter', 'FlipH').css('-ms-filter', '"FlipH"');
        $('#pun-title #title-logo').animate('')
        $('.post-links, .post-links ul, .post h3 span').css('margin-left', '0');
        $('.post h3 span').css('margin-right', '25em');
    }
}

export class MirrorJokeSettings implements JokeSettings {
    chance: number = 30;
}