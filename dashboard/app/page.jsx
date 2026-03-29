'use client';

import { useState, useEffect } from 'react';
import { BarChart3, PhoneCall, Target, TrendingUp } from 'lucide-react';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats`);
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
        <h1 className="text-4xl font-bold">📱 Cntrl M CRM</h1>
        <p className="text-blue-200 mt-1">Lawyer lead management & sales pipeline</p>
      </header>

      {/* Quick Stats */}
      <section className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Target className="w-6 h-6" />}
          title="Total Leads"
          value={stats?.totalLeads || 0}
          loading={loading}
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="Hot Leads"
          value={stats?.hotLeads || 0}
          loading={loading}
        />
        <StatCard
          icon={<PhoneCall className="w-6 h-6" />}
          title="Calls Booked"
          value={stats?.callsBooked || 0}
          loading={loading}
        />
        <StatCard
          icon={<BarChart3 className="w-6 h-6" />}
          title="Conversion Rate"
          value={stats?.conversionRate || '0%'}
          loading={loading}
        />
      </section>

      {/* Main Dashboard */}
      <Dashboard />
    </div>
  );
}

function StatCard({ icon, title, value, loading }) {
  return (
    <div className="bg-white text-gray-900 rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${loading ? 'animate-pulse' : ''}`}>
            {loading ? '--' : value}
          </p>
        </div>
        <div className="text-blue-600 opacity-50">{icon}</div>
      </div>
    </div>
  );
}
