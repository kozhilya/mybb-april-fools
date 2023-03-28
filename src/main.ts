import { JokerClass } from "./joker";
import { Joke } from "./joke";
import { ShakeJoke } from "./jokes/shake";
import { HumanitarianHellJoke } from "./jokes/humanitarian_hell";
import { MirrorJoke } from "./jokes/mirror";
import { CarnivalJoke } from "./jokes/carnival";
import { CrazyLettersJoke } from "./jokes/crazy_letters";
import { CrazyPunctuationJoke } from "./jokes/crazy_punctuation";
import { LetterChaosJoke } from "./jokes/letter_chaos";
import { CursorEffectsJoke } from "./jokes/cursor"

(window as any).AprilJokes = ((jokes: JokeClassList): JokerClass => {
    const cl = new JokerClass();

    jokes.forEach(joke => {
        cl.add(new joke());
    });

    cl.regularStart();

    return cl;
})([
    ShakeJoke,
    HumanitarianHellJoke,
    MirrorJoke,
    CarnivalJoke,
    CrazyLettersJoke,
    CrazyPunctuationJoke,
    LetterChaosJoke,
    CursorEffectsJoke,
]);

interface JokeClassList extends Array<new () => Joke> {}