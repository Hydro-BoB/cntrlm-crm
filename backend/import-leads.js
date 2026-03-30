import fs from 'fs';
import { createReadStream } from 'fs';
import csv from 'csv-parser';
import Database from 'better-sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '..', 'data', 'leads.db');
const csvPath = join(__dirname, '..', 'data', 'leads_100_with_contacts.csv');

const db = new Database(dbPath);

console.log('📥 Importing CSV from:', csvPath);

let imported = 0;
let skipped = 0;

const insertStmt = db.prepare(`
  INSERT INTO leads (name, email, phone, business, category, city, country, website, website_score, call_status, hot_flag, created_at, updated_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'no_answer', ?, datetime('now'), datetime('now'))
`);

createReadStream(csvPath)
  .pipe(csv())
  .on('data', (row) => {
    try {
      // CSV columns: Business Name,Category,City,Country,Phone,Email,Address,Website,Rating,Status
      const name = (row['Business Name'] || row.name || '').trim();
      const email = (row['Email'] || row.email || '').trim();
      const phone = (row['Phone'] || row.phone || '').trim();
      const business = (row['Business Name'] || row.business || '').trim();
      const category = (row['Category'] || row.category || '').trim();
      const city = (row['City'] || row.city || '').trim();
      const country = (row['Country'] || row.country || '').trim();
      const websiteRaw = (row['Website'] || row.website || '').trim();
      const website = websiteRaw === 'NO WEBSITE' ? '' : websiteRaw;
      const rating = parseFloat(row['Rating'] || row.rating) || 0;

      if (!name) {
        skipped++;
        return;
      }

      // Mark as hot if no website or low score
      const hotFlag = !website || rating === 0 ? 'yes' : 'no';
      const score = rating || (website ? 5 : 0);

      insertStmt.run(name, email || null, phone || null, business || null, category || null, city || null, country || null, website || null, score, hotFlag);
      imported++;

      if (imported % 100 === 0) {
        console.log(`  📊 Imported ${imported} leads...`);
      }
    } catch (error) {
      console.error('❌ Error importing row:', error.message);
      skipped++;
    }
  })
  .on('end', () => {
    console.log(`\n✅ Import complete!`);
    console.log(`   ✓ Imported: ${imported}`);
    console.log(`   ⊘ Skipped: ${skipped}`);
    
    const total = db.prepare('SELECT COUNT(*) as count FROM leads').get();
    const hotCount = db.prepare('SELECT COUNT(*) as count FROM leads WHERE hot_flag = "yes"').get();
    const noWebsiteCount = db.prepare('SELECT COUNT(*) as count FROM leads WHERE website_score = 0').get();
    
    console.log(`\n📈 Database stats:`);
    console.log(`   Total leads: ${total.count}`);
    console.log(`   Hot leads (no website): ${hotCount.count}`);
    console.log(`   No website score: ${noWebsiteCount.count}`);
    
    db.close();
  });
