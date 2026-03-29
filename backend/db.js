const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Use a database file in the data directory for easy portability
const DB_PATH = path.join(__dirname, '..', 'data', 'cntrlm.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log(`Connected to SQLite database at ${DB_PATH}`);
  }
});

// Initialize the leads table
const initDB = () => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        phone TEXT,
        business TEXT,
        website TEXT,
        website_score INTEGER DEFAULT 0,
        call_status TEXT DEFAULT 'not_called',
        hot_flag INTEGER DEFAULT 0,
        priority INTEGER DEFAULT 4,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Table creation error:', err);
      } else {
        console.log('Leads table initialized or already exists');
      }
    });

    // Create an index on email for faster lookups
    db.run(`CREATE INDEX IF NOT EXISTS idx_email ON leads(email)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_call_status ON leads(call_status)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_hot_flag ON leads(hot_flag)`);
  });
};

// Call init on module load
initDB();

module.exports = db;
