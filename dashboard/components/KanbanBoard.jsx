'use client';

export default function KanbanBoard({ columns = {}, loading = false }) {
  const columnConfig = [
    { key: 'priority1', title: '🔴 Priority 1', subtitle: 'No Website', bg: 'bg-red-50' },
    { key: 'priority2', title: '🟠 Priority 2', subtitle: 'Poor (1-4)', bg: 'bg-orange-50' },
    { key: 'priority3', title: '🟡 Priority 3', subtitle: 'Average (5-7)', bg: 'bg-yellow-50' },
    { key: 'priority4', title: '🟢 Priority 4', subtitle: 'Good (8-10)', bg: 'bg-green-50' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {columnConfig.map((config) => {
        const leads = columns[config.key] || [];
        return (
          <div key={config.key} className={`${config.bg} rounded-lg p-4 min-h-[600px]`}>
            {/* Column header */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900">{config.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{config.subtitle}</p>
              <div className="mt-2 inline-block px-2 py-1 bg-white rounded text-sm font-medium text-gray-700">
                {leads.length} leads
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-3">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
                ))
              ) : leads.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">No leads</p>
              ) : (
                leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-move"
                  >
                    <h4 className="font-medium text-gray-900 text-sm">{lead.businessName}</h4>
                    <p className="text-xs text-gray-500 mt-1">{lead.category}</p>
                    <p className="text-xs text-gray-600 mt-2">{lead.phone}</p>
                    <div className="mt-3">
                      <span className="inline-block px-2 py-1 bg-gray-100 text-xs rounded text-gray-700">
                        {lead.callStatus}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
