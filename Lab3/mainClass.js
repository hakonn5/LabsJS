class Item {
  /**
   * Создает экземпляр Item
   * @param {string} name - Название предмета
   * @param {number} weight - Вес предмета
   * @param {string} rarity - Редкость предмета (common, uncommon, rare, legendary)
   */
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  /**
   * Возвращает строку с информацией о предмете
   * @return {string} Информация о предмете
   */
  getInfo() {
    return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
  }

  /**
   * Изменяет вес предмета
   * @param {number} newWeight - Новый вес предмета
   */
  setWeight(newWeight) {
    this.weight = newWeight;
  }
}

/**
 * Класс, представляющий оружие, расширяет Item
 */
class Weapon extends Item {
  /**
   * Создает экземпляр Weapon
   * @param {string} name - Название оружия
   * @param {number} weight - Вес оружия
   * @param {string} rarity - Редкость оружия
   * @param {number} damage - Урон оружия
   * @param {number} durability - Прочность оружия (0-100)
   */
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }

  /**
   * Возвращает строку с информацией об оружии
   * @return {string} Информация об оружии
   */
  getInfo() {
    return `${super.getInfo()}, Damage: ${this.damage}, Durability: ${this.durability}`;
  }

  /**
   * Использование оружия (уменьшает прочность на 10)
   */
  use() {
    if (this.durability > 0) {
      this.durability = Math.max(0, this.durability - 10);
    }
  }

  /**
   * Ремонт оружия (восстанавливает прочность до 100)
   */
  repair() {
    this.durability = 100;
  }
}

// Тестирование классов
console.log("=== Testing Item class ===");
const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());
sword.setWeight(4.0);
console.log(sword.getInfo());

console.log("\n=== Testing Weapon class ===");
const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());
bow.use();
console.log(`After use: ${bow.durability}`); // должно уменьшиться до 90
bow.repair();
console.log(`After repair: ${bow.durability}`); // должно быть 100

// Демонстрация опциональной цепочки
console.log("\n=== Optional chaining demo ===");
const testItem = new Item("Test", 1, "common");
console.log(testItem?.nonExistentProperty?.value); // undefined, без ошибки