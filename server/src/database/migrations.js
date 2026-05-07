const { db } = require("./connection");

function runMigrations() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `
        CREATE TABLE IF NOT EXISTS messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,
          content TEXT NOT NULL,
          type TEXT NOT NULL,
          timestamp TEXT NOT NULL
        )
        `,
        (messageTableError) => {
          if (messageTableError) {
            reject(messageTableError);
            return;
          }

          db.run(
            `
            CREATE TABLE IF NOT EXISTS events (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              event_type TEXT NOT NULL,
              username TEXT,
              content TEXT NOT NULL,
              timestamp TEXT NOT NULL
            )
            `,
            (eventTableError) => {
              if (eventTableError) {
                reject(eventTableError);
                return;
              }

              resolve();
            }
          );
        }
      );
    });
  });
}

module.exports = {
  runMigrations,
};