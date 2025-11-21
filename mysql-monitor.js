// mysql-monitor.js
const fs = require('fs');
const mysql = require('mysql2/promise'); // npm install mysql2

const logFile = 'mysql-log.txt';
const dbName = 'piza'; // Заміни на назву твоєї бази
const tableName = 'my_table'; // Назва твоєї таблиці
const intervalMs = 5000; // Інтервал збору даних (мс)
const testData = [
  ['Pizza Margherita', 'tomato, cheese', 5.99],
  ['Pizza Pepperoni', 'tomato, cheese, pepperoni', 7.99],
  ['Pizza Veggie', 'tomato, cheese, vegetables', 6.99],
];

(async () => {
  try {
    // Підключення до MySQL
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root', // твій користувач
      password: 'doloman040206', // твій пароль
      database: dbName,
    });

    // Після підключення до MySQL
    await connection.query(`
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ingredients VARCHAR(255),
    price DECIMAL(10,2)
  )
`);
    fs.appendFileSync(logFile, `\nChecked/created table ${tableName}\n`);
    console.warn(`Checked/created table ${tableName}`);

    // Очищаємо лог-файл на старті
    fs.writeFileSync(logFile, '', 'utf8');

    console.warn(`=== MySQL Monitor started for database: ${dbName} ===`);
    fs.appendFileSync(logFile, `=== MySQL Monitor started for database: ${dbName} ===\n`);

    // Додаємо тестові дані
    for (const row of testData) {
      await connection.query(
        `INSERT INTO ${tableName} (name, ingredients, price) VALUES (?, ?, ?)`,
        row,
      );
    }
    fs.appendFileSync(logFile, `\nInserted test data into ${tableName}\n`);

    // Запускаємо інтервал для збору даних
    let iterations = 0;
    const maxIterations = 3; // Зробимо 3 знімки
    const monitorInterval = setInterval(async () => {
      iterations++;

      // 1. Збір активних з'єднань
      const [threads] = await connection.query("SHOW GLOBAL STATUS LIKE 'Threads_connected'");

      // 2. Збір інформації про таблиці
      const [tables] = await connection.query(
        `
        SELECT table_name,
               table_rows,
               ROUND(data_length / 1024 / 1024, 2) AS data_mb,
               ROUND(index_length / 1024 / 1024, 2) AS index_mb
        FROM information_schema.tables
        WHERE table_schema = ? AND table_name = ?
      `,
        [dbName, tableName],
      );

      // 3. Формуємо лог
      const log = `\n=== MySQL Monitor Snapshot #${iterations} ===
        Time: ${new Date().toISOString()}
        Threads_connected: ${threads[0]?.Value || 0}
        Tables: ${tables.length ? JSON.stringify(tables, null, 2) : '[]'}
      `;

      fs.appendFileSync(logFile, log);
      console.warn(log);

      // Після maxIterations видаляємо тестові дані
      if (iterations >= maxIterations) {
        await connection.query(
          `DELETE FROM ${tableName} WHERE name IN (?, ?, ?)`,
          testData.map((d) => d[0]),
        );
        const deleteLog = `\nDeleted test data from ${tableName}\n`;
        fs.appendFileSync(logFile, deleteLog);
        console.warn(deleteLog);

        clearInterval(monitorInterval);
        await connection.end();
        fs.appendFileSync(logFile, `\n=== MySQL Monitor finished ===\n`);
        console.warn(`=== MySQL Monitor finished ===`);
      }
    }, intervalMs);
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
    fs.appendFileSync(logFile, `Error: ${err.message}\n`);
  }
})();
