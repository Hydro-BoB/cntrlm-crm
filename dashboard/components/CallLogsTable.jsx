'use client';

export default function CallLogsTable({ logs = [], loading = false }) {
  const getOutcomeColor = (outcome) => {
    switch (outcome) {
      case 'Success':
        return 'badge-success';
      case 'Voicemail':
        return 'badge-warning';
      case 'No Answer':
        return 'badge-danger';
      case 'Busy':
        return 'badge-warning';
      case 'Disconnected':
        return 'badge-danger';
      default:
        return 'badge-gray';
    }
  };

  if (loading) {
    return (
      <div className="card overflow-hidden">
        <div className="space-y-3 p-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="card p-12 text-center">
        <p className="text-gray-500">No call logs found.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Lead Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Business</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Called At</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Outcome</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{log.leadName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.business}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.calledAt}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`badge ${getOutcomeColor(log.outcome)}`}>{log.outcome}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
