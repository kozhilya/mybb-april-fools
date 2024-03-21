import './types/html.d';
import './types/mybb.d';

import {JokerClass} from './joker';
import $ from 'jquery';
import buttonHTML from './html/button.html';
import stylesHTML from './html/styles.html';
import windowHTML from './html/window.html';

/**
 * Класс интерфейса настроек
 */
export class JokerUI {
  joker: JokerClass;

  /**
   * Создание класса интерфейса настроек
   *
   * @param {JokerClass} joker
   */
  constructor(joker: JokerClass) {
    this.joker = joker;

    $('link[rel="stylesheet"]').eq(0).before(stylesHTML);

    const button = this.button;

    button.hide();

    button.mybbModal({
      title: 'Настройки первоапрельских шуток',
      content: () => this.render(),
      closer: true,
      noscroll: true,
      escClose: true,
    });
  }

  /**
   * Основная кнопка, открывающая настройки
   * @return {JQuery<HTMLButtonElement>}
   */
  get button(): JQuery<HTMLButtonElement> {
    let button = $('.april-fools__button');

    if (button.length === 0) {
      button = $(buttonHTML).appendTo('body');
    }

    return button as JQuery<HTMLButtonElement>;
  }

  /**
   * Показать кнопку настроек
   */
  show() {
    this.button.show();
  }

  /**
   * Создать окно настроек
   * @return {JQuery<HTMLDivElement>}
   */
  render(): JQuery<HTMLDivElement> {
    const result = $('<div></div>').html(windowHTML) as JQuery<HTMLDivElement>;
    const rowTemplate = $('#april-fools__window-row', result).html();
    const jokeContainer = $('.april-fools__jokes', result);

    for (const joke of Object.values(this.joker.jokes)) {
      const row = $(eval('`' + rowTemplate + '`'));
      $('input[type="checkbox"]', row)
        .prop('checked', joke.settings.enabled)
        .on('click', (e) => {
            const target = (e.currentTarget as HTMLInputElement);
            this.joker.toggleJoke(joke.id, target.checked);
          }
        );
      jokeContainer.append(row);
    }

    $('button', result).on('click', async () => {
      await this.joker.clearUserStates();
      window.location.reload();
    });

    return $('.april-fools__content', result);
  }
}
