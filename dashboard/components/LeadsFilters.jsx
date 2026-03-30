'use client';

import { Search, X } from 'lucide-react';

export default function LeadsFilters({ filters, setFilters }) {
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      search: '',
      category: '',
      city: '',
      callStatus: '',
      hotFlag: '',
      scoreRange: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== '');

  return (
    <div className="card p-4 space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search size={18} className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, phone, or email..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="input-base pl-10"
        />
      </div>

      {/* Filters grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="input-base"
        >
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Software">Software</option>
          <option value="Enterprise">Enterprise</option>
          <option value="Startup">Startup</option>
          <option value="Marketing">Marketing</option>
        </select>

        <select
          value={filters.city}
          onChange={(e) => handleFilterChange('city', e.target.value)}
          className="input-base"
        >
          <option value="">All Cities</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Pune">Pune</option>
        </select>

        <select
          value={filters.callStatus}
          onChange={(e) => handleFilterChange('callStatus', e.target.value)}
          className="input-base"
        >
          <option value="">All Call Status</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Scheduled">Scheduled</option>
          <option value="No Contact">No Contact</option>
        </select>

        <select
          value={filters.hotFlag}
          onChange={(e) => handleFilterChange('hotFlag', e.target.value)}
          className="input-base"
        >
          <option value="">All Status</option>
          <option value="hot">Hot Leads</option>
          <option value="normal">Normal Leads</option>
        </select>

        <select
          value={filters.scoreRange}
          onChange={(e) => handleFilterChange('scoreRange', e.target.value)}
          className="input-base"
        >
          <option value="">All Scores</option>
          <option value="1-4">Poor (1-4)</option>
          <option value="5-7">Average (5-7)</option>
          <option value="8-10">Good (8-10)</option>
        </select>
      </div>

      {/* Reset button */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            <X size={16} />
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
