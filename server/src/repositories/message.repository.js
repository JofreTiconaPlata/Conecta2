const { db } = require("../database/connection");

function saveMessage({ username, content, type, timestamp }) {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO messages (username, content, type, timestamp)
      VALUES (?, ?, ?, ?)
    `;

    db.run(query, [username, content, type, timestamp], function (error) {
      if (error) {
        reject(error);
        return;
      }

      resolve({
        id: this.lastID,
        username,
        content,
        type,
        timestamp,
      });
    });
  });
}

function getRecentMessages(limit = 50) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, username, content, type, timestamp
      FROM messages
      ORDER BY id DESC
      LIMIT ?
    `;

    db.all(query, [limit], (error, rows) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(rows.reverse());
    });
  });
}

module.exports = {
  saveMessage,
  getRecentMessages,
};