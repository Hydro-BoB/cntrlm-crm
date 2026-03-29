'use client';

import { useState } from 'react';
import { ArrowUpDown, Trash2, Edit2 } from 'lucide-react';

export default function LeadsTable({ leads, loading, onRefresh }) {
  const [sortKey, setSortKey] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('DESC');

  const sortedLeads = [...leads].sort((a, b) => {
    let aVal = a[sortKey];
    let bVal = b[sortKey];

    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (sortOrder === 'ASC') {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortKey(key);
      setSortOrder('ASC');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this lead?')) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/${id}`, {
        method: 'DELETE',
      });
      onRefresh();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading leads...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              {[
                { key: 'name', label: 'Name' },
                { key: 'business', label: 'Business' },
                { key: 'city', label: 'City' },
                { key: 'phone', label: 'Phone' },
                { key: 'website_score', label: 'Score' },
                { key: 'hot_flag', label: '🔥 Hot' },
                { key: 'call_status', label: 'Status' },
              ].map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-200 transition"
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    <ArrowUpDown className="w-3 h-3 opacity-50" />
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedLeads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b hover:bg-blue-50 transition cursor-pointer"
              >
                <td className="px-4 py-3 font-semibold text-gray-900">{lead.name}</td>
                <td className="px-4 py-3 text-gray-700">{lead.business || '-'}</td>
                <td className="px-4 py-3 text-gray-700">{lead.city || '-'}</td>
                <td className="px-4 py-3 text-gray-700">{lead.phone || '-'}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                      lead.website_score >= 7
                        ? 'bg-green-500'
                        : lead.website_score >= 4
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {lead.website_score}/10
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  {lead.hot_flag === 'yes' ? '🔥' : '✓'}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold text-white ${
                      lead.call_status === 'booked'
                        ? 'bg-green-600'
                        : lead.call_status === 'callback'
                        ? 'bg-blue-600'
                        : lead.call_status === 'not_interested'
                        ? 'bg-red-600'
                        : 'bg-gray-600'
                    }`}
                  >
                    {lead.call_status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleDelete(lead.id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 bg-gray-50 text-sm text-gray-600 border-t">
        Total: <strong>{leads.length}</strong> leads
      </div>
    </div>
  );
}
