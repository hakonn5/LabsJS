# Лабораторная работа №4. Работа с DOM-деревом и событиями в JavaScript

## Описание программы

Программа представляет собой систему управления инвентарем игровых предметов с возможностью добавления, удаления и просмотра информации о предметах. Реализована интерактивная таблица с подсветкой предметов по редкости, форма добавления новых предметов с валидацией и детальная информация при наведении.

## Основные компоненты системы

### 1. Класс `Item`

- **Описание**: Базовый класс, представляющий предмет в инвентаре.
- **Поля**:
  - `id` - уникальный идентификатор предмета
  - `name` - название предмета
  - `category` - категория предмета (armor, weapon, potion)
  - `rarity` - редкость предмета (common, uncommon, rare, legendary)
  - `description` - описание предмета
- **Методы**:
  - `getInfo()` - возвращает строку с информацией о предмете

```javascript
export class Item {
  constructor(id, name, category, rarity, description) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.rarity = rarity;
    this.description = description;
  }

  getInfo() {
    return `${this.name} (${this.category}) - ${this.rarity}: ${this.description}`;
  }
}
```

### 2. Класс `Weapon` (наследуется от `Item`)

- **Описание**: Класс, представляющий оружие с дополнительными свойствами.
- **Дополнительные поля**:
  - `damage` - урон оружия
- **Методы**:
  - `attack()` - возвращает сообщение об атаке

```javascript
export class Weapon extends Item {
  constructor(id, name, rarity, description, damage) {
    super(id, name, "weapon", rarity, description);
    this.damage = damage;
  }

  attack() {
    return `Оружие ${this.name} нанесло ${this.damage} урона!`;
  }
}
```

### 3. Модуль `inventory.js`

- **Описание**: Управление массивом предметов инвентаря.
- **Основные функции**:
  - `addItemToInventory()` - добавляет предмет в инвентарь
  - `removeItemFromInventory()` - удаляет предмет по ID
  - `calculateTotalItems()` - возвращает количество предметов
  - `findItemById()` - находит предмет по ID

```javascript
export function addItemToInventory(itemData) {
  const id = generateId();
  let item;

  if (itemData.category === "weapon") {
    item = new Weapon(
      id,
      itemData.name,
      itemData.rarity,
      itemData.description,
      itemData.damage
    );
  } else {
    item = new Item(
      id,
      itemData.name,
      itemData.category,
      itemData.rarity,
      itemData.description
    );
  }

  inventory.push(item);
  updateUI();
  return item;
}
```

### 4. Модуль `ui.js`

- **Описание**: Управление пользовательским интерфейсом.
- **Основные функции**:
  - `renderInventoryTable()` - отрисовывает таблицу инвентаря
  - `updateItemCount()` - обновляет счетчик предметов
  - `showItemDetails()` - показывает детали предмета при наведении
  - `initEventHandlers()` - инициализирует обработчики событий

```javascript
function renderInventoryTable() {
  const tableBody = document.getElementById("inventory-table-body");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  inventory.forEach((item) => {
    const row = document.createElement("tr");
    row.setAttribute("data-item-id", item.id);
    row.classList.add(getRarityClass(item.rarity));

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>${item.rarity}</td>
      <td>${item.category === "weapon" ? item.damage : "—"}</td>
      <td>
        <button class="delete-btn" data-id="${item.id}">Удалить</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}
```

### 5. Модуль `utils.js`

- **Описание**: Вспомогательные функции.
- **Основные функции**:
  - `generateId()` - генерирует уникальный ID
  - `getRarityClass()` - возвращает CSS-класс для редкости предмета
  - `validateItemForm()` - валидирует данные формы

```javascript
export function getRarityClass(rarity) {
  switch (rarity) {
    case "legendary":
      return "legendary-item";
    case "rare":
      return "rare-item";
    case "uncommon":
      return "uncommon-item";
    case "common":
    default:
      return "common-item";
  }
}
```

## Примеры использования

### Добавление предмета в инвентарь

```javascript
const newItem = {
  name: "Магический посох",
  category: "weapon",
  rarity: "rare",
  description: "Посох, усиливающий магические способности",
  damage: 30,
};

addItemToInventory(newItem);
```

### Удаление предмета из инвентаря

```javascript
// Удаление по ID предмета
removeItemFromInventory("abc123def456");
```

### Просмотр информации о предмете

При наведении на строку таблицы автоматически отображается детальная информация о предмете.

## Контрольные вопросы

### 1. Каким образом можно получить доступ к элементу на веб-странице с помощью JavaScript?

Для доступа к элементам DOM можно использовать следующие методы:

- `document.getElementById(id)` - получение элемента по ID
- `document.querySelector(selector)` - получение первого элемента по CSS-селектору
- `document.querySelectorAll(selector)` - получение всех элементов по CSS-селектору
- `document.getElementsByClassName(className)` - получение элементов по классу
- `document.getElementsByTagName(tagName)` - получение элементов по тегу

### 2. Что такое делегирование событий и как оно используется для эффективного управления событиями на элементах DOM?

Делегирование событий - это прием, при котором обработчик события добавляется не к каждому элементу, а к их общему родителю. При возникновении события на дочернем элементе оно всплывает до родителя, где и обрабатывается. Это особенно полезно для динамически добавляемых элементов или большого количества однотипных элементов.

Пример из кода:

```javascript
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    // Обработка клика на кнопку удаления
  }
});
```

### 3. Как можно изменить содержимое элемента DOM с помощью JavaScript после его выборки?

Существует несколько способов изменить содержимое элемента:

- `element.innerHTML = 'новый HTML'` - заменяет HTML-содержимое элемента
- `element.textContent = 'новый текст'` - заменяет текстовое содержимое
- `element.innerText = 'новый текст'` - аналогично textContent, но с учетом стилей
- `element.appendChild(newElement)` - добавляет новый дочерний элемент
- `element.replaceChild(newChild, oldChild)` - заменяет дочерний элемент

Пример из кода:

```javascript
const countElement = document.getElementById("item-count");
if (countElement) {
  countElement.textContent = calculateTotalItems();
}
```

### 4. Как можно добавить новый элемент в DOM-дерево с помощью JavaScript?

Для добавления новых элементов можно использовать:

1. Создание элемента:

```javascript
const newElement = document.createElement("div");
```

2. Настройка элемента:

```javascript
newElement.textContent = "Новый элемент";
newElement.classList.add("my-class");
```

3. Добавление в DOM:

- `parentElement.appendChild(newElement)` - в конец родителя
- `parentElement.insertBefore(newElement, referenceElement)` - перед указанным элементом
- `parentElement.replaceChild(newElement, oldElement)` - замена элемента

Пример из кода:

```javascript
const row = document.createElement("tr");
row.innerHTML = `...`;
tableBody.appendChild(row);
```
