'use client';

import { useEffect, useState } from 'react';
import CallLogsTable from '@/components/CallLogsTable';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function CallLogsPage() {
  const [callLogs, setCallLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [outcomeFilter, setOutcomeFilter] = useState('');

  useEffect(() => {
    const fetchCallLogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/call-logs`);
        if (!res.ok) throw new Error('Failed to fetch call logs');
        const data = await res.json();
        setCallLogs(data);
      } catch (err) {
        setError(err.message);
        // Mock data
        setCallLogs([
          { id: 1, leadName: 'Acme Corp', business: 'Acme Corp', phone: '+91-9876543210', calledAt: '2024-03-29 10:30 AM', outcome: 'Success', duration: '3m 45s' },
          { id: 2, leadName: 'Tech Solutions', business: 'Tech Solutions Inc', phone: '+91-9876543211', calledAt: '2024-03-29 11:15 AM', outcome: 'Success', duration: '2m 20s' },
          { id: 3, leadName: 'Global Systems', business: 'Global Systems Ltd', phone: '+91-9876543212', calledAt: '2024-03-28 02:00 PM', outcome: 'Voicemail', duration: '0m 5s' },
          { id: 4, leadName: 'StartUp Inc', business: 'StartUp Inc', phone: '+91-9876543213', calledAt: '2024-03-28 03:45 PM', outcome: 'No Answer', duration: '0m 0s' },
          { id: 5, leadName: 'Digital Marketing Pro', business: 'Digital Marketing Pro', phone: '+91-9876543214', calledAt: '2024-03-27 09:30 AM', outcome: 'Success', duration: '5m 12s' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCallLogs();
  }, []);

  useEffect(() => {
    if (outcomeFilter) {
      setFilteredLogs(callLogs.filter((log) => log.outcome === outcomeFilter));
    } else {
      setFilteredLogs(callLogs);
    }
  }, [outcomeFilter, callLogs]);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Call Logs</h1>
        <p className="text-gray-500 mt-1">History of all calls made to leads</p>
      </div>

      {/* Filter */}
      <div className="card p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Outcome</label>
        <select
          value={outcomeFilter}
          onChange={(e) => setOutcomeFilter(e.target.value)}
          className="input-base md:w-48"
        >
          <option value="">All Outcomes</option>
          <option value="Success">Success</option>
          <option value="Voicemail">Voicemail</option>
          <option value="No Answer">No Answer</option>
          <option value="Busy">Busy</option>
          <option value="Disconnected">Disconnected</option>
        </select>
      </div>

      {/* Results info */}
      <p className="text-sm text-gray-600">
        Showing {filteredLogs.length} of {callLogs.length} calls
      </p>

      {/* Table */}
      <CallLogsTable logs={filteredLogs} loading={loading} />
    </div>
  );
}
