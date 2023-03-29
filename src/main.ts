import { JokerClass } from "./joker";
import { Joke } from "./joke";
import { ShakeJoke } from "./jokes/shake";
import { HumanitarianHellJoke } from "./jokes/humanitarian_hell";
import { MirrorJoke } from "./jokes/mirror";
import { CarnivalJoke } from "./jokes/carnival";
import { CrazyLettersJoke } from "./jokes/crazy_letters";
import { LetterChaosJoke } from "./jokes/letter_chaos";
import { CursorEffectsJoke } from "./jokes/cursor";
import { StupidTitleJoke } from "./jokes/stupid_title";

(window as any).AprilJokes = ((jokes: JokeClassList): JokerClass => {
    const cl = new JokerClass();

    jokes.forEach(joke => {
        cl.add(new joke());
    });

    $(() => cl.regularStart());

    return cl;
})([
    ShakeJoke,
    HumanitarianHellJoke,
    MirrorJoke,
    CarnivalJoke,
    CrazyLettersJoke,
    LetterChaosJoke,
    CursorEffectsJoke,
    StupidTitleJoke,
]);

interface JokeClassList extends Array<new () => Joke> {}