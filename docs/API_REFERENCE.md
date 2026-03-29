# Cntrl M CRM — API Reference

## Base URL
`http://localhost:5000`

## Endpoints

### Health Check
```
GET /health
```
Returns API status.

**Response:**
```json
{ "status": "ok", "message": "CRM API is running" }
```

---

## Leads Management

### List All Leads
```
GET /leads?call_status=booked&hot_flag=1&priority=1&search=name
```

**Query Parameters:**
- `call_status` — Filter by call status (optional)
- `hot_flag` — Filter by hot flag: 0 or 1 (optional)
- `priority` — Filter by priority level: 1, 2, 3, or 4 (optional)
- `search` — Search in name, email, or business (optional)

**Response:**
```json
{
  "count": 5,
  "leads": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+91-9876543210",
      "business": "Tech Corp",
      "website": "https://techcorp.com",
      "website_score": 85,
      "call_status": "booked",
      "hot_flag": 1,
      "priority": 1,
      "notes": null,
      "created_at": "2026-03-29 22:00:00",
      "updated_at": "2026-03-29 22:30:00"
    }
  ]
}
```

---

### Get Single Lead
```
GET /leads/:id
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9876543210",
  "business": "Tech Corp",
  "website": "https://techcorp.com",
  "website_score": 85,
  "call_status": "booked",
  "hot_flag": 1,
  "priority": 1,
  "notes": "Interested in Q2 proposal",
  "created_at": "2026-03-29 22:00:00",
  "updated_at": "2026-03-29 22:30:00"
}
```

**Error (404):**
```json
{ "error": "Lead not found" }
```

---

### Create Lead
```
POST /leads
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+91-9876543210",
  "business": "Marketing Agency",
  "website": "https://agency.com",
  "website_score": 75,
  "call_status": "not_called",
  "hot_flag": 0,
  "priority": 2,
  "notes": "Referred by client X"
}
```

**Required Fields:**
- `name`
- `email`

**Optional Fields:**
- `phone`, `business`, `website`, `website_score`, `call_status`, `hot_flag`, `priority`, `notes`

**Response (201):**
```json
{
  "message": "Lead created successfully",
  "id": 42,
  "lead": {
    "id": 42,
    "name": "Jane Smith",
    "email": "jane@example.com",
    ...
  }
}
```

**Error (409):**
```json
{ "error": "Email already exists" }
```

---

### Update Lead
```
PATCH /leads/:id
Content-Type: application/json

{
  "call_status": "booked",
  "hot_flag": 1,
  "priority": 1,
  "notes": "Callback scheduled for Monday 10 AM"
}
```

**All fields optional.** Only send fields to update.

**Response:**
```json
{
  "message": "Lead updated successfully",
  "id": 1,
  "updated_fields": ["call_status", "hot_flag", "priority", "notes"]
}
```

**Error (404):**
```json
{ "error": "Lead not found" }
```

---

### Delete Lead
```
DELETE /leads/:id
```

**Response:**
```json
{
  "message": "Lead deleted successfully",
  "id": 1
}
```

**Error (404):**
```json
{ "error": "Lead not found" }
```

---

## Statistics & Analytics

### Pipeline Stats
```
GET /stats/pipeline
```

Returns count of leads by call status.

**Response:**
```json
[
  { "call_status": "not_called", "count": 15 },
  { "call_status": "called", "count": 8 },
  { "call_status": "booked", "count": 3 },
  { "call_status": "converted", "count": 2 }
]
```

---

### Hot Leads
```
GET /stats/hot-leads
```

Returns all leads flagged as hot, sorted by score.

**Response:**
```json
{
  "count": 5,
  "leads": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "website_score": 95,
      ...
    }
  ]
}
```

---

## Example cURL Commands

### Create a lead
```bash
curl -X POST http://localhost:5000/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rajesh Kumar",
    "email": "rajesh@business.com",
    "phone": "+91-9876543210",
    "business": "Digital Marketing",
    "website_score": 80
  }'
```

### Update call status to "booked"
```bash
curl -X PATCH http://localhost:5000/leads/1 \
  -H "Content-Type: application/json" \
  -d '{"call_status": "booked", "priority": 1}'
```

### Get all hot leads
```bash
curl http://localhost:5000/stats/hot-leads
```

### Search for leads
```bash
curl "http://localhost:5000/leads?search=digital"
```

---

## Error Codes

| Code | Message |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad request (missing required fields) |
| 404 | Not found |
| 409 | Conflict (duplicate email) |
| 500 | Server error |

---

## Next Steps
- Integrate with dashboard via Axios
- Build CSV import script in `/scripts/`
- Add website scoring algorithm
- Implement call outcome logging
