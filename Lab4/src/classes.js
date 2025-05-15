/**
 * Базовый класс предмета инвентаря
 */
export class Item {
  /**
   * Создает экземпляр предмета
   * @param {string} id - Уникальный идентификатор предмета
   * @param {string} name - Название предмета
   * @param {string} category - Категория предмета (armor, weapon, potion)
   * @param {string} rarity - Редкость предмета (common, uncommon, rare, legendary)
   * @param {string} description - Описание предмета
   */
  constructor(id, name, category, rarity, description) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.rarity = rarity;
    this.description = description;
  }

  /**
   * Возвращает строку с информацией о предмете
   * @returns {string} Информация о предмете
   */
  getInfo() {
    return `${this.name} (${this.category}) - ${this.rarity}: ${this.description}`;
  }
}

/**
 * Класс оружия, наследующийся от класса Item
 */
export class Weapon extends Item {
  /**
   * Создает экземпляр оружия
   * @param {string} id - Уникальный идентификатор предмета
   * @param {string} name - Название предмета
   * @param {string} rarity - Редкость предмета (common, uncommon, rare, legendary)
   * @param {string} description - Описание предмета
   * @param {number} damage - Урон оружия
   */
  constructor(id, name, rarity, description, damage) {
    super(id, name, 'weapon', rarity, description);
    this.damage = damage;
  }

  /**
   * Выполняет атаку оружием
   * @returns {string} Сообщение об атаке
   */
  attack() {
    return `Оружие ${this.name} нанесло ${this.damage} урона!`;
  }
}