/**
 * Настройки формы ответа MyBB
 */
export type MybbEditor = {
  settings: MybbEditorSettings;
  [key: string]: MybbEditorTag | MybbEditorSettings;
}

/**
 * Общий объект настройки тега MyBB
 */
export class MybbEditorTag {
  /**
   * Название кнопки.
   */
  name: string;

  /**
   * Функция, которая будет вызвана при нажатии кнопки.
   */
  onclick: () => void;
}

/**
 * Общий объект настройки формы ответа MyBB
 */
export type MybbEditorSettings = {
  autofocus: string
}

/**
 * Информация о теме
 */
export class MybbTopic {
  /**
   * Тема сообщения
   */
  subject: string;

  /**
   * Флаг закрытия
   * @type "0"|"1"
   */
  closed: string;

  /**
   * Количество ответов в теме
   */
  num_replies: string;

  /**
   * Количество просмотров темы
   */
  num_views: string;

  /**
   * ID форума
   */
  forum_id: string;

  /**
   * Имя форума
   */
  forum_name: string;

  /**
   * Список модераторов форума,
   * ключ - ID пользователя, значение - имя модератора
   */
  moderators: {
    [key in string]: string
  };

  /**
   * Объект языков
   */
  language: {
    share_legend: string
  };
}


/**
 * Настройки видео-хостингов
 */
// eslint-disable-next-line
export class MYBB_vsc {
  // eslint-disable-next-line
  cH: any;
  RG: { [key: string]: MYBB_vsc_item };
  checkHost: (hostingItem: MYBB_vsc_item, input: string) => boolean;
  clickHost: (element: HTMLAnchorElement) => void;
  parse: () => void;
  isLink: (input: string) => boolean;
  message: (html: string) => void;
  reInit: () => void;
}

/**
 * Настройка отдельного видео-хостинга
 */
// eslint-disable-next-line
type MYBB_vsc_item = {
  l: '0' | '1';
  t: string;
  x: RegExp;
  nf: string;
}
