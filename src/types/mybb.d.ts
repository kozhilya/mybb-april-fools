// eslint-disable-next-line camelcase
import {MYBB_vsc, MybbEditor, MybbTopic} from './FORUM';
import {ForumDUtils} from './ForumDUtils';

declare global {
  interface Window {
    /**
     * Объект для работы с ForumD Utils.
     */
    FDU?: ForumDUtils;

    /**
     * Объект настроек форума.
     */
    FORUM: {
      topic?: MybbTopic;
      editor?: MybbEditor;
    };

    /**
     * Вставить в форму цитату в теге [quote].
     * @param {string} author Автор сообщения
     * @param {number} postId ID сообщения, из которого происходит цитата
     */
    quote(author: string, postId: number): void;

    /**
     * Вставка BB-кода.
     * @param {string} tagStart Текст, что будет вставлен до выделения
     * @param {string} tagEnd Текст, что будет вставлен после выделения
     */
    bbcode(tagStart: string, tagEnd: string): void;

    /**
     * Изменить видимость служебной области.
     * @param {string} areaName Идентификатор области
     */
    changeVisibility(areaName: string): void;

    /**
     * Вставка сообщения.
     * @param {string} value
     */
    insert(value: string): void;

    /**
     * Вставить смайл.
     * @param {string} emote Код смайла
     */
    smile(emote: string): void;

    /**
     * Вставка тега таблицы.
     * @param {number} rows Количество строк
     * @param {number} columns Количество столбцов
     */
    // eslint-disable-next-line camelcase
    tag_table(rows: number, columns: number): void;

    /**
     * Метод выбора видео-хостинга.
     * @param {HTMLElement} element Элемент
     * @param {Event|Event[]} event Событие
     */
    // eslint-disable-next-line camelcase
    MYBB_vsi(element: HTMLElement, event: Event|Event[]): void;

    /**
     * Объект с правилами для видео-тегов.
     */
    // eslint-disable-next-line camelcase
    MYBB_vsc: MYBB_vsc;

    /**
     * Вставка загруженного изображения.
     * @param {HTMLElement | JQuery} element Элемент области вставки
     */
    insertUploadedImage(element: HTMLElement | JQuery): void;

    /**
     * Вставка тега спойлера.
     * @param {string} spoilerType Тип спойлера
     */
    // eslint-disable-next-line camelcase
    tag_spoiler(spoilerType: string): void;

    /**
     * Вставка символа клавиатуры.
     * @param {string} character Вставляемый символ
     */
    keyboard(character: string): void;

    /**
     * Вставить обращение к пользователю.
     * @param {string} target Имя пользователя
     */
    to(target: string): void;

    // ===== Переменные форума =====

    /**
     * ID форума.
     */
    BoardID: number;

    /**
     * Категория форума в каталоге.
     */
    BoardCat: number;

    /**
     * Название стиля форума или `Custom`, если используется свой стиль.
     */
    BoardStyle: string;

    /**
     * API-код пользователя.
     */
    ForumAPITicket: string;

    /**
     * ID группы пользователя.
     * `1` - это группа администраторов, `2` - модераторов, `3` - гостей.
     */
    GroupID: number;

    /**
     * Название группы пользователя.
     */
    GroupTitle: string;

    /**
     * Статус группы пользователя.
     */
    GroupUserTitle: string;

    /**
     * ID партнёра форума.
     */
    PartnerID: number;

    /**
     * Время запроса к форуму.
     */
    RequestTime: number;

    /**
     * Префикс URL для доступа к статическим файлам.
     * Не имеет заключающей косой черты.
     */
    StaticURL: string;

    /**
     * Префикс URL для доступа к аватарам.
     * Не имеет заключающей косой черты.
     */
    AvatarsURL: string;

    /**
     * Префикс URL для доступа к файлам форума.
     * Не имеет заключающей косой черты.
     */
    FilesURL: string;

    /**
     * Префикс URL для доступа к скриптам.
     * Не имеет заключающей косой черты.
     */
    ScriptsURL: string;

    /**
     * Префикс URL для доступа к загружаемым файлам.
     * Не имеет заключающей косой черты.
     */
    UploadsURL: string;

    /**
     * ID пользователя.
     */
    UserID?: number;

    /**
     * Логин пользователя.
     */
    UserLogin?: string;

    /**
     * Имя пользователя.
     */
    UserName?: string;

    /**
     * Статус пользователя
     */
    UserTitle?: string;

    /**
     * Пол пользователя.
     * 0 - мужской, 1 - женский.
     */
    UserSex?: number;

    /**
     * Возраст пользователя.
     */
    UserAge?: number;

    /**
     * Дата рождения пользователя.
     */
    UserBirthDate?: string;

    /**
     * Ссылка на аватар пользователя.
     * Не содержит домен, но имеет начальную косую черту.
     * @see AvatarsURL
     */
    UserAvatar?: string;

    /**
     * Время регистрации пользователя.
     */
    UserRegistered?: number;

    /**
     * Код приглашения пользователя.
     */
    UserInviteCode?: string;

    /**
     * Количество сообщений пользователя.
     */
    UserPosts?: number;

    /**
     * Время последнего сообщения.
     */
    UserLastPost?: number;

    /**
     * Время последнего посещения.
     */
    UserLastVisit?: number;

    /**
     * Время пребывания пользователя на форуме.
     */
    UserTotalTime?: number;

    /**
     * Количество плюсов, полученных пользователем.
     */
    UserRespectPlus?: number;

    /**
     * Количество минусов, полученных пользователем.
     */
    UserRespectMinus?: number;

    /**
     * Количество плюсов, поставленных пользователем.
     */
    UserPositivePlus?: number;

    /**
     * Количество плюсов, поставленных пользователем.
     */
    UserPositiveMinus?: number;

    /**
     * Уникальный ID пользователя.
     */
    UserUniqueID?: string;

    /**
     * Язык пользователя.
     */
    UserLanguage?: string;

    /**
     * Путь к папке.
     */
    UserUploadsDir?: string;

    /**
     * Дополнительное поле форума 1.
     */
    UserFld1?: string;

    /**
     * Дополнительное поле форума 2.
     */
    UserFld2?: string;

    /**
     * Дополнительное поле форума 3.
     */
    UserFld3?: string;

    /**
     * Дополнительное поле форума 4.
     */
    UserFld4?: string;

    /**
     * Дополнительное поле форума 5.
     */
    UserFld5?: string;

    /**
     * Дополнительное поле форума 6.
     */
    UserFld6?: string;

    /**
     * Дополнительное поле форума 7.
     */
    UserFld7?: string;

    /**
     * Дополнительное поле форума 8.
     */
    UserFld8?: string;

    /**
     * Дополнительное поле форума 9.
     */
    UserFld9?: string;
  }

  interface JQuery {
    mybbModal(data: object): JQuery;
  }

}
