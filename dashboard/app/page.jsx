'use client';

import { useEffect, useState } from 'react';
import StatCard from '@/components/StatCard';
import ActivityFeed from '@/components/ActivityFeed';
import { TrendingUp, Upload, Zap } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    hotLeads: 0,
    callsMade: 0,
    meetingsBooked: 0,
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, activitiesRes] = await Promise.all([
          fetch(`${API_URL}/api/dashboard/stats`),
          fetch(`${API_URL}/api/dashboard/activities?limit=5`),
        ]);

        if (!statsRes.ok || !activitiesRes.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const statsData = await statsRes.json();
        const activitiesData = await activitiesRes.json();

        setStats(statsData.data || statsData);
        setActivities(Array.isArray(activitiesData) ? activitiesData : (activitiesData.data || []));
      } catch (err) {
        setError(err.message);
        // Mock data for demo
        setStats({
          totalLeads: 247,
          hotLeads: 12,
          callsMade: 89,
          meetingsBooked: 24,
        });
        setActivities([
          { id: 1, name: 'Acme Corp', action: 'Lead added', timestamp: '2 hours ago' },
          { id: 2, name: 'TechStart Inc', action: 'Call completed', timestamp: '4 hours ago' },
          { id: 3, name: 'Global Systems', action: 'Website scored 8/10', timestamp: '1 day ago' },
          { id: 4, name: 'Innovation Labs', action: 'Meeting scheduled', timestamp: '1 day ago' },
          { id: 5, name: 'FutureTech Co', action: 'Hot lead flag added', timestamp: '2 days ago' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's your pipeline overview.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary flex items-center gap-2">
            <Upload size={18} />
            Import Leads
          </button>
          <button className="btn btn-primary flex items-center gap-2">
            <Zap size={18} />
            Start Campaign
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg">
          <p className="text-sm">Demo mode active. Mock data displayed. API: {error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Leads"
          value={stats.totalLeads}
          icon={Users}
          color="blue"
          loading={loading}
        />
        <StatCard
          title="Hot Leads"
          value={stats.hotLeads}
          icon={Fire}
          color="red"
          loading={loading}
        />
        <StatCard
          title="Calls Made"
          value={stats.callsMade}
          icon={Phone}
          color="green"
          loading={loading}
        />
        <StatCard
          title="Meetings Booked"
          value={stats.meetingsBooked}
          icon={Calendar}
          color="purple"
          loading={loading}
        />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <ActivityFeed activities={activities} loading={loading} />
        </div>

        {/* Quick Stats */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Conversion Rate</span>
              <span className="font-semibold text-gray-900">9.7%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full w-[9.7%]"></div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Avg Call Duration</span>
                <span className="font-semibold text-gray-900">3.5 min</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Call Success Rate</span>
                <span className="font-semibold text-gray-900">47%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icons (simple inline)
const Users = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const Fire = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.287-2.26.9-3.2" />
  </svg>
);

const Phone = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const Calendar = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
