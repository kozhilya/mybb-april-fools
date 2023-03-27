import { Joke, JokeSettings, StopableJoke } from "../joke";
import $ from "jquery";
import { AprilFoolsJokeClass } from "../handler";

/**
 * **Карнавал**
 * 
 * Аватарки приобретают интересные цвета
 * 
 * @author Kozhilya
 */
export class CarnivalJoke extends Joke {
    id = 'carnival'

    settings = new CarnivalJokeSettings;
    
    start(): void {
        $(this.settings.selector).each((_, elem) => {
            const filters: string[] = [];

            for (const entry of Object.entries(this.settings.variants)) {
                if (!AprilFoolsJokeClass.check(this.settings.variant_chance)) {
                    continue;
                }

                filters.push(entry[0].replace('{0}', Math.round(Math.random() * entry[1]).toString()));
            }

            if (filters.length > 0) {
                $(elem).css({'filter': filters.join(' ')});
            }
        });
    }
}

export class CarnivalJokeSettings implements JokeSettings {
    chance: number = 30;

    /**
     * Селектор всех элементов, которые будут перекрашены
     */
    selector: string = 'img[src*="/avatars/"]';

    /**
     * Вероятность применения некоторого фильтра
     */
    variant_chance: number = 20;

    /**
     * Список фильтров и диапозона случайных параметров
     */
    variants: CarnivalJokeFilters = {
        'sepia({0}%)': 100,
        'saturate({0}%)': 100,
        'hue-rotate({0}deg)': 360,
        'invert({0}%)': 100,
    }
}

export interface CarnivalJokeFilters {
    [key: string]: number;
}