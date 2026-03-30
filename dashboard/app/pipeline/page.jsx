'use client';

import { useEffect, useState } from 'react';
import KanbanBoard from '@/components/KanbanBoard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function PipelinePage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/leads`);
        if (!res.ok) throw new Error('Failed to fetch leads');
        const data = await res.json();
        setLeads(data);
      } catch (err) {
        setError(err.message);
        // Mock data
        setLeads([
          { id: 1, businessName: 'Acme Corp', phone: '+91-9876543210', callStatus: 'Completed', websiteScore: 8, category: 'Technology' },
          { id: 2, businessName: 'Tech Solutions', phone: '+91-9876543211', callStatus: 'Pending', websiteScore: 6, category: 'Software' },
          { id: 3, businessName: 'Global Systems', phone: '+91-9876543212', callStatus: 'Completed', websiteScore: 9, category: 'Enterprise' },
          { id: 4, businessName: 'StartUp Inc', phone: '+91-9876543213', callStatus: 'No Contact', websiteScore: 2, category: 'Startup' },
          { id: 5, businessName: 'Digital Marketing Pro', phone: '+91-9876543214', callStatus: 'Scheduled', websiteScore: 7, category: 'Marketing' },
          { id: 6, businessName: 'Innovation Labs', phone: '+91-9876543215', callStatus: 'Completed', websiteScore: 5, category: 'Technology' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // Group leads by priority (based on website score)
  const categorizeByPriority = (leads) => {
    return {
      priority1: leads.filter((l) => l.websiteScore === 0), // No website
      priority2: leads.filter((l) => l.websiteScore >= 1 && l.websiteScore <= 4),
      priority3: leads.filter((l) => l.websiteScore >= 5 && l.websiteScore <= 7),
      priority4: leads.filter((l) => l.websiteScore >= 8 && l.websiteScore <= 10),
    };
  };

  const columns = categorizeByPriority(leads);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pipeline</h1>
        <p className="text-gray-500 mt-1">Kanban view of leads by priority level</p>
      </div>

      {/* Kanban Board */}
      <KanbanBoard columns={columns} loading={loading} />
    </div>
  );
}
