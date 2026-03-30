'use client';

import { Phone, Edit, Trash2 } from 'lucide-react';

export default function LeadsTable({ leads = [], loading = false }) {
  const getCallStatusColor = (status) => {
    switch (status) {
      case 'booked': return 'bg-green-100 text-green-700';
      case 'callback': return 'bg-yellow-100 text-yellow-700';
      case 'not_interested': return 'bg-red-100 text-red-700';
      case 'called': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getScoreBadgeColor = (score) => {
    if (score >= 8) return 'bg-green-100 text-green-700';
    if (score >= 5) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  if (loading) {
    return (
      <div className="card overflow-hidden">
        <div className="space-y-3 p-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="card p-12 text-center">
        <p className="text-gray-500">No leads found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Business Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Category</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">City</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Score</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Call Status</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">Hot</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{lead.business || lead.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{lead.category}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{lead.city}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{lead.phone}</td>
                <td className="px-6 py-4 text-sm text-blue-600 truncate max-w-[150px]">{lead.email || '—'}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getScoreBadgeColor(lead.website_score)}`}>
                    {lead.website_score}/10
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCallStatusColor(lead.call_status)}`}>
                    {lead.call_status || 'no_answer'}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-sm">
                  {lead.hot_flag === 'yes' && <span className="text-xl">🔥</span>}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" title="Call">
                      <Phone size={16} />
                    </button>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
