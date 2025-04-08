# Лабораторная работа №3. Продвинутые объекты в JavaScript

## Описание программы

Программа моделирует систему инвентаря, где можно создавать предметы, управлять их свойствами и использовать наследование для специализированных типов предметов (например, оружия). Реализация представлена в двух вариантах: с использованием классов ES6 и функций-конструкторов.

## Основные классы и функции

### 1. Класс `Item`

- **Описание**: Базовый класс, представляющий предмет в инвентаре.
- **Поля**:
  - `name` - название предмета
  - `weight` - вес предмета
  - `rarity` - редкость предмета (common, uncommon, rare, legendary)
- **Методы**:
  - `getInfo()` - возвращает строку с информацией о предмете
  - `setWeight(newWeight)` - изменяет вес предмета

```javascript
class Item {
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  getInfo() {
    return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
  }

  setWeight(newWeight) {
    this.weight = newWeight;
  }
}
```

### 2. Класс `Weapon` (наследуется от `Item`)

- **Описание**: Класс, представляющий оружие с дополнительными свойствами.
- **Дополнительные поля**:
  - `damage` - урон оружия
  - `durability` - прочность (0-100)
- **Методы**:
  - `use()` - уменьшает прочность на 10 единиц
  - `repair()` - восстанавливает прочность до 100

```javascript
class Weapon extends Item {
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }

  getInfo() {
    return `${super.getInfo()}, Damage: ${this.damage}, Durability: ${
      this.durability
    }`;
  }

  use() {
    if (this.durability > 0) {
      this.durability = Math.max(0, this.durability - 10);
    }
  }

  repair() {
    this.durability = 100;
  }
}
```

### 3. Функции-конструкторы (альтернативная реализация)

- **Описание**: Реализация той же функциональности с использованием функций-конструкторов и прототипов.

```javascript
function ItemFunc(name, weight, rarity) {
  this.name = name;
  this.weight = weight;
  this.rarity = rarity;
}

ItemFunc.prototype.getInfo = function () {
  return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
};

ItemFunc.prototype.setWeight = function (newWeight) {
  this.weight = newWeight;
};

function WeaponFunc(name, weight, rarity, damage, durability) {
  ItemFunc.call(this, name, weight, rarity);
  this.damage = damage;
  this.durability = durability;
}

WeaponFunc.prototype = Object.create(ItemFunc.prototype);
WeaponFunc.prototype.constructor = WeaponFunc;

WeaponFunc.prototype.getInfo = function () {
  return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}, Damage: ${this.damage}, Durability: ${this.durability}`;
};

WeaponFunc.prototype.use = function () {
  if (this.durability > 0) {
    this.durability = Math.max(0, this.durability - 10);
  }
};

WeaponFunc.prototype.repair = function () {
  this.durability = 100;
};
```

## Примеры использования

### Работа с классом Item

```javascript
const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo()); // Item: Steel Sword, Weight: 3.5, Rarity: rare
sword.setWeight(4.0);
console.log(sword.getInfo()); // Item: Steel Sword, Weight: 4, Rarity: rare
```

### Работа с классом Weapon

```javascript
const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo()); // Item: Longbow, Weight: 2, Rarity: uncommon, Damage: 15, Durability: 100
bow.use();
console.log(bow.durability); // 90
bow.repair();
console.log(bow.durability); // 100
```

### Демонстрация опциональной цепочки

```javascript
const testItem = new Item("Test", 1, "common");
console.log(testItem?.nonExistentProperty?.value); // undefined (без ошибки)
```

## Контрольные вопросы

### 1. Какое значение имеет `this` в методах класса?

В методах класса `this` ссылается на экземпляр класса, для которого был вызван метод. Это позволяет обращаться к свойствам и другим методам этого экземпляра.

### 2. Как работает модификатор доступа `#` в JavaScript?

Префикс `#` используется для обозначения приватных полей и методов в классах JavaScript. Приватные поля и методы доступны только внутри класса и не могут быть доступны или изменены извне класса.

Пример:

```javascript
class Example {
  #privateField = 10;

  getPrivateField() {
    return this.#privateField;
  }
}

const ex = new Example();
console.log(ex.getPrivateField()); // 10
console.log(ex.#privateField); // Ошибка: Private field must be declared in an enclosing class
```

### 3. В чем разница между классами и функциями-конструкторами?

Основные различия:

1. **Синтаксис**: Классы предоставляют более понятный и удобный синтаксис
2. **Вызов**: Классы нельзя вызывать без `new`, функции-конструкторы можно (но это приведет к ошибкам)
3. **Наследование**: Классы используют ключевое слово `extends` для наследования
4. **Методы**: В классах методы автоматически добавляются в прототип
5. **Приватные поля**: Классы поддерживают приватные поля (с `#`)
6. **Подъем (hoisting)**: Объявления классов не поднимаются, в отличие от функций-конструкторов

Классы являются "синтаксическим сахаром" над функциями-конструкторами и прототипами, но предоставляют более удобный и безопасный способ работы с ООП в JavaScript.
