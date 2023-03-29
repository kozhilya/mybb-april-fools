import { Joke, JokeSettings, StopableJoke } from "../joke";
import $ from "jquery";

/**
 * **Глупые статусы**
 * 
 * Каждому пользователю даётся новый глупый статус.
 * 
 * @author Kozhilya
 */
export class StupidTitleJoke extends Joke {
    id = 'stupid_title';

    title = 'Глупые статусы';

    description = 'Каждому пользователю даётся новый глупый статус.';

    settings = new StupidTitleJokeSettings;

    private loadedGenders: any = null;

    async loadGenders(): Promise<void> {
        const names = $('.pa-author a')
            .map((_, elem) => elem.innerText).toArray()
            .reduce((arr: string[], name: string) => {
                if (arr.indexOf(name) < 0){
                    arr.push(name);
                }
                return arr
            }, []);

        const url = '/api.php?' + $.param({ method: 'users.get', fields: 'username,sex', username: names });
        const response = await fetch(url);
        const json = await response.json();

        this.loadedGenders = {};

        if (json.error) {
            return;
        }

        json.response.users.forEach((element: any) => {
            if (element.sex === '0') {
                return;
            }

            this.loadedGenders[element.username] = element.sex === '1';
        });
    }

    resolveGender(name: string): boolean {
        if (this.settings.gender_resolver !== null) {
            return !!this.settings.gender_resolver.call(this, name);
        }

        if (name in this.loadedGenders) {
            return !!this.loadedGenders[name];
        }

        this.resetSeed();
        return this.selectRandom(name, { 'm': 1, 'f': 1 }) === 'm';
    }

    async start(): Promise<void> {
        await this.loadGenders();

        const cache: any = {};

        $('.post-author').each((_, root) => {
            const name = $('.pa-author a', root).text();
            if (!name) {
                return;
            }

            if (!(name in cache)) {
                this.resetSeed();
                cache[name] = this.generatePhrase(name);
            }
            
            $('.pa-title', root).text(cache[name]);
        });
    }

    private prng(name: string, seed: number, limit: number): number {
        /*
            https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js

            cyrb53 (c) 2018 bryc (github.com/bryc)
            A fast and simple hash function with decent collision resistance.
            Largely inspired by MurmurHash2/3, but with a focus on speed/simplicity.
            Public domain. Attribution appreciated.
        */
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < name.length; i++) {
            ch = name.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
        h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
        
        const value = 4294967296 * (2097151 & h2) + (h1>>>0);
        
        return Math.floor(Math.pow(Math.sin(value), 2) * limit) % limit;
    }

    private seed = 0;

    private resetSeed(): void {
        const date = new Date();
        const time = new Date().getUTCHours() * 60 + new Date().getUTCMinutes();
        this.seed = Math.floor(time / this.settings.change_frequency);

        console.log('Seed reset:', time, this.seed);
    }

    private selectRandom(name: string, variants: StupidTitleWeightedVariants): string {
        const elements = Object.keys(variants);
        const totalWeight = elements.reduce((sum, element) => sum + variants[element], 0);
        const randomWeight = this.prng(name, this.seed++, totalWeight);
        
        let currentWeight = 0;
        for (const element of elements) {
            currentWeight += variants[element];
            if (randomWeight <= currentWeight) {
                return element;
            }
        }

        throw new Error("Тебя быть тут не должно...");
    }

    private buildVariants(type: string, gender: boolean): StupidTitleWeightedVariants {
        const result: StupidTitleWeightedVariants = {};
        const variants: StupidTitleVariant = this.settings.variants[type];

        for (const iterator of Object.entries(variants)) {
            const word = iterator[0];
            const wordSettings = iterator[1];
            
            if (!wordSettings.enabled || (wordSettings.gender === !gender)) {
                continue;
            }

            if (!this.settings.rude && wordSettings.rude) {
                continue;
            }

            result[word] = wordSettings.weight;
        }
        
        return result;
    }

    private capitalizeFirst(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    generatePhrase(name: string): string {
        const gender = this.resolveGender(name);
        const prhase = this.selectRandom(name, this.settings.schemas);

        return this.capitalizeFirst(prhase.replace(/\{(.+?)\}/g, (_, type: string) => {
            const variants = this.buildVariants(type, gender);
            
            return this.selectRandom(name, variants);
        }));
    }
}

export class StupidTitleJokeSettings implements JokeSettings {
    enabled: boolean = true;
    chance: number = 100;

    /**
     * Определение пола по имени.
     * По умолчанию род устанавливается случайным образом
     * 
     * Если установлено значение `null`, система попытается загрузить пол, установленный в настройках аккаунта. Если этот пол определить невозможно, то он будет выбран случайно. Эта настройка позволяет изменить это поведение, если ваш форум обладает ролевой системой, в которой пол определяется иным образом.
     * 
     * @param name Имя персонажа
     * @returns true, если мужской род; false, если женский род
     */
    gender_resolver: Function | null = null;

    /**
     * Разрешить возможно оскорбительные варианты
     */
    rude: boolean = false;

    /**
     * Частота смены статусов (в минутах)
     */
    change_frequency: number = 5;

    /**
     * Разрешённые схемы формирования статусов
     * 
     * {adj} - прилагательное
     * {noun} - имя существительно
     * {verb} - глагол
     * {adv} - наречие
     * {place} - дополнение места
     * {p} - знак препинания
     */
    schemas: StupidTitleWeightedVariants = {
        '{adj} {noun}{p}': 10,
        '{noun} {adj}{p}': 3,
        '{adj}, {adj} {noun}{p}': 10,
        '{adj} и очень {adj} {noun}{p}': 10,                
        '{adj} {noun} {verb}{p}': 10,
        '{adj} {noun} {adv} {verb}{p}': 5,
        '{adj} {noun} {verb} {place}{p}': 5,
        '{adj} {noun} {adv} {verb} {place}{p}': 5,
    };

    /**
     * Вариант слов
     * Смотрите раздел описания скрипта, что бы настроить это поле
     */
    variants: StupidTitleVariants = {
        adj: {
            ...buildVariant(true, 'жесткий,^удачливый,низкий,знакомый,откровенный,^мирный,грамотный,вкусный,виртуальный,пышный,провинциальный,$жирный,заинтересованный,объективный,^оригинальный,пожилой,чистый,особенный,выгодный,громадный,обыкновенный,чужой,ударный,^солнечный,истинный,посторонний,южный,седой,$бесполезный,острый,пестрый,формальный,повседневный,невозможный,$жалкий,целый,$глупый,последний,выходной,серьезный,подземный,небесный,любимый,былой,семейный,далекий,северный,суровый,гигантский,иностранный,родной,конструктивный,показательный,нужный,чрезвычайный,гордый,банальный,открытый,независимый,запасной,мстительный,грубый,алчный,мелочный,хладнокровный,спокойный,терпеливый,креативный,активный,адекватный,застенчивый,опрятный,безнадёжный,уверенный в себе,доброжелательный,ласковый,робкий,воспитанный,самовлюблённый,деятельный,двуличный,верный'),
            ...buildVariant(false, 'жесткая,^удачливая,низкая,знакомая,откровенная,^мирная,грамотная,вкусная,виртуальная,пышная,провинциальная,$жирная,заинтересованная,объективная,^оригинальная,пожилая,чистая,особенная,выгодная,громадная,обыкновенная,чужая,ударная,^солнечная,истинная,посторонняя,южная,седая,$бесполезная,острая,пестрая,формальная,повседневная,невозможная,$жалкая,целая,$глупая,последняя,выходная,серьезная,подземная,небесная,любимая,былая,семейная,далекая,северная,суровая,гигантская,иностранная,родная,конструктивная,показательная,нужная,чрезвычайная,гордая,банальная,открытая,независимая,запасная,мстительная,грубая,алчная,мелочная,хладнокровная,спокаяная,терпеливая,креативная,активная,адекватная,застенчивая,опрятная,безнадёжная,уверенная в себе,доброжелательная,ласковая,робкая,воспитанная,самовлюблённая,деятельная,двуличная,верная'),
        },
        noun: {
            ...buildVariant(null, ''),

            ...buildVariant(true, 'орёл, ниндзя, манекен, пузырь, бродяга, рыцарь, кентавр, зайц, диван, наследник, сын, джентльмен, басурманин, карасик, $злоумышленник, $раб, хоббит, одиночка, отец, кролик, бруталище, дворф, актёр, %дед, спортсмен, $балбес, %мальчег, лев, ёж, организм, монах, хоббит, борец, тигр, монстр, массажист, мачо, эльф, ледник, жук, кот, зомби, проказник, дракон, носорог, волк, лесоруб, кит, %дедушка, динозавр, бард, кулак, принц, %сынок, мальчик, товарищ, ёжик, сурикат'),
            
            ...buildVariant(false, 'заноза, волторна, $личинка, детка, %бабушка, простуда, черепашка, мышь, волчица, деревяшка, пиранья, каруселька, красотка, леди, %дочка, орлица, принцесса, $ведьма, травка, актриса, наследница, %деффачка, горгулья, белочка, акула, машинка, конфетка, знаменитость, косточка, спортсменка, панда, мать, львица, эльфийка, $злоумышленница, чертовка, дворфиха, кошка, $рабыня, скамеечка, дочь, монашка, бактерия, рыбка, бусинка, $бабка, девочка, валькирия, килька, бабочка, милашка, крышка, тигрица, рыбка, русалочка'),
        },
        verb: {
            ...buildVariant(null, 'встаёт, снимает, приказывает, указывает, собирается, чувствует опасность, орёт, болеет, поздравляет, освобождает, поздравляет, бежит, берёт и делает, молчит, радуется, прощает, читает, снимает, снимается в фильме, что-то скрывает, думает, имеет план и придерживается его, тянет, работает, меняется, ловит, отказаться куда-то идти, заходит, замирает, оформляет, нарушает, отказывается что-то делать, шепчет, снимается в сериале, скрывается, учит, спрашивает, идёт, отказывается вставать, прибывает, отказывается, забывает, получает, плывёт, отвечает, поглядывает, говорит, просыпается, соединяет, оглядывается'),

            ...buildVariant(true, 'женится, женился, успел, не успел, смог, скрылся, заработался, познал дзен, присел, обиделся, проснулся, взял и сделал, додумался, не спал'),
            
            ...buildVariant(false, 'выходит замуж, вышла замуж, успела, не успела, смогла, скрылась, заработалась, познала дзен, присела, обиделась, проснулась, взяла и сделала, додумалась, не спала'),
        },
        place: {
            ...buildVariant(null, 'где-то, в пустыне, на пляже, под дождём, %под проливным дождём, в квартире, %в тёплой и уютной квартире, в космосе, в театре, в филармонии, на заснеженной вершине, на конференции, на форуме, в очереди, в лесу, в джунглях, под водой'),
        },
        adv: {
            ...buildVariant(null, 'счастливо, уныло, грустно, позже, немедленно, регулярно, вновь, опять, уже, внезапно, предсказуемо, медленно, быстро, %молниеносно, $грубо, безрассудно, осмысленно, расчётливо'),
        },
        p: {
            '': new StupidTitleSetting({ weight: 10 }),
            '.': new StupidTitleSetting({ weight: 10 }),
            '...': new StupidTitleSetting({ weight: 5 }),
            '!': new StupidTitleSetting({ weight: 5 }),
            '!!!': new StupidTitleSetting({ weight: 2 }),
            '?': new StupidTitleSetting({ weight: 2 }),
            '?!': new StupidTitleSetting({ weight: 1 }),
        },
    };

}

interface StupidTitleVariants {
    [key: string]: StupidTitleVariant
}

interface StupidTitleVariant {
    [key: string]: StupidTitleSetting
}

interface StupidTitleWeightedVariants {
    [key: string]: number
}

class StupidTitleSetting {
    weight: number = 10;

    enabled: boolean = true;
    
    rude: boolean = false;

    gender: boolean|null = null;

    constructor(options: any = new Object) {
        for (const iterator of Object.entries(options)) {
            if (iterator[0] in this) {
                (<any> this)[iterator[0]] = iterator[1];
            }
        }
    }
}

function buildVariant(gender: boolean|null, input: string): StupidTitleVariant
{
    const result: StupidTitleVariant = {};
    const words = input.split(',').map(word => word.trim());
    
    words.forEach(word => {
        const clean_word = word.replace(/[^А-ЯЁа-яёA-Za-z\- ]/g, '');

        if (clean_word === '') {
            return;
        }

        result[clean_word] = new StupidTitleSetting({
            gender,
            rude: word.indexOf('$') >= 0,
            enabled: word.indexOf('!') < 0,
            weight: 10 * ((word.indexOf('$') >= 0) ? 0.5 : 1) * ((word.indexOf('%') >= 0) ? 0.5 : 1) * ((word.indexOf('^') >= 0) ? 2 : 1)
        });
    });

    return result;
}

(window as any).BuildStupdiTitleVariant = buildVariant;