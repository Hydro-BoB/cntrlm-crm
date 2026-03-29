'use client';

import { useState, useEffect } from 'react';
import LeadsTable from './LeadsTable';
import FilterBar from './FilterBar';
import KanbanBoard from './KanbanBoard';
import CallTracker from './CallTracker';

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    score_min: '',
    status: '',
    hot: '',
  });
  const [activeTab, setActiveTab] = useState('leads'); // leads, kanban, tracker

  useEffect(() => {
    fetchLeads();
  }, [filters]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.score_min) params.append('score_min', filters.score_min);
      if (filters.status) params.append('status', filters.status);
      if (filters.hot) params.append('hot', filters.hot);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/leads?${params.toString()}`
      );
      const data = await res.json();
      if (data.success) {
        setLeads(data.data);
        setFilteredLeads(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRefresh = () => {
    fetchLeads();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'leads', label: '📊 Leads Table' },
          { id: 'kanban', label: '📋 Pipeline Kanban' },
          { id: 'tracker', label: '☎️ Call Tracker' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <FilterBar onFilterChange={handleFilterChange} onRefresh={handleRefresh} />

      {/* Content */}
      <div className="mt-6">
        {activeTab === 'leads' && (
          <LeadsTable leads={filteredLeads} loading={loading} onRefresh={handleRefresh} />
        )}
        {activeTab === 'kanban' && <KanbanBoard leads={leads} />}
        {activeTab === 'tracker' && <CallTracker />}
      </div>
    </div>
  );
}
