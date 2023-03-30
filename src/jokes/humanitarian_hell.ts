import { Joke, JokeSettings, StopableJoke } from "../joke";
import { getTextNodes } from "../common";
import $ from "jquery";

/**
 * **Ад гуманитария**
 *
 * Все "тся" заменяются на "ться", а все "ться" на "тся"
 *
 * @author Kozhilya
 */
export class HumanitarianHellJoke extends Joke {
  id = "humanitarian_hell";

  title = "Ад гуманитария";

  description = 'Все "тся" заменяются на "ться", а все "ться" на "тся"';

  settings = new HumanitarianHellJokeSettings();

  processText(text: string): string {
    return text.replace(/(ть?ся)/g, function (fnd) {
      return fnd.indexOf("ь") > 0 ? "тся" : "ться";
    });
  }

  start(): void {
    const textNodes = getTextNodes(this.settings.selector);

    textNodes.each((_, elem) => {
      elem.textContent = this.processText(elem.textContent);
    });
  }
}

export class HumanitarianHellJokeSettings implements JokeSettings {
  enabled: boolean = true;

  chance: number = 20;

  /**
   * Селектор всех элементов, которые будут затронуты
   */
  selector: string = ".post-content";
}
