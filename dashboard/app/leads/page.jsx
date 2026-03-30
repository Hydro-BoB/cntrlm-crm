'use client';

import { useEffect, useState } from 'react';
import LeadsTable from '@/components/LeadsTable';
import LeadsFilters from '@/components/LeadsFilters';
import { Plus, Download } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    city: '',
    callStatus: '',
    hotFlag: '',
    scoreRange: '',
  });

  const itemsPerPage = 50;

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/leads`);
        if (!res.ok) throw new Error('Failed to fetch leads');
        const data = await res.json();
        setLeads(Array.isArray(data) ? data : (data.data || []));
      } catch (err) {
        setError(err.message);
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = leads;

    if (filters.search) {
      const s = filters.search.toLowerCase();
      result = result.filter(
        (lead) =>
          (lead.business || lead.name || '').toLowerCase().includes(s) ||
          (lead.phone || '').includes(filters.search) ||
          (lead.email || '').toLowerCase().includes(s)
      );
    }

    if (filters.category) {
      result = result.filter((lead) => lead.category === filters.category);
    }

    if (filters.city) {
      result = result.filter((lead) => lead.city === filters.city);
    }

    if (filters.callStatus) {
      result = result.filter((lead) => lead.call_status === filters.callStatus);
    }

    if (filters.hotFlag === 'hot') {
      result = result.filter((lead) => lead.hot_flag === 'yes');
    } else if (filters.hotFlag === 'normal') {
      result = result.filter((lead) => lead.hot_flag === 'no');
    }

    if (filters.scoreRange) {
      if (filters.scoreRange === '1-4') {
        result = result.filter((lead) => lead.website_score >= 1 && lead.website_score <= 4);
      } else if (filters.scoreRange === '5-7') {
        result = result.filter((lead) => lead.website_score >= 5 && lead.website_score <= 7);
      } else if (filters.scoreRange === '8-10') {
        result = result.filter((lead) => lead.website_score >= 8 && lead.website_score <= 10);
      }
    }

    setFilteredLeads(result);
    setCurrentPage(1);
  }, [filters, leads]);

  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-500 mt-1">Manage all your leads and track their status</p>
        </div>
        <button className="btn btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Lead
        </button>
      </div>

      {/* Filters */}
      <LeadsFilters filters={filters} setFilters={setFilters} />

      {/* Results info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {paginatedLeads.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredLeads.length)} of {filteredLeads.length} leads
        </p>
        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
          <Download size={16} />
          Export
        </button>
      </div>

      {/* Table */}
      <LeadsTable leads={paginatedLeads} loading={loading} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            if (page < currentPage - 1 || page > currentPage + 1) return null;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
