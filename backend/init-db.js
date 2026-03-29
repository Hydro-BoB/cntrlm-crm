import Database from 'better-sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '..', 'data', 'leads.db');

const db = new Database(dbPath);

// Create schema
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    business TEXT,
    category TEXT,
    city TEXT,
    country TEXT,
    website TEXT,
    website_score INTEGER DEFAULT 0,
    website_weakness TEXT,
    call_status TEXT DEFAULT 'no_answer',
    hot_flag TEXT DEFAULT 'no',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_hot_flag ON leads(hot_flag);
  CREATE INDEX IF NOT EXISTS idx_call_status ON leads(call_status);
  CREATE INDEX IF NOT EXISTS idx_website_score ON leads(website_score);
`);

console.log('✅ Database initialized at', dbPath);
db.close();
