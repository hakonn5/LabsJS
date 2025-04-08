/**
 * Функция-конструктор для создания предмета
 * @param {string} name - Название предмета
 * @param {number} weight - Вес предмета
 * @param {string} rarity - Редкость предмета
 */
function ItemFunc(name, weight, rarity) {
  this.name = name;
  this.weight = weight;
  this.rarity = rarity;

  /**
   * Возвращает строку с информацией о предмете
   * @return {string} Информация о предмете
   */
  this.getInfo = function() {
    return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
  };

  /**
   * Изменяет вес предмета
   * @param {number} newWeight - Новый вес предмета
   */
  this.setWeight = function(newWeight) {
    this.weight = newWeight;
  };
}

/**
 * Функция-конструктор для создания оружия
 * @param {string} name - Название оружия
 * @param {number} weight - Вес оружия
 * @param {string} rarity - Редкость оружия
 * @param {number} damage - Урон оружия
 * @param {number} durability - Прочность оружия
 */
function WeaponFunc(name, weight, rarity, damage, durability) {
  ItemFunc.call(this, name, weight, rarity);
  this.damage = damage;
  this.durability = durability;

  /**
   * Возвращает строку с информацией об оружии
   * @return {string} Информация об оружии
   */
  this.getInfo = function() {
    return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}, Damage: ${this.damage}, Durability: ${this.durability}`;
  };

  /**
   * Использование оружия (уменьшает прочность)
   */
  this.use = function() {
    if (this.durability > 0) {
      this.durability = Math.max(0, this.durability - 10);
    }
  };

  /**
   * Ремонт оружия (восстанавливает прочность)
   */
  this.repair = function() {
    this.durability = 100;
  };
}

// Наследование для функций-конструкторов
WeaponFunc.prototype = Object.create(ItemFunc.prototype);
WeaponFunc.prototype.constructor = WeaponFunc;

// Тестирование функций-конструкторов
console.log("\n=== Testing constructor functions ===");
const axe = new WeaponFunc("Battle Axe", 5.0, "rare", 25, 80);
console.log(axe.getInfo());
axe.use();
console.log(`After use: ${axe.durability}`);
axe.repair();
console.log(`After repair: ${axe.durability}`);