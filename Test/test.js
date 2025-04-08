// Переменные для персонажей
let knightName = "Knight";
let knightHealth = 120;
let knightDamage = 25;

let warlockName = "Warlock";
let warlockHealth = 80;
let warlockDamage = 15;

// Функция обычной атаки
function attack(attackerName, attackerDamage, defenderName, defenderHealth) {
    defenderHealth -= attackerDamage;
    console.log(`${attackerName} атакует ${defenderName} и наносит ${attackerDamage} урона.`);
    if (defenderHealth <= 0) {
        console.log(`${attackerName} атакует ${defenderName} и побеждает!`);
        return 0;
    }
    return defenderHealth;
}

// Функция проверки жив ли персонаж
function isAlive(health) {
    return health > 0;
}

// Функция битвы
function battle(knightName, knightHealth, knightDamage, warlockName, warlockHealth, warlockDamage) {
    while (isAlive(knightHealth) && isAlive(warlockHealth)) {
        // Атака Рыцаря
        warlockHealth = attack(knightName, knightDamage, warlockName, warlockHealth);
        if (!isAlive(warlockHealth)) {
            return knightName;
        }

        // Атака Колдуна
        knightHealth = attack(warlockName, warlockDamage, knightName, knightHealth);
        if (!isAlive(knightHealth)) {
            return warlockName;
        }
    }
}

// Функция особой атаки
function specialAttack(attackerName, defenderName, defenderHealth, specialMove) {
    console.log(`${attackerName} атакует ${defenderName} особой атакой.`);
    defenderHealth = specialMove(defenderHealth);
    return defenderHealth;
}

// Пример использования
console.log(battle(knightName, knightHealth, knightDamage, warlockName, warlockHealth, warlockDamage));

// Пример особой атаки (дополнительно)
let newKnightHealth = specialAttack(knightName, warlockName, warlockHealth, (health) => health - 100);
console.log(`Новое здоровье ${warlockName}: ${newKnightHealth}`);