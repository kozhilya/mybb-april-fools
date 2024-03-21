import {Joke, JokeSettings} from '../joke';

/**
 * **Обратная гравитация**
 *
 * Скролл в обратную сторону (крутишь вверх, а крутится вниз)
 *
 * @author Идея: Alex_63
 * @author Реализация: Kozhilya
 */
export class InvertedScrollJoke extends Joke<InvertedScrollJokeSettings> {
  id = 'inverted_scroll';

  title = 'Обратная гравитация';

  description = 'Скролл в обратную сторону';

  _settings = new InvertedScrollJokeSettings();

  /**
   * Запуск шутки
   */
  start(): void {
    // let lastScroll = window.scrollY;

    document.addEventListener('wheel', (e) => {
      e.preventDefault();
      scrollBy(0, -e.deltaY);
    }, {passive: false});
  }
}

/**
 * Класс настроек для шутки "Обратная гравитация"
 */
export class InvertedScrollJokeSettings implements JokeSettings {
  enabled: boolean = true;

  chance: number = 10;
}
