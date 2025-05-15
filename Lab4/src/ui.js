import { inventory, calculateTotalItems, removeItemFromInventory, findItemById } from './inventory.js';
import { getRarityClass } from './utils.js';

/**
 * Обновляет пользовательский интерфейс
 */
export function updateUI() {
  renderInventoryTable();
  updateItemCount();
}

/**
 * Отрисовывает таблицу инвентаря
 */
function renderInventoryTable() {
  const tableBody = document.getElementById('inventory-table-body');
  if (!tableBody) return;
  
  tableBody.innerHTML = '';
  
  inventory.forEach(item => {
    const row = document.createElement('tr');
    row.setAttribute('data-item-id', item.id);
    row.classList.add(getRarityClass(item.rarity));
    
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>${item.rarity}</td>
      <td>${item.category === 'weapon' ? item.damage : '—'}</td>
      <td>
        <button class="delete-btn" data-id="${item.id}">Удалить</button>
      </td>
    `;
    
    // Добавляем обработчик для показа детальной информации при наведении
    row.addEventListener('mouseenter', showItemDetails);
    row.addEventListener('mouseleave', hideItemDetails);
    
    tableBody.appendChild(row);
  });
}

/**
 * Обновляет счетчик предметов
 */
function updateItemCount() {
  const countElement = document.getElementById('item-count');
  if (countElement) {
    countElement.textContent = calculateTotalItems();
  }
}

/**
 * Показывает детали предмета при наведении на строку
 * @param {Event} event - Событие наведения
 */
function showItemDetails(event) {
  const row = event.currentTarget;
  const itemId = row.getAttribute('data-item-id');
  const item = findItemById(itemId);
  
  if (item) {
    const detailsElement = document.getElementById('item-details');
    if (detailsElement) {
      detailsElement.innerHTML = `
        <h3>${item.name}</h3>
        <p><strong>Категория:</strong> ${item.category}</p>
        <p><strong>Редкость:</strong> ${item.rarity}</p>
        <p><strong>Описание:</strong> ${item.description}</p>
        ${item.category === 'weapon' ? `<p><strong>Действие:</strong> ${item.attack()}</p>` : ''}
      `;
      detailsElement.style.display = 'block';
    }
  }
}

/**
 * Скрывает детали предмета при уходе курсора со строки
 */
function hideItemDetails() {
  const detailsElement = document.getElementById('item-details');
  if (detailsElement) {
    detailsElement.style.display = 'none';
  }
}

/**
 * Инициализирует обработчики событий
 */
export function initEventHandlers() {
  // Делегирование события клика на кнопку удаления
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
      const itemId = event.target.getAttribute('data-id');
      const row = event.target.closest('tr');
      
      // Добавляем анимацию перед удалением
      row.classList.add('fade-out');
      
      // Удаляем элемент после завершения анимации
      row.addEventListener('animationend', function() {
        removeItemFromInventory(itemId);
      });
    }
  });

  // Обработка отправки формы добавления предмета
  const addItemForm = document.getElementById('add-item-form');
  if (addItemForm) {
    addItemForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Показываем/скрываем поле урона в зависимости от выбранной категории
  const categorySelect = document.getElementById('item-category');
  const damageField = document.getElementById('damage-field');
  
  if (categorySelect && damageField) {
    categorySelect.addEventListener('change', function() {
      damageField.style.display = this.value === 'weapon' ? 'block' : 'none';
    });
  }
}

/**
 * Обрабатывает отправку формы добавления предмета
 * @param {Event} event - Событие отправки формы
 */
function handleFormSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = {
    name: form.elements['item-name'].value,
    category: form.elements['item-category'].value,
    rarity: form.elements['item-rarity'].value,
    description: form.elements['item-description'].value,
    damage: form.elements['item-damage'] ? parseInt(form.elements['item-damage'].value) : 0
  };
  
  // Импортируем функцию валидации и добавления предмета динамически
  // для избежания циклических зависимостей
  import('./utils.js').then(({ validateItemForm }) => {
    const validationResult = validateItemForm(formData);
    
    if (validationResult.isValid) {
      import('./inventory.js').then(({ addItemToInventory }) => {
        addItemToInventory(formData);
        form.reset();
        
        // Если поле урона скрыто, скрываем его снова после сброса формы
        const damageField = document.getElementById('damage-field');
        if (damageField) {
          damageField.style.display = 'none';
        }
        
        // Скрываем сообщения об ошибках
        const errorContainer = document.getElementById('form-errors');
        if (errorContainer) {
          errorContainer.innerHTML = '';
          errorContainer.style.display = 'none';
        }
      });
    } else {
      // Отображаем ошибки валидации
      const errorContainer = document.getElementById('form-errors');
      if (errorContainer) {
        errorContainer.innerHTML = validationResult.errors.map(error => `<p>${error}</p>`).join('');
        errorContainer.style.display = 'block';
      }
    }
  });
}