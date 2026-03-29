'use client';

import { useState } from 'react';
import { PhoneCall, CheckCircle } from 'lucide-react';

export default function CallTracker() {
  const [formData, setFormData] = useState({
    lead_id: '',
    call_status: 'no_answer',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/${formData.lead_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          call_status: formData.call_status,
        }),
      });
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ lead_id: '', call_status: 'no_answer', notes: '' });
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
      <div className="flex items-center gap-3 mb-6">
        <PhoneCall className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">Log Call Outcome</h2>
      </div>

      {submitted && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-800 font-semibold">Call logged!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Lead ID</label>
          <input
            type="number"
            name="lead_id"
            value={formData.lead_id}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter lead ID"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Call Outcome
          </label>
          <select
            name="call_status"
            value={formData.call_status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="no_answer">No Answer</option>
            <option value="callback">Callback Needed</option>
            <option value="booked">Call Booked</option>
            <option value="not_interested">Not Interested</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
            placeholder="Call notes..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Log Call
        </button>
      </form>
    </div>
  );
}
