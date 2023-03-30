/// <reference path="html.d.ts"/>
import { JokerClass } from "./joker";
import $ from "jquery";
import button_html from "./html/button.html";
import styles_html from "./html/styles.html";
import window_html from "./html/window.html";

export class JokerUI {
  joker: JokerClass;

  constructor(joker: JokerClass) {
    this.joker = joker;

    $('link[rel="stylesheet"]').eq(0).before(styles_html);

    const button = this.button;

    button.hide();
    (<any>button).mybbModal({
      title: "Настройки первоапрельских шуток",
      content: () => this.render(),
      closer: true,
      noscroll: true,
      escClose: true,
    });
  }

  get button() {
    let button = $(".april-fools__button");

    if (button.length === 0) {
      button = $(button_html).appendTo("body");
    }

    return button;
  }

  show() {
    this.button.show();
  }

  render(): JQuery {
    const result: JQuery = $("<div></div>").html(window_html);
    const row_template = $("#april-fools__window-row", result).html();
    const joke_container = $(".april-fools__jokes", result);

    for (const joke of Object.values(this.joker.jokes)) {
      const row = $(eval("`" + row_template + "`"));
      $('input[type="checkbox"]', row)
        .prop("checked", joke.settings.enabled)
        .on("click", (e) =>
          this.joker.toggleJoke(joke.id, (<any>e).currentTarget.checked)
        );
      joke_container.append(row);
    }

    $("button", result).on("click", async () => {
      await this.joker.clearUserStates();
      window.location.reload();
    });

    return $(".april-fools__content", result);
  }
}
