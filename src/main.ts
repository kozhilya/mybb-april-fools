import {JokerClass} from './joker';
import {Joke, JokeSettings} from './joke';
import {ShakeJoke} from './jokes/shake';
import {HumanitarianHellJoke} from './jokes/humanitarian_hell';
import {MirrorJoke} from './jokes/mirror';
import {CarnivalJoke} from './jokes/carnival';
import {CrazyLettersJoke} from './jokes/crazy_letters';
import {LetterChaosJoke} from './jokes/letter_chaos';
import {CursorEffectsJoke} from './jokes/cursor';
import {StupidTitleJoke} from './jokes/stupid_title';
import {InvertedScrollJoke} from './jokes/inverted_scroll';
import {LatinizationJoke} from './jokes/latinization';

declare global {
  interface Window { AprilJokes: JokerClass; }
}

window.AprilJokes = ((jokes: JokeList): JokerClass => {
  const cl = new JokerClass();

  jokes.forEach((CustomJoke) => {
    cl.add(new CustomJoke());
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
  InvertedScrollJoke,
  LatinizationJoke,
]);

interface JokeList extends Array<new () => Joke<JokeSettings>> {}
