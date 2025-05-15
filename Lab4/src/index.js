import { initEventHandlers, updateUI } from './ui.js';
import { addItemToInventory } from './inventory.js';

/**
 * Инициализация приложения при загрузке DOM
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Приложение инициализировано');
  
  // Инициализируем обработчики событий
  initEventHandlers();
  
  // Добавляем несколько тестовых предметов
  addSampleItems();
  
  // Обновляем интерфейс
  updateUI();
});

/**
 * Добавляет несколько тестовых предметов в инвентарь
 */
function addSampleItems() {
  // Примеры предметов для начального заполнения инвентаря
  const sampleItems = [
    {
      name: 'Стальной меч',
      category: 'weapon',
      rarity: 'common',
      description: 'Обычный стальной меч, подходит для начинающих воинов',
      damage: 10
    },
    {
      name: 'Кожаный доспех',
      category: 'armor',
      rarity: 'uncommon',
      description: 'Прочный кожаный доспех, обеспечивает среднюю защиту'
    },
    {
      name: 'Зелье здоровья',
      category: 'potion',
      rarity: 'rare',
      description: 'Восстанавливает 50 единиц здоровья при использовании'
    },
    {
      name: 'Экскалибур',
      category: 'weapon',
      rarity: 'legendary',
      description: 'Легендарный меч короля Артура, обладающий невероятной мощью',
      damage: 100
    }
  ];
  
  // Добавляем каждый предмет в инвентарь
  sampleItems.forEach(item => {
    addItemToInventory(item);
  });
}