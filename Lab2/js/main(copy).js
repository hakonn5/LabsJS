import { transactions } from "./transactions.js";

/**
 * Возвращает массив уникальных типов транзакций
 * @param {Object[]} transactions - Массив объектов транзакций
 * @returns {string[]} Массив уникальных типов транзакций
 */
const getUniqueTransactionTypes = (transactions) => {
    // Берем все типы транзакций через map, каждый элемент превращаем в его тип (debit или credit)
    const allTypes = transactions.map(t => t.transaction_type);
    // Создаем Set, чтобы убрать повторяющиеся типы, и преобразуем его обратно в массив
    const uniqueTypes = [...new Set(allTypes)];
    // Возвращаем массив уникальных типов
    return uniqueTypes;
};

/**
 * Вычисляет общую сумму всех транзакций
 * @param {Object[]} transactions - Массив объектов транзакций
 * @returns {number} Общая сумма всех транзакций
 */
const calculateTotalAmount = (transactions) => {
    // Используем reduce, чтобы посчитать сумму всех transaction_amount
    // Начальное значение суммы - 0, к нему прибавляем сумму каждой транзакции
    const total = transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
    // Возвращаем итоговую сумму
    return total;
};

/**
 * Вычисляет общую сумму транзакций за указанную дату
 * @param {Object[]} transactions - Массив объектов транзакций
 * @param {number} [year] - Год для фильтрации
 * @param {number} [month] - Месяц для фильтрации
 * @param {number} [day] - День для фильтрации
 * @returns {number} Общая сумма за указанную дату
 */
const calculateTotalAmountByDate = (transactions, year, month, day) => {
    // Фильтруем транзакции, оставляем только те, что подходят по дате
    const filtered = transactions.filter(t => {
        // Преобразуем дату транзакции в объект Date
        const date = new Date(t.transaction_date);
        // Проверяем год: если year не указан или совпадает
        const yearMatches = !year || date.getFullYear() === year;
        // Проверяем месяц: если month не указан или совпадает
        const monthMatches = month === undefined || date.getMonth() === month;
        // Проверяем день: если day не указан или совпадает
        const dayMatches = !day || date.getDate() === day;
        // Возвращаем true, если все условия совпадают
        return yearMatches && monthMatches && dayMatches;
    });
    // Считаем сумму отфильтрованных транзакций
    const total = filtered.reduce((sum, t) => sum + t.transaction_amount, 0);
    // Возвращаем сумму
    return total;
};

/**
 * Возвращает транзакции указанного типа
 * @param {Object[]} transactions - Массив объектов транзакций
 * @param {string} type - Тип транзакции (debit/credit)
 * @returns {Object[]} Массив транзакций указанного типа
 */
const getTransactionByType = (transactions, type) => {
    // Фильтруем транзакции, оставляем только те, у которых тип совпадает с заданным
    const filtered = transactions.filter(t => t.transaction_type === type);
    // Возвращаем отфильтрованный массив
    return filtered;
};

/**
 * Возвращает транзакции в диапазоне дат
 * @param {Object[]} transactions - Массив объектов транзакций
 * @param {string} startDate - Начальная дата в формате YYYY-MM-DD
 * @param {string} endDate - Конечная дата в формате YYYY-MM-DD
 * @returns {Object[]} Массив транзакций в диапазоне дат
 */
const getTransactionsInDateRange = (transactions, startDate, endDate) => {
    // Преобразуем начальную дату в объект Date
    const start = new Date(startDate);
    // Преобразуем конечную дату в объект Date
    const end = new Date(endDate);
    // Фильтруем транзакции, оставляем только те, что попадают в диапазон
    const filtered = transactions.filter(t => {
        // Преобразуем дату транзакции в объект Date
        const date = new Date(t.transaction_date);
        // Проверяем, что дата находится между start и end
        return date >= start && date <= end;
    });
    // Возвращаем отфильтрованный массив
    return filtered;
};

/**
 * Возвращает транзакции по названию продавца
 * @param {Object[]} transactions - Массив объектов транзакций
 * @param {string} merchantName - Название продавца
 * @returns {Object[]} Массив транзакций для указанного продавца
 */
const getTransactionsByMerchant = (transactions, merchantName) => {
    // Фильтруем транзакции, оставляем только те, у которых продавец совпадает
    const filtered = transactions.filter(t => t.merchant_name === merchantName);
    // Возвращаем отфильтрованный массив
    return filtered;
};

/**
 * Вычисляет среднюю сумму транзакций
 * @param {Object[]} transactions - Массив объектов транзакций
 * @returns {number} Средняя сумма транзакций
 */
const calculateAverageTransactionAmount = (transactions) => {
    // Если массив пустой, возвращаем 0
    if (transactions.length === 0) return 0;
    // Считаем общую сумму с помощью другой функции
    const total = calculateTotalAmount(transactions);
    // Делим сумму на количество транзакций
    const average = total / transactions.length;
    // Возвращаем среднее значение
    return average;
};

/**
 * Возвращает транзакции в диапазоне сумм
 * @param {Object[]} transactions - Массив объектов транзакций
 * @param {number} minAmount - Минимальная сумма
 * @param {number} maxAmount - Максимальная сумма
 * @returns {Object[]} Массив транзакций в диапазоне сумм
 */
const getTransactionsByAmountRange = (transactions, minAmount, maxAmount) => {
    // Фильтруем транзакции, оставляем только те, чья сумма в заданном диапазоне
    const filtered = transactions.filter(t => 
        t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount
    );
    // Возвращаем отфильтрованный массив
    return filtered;
};

/**
 * Вычисляет общую сумму дебетовых транзакций
 * @param {Object[]} transactions - Массив объектов транзакций
 * @returns {number} Общая сумма дебетовых транзакций
 */
const calculateTotalDebitAmount = (transactions) => {
    // Получаем только дебетовые транзакции
    const debitTransactions = getTransactionByType(transactions, "debit");
    // Считаем сумму всех дебетовых транзакций
    const total = debitTransactions.reduce((sum, t) => sum + t.transaction_amount, 0);
    // Возвращаем сумму
    return total;
};

/**
 * Находит месяц с наибольшим количеством транзакций
 * @param {Object[]} transactions - Массив объектов транзакций
 * @returns {string} Месяц с наибольшим количеством транзакций (YYYY-MM)
 */
const findMostTransactionsMonth = (transactions) => {
    // Если массив пустой, возвращаем пустую строку
    if (transactions.length === 0) return "";
    // Создаем объект для подсчета транзакций по месяцам
    const monthCounts = {};
    // Проходим по каждой транзакции
    transactions.forEach(t => {
        // Берем только год и месяц из даты (YYYY-MM)
        const month = t.transaction_date.slice(0, 7);
        // Увеличиваем счетчик для этого месяца (если его нет, начинаем с 0)
        monthCounts[month] = (monthCounts[month] || 0) + 1;
    });
    // Находим месяц с максимальным количеством транзакций
    const mostFrequent = Object.entries(monthCounts)
        // Сравниваем пары [месяц, количество], возвращаем ту, где количество больше
        .reduce((max, curr) => curr[1] > max[1] ? curr : max);
    // Возвращаем только название месяца (первый элемент пары)
    return mostFrequent[0];
};

/**
 * Находит месяц с наибольшим количеством дебетовых транзакций
 * @param {Object[]} transactions - Массив объектов транзакций
 * @returns {string} Месяц с наибольшим количеством дебетовых транзакций (YYYY-MM)
 */
const findMostDebitTransactionMonth = (transactions) => {
    // Если нет дебетовых транзакций, возвращаем пустую строку
    if (transactions.length === 0) return "";
    // Получаем только дебетовые транзакции
    const debitTransactions = getTransactionByType(transactions, "debit");
    // Создаем объект для подсчета дебетовых транзакций по месяцам
    const monthCounts = {};
    // Проходим по каждой дебетовой транзакции
    debitTransactions.forEach(t => {
        // Берем только год и месяц из даты (YYYY-MM)
        const month = t.transaction_date.slice(0, 7);
        // Увеличиваем счетчик для этого месяца
        monthCounts[month] = (monthCounts[month] || 0) + 1;
    });
    // Находим месяц с максимальным количеством (если пусто, начальное значение ["", 0])
    const mostFrequent = Object.entries(monthCounts)
        .reduce((max, curr) => curr[1] > max[1] ? curr : max, ["", 0]);
    // Возвращаем название месяца
    return mostFrequent[0];
};

/**
 * Определяет наиболее частый тип транзакций
 * @param {Object[]} transactions - Массив объектов транзакций
 * @returns {string} "debit", "credit" или "equal"
 */
const mostTransactionTypes = (transactions) => {
    // Считаем количество дебетовых транзакций
    const debitCount = getTransactionByType(transactions, "debit").length;
    // Считаем количество кредитовых транзакций
    const creditCount = getTransactionByType(transactions, "credit").length;
    // Сравниваем и возвращаем результат
    if (debitCount > creditCount) return "debit";
    if (creditCount > debitCount) return "credit";
    return "equal";
};

/**
 * Возвращает транзакции до указанной даты
 * @param {Object[]} transactions - Массив объектов транзакций
 * @param {string} date - Дата в формате YYYY-MM-DD
 * @returns {Object[]} Массив транзакций до указанной даты
 */
const getTransactionsBeforeDate = (transactions, date) => {
    // Преобразуем заданную дату в объект Date
    const targetDate = new Date(date);
    // Фильтруем транзакции, оставляем те, что раньше заданной даты
    const filtered = transactions.filter(t => new Date(t.transaction_date) < targetDate);
    // Возвращаем отфильтрованный массив
    return filtered;
};

/**
 * Находит транзакцию по идентификатору
 * @param {Object[]} transactions - Массив объектов транзакций
 * @param {string} id - Идентификатор транзакции
 * @returns {Object|undefined} Объект транзакции или undefined, если не найдено
 */
const findTransactionById = (transactions, id) => {
    // Ищем первую транзакцию с заданным id
    const found = transactions.find(t => t.transaction_id === id);
    // Возвращаем найденную транзакцию или undefined, если ничего не найдено
    return found;
};

/**
 * Преобразует транзакции в массив описаний
 * @param {Object[]} transactions - Массив объектов транзакций
 * @returns {string[]} Массив описаний транзакций
 */
const mapTransactionDescriptions = (transactions) => {
    // Преобразуем каждую транзакцию в ее описание
    const descriptions = transactions.map(t => t.transaction_description);
    // Возвращаем массив описаний
    return descriptions;
};

// Тестирование функций
console.log("Уникальные типы:", getUniqueTransactionTypes(transactions));
console.log("Общая сумма:", calculateTotalAmount(transactions));
console.log("Сумма за 2019:", calculateTotalAmountByDate(transactions, 2019));
console.log("Дебетовые транзакции:", getTransactionByType(transactions, "debit"));
console.log("Диапазон дат (2019-01-01 ~ 2019-01-02):", getTransactionsInDateRange(transactions, "2019-01-01", "2019-01-02"));
console.log("По продавцу (SuperMart):", getTransactionsByMerchant(transactions, "SuperMart"));
console.log("Средняя сумма:", calculateAverageTransactionAmount(transactions));
console.log("Диапазон сумм (50 ~ 100):", getTransactionsByAmountRange(transactions, 50, 100));
console.log("Общая сумма дебета:", calculateTotalDebitAmount(transactions));
console.log("Месяц с макс. транзакциями:", findMostTransactionsMonth(transactions));
console.log("Месяц с макс. дебетом:", findMostDebitTransactionMonth(transactions));
console.log("Частый тип:", mostTransactionTypes(transactions));
console.log("До даты (2019-01-02):", getTransactionsBeforeDate(transactions, "2019-01-02"));
console.log("По ID (1):", findTransactionById(transactions, "1"));
console.log("Описания:", mapTransactionDescriptions(transactions));

// Тест с пустым массивом
const emptyTransactions = [];
console.log("\nТесты с пустым массивом:\n");
console.log("Уникальные типы:", getUniqueTransactionTypes(emptyTransactions));
console.log("Общая сумма:", calculateTotalAmount(emptyTransactions));
console.log("Сумма за 2019:", calculateTotalAmountByDate(emptyTransactions, 2019));
console.log("Дебетовые транзакции:", getTransactionByType(emptyTransactions, "debit"));
console.log("Диапазон дат (2019-01-01 ~ 2019-01-02):", getTransactionsInDateRange(emptyTransactions, "2019-01-01", "2019-01-02"));
console.log("По продавцу (SuperMart):", getTransactionsByMerchant(emptyTransactions, "SuperMart"));
console.log("Средняя сумма:", calculateAverageTransactionAmount(emptyTransactions));
console.log("Диапазон сумм (50 ~ 100):", getTransactionsByAmountRange(emptyTransactions, 50, 100));
console.log("Общая сумма дебета:", calculateTotalDebitAmount(emptyTransactions));
console.log("Месяц с макс. транзакциями:", findMostTransactionsMonth(emptyTransactions));
console.log("Месяц с макс. дебетом:", findMostDebitTransactionMonth(emptyTransactions));
console.log("Частый тип:", mostTransactionTypes(emptyTransactions));
console.log("До даты (2019-01-02):", getTransactionsBeforeDate(emptyTransactions, "2019-01-02"));
console.log("По ID (1):", findTransactionById(emptyTransactions, "1"));
console.log("Описания:", mapTransactionDescriptions(emptyTransactions));

// Тест с одной транзакцией
const singleTransaction = [transactions[0]];
console.log("\nТесты с одной транзакцией:\n");
console.log("Уникальные типы:", getUniqueTransactionTypes(singleTransaction));
console.log("Общая сумма:", calculateTotalAmount(singleTransaction));
console.log("Сумма за 2019:", calculateTotalAmountByDate(singleTransaction, 2019));
console.log("Дебетовые транзакции:", getTransactionByType(singleTransaction, "debit"));
console.log("Диапазон дат (2019-01-01 ~ 2019-01-02):", getTransactionsInDateRange(singleTransaction, "2019-01-01", "2019-01-02"));
console.log("По продавцу (SuperMart):", getTransactionsByMerchant(singleTransaction, "SuperMart"));
console.log("Средняя сумма:", calculateAverageTransactionAmount(singleTransaction));
console.log("Диапазон сумм (50 ~ 100):", getTransactionsByAmountRange(singleTransaction, 50, 100));
console.log("Общая сумма дебета:", calculateTotalDebitAmount(singleTransaction));
console.log("Месяц с макс. транзакциями:", findMostTransactionsMonth(singleTransaction));
console.log("Месяц с макс. дебетом:", findMostDebitTransactionMonth(singleTransaction));
console.log("Частый тип:", mostTransactionTypes(singleTransaction));
console.log("До даты (2019-01-02):", getTransactionsBeforeDate(singleTransaction, "2019-01-02"));
console.log("По ID (1):", findTransactionById(singleTransaction, "1"));
console.log("Описания:", mapTransactionDescriptions(singleTransaction));