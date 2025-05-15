import { Item, Weapon } from './classes.js';
import { generateId } from './utils.js';
import { updateUI } from './ui.js';

/**
 * Массив для хранения предметов инвентаря
 * @type {Array<Item|Weapon>}
 */
export let inventory = [];

/**
 * Добавляет предмет в инвентарь
 * @param {Object} itemData - Данные о предмете
 * @param {string} itemData.name - Название предмета
 * @param {string} itemData.category - Категория предмета
 * @param {string} itemData.rarity - Редкость предмета
 * @param {string} itemData.description - Описание предмета
 * @param {number} [itemData.damage] - Урон (только для оружия)
 * @returns {Item|Weapon} Созданный объект предмета
 */
export function addItemToInventory(itemData) {
  const id = generateId();
  let item;
  
  if (itemData.category === 'weapon') {
    item = new Weapon(id, itemData.name, itemData.rarity, itemData.description, itemData.damage);
  } else {
    item = new Item(id, itemData.name, itemData.category, itemData.rarity, itemData.description);
  }
  
  inventory.push(item);
  updateUI();
  return item;
}

/**
 * Удаляет предмет из инвентаря по id
 * @param {string} id - Идентификатор предмета
 * @returns {boolean} Результат удаления
 */
export function removeItemFromInventory(id) {
  const initialLength = inventory.length;
  inventory = inventory.filter(item => item.id !== id);
  updateUI();
  return inventory.length < initialLength;
}

/**
 * Возвращает общее количество предметов в инвентаре
 * @returns {number} Количество предметов
 */
export function calculateTotalItems() {
  return inventory.length;
}

/**
 * Поиск предмета по ID
 * @param {string} id - Идентификатор предмета
 * @returns {Item|Weapon|undefined} Найденный предмет или undefined
 */
export function findItemById(id) {
  return inventory.find(item => item.id === id);
}