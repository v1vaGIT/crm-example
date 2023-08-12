# Руководство по работе с проектом

На проекте в качестве сборщика/упаковщика используется [Parcel](https://ru.parceljs.org/getting_started.html).

Если отсутствует папка `node_modules` значит инициализация приложения не проводилась.
Если нужно провести работы:
* необходимо инициализировать приложение командой
```bash
npm install
```

На странице, где необходимо разместить приложение, подключить файлы скрипта и стилей из директории `dist`.

## Структура проекта

### dist

В директории размещаются скомпилированные файлы проекта, которые используются в продакшене

### src

В директории размещаются исходный код проекта: компоненты, файлы с тестами, модули и так далее.
Для организации кода `src` разделен на директории. В каждой из директории располагается файл `Readme.md`, в котором описано их предназначение.

### .editorconfig

Файл с настройками для редактора.

### .env и .env.example

Файл с настройками окружения.
Файл `.env` не отслеживается в git. При необходимости создать его на основе файла `.env.example`.

### .eslintrc.

Файл с настройками линтера.

### .gitattributes

Файл атрибутов Git.

### .parcelrc

Файл с конфигурациями сборщика (Parcel).

### .prettierrc.json

Файл с настройками для Prettier

### package.json

Файл содержит в себе информацию о приложении (списки пакетов необходимые проекту (зависимости), сценарии).

## Сценарии

На проекте доступны следующие сценарии. Обратите внимание, для запуска сценария, вы должны находится в директории проекта. Все сценарии описаны в файле `package.json`.

### Запуск проекта

```bash
npm run start
```

После запуска, приложение доступно для просмотра в браузере по адресу [http://localhost:3000](http://localhost:3000). Порт можно изменить в файле `.env`.

При сохранении изменений, проект перезапускается и обновляется в браузере. Таким образом, вы можете следить за разработкой проекта в режиме реального времени.

При сохранении изменений и при наличии файлов в директории `dist` (если уже запускалась команда `npm run build`), файлы в директории `dist` автоматически обновляются.

### Сборка проекта

```bash
npm run build
```

Запуск сборки приложения.

В процессе сборки приложения, код приложения оптимизируется и минимизируется, для достижения наилучшей производительности.

Во время выполнения инструкций по сборке проекта, в корне проекта создается директория `dist`, в которую будут помещены результирующие файлы. После сборки проект готов к публикации.

Во время выполнения вызываются такие команды как `lint` и `clean`.

### Проверка линтером

```bash
npm run lint
```

Запуск проверки статическим анализатором кода ESLint.

### Автоматическое исправление ошибок, найденные ESLint

```bash
npm run lint-fix
```

### Форматирование кода

```bash
npm run format
```

Запуск форматирования кода инструментом Prettier.