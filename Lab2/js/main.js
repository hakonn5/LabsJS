import { transactions } from "./transactions.js";
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

// Создаем интерфейс readline
const rl = readline.createInterface({ input, output });

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

// Реализация меню
async function runMenu() {
    let running = true;
    while (running) {
        console.log("\n=== Меню обработки транзакций ===");
        console.log("1. Получить уникальные типы транзакций");
        console.log("2. Вычислить общую сумму всех транзакций");
        console.log("3. Вычислить сумму транзакций за указанную дату");
        console.log("4. Получить транзакции указанного типа");
        console.log("5. Получить транзакции в диапазоне дат");
        console.log("6. Получить транзакции по названию продавца");
        console.log("7. Вычислить среднюю сумму транзакций");
        console.log("8. Получить транзакции в диапазоне сумм");
        console.log("9. Вычислить общую сумму дебетовых транзакций");
        console.log("10. Найти месяц с наибольшим количеством транзакций");
        console.log("11. Найти месяц с наибольшим количеством дебетовых транзакций");
        console.log("12. Определить наиболее частый тип транзакций");
        console.log("13. Получить транзакции до указанной даты");
        console.log("14. Найти транзакцию по идентификатору");
        console.log("15. Преобразовать транзакции в массив описаний");
        console.log("0. Выход");

        const choice = await rl.question("Выберите пункт меню (0-15): ");

        switch (choice) {
            case "1":
                console.log("Уникальные типы:", getUniqueTransactionTypes(transactions));
                break;
            case "2":
                console.log("Общая сумма:", calculateTotalAmount(transactions));
                break;
            case "3":
                const year = await rl.question("Введите год (или оставьте пустым): ");
                const month = await rl.question("Введите месяц (0-11, или оставьте пустым): ");
                const day = await rl.question("Введите день (или оставьте пустым): ");
                console.log("Сумма за дату:", calculateTotalAmountByDate(
                    transactions,
                    year ? parseInt(year) : undefined,
                    month ? parseInt(month) : undefined,
                    day ? parseInt(day) : undefined
                ));
                break;
            case "4":
                const type = await rl.question("Введите тип (debit/credit): ");
                console.log("Транзакции типа", type + ":", getTransactionByType(transactions, type));
                break;
            case "5":
                const startDate = await rl.question("Введите начальную дату (YYYY-MM-DD): ");
                const endDate = await rl.question("Введите конечную дату (YYYY-MM-DD): ");
                console.log("Транзакции в диапазоне:", getTransactionsInDateRange(transactions, startDate, endDate));
                break;
            case "6":
                const merchant = await rl.question("Введите название продавца: ");
                console.log("Транзакции продавца", merchant + ":", getTransactionsByMerchant(transactions, merchant));
                break;
            case "7":
                console.log("Средняя сумма:", calculateAverageTransactionAmount(transactions));
                break;
            case "8":
                const minAmount = parseFloat(await rl.question("Введите минимальную сумму: "));
                const maxAmount = parseFloat(await rl.question("Введите максимальную сумму: "));
                console.log("Транзакции в диапазоне сумм:", getTransactionsByAmountRange(transactions, minAmount, maxAmount));
                break;
            case "9":
                console.log("Общая сумма дебета:", calculateTotalDebitAmount(transactions));
                break;
            case "10":
                console.log("Месяц с макс. транзакциями:", findMostTransactionsMonth(transactions));
                break;
            case "11":
                console.log("Месяц с макс. дебетом:", findMostDebitTransactionMonth(transactions));
                break;
            case "12":
                console.log("Частый тип:", mostTransactionTypes(transactions));
                break;
            case "13":
                const beforeDate = await rl.question("Введите дату (YYYY-MM-DD): ");
                console.log("Транзакции до даты:", getTransactionsBeforeDate(transactions, beforeDate));
                break;
            case "14":
                const id = await rl.question("Введите ID транзакции: ");
                console.log("Транзакция по ID:", findTransactionById(transactions, id));
                break;
            case "15":
                console.log("Описания:", mapTransactionDescriptions(transactions));
                break;
            case "0":
                console.log("Выход из программы.");
                running = false;
                break;
            default:
                console.log("Неверный выбор, попробуйте снова.");
        }

        if (choice !== "0") {
            await rl.question("Нажмите Enter для продолжения...");
        }
    }
    rl.close();
}

runMenu();