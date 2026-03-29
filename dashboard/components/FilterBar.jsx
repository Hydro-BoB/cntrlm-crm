'use client';

import { useState } from 'react';
import { Search, RotateCcw } from 'lucide-react';

export default function FilterBar({ onFilterChange, onRefresh }) {
  const [filters, setFilters] = useState({
    score_min: '',
    status: '',
    hot: '',
  });

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const emptyFilters = { score_min: '', status: '', hot: '' };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Min Website Score
          </label>
          <input
            type="number"
            min="0"
            max="10"
            value={filters.score_min}
            onChange={(e) => handleChange('score_min', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Call Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="booked">Booked</option>
            <option value="callback">Callback</option>
            <option value="not_interested">Not Interested</option>
            <option value="no_answer">No Answer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Hot Flag
          </label>
          <select
            value={filters.hot}
            onChange={(e) => handleChange('hot', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="yes">🔥 Hot</option>
            <option value="no">Normal</option>
          </select>
        </div>

        <div className="flex items-end gap-2">
          <button
            onClick={handleReset}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={onRefresh}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Search className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
