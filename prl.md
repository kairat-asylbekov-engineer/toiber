# Product Requirements & Technical Specification
## Платформа создания сайтов-приглашений (MVP)

---

# 1. Анализ продукта

## 1.1 Ключевая ценность

**Для пользователя:**
- Быстро создать красивое приглашение без навыков разработки
- Получить ссылку для гостей
- Собирать RSVP (подтверждение участия)

**Для гостей:**
- Удобно получить всю информацию о событии
- Легко подтвердить участие

---

## 1.2 Основные User Flows

### Создание приглашения
1. Пользователь заходит на сайт
2. Выбирает шаблон
3. Заполняет данные
4. Видит preview
5. Публикует (после оплаты)
6. Получает ссылку

---

### Просмотр приглашения
1. Гость открывает ссылку
2. Смотрит информацию
3. Отправляет RSVP

---

### Владелец
1. Авторизуется
2. Открывает приглашение
3. Видит список гостей

---

## 1.3 MVP vs Post-MVP

### MVP
- Шаблоны
- Редактирование данных
- Slug
- RSVP
- Авторизация

### Post-MVP
- Кастомизация дизайна
- Аналитика
- QR-коды
- Drag & Drop редактор

---

# 2. Product Requirements List (PRL)

## 2.1 Функциональные требования

### Авторизация
- Вход по email (magic link)

---

### Приглашения
- Создание
- Редактирование
- Удаление
- Генерация slug
- Проверка уникальности

---

### Публикация
- Статусы:
  - draft
  - published

---

### Просмотр страницы
- Доступ по slug
- SSR/SSG

---

### Шаблоны
Каждый шаблон включает:

- Hero (имена + фото)
- Текст приглашения
- Дата и время
- Кнопка "Добавить в календарь"
- Countdown таймер
- Локация + карта
- Галерея
- Видео (опционально)
- Блок подарков
- Пожелания гостей
- RSVP форма

---

### RSVP
- Имя
- Статус (да/нет)
- Комментарий
- Сохранение в БД

---

### Кабинет пользователя
- Список приглашений
- Просмотр гостей
- Редактирование

---

## 2.2 Нефункциональные требования

### Производительность
- < 2 сек загрузка
- Оптимизация изображений

---

### Безопасность
- RLS (Supabase)
- Rate limit
- Honeypot

---

### Масштабируемость
- Горизонтальная (через Vercel + Supabase)

---

### Надежность
- Бэкапы
- Уникальные индексы

---

## 2.3 UX/UI

- Mobile-first
- Минимум шагов
- Live preview
- Чистый UI

---

## 2.4 Интеграции

- Email
- Карты
- Календарь (ICS)

---

# 3. Техническое задание (ТЗ)

## 3.1 Стек

### Frontend
- Next.js
- TypeScript
- Tailwind CSS

### Backend
- Supabase
  - Auth
  - DB
  - Storage

### Деплой
- Vercel

---

## 3.2 Архитектура
Next.js
↓
Supabase

Auth
DB
Storage

---

## 3.3 Основные модули

### Auth
- Magic link

---

### Template Engine
- React компоненты
- JSON schema

---

### Invitations
- CRUD
- slug routing

---

### RSVP
- Create
- Read (owner only)

---

### Media
- Upload
- Resize
- Storage

---

## 3.4 API

### POST /api/invitations
Создание

### GET /api/invitations/:slug
Получение

### POST /api/invitations/:slug/rsvp
Отправка RSVP

### GET /api/invitations/:slug/rsvp
Список гостей

---

## 3.5 База данных

### invitations

---

## 3.3 Основные модули

### Auth
- Magic link

---

### Template Engine
- React компоненты
- JSON schema

---

### Invitations
- CRUD
- slug routing

---

### RSVP
- Create
- Read (owner only)

---

### Media
- Upload
- Resize
- Storage

---

## 3.4 API

### POST /api/invitations
Создание

### GET /api/invitations/:slug
Получение

### POST /api/invitations/:slug/rsvp
Отправка RSVP

### GET /api/invitations/:slug/rsvp
Список гостей

---

## 3.5 База данных

### invitations
id
user_id
slug
template_id
data (jsonb)
status
created_at

---

### rsvps
id
invitation_id
name
status
comment
created_at

---

## 3.6 Безопасность (RLS)

### invitations
- доступ только владельцу

### rsvps
- insert: публичный
- select: только владелец

---

## 3.7 User Stories

### US1
Создать приглашение  
AC:
- выбрать шаблон
- заполнить данные
- увидеть preview

---

### US2
Гость отправляет RSVP  
AC:
- форма работает
- данные сохраняются

---

### US3
Владелец видит гостей  
AC:
- только он имеет доступ
- список отображается

---

## 3.8 Приоритеты (MoSCoW)

### Must
- шаблоны
- slug
- RSVP
- auth

### Should
- галерея
- подарки
- таймер

### Could
- видео
- аналитика

### Won’t
- drag & drop

---

## 3.9 Риски

### Slug
- конфликт → slug-1

---

### Спам
- rate limit
- honeypot

---

### Изображения
- ограничение размера
- resize

---

## 3.10 Ключевые решения

- JSONB для данных
- Supabase вместо backend
- React templates

---

# Итог

Продукт:
- создаёт приглашения
- даёт ссылку
- собирает RSVP
