import { Joke, JokeSettings, StopableJoke } from "../joke";

/**
 * Форумо-трясение
 * 
 * Страница форума начинает трястись
 * 
 * @author Kozhilya
 */
export class ShakeJoke extends StopableJoke {

    settings: ShakeJokeSettings;

    private interval_id: NodeJS.Timer;

    private items: JQuery;

    private data_name: string = 'april-fools-shake';


    rand(a: number): number {
        return a + this.settings.force * (Math.random() * 2 - 1);
    }

    start(): void {
        this.items = $(this.settings.selector);

        this.items.each((_, elem) => {
            let data: ShakeJokeMargin = {};

            this.settings.directions.forEach(d => {
                data[d] = parseInt($(elem).css('margin-' + d));
            });

            $(elem).data(this.data_name, data);
        });

        this.interval_id = setInterval(() => {
            this.items.each((_, elem) => {
                const data: ShakeJokeMargin = $(elem).data(this.data_name);

                for (const entry of Object.entries(data)) {
                    $(elem).css('margin-' + entry[0], this.rand(entry[1]))
                }
            });
        }, this.settings.interval);
    }

    stop(): void {
        clearInterval(this.interval_id);
        
        this.items.each((_, elem) => {
            let data: ShakeJokeMargin = {};

            this.settings.directions.forEach(d => {
                $(elem).css('margin-' + d, data[d]);
            });

            $(elem).data(this.data_name, data);
        });
    }
}

export class ShakeJokeSettings implements JokeSettings {
    chance: number = 1;

    /**
     * Направление тряски
     */
    directions: string[] = ['top', 'left', 'bottom', 'left'];

    /**
     * Селектор всех элементов, которые будут трястись
     */
    selector: string = '[id^=pun]';

    /**
     * Частота тряски
     */
    interval: number = 100;

    /**
     * Сила тряски
     */
    force: number = 0.5;
}

interface ShakeJokeMargin {
    [key: string]: number;
}