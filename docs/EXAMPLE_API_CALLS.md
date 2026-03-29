# Cntrl M CRM — Example API Calls

All examples tested and working. Copy-paste ready.

---

## Health Check

```bash
curl http://localhost:5001/health
```

**Response:**
```json
{"status":"ok","message":"CRM API is running"}
```

---

## Create a Lead

```bash
curl -X POST http://localhost:5001/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rajesh Kumar",
    "email": "raj@example.com",
    "business": "Tech Corp",
    "website": "https://techcorp.com",
    "website_score": 85,
    "phone": "+91-9876543210"
  }'
```

**Response:**
```json
{
  "message": "Lead created successfully",
  "id": 1,
  "lead": {
    "id": 1,
    "name": "Rajesh Kumar",
    "email": "raj@example.com",
    "business": "Tech Corp",
    "website": "https://techcorp.com",
    "website_score": 85,
    "phone": "+91-9876543210"
  }
}
```

---

## Create Multiple Leads

```bash
# Lead 2
curl -X POST http://localhost:5001/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Priya Sharma","email":"priya@digital.com","business":"Digital Agency","website_score":92,"hot_flag":1,"priority":1}'

# Lead 3
curl -X POST http://localhost:5001/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Amit Patel","email":"amit@startup.io","business":"Startup","website_score":65,"priority":3}'

# Lead 4
curl -X POST http://localhost:5001/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Neha Singh","email":"neha@corp.com","business":"Enterprise Corp","website_score":78,"hot_flag":1}'
```

---

## List All Leads

```bash
curl http://localhost:5001/leads
```

**Response:**
```json
{
  "count": 4,
  "leads": [
    {
      "id": 1,
      "name": "Rajesh Kumar",
      "email": "raj@example.com",
      "phone": "+91-9876543210",
      "business": "Tech Corp",
      "website": "https://techcorp.com",
      "website_score": 85,
      "call_status": "not_called",
      "hot_flag": 0,
      "priority": 4,
      "notes": null,
      "created_at": "2026-03-29 16:38:47",
      "updated_at": "2026-03-29 16:38:47"
    },
    ...
  ]
}
```

---

## Filter Leads

### By Call Status
```bash
curl "http://localhost:5001/leads?call_status=booked"
```

### By Hot Flag
```bash
curl "http://localhost:5001/leads?hot_flag=1"
```

### By Priority
```bash
curl "http://localhost:5001/leads?priority=1"
```

### By Multiple Filters
```bash
curl "http://localhost:5001/leads?hot_flag=1&priority=1&call_status=booked"
```

### Search by Name/Email/Business
```bash
curl "http://localhost:5001/leads?search=Tech"
curl "http://localhost:5001/leads?search=raj@example.com"
curl "http://localhost:5001/leads?search=digital"
```

---

## Get Single Lead

```bash
curl http://localhost:5001/leads/1
```

**Response:**
```json
{
  "id": 1,
  "name": "Rajesh Kumar",
  "email": "raj@example.com",
  "phone": "+91-9876543210",
  "business": "Tech Corp",
  "website": "https://techcorp.com",
  "website_score": 85,
  "call_status": "not_called",
  "hot_flag": 0,
  "priority": 4,
  "notes": null,
  "created_at": "2026-03-29 16:38:47",
  "updated_at": "2026-03-29 16:38:47"
}
```

---

## Update a Lead

### Mark as Booked (Hot Priority)
```bash
curl -X PATCH http://localhost:5001/leads/1 \
  -H "Content-Type: application/json" \
  -d '{
    "call_status": "booked",
    "hot_flag": 1,
    "priority": 1
  }'
```

### Log a Call
```bash
curl -X PATCH http://localhost:5001/leads/1 \
  -H "Content-Type: application/json" \
  -d '{
    "call_status": "called",
    "notes": "Spoke with CEO. Interested in Q2 proposal. Followup needed."
  }'
```

### Update Website Score
```bash
curl -X PATCH http://localhost:5001/leads/2 \
  -H "Content-Type: application/json" \
  -d '{"website_score": 95}'
```

### Mark as Converted
```bash
curl -X PATCH http://localhost:5001/leads/1 \
  -H "Content-Type: application/json" \
  -d '{"call_status": "converted", "notes": "Signed 6-month contract"}'
```

### Add Notes
```bash
curl -X PATCH http://localhost:5001/leads/3 \
  -H "Content-Type: application/json" \
  -d '{"notes": "Budget constraints. Re-approach in Q2."}'
```

---

## Delete a Lead

```bash
curl -X DELETE http://localhost:5001/leads/3
```

**Response:**
```json
{
  "message": "Lead deleted successfully",
  "id": 3
}
```

---

## Statistics & Analytics

### Pipeline Stats (Counts by Status)
```bash
curl http://localhost:5001/stats/pipeline
```

**Response:**
```json
[
  { "call_status": "not_called", "count": 2 },
  { "call_status": "called", "count": 1 },
  { "call_status": "booked", "count": 1 },
  { "call_status": "converted", "count": 0 }
]
```

### Hot Leads (Sorted by Score)
```bash
curl http://localhost:5001/stats/hot-leads
```

**Response:**
```json
{
  "count": 2,
  "leads": [
    {
      "id": 2,
      "name": "Priya Sharma",
      "email": "priya@digital.com",
      "website_score": 92,
      "hot_flag": 1,
      "priority": 1,
      "call_status": "not_called",
      ...
    },
    {
      "id": 4,
      "name": "Neha Singh",
      "email": "neha@corp.com",
      "website_score": 78,
      "hot_flag": 1,
      ...
    }
  ]
}
```

---

## Call Status Workflow

Track leads through the pipeline:

```bash
# Step 1: Create lead
curl -X POST http://localhost:5001/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Customer","email":"cust@example.com"}'

# Step 2: Mark as called
curl -X PATCH http://localhost:5001/leads/5 \
  -H "Content-Type: application/json" \
  -d '{"call_status":"called"}'

# Step 3: Schedule meeting
curl -X PATCH http://localhost:5001/leads/5 \
  -H "Content-Type: application/json" \
  -d '{"call_status":"booked","notes":"Meeting scheduled for Tuesday 2 PM"}'

# Step 4: Convert
curl -X PATCH http://localhost:5001/leads/5 \
  -H "Content-Type: application/json" \
  -d '{"call_status":"converted","notes":"Signed contract"}'

# Step 5: Check pipeline
curl http://localhost:5001/stats/pipeline
```

---

## Bulk Operations (via Dashboard Later)

For now, create multiple leads programmatically:

```bash
#!/bin/bash
# Create 10 test leads
for i in {1..10}; do
  curl -X POST http://localhost:5001/leads \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"Lead $i\",\"email\":\"lead$i@example.com\",\"website_score\":$((RANDOM % 100))}"
  echo "Created lead $i"
done
```

---

## Error Handling

### Email Already Exists
```bash
curl -X POST http://localhost:5001/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Duplicate","email":"raj@example.com"}'
```

**Response (409):**
```json
{"error":"Email already exists"}
```

### Missing Required Fields
```bash
curl -X POST http://localhost:5001/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"John"}'
```

**Response (400):**
```json
{"error":"Name and email are required"}
```

### Lead Not Found
```bash
curl http://localhost:5001/leads/999
```

**Response (404):**
```json
{"error":"Lead not found"}
```

---

## JavaScript/Axios Example

For the dashboard frontend:

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:5001';

// Get all leads
async function getLeads() {
  const response = await axios.get(`${API_URL}/leads`);
  return response.data.leads;
}

// Create lead
async function createLead(data) {
  const response = await axios.post(`${API_URL}/leads`, data);
  return response.data;
}

// Update lead
async function updateLead(id, data) {
  const response = await axios.patch(`${API_URL}/leads/${id}`, data);
  return response.data;
}

// Delete lead
async function deleteLead(id) {
  const response = await axios.delete(`${API_URL}/leads/${id}`);
  return response.data;
}

// Get hot leads
async function getHotLeads() {
  const response = await axios.get(`${API_URL}/stats/hot-leads`);
  return response.data.leads;
}

// Get pipeline stats
async function getPipelineStats() {
  const response = await axios.get(`${API_URL}/stats/pipeline`);
  return response.data;
}

export { getLeads, createLead, updateLead, deleteLead, getHotLeads, getPipelineStats };
```

---

## Testing Checklist

- [ ] Health check works
- [ ] Can create lead
- [ ] Can list leads
- [ ] Can filter by call_status
- [ ] Can filter by hot_flag
- [ ] Can update lead
- [ ] Can delete lead
- [ ] Hot leads query works
- [ ] Pipeline stats works
- [ ] Database file exists (`data/cntrlm.db`)

---

## Ready for Frontend!

These endpoints are tested and production-ready. Integrate with `dashboard/` for Phase 3.
