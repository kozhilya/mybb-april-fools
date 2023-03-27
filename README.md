# Бибилотека первоапрельских розыгрышей для форумов MyBB

Базовое использование:
```html
<script src="https://static.kozhilya.ru/script/april-fools.min.js"></script>
<script>
    // Установка настроек системы
    window.AprilJokes.settings = {
        // ...
    };
</script>
```

Использование для тестирования:
```html
<script src="https://static.kozhilya.ru/script/april-fools.js"></script>
<script>
    // Установка настроек системы
    window.AprilJokes.settings = {
        // ...
    };

    // Создание новой шутки
    window.AprilJokes.addCustom(
        // ID шутки
        'alert', 

        // Вызываемая функция шутки
        settings => alert(settings.text), 

        // Стандартные настройки
        {
            chance: 30,
            text: 'Fooled!',
        }
    );

    // Запуск шутки
    // true - отключает проверки случайности
    window.AprilJokes.start('alert', true);
</script>
```

В планах:
* Отключение отдельных шуток для пользователей.

О том, какие шутки определены по умолчанию, смотрите [на странице со списком их настроек](JOKES.md).

Если же вам интересна их реализация, то ищите её в папке [с их исходным кодом](src/jokes).

