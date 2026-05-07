const { db } = require("../database/connection");

function saveEvent({ eventType, username = null, content, timestamp }) {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO events (event_type, username, content, timestamp)
      VALUES (?, ?, ?, ?)
    `;

    db.run(query, [eventType, username, content, timestamp], function (error) {
      if (error) {
        reject(error);
        return;
      }

      resolve({
        id: this.lastID,
        eventType,
        username,
        content,
        timestamp,
      });
    });
  });
}

module.exports = {
  saveEvent,
};