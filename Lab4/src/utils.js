/**
 * Генерирует уникальный идентификатор
 * @returns {string} Уникальный идентификатор
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * Возвращает цвет в зависимости от редкости предмета
 * @param {string} rarity - Редкость предмета
 * @returns {string} CSS-класс для предмета
 */
export function getRarityClass(rarity) {
  switch (rarity) {
    case 'legendary':
      return 'legendary-item';
    case 'rare':
      return 'rare-item';
    case 'uncommon':
      return 'uncommon-item';
    case 'common':
    default:
      return 'common-item';
  }
}

/**
 * Валидирует данные формы перед добавлением предмета
 * @param {Object} formData - Данные формы
 * @returns {Object} Результат валидации { isValid: boolean, errors: Array }
 */
export function validateItemForm(formData) {
  const errors = [];
  
  if (!formData.name || formData.name.trim() === '') {
    errors.push('Название предмета не может быть пустым');
  }
  
  if (!formData.category) {
    errors.push('Выберите категорию предмета');
  }
  
  if (!formData.rarity) {
    errors.push('Выберите редкость предмета');
  }
  
  if (formData.category === 'weapon' && (!formData.damage || isNaN(formData.damage) || formData.damage <= 0)) {
    errors.push('Урон оружия должен быть положительным числом');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}