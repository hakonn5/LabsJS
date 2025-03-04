# Lab2

## Описание программы

Программа `main.js` предназначена для обработки и анализа данных о транзакциях. Она предоставляет набор функций для выполнения различных операций с массивом транзакций, таких как фильтрация, подсчет суммы, поиск уникальных значений и т.д. Данные о транзакциях импортируются из файла `transactions.js`.

## Основные функции

### 1. `getUniqueTransactionTypes(transactions)`

- **Описание**: Возвращает массив уникальных типов транзакций (например, "debit" и "credit").
- **Структура функции**:
  ```javascript
  const getUniqueTransactionTypes = (transactions) => {
    const allTypes = transactions.map((t) => t.transaction_type);
    const uniqueTypes = [...new Set(allTypes)];
    return uniqueTypes;
  };
  ```
- **Пример использования**:
  ```javascript
  console.log("Уникальные типы:", getUniqueTransactionTypes(transactions));
  ```

### 2. `calculateTotalAmount(transactions)`

- **Описание**: Вычисляет общую сумму всех транзакций.
- **Структура функции**:
  ```javascript
  const calculateTotalAmount = (transactions) => {
    const total = transactions.reduce(
      (sum, t) => sum + t.transaction_amount,
      0
    );
    return total;
  };
  ```
- **Пример использования**:
  ```javascript
  console.log("Общая сумма:", calculateTotalAmount(transactions));
  ```

### 3. `calculateTotalAmountByDate(transactions, year, month, day)`

- **Описание**: Вычисляет общую сумму транзакций за указанную дату (год, месяц, день).
- **Структура функции**:
  ```javascript
  const calculateTotalAmountByDate = (transactions, year, month, day) => {
    const filtered = transactions.filter((t) => {
      const date = new Date(t.transaction_date);
      const yearMatches = !year || date.getFullYear() === year;
      const monthMatches = month === undefined || date.getMonth() === month;
      const dayMatches = !day || date.getDate() === day;
      return yearMatches && monthMatches && dayMatches;
    });
    const total = filtered.reduce((sum, t) => sum + t.transaction_amount, 0);
    return total;
  };
  ```
- **Пример использования**:
  ```javascript
  console.log("Сумма за 2019:", calculateTotalAmountByDate(transactions, 2019));
  ```

### 4. `getTransactionByType(transactions, type)`

- **Описание**: Возвращает транзакции указанного типа (например, "debit" или "credit").
- **Структура функции**:
  ```javascript
  const getTransactionByType = (transactions, type) => {
    const filtered = transactions.filter((t) => t.transaction_type === type);
    return filtered;
  };
  ```
- **Пример использования**:
  ```javascript
  console.log(
    "Дебетовые транзакции:",
    getTransactionByType(transactions, "debit")
  );
  ```

### 5. `getTransactionsInDateRange(transactions, startDate, endDate)`

- **Описание**: Возвращает транзакции в диапазоне дат.
- **Структура функции**:
  ```javascript
  const getTransactionsInDateRange = (transactions, startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const filtered = transactions.filter((t) => {
      const date = new Date(t.transaction_date);
      return date >= start && date <= end;
    });
    return filtered;
  };
  ```
- **Пример использования**:
  ```javascript
  console.log(
    "Диапазон дат (2019-01-01 ~ 2019-01-02):",
    getTransactionsInDateRange(transactions, "2019-01-01", "2019-01-02")
  );
  ```

### 6. `getTransactionsByMerchant(transactions, merchantName)`

- **Описание**: Возвращает транзакции по названию продавца.
- **Структура функции**:
  ```javascript
  const getTransactionsByMerchant = (transactions, merchantName) => {
    const filtered = transactions.filter(
      (t) => t.merchant_name === merchantName
    );
    return filtered;
  };
  ```
- **Пример использования**:
  ```javascript
  console.log(
    "По продавцу (SuperMart):",
    getTransactionsByMerchant(transactions, "SuperMart")
  );
  ```

### 7. `calculateAverageTransactionAmount(transactions)`

- **Описание**: Вычисляет среднюю сумму транзакций.
- **Структура функции**:
  ```javascript
  const calculateAverageTransactionAmount = (transactions) => {
    if (transactions.length === 0) return 0;
    const total = calculateTotalAmount(transactions);
    const average = total / transactions.length;
    return average;
  };
  ```
- **Пример использования**:
  ```javascript
  console.log(
    "Средняя сумма:",
    calculateAverageTransactionAmount(transactions)
  );
  ```

### 8. `getTransactionsByAmountRange(transactions, minAmount, maxAmount)`

- **Описание**: Возвращает транзакции в диапазоне сумм.
- **Структура функции**:
  ```javascript
  const getTransactionsByAmountRange = (transactions, minAmount, maxAmount) => {
    const filtered = transactions.filter(
      (t) =>
        t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount
    );
    return filtered;
  };
  ```
- **Пример использования**:
  ```javascript
  console.log(
    "Диапазон сумм (50 ~ 100):",
    getTransactionsByAmountRange(transactions, 50, 100)
  );
  ```

### 9. `calculateTotalDebitAmount(transactions)`

- **Описание**: Вычисляет общую сумму дебетовых транзакций.
- **Структура функции**:
  ```javascript
  const calculateTotalDebitAmount = (transactions) => {
    const debitTransactions = getTransactionByType(transactions, "debit");
    const total = debitTransactions.reduce(
      (sum, t) => sum + t.transaction_amount,
      0
    );
    return total;
  };
  ```
- **Пример использования**:
  ```javascript
  console.log("Общая сумма дебета:", calculateTotalDebitAmount(transactions));
  ```

### 10. `findMostTransactionsMonth(transactions)`

- **Описание**: Находит месяц с наибольшим количеством транзакций.
- **Структура функции**:
  ```javascript
  const findMostTransactionsMonth = (transactions) => {
    if (transactions.length === 0) return "";
    const monthCounts = {};
    transactions.forEach((t) => {
      const month = t.transaction_date.slice(0, 7);
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    });
    const mostFrequent = Object.entries(monthCounts).reduce((max, curr) =>
      curr[1] > max[1] ? curr : max
    );
    return mostFrequent[0];
  };
  ```
- **Пример использования**:
  ```javascript
  console.log(
    "Месяц с макс. транзакциями:",
    findMostTransactionsMonth(transactions)
  );
  ```

### 11. `findMostDebitTransactionMonth(transactions)`

- **Описание**: Находит месяц с наибольшим количеством дебетовых транзакций.
- **Структура функции**:
  ```javascript
  const findMostDebitTransactionMonth = (transactions) => {
    if (transactions.length === 0) return "";
    const debitTransactions = getTransactionByType(transactions, "debit");
    const monthCounts = {};
    debitTransactions.forEach((t) => {
      const month = t.transaction_date.slice(0, 7);
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    });
    const mostFrequent = Object.entries(monthCounts).reduce(
      (max, curr) => (curr[1] > max[1] ? curr : max),
      ["", 0]
    );
    return mostFrequent[0];
  };
  ```
- **Пример использования**:
  ```javascript
  console.log(
    "Месяц с макс. дебетом:",
    findMostDebitTransactionMonth(transactions)
  );
  ```

### 12. `mostTransactionTypes(transactions)`

- **Описание**: Определяет наиболее частый тип транзакций ("debit", "credit" или "equal").
- **Структура функции**:
  ```javascript
  const mostTransactionTypes = (transactions) => {
    const debitCount = getTransactionByType(transactions, "debit").length;
    const creditCount = getTransactionByType(transactions, "credit").length;
    if (debitCount > creditCount) return "debit";
    if (creditCount > debitCount) return "credit";
    return "equal";
  };
  ```
- **Пример использования**:
  ```javascript
  console.log("Частый тип:", mostTransactionTypes(transactions));
  ```

### 13. `getTransactionsBeforeDate(transactions, date)`

- **Описание**: Возвращает транзакции до указанной даты.
- **Структура функции**:
  ```javascript
  const getTransactionsBeforeDate = (transactions, date) => {
    const targetDate = new Date(date);
    const filtered = transactions.filter(
      (t) => new Date(t.transaction_date) < targetDate
    );
    return filtered;
  };
  ```
- **Пример использования**:
  ```javascript
  console.log(
    "До даты (2019-01-02):",
    getTransactionsBeforeDate(transactions, "2019-01-02")
  );
  ```

### 14. `findTransactionById(transactions, id)`

- **Описание**: Находит транзакцию по идентификатору.
- **Структура функции**:
  ```javascript
  const findTransactionById = (transactions, id) => {
    const found = transactions.find((t) => t.transaction_id === id);
    return found;
  };
  ```
- **Пример использования**:
  ```javascript
  console.log("По ID (1):", findTransactionById(transactions, "1"));
  ```

### 15. `mapTransactionDescriptions(transactions)`

- **Описание**: Преобразует транзакции в массив описаний.
- **Структура функции**:
  ```javascript
  const mapTransactionDescriptions = (transactions) => {
    const descriptions = transactions.map((t) => t.transaction_description);
    return descriptions;
  };
  ```
- **Пример использования**:
  ```javascript
  console.log("Описания:", mapTransactionDescriptions(transactions));
  ```

## Контрольные вопросы

### 1. Какие методы массивов можно использовать для обработки объектов в JavaScript?

- **`map()`**: Создает новый массив, применяя функцию к каждому элементу исходного массива. Полезен для преобразования данных.

  ```javascript
  const names = transactions.map((t) => t.merchant_name);
  ```

- **`filter()`**: Создает новый массив, содержащий только те элементы, которые удовлетворяют условию, заданному в функции.

  ```javascript
  const debitTransactions = transactions.filter(
    (t) => t.transaction_type === "debit"
  );
  ```

- **`reduce()`**: Применяет функцию к каждому элементу массива, накапливая результат. Полезен для вычисления суммы, среднего и других агрегаций.

  ```javascript
  const totalAmount = transactions.reduce(
    (sum, t) => sum + t.transaction_amount,
    0
  );
  ```

- **`forEach()`**: Выполняет функцию для каждого элемента массива. Не возвращает новый массив, используется для выполнения операций над каждым элементом.

  ```javascript
  transactions.forEach((t) => console.log(t.transaction_description));
  ```

- **`find()`**: Возвращает первый элемент массива, который удовлетворяет условию, заданному в функции. Если элемент не найден, возвращает `undefined`.

  ```javascript
  const transaction = transactions.find((t) => t.transaction_id === "1");
  ```

- **`some()`**: Проверяет, удовлетворяет ли хотя бы один элемент массива условию, заданному в функции. Возвращает `true` или `false`.

  ```javascript
  const hasDebit = transactions.some((t) => t.transaction_type === "debit");
  ```

- **`every()`**: Проверяет, удовлетворяют ли все элементы массива условию, заданному в функции. Возвращает `true` или `false`.

  ```javascript
  const allDebit = transactions.every((t) => t.transaction_type === "debit");
  ```

- **`sort()`**: Сортирует элементы массива на основе функции сравнения. Может использоваться для сортировки объектов по определенному свойству.

  ```javascript
  const sortedTransactions = transactions.sort(
    (a, b) => a.transaction_amount - b.transaction_amount
  );
  ```

- **`slice()`**: Возвращает новый массив, содержащий часть исходного массива. Полезен для получения подмассива.

  ```javascript
  const firstFiveTransactions = transactions.slice(0, 5);
  ```

- **`concat()`**: Объединяет два или более массивов в один.
  ```javascript
  const combinedTransactions = transactions.concat(additionalTransactions);
  ```

---

### 2. Как сравнивать даты в строковом формате в JavaScript?

Даты в строковом формате (например, `"2023-10-05"`) можно сравнивать, преобразовав их в объекты `Date` или используя лексикографическое сравнение строк (если строка соответствует формату `YYYY-MM-DD`).

#### Способ 1: Преобразование в объект `Date`

```javascript
const date1 = new Date("2023-10-05");
const date2 = new Date("2023-10-06");

if (date1 < date2) {
  console.log("date1 раньше date2");
} else if (date1 > date2) {
  console.log("date1 позже date2");
} else {
  console.log("date1 и date2 равны");
}
```

#### Способ 2: Лексикографическое сравнение строк (если формат `YYYY-MM-DD`)

Если строки дат имеют формат `YYYY-MM-DD`, их можно сравнивать напрямую, так как лексикографический порядок совпадает с хронологическим:

```javascript
const date1 = "2023-10-05";
const date2 = "2023-10-06";

if (date1 < date2) {
  console.log("date1 раньше date2");
} else if (date1 > date2) {
  console.log("date1 позже date2");
} else {
  console.log("date1 и date2 равны");
}
```

---

### 3. В чем разница между `map()`, `filter()` и `reduce()` при работе с массивами объектов?

#### `map()`

- **Назначение**: Преобразует каждый элемент массива и возвращает новый массив той же длины.
- **Использование**: Полезен для создания нового массива на основе существующего, например, для извлечения определенных свойств объектов.
- **Пример**:
  ```javascript
  const amounts = transactions.map((t) => t.transaction_amount);
  ```
  Возвращает массив сумм транзакций.

#### `filter()`

- **Назначение**: Фильтрует элементы массива на основе условия и возвращает новый массив, содержащий только те элементы, которые удовлетворяют условию.
- **Использование**: Полезен для выборки данных, например, для получения всех дебетовых транзакций.
- **Пример**:
  ```javascript
  const debitTransactions = transactions.filter(
    (t) => t.transaction_type === "debit"
  );
  ```
  Возвращает массив дебетовых транзакций.

#### `reduce()`

- **Назначение**: Применяет функцию к каждому элементу массива, накапливая результат. Возвращает одно значение (например, сумму, среднее, максимальное значение и т.д.).
- **Использование**: Полезен для агрегации данных, например, для вычисления общей суммы транзакций.
- **Пример**:
  ```javascript
  const totalAmount = transactions.reduce(
    (sum, t) => sum + t.transaction_amount,
    0
  );
  ```
  Возвращает общую сумму всех транзакций.
