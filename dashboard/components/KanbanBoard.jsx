'use client';

export default function KanbanBoard({ leads }) {
  const buckets = {
    'P1: Hot': leads.filter(l => l.hot_flag === 'yes' && l.website_score === 0),
    'P2: No Website': leads.filter(l => l.hot_flag === 'yes' && l.website_score > 0),
    'P3: Callback': leads.filter(l => l.call_status === 'callback'),
    'P4: Booked': leads.filter(l => l.call_status === 'booked'),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {Object.entries(buckets).map(([bucket, items]) => (
        <div key={bucket} className="bg-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-4">{bucket}</h3>
          <div className="space-y-3">
            {items.map((lead) => (
              <div key={lead.id} className="bg-white p-3 rounded-lg shadow-sm">
                <p className="font-semibold text-sm text-gray-900">{lead.name}</p>
                <p className="text-xs text-gray-600">{lead.business}</p>
                <p className="text-xs text-gray-500 mt-2">{lead.city}, {lead.country}</p>
              </div>
            ))}
            {items.length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm">No leads</div>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-300 text-sm font-semibold text-gray-700">
            Count: {items.length}
          </div>
        </div>
      ))}
    </div>
  );
}
