export default function ActivityFeed({ activities = [], loading = false }) {
  if (loading) {
    return (
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
              <div className="flex-1">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-3 w-32 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
      {activities.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No activity yet</p>
      ) : (
        <div className="space-y-0 divide-y divide-gray-200">
          {activities.map((activity) => (
            <div key={activity.id} className="py-3 first:pt-0 last:pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{activity.business || activity.name || '—'}</p>
                  <p className="text-sm text-gray-500">{activity.call_status || activity.action || 'no_answer'}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.updated_at || activity.timestamp || ''}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
