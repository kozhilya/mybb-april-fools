import { AprilFoolsJokeClass } from "./handler";
import { Joke } from "./joke";
import { ShakeJoke } from "./jokes/shake";

(window as any).AprilJokes = ((jokes: JokeClassList): AprilFoolsJokeClass => {
    const cl = new AprilFoolsJokeClass();

    jokes.forEach(joke => {
        cl.add(new joke());
    });

    return cl;
})([
    ShakeJoke,
]);

interface JokeClassList extends Array<new () => Joke> {}