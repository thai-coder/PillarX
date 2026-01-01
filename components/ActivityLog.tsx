import React from 'react';
import { Clock, Info, Globe, Shield, User } from 'lucide-react';
import { UserActivity } from '../types';

interface ActivityLogProps {
  activities: UserActivity[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ activities }) => {
  return (
    <div className="flex-1 p-6 md:p-12 md:ml-64 min-h-screen bg-white transition-all duration-300">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-900">User Activity</h2>
      </div>

      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Actor</th>
              <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Detail</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {activities.length > 0 ? (
              activities.map((act) => (
                <tr key={act.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {new Date(act.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-[10px] font-bold rounded-full ${
                      act.action_type === 'LOGIN' ? 'bg-green-100 text-green-700' :
                      act.action_type === 'DELETE' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {act.action_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {act.actor_type === 'BOT' ? (
                        <Shield className="w-4 h-4 text-amber-500" />
                      ) : (
                        <User className="w-4 h-4 text-blue-500" />
                      )}
                      <span className={`text-xs font-medium ${act.actor_type === 'BOT' ? 'text-amber-700' : 'text-gray-700'}`}>
                        {act.actor_type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 italic">
                    {act.action_detail}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">
                  No activity history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityLog;