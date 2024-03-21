/**
 * Объект утилит ForumDUtils
 */
export class ForumDUtils {
  /**
   * Проверяет, разрешён ли запуск скрипта
   */
  check(): Promise<boolean>;

  /**
   * Ошибка, сообщающая о невозможности запуска скрипта
   */
  error(): Error;

  /**
   * Набор настроек скриптов
   */
  scripts: {
    [key in string]: ForumDUtilsScript;
  };
}

/**
 * Класс настроек скриптов
 */
export abstract class ForumDUtilsScript {

}
