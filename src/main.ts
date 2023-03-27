import { AprilFoolsJokeClass } from "./handler";
import { Joke } from "./joke";
import { ShakeJoke } from "./jokes/shake";
import { HumanitarianHellJoke } from "./jokes/humanitarian_hell";
import { MirrorJoke } from "./jokes/mirror";
import { CarnivalJoke } from "./jokes/carnival";
import { CrazyLettersJoke } from "./jokes/crazy_letters";
import { CrazyPunctuationJoke } from "./jokes/crazy_punctuation";

(window as any).AprilJokes = ((jokes: JokeClassList): AprilFoolsJokeClass => {
    const cl = new AprilFoolsJokeClass();

    jokes.forEach(joke => {
        cl.add(new joke());
    });

    return cl;
})([
    ShakeJoke,
    HumanitarianHellJoke,
    MirrorJoke,
    CarnivalJoke,
    CrazyLettersJoke,
    CrazyPunctuationJoke,
]);

interface JokeClassList extends Array<new () => Joke> {}