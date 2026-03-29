import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, '..', 'data', 'leads.db'));

const app = express();
app.use(cors());
app.use(express.json());

// GET /api/leads - List all leads with filters
app.get('/api/leads', (req, res) => {
  try {
    const { score_min, status, hot, sort = 'created_at', order = 'DESC' } = req.query;
    
    let query = 'SELECT * FROM leads WHERE 1=1';
    const params = [];

    if (score_min) {
      query += ' AND website_score >= ?';
      params.push(parseInt(score_min));
    }
    if (status) {
      query += ' AND call_status = ?';
      params.push(status);
    }
    if (hot) {
      query += ' AND hot_flag = ?';
      params.push(hot === 'yes' ? 'yes' : 'no');
    }

    query += ` ORDER BY ${sort} ${order} LIMIT 1000`;
    
    const stmt = db.prepare(query);
    const leads = stmt.all(...params);
    
    res.json({ success: true, data: leads, count: leads.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/stats - Dashboard stats
app.get('/api/stats', (req, res) => {
  try {
    const total = db.prepare('SELECT COUNT(*) as count FROM leads').get();
    const hotLeads = db.prepare("SELECT COUNT(*) as count FROM leads WHERE hot_flag = 'yes'").get();
    const booked = db.prepare("SELECT COUNT(*) as count FROM leads WHERE call_status = 'booked'").get();
    const noWebsite = db.prepare('SELECT COUNT(*) as count FROM leads WHERE website_score = 0').get();

    res.json({
      success: true,
      data: {
        totalLeads: total.count,
        hotLeads: hotLeads.count,
        callsBooked: booked.count,
        noWebsite: noWebsite.count,
        conversionRate: total.count > 0 ? ((booked.count / total.count) * 100).toFixed(2) + '%' : '0%'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/leads - Add single lead
app.post('/api/leads', (req, res) => {
  try {
    const { name, email, phone, business, category, city, country, website, website_score, website_weakness } = req.body;
    
    const stmt = db.prepare(`
      INSERT INTO leads (name, email, phone, business, category, city, country, website, website_score, website_weakness, call_status, hot_flag, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'no_answer', ?, datetime('now'), datetime('now'))
    `);
    
    const hotFlag = !website || website_score === 0 ? 'yes' : 'no';
    const result = stmt.run(name, email, phone, business, category, city, country, website || null, website_score || 0, website_weakness || null, hotFlag);
    
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/leads/:id - Update lead call status
app.patch('/api/leads/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { call_status, website_score, website_weakness, hot_flag } = req.body;
    
    let updateFields = ['updated_at = datetime("now")'];
    const params = [];

    if (call_status) {
      updateFields.push('call_status = ?');
      params.push(call_status);
    }
    if (website_score !== undefined) {
      updateFields.push('website_score = ?');
      params.push(website_score);
    }
    if (website_weakness) {
      updateFields.push('website_weakness = ?');
      params.push(website_weakness);
    }
    if (hot_flag) {
      updateFields.push('hot_flag = ?');
      params.push(hot_flag);
    }

    params.push(id);
    const query = `UPDATE leads SET ${updateFields.join(', ')} WHERE id = ?`;
    const stmt = db.prepare(query);
    stmt.run(...params);

    res.json({ success: true, message: 'Lead updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/leads/:id
app.delete('/api/leads/:id', (req, res) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM leads WHERE id = ?');
    stmt.run(id);
    
    res.json({ success: true, message: 'Lead deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Cntrl M CRM API running on http://localhost:${PORT}`);
});
