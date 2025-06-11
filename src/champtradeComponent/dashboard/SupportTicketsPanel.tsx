import React from 'react';
import { Ticket, MessageSquare, Clock, CheckCircle } from 'lucide-react';

const SupportTicketsPanel: React.FC = () => {
  const tickets = [
    {
      id: 'TKT-001',
      subject: 'Withdrawal Pending',
      status: 'Open',
      lastUpdate: '2 hours ago',
      priority: 'High'
    },
    {
      id: 'TKT-002',
      subject: 'Referral Not Showing',
      status: 'In Progress',
      lastUpdate: '1 day ago',
      priority: 'Medium'
    },
    {
      id: 'TKT-003',
      subject: 'Account Verification',
      status: 'Resolved',
      lastUpdate: '3 days ago',
      priority: 'Low'
    }
  ];

  return (
    <div className="space-y-6 bg-[rgb(20,20,20)] border border-yellow-500/50 rounded-xl p-6 shadow-lg ">
      {/* Ticket Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[rgba(20,20,20,0)] border border-yellow-500/50 p-4 rounded-lg ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Open Tickets</p>
              <p className="text-2xl font-bold text-yellow-500">2</p>
            </div>
            <Ticket className="h-8 w-8 text-yellow-500 opacity-80" />
          </div>
        </div>
        
        <div className="bg-[rgba(20,20,20,0)] border border-yellow-500/50 p-4 rounded-lg ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">In Progress</p>
              <p className="text-2xl font-bold text-yellow-400">1</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-400 opacity-80" />
          </div>
        </div>
        
        <div className="bg-[rgba(20,20,20,0)] border border-yellow-500/50 p-4 rounded-lg ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Resolved</p>
              <p className="text-2xl font-bold text-green-400">15</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400 opacity-80" />
          </div>
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="bg-[rgba(20,20,20,0)] border border-yellow-500/50 p-6 rounded-lg ">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Tickets</h3>
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between p-4 bg-[rgba(20,20,20,0)] border border-yellow-500/50 rounded-lg  hover:border-yellow-500/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <MessageSquare className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium text-white">{ticket.subject}</p>
                  <p className="text-sm text-gray-400">
                    {ticket.id} • {ticket.lastUpdate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    ticket.status === 'Open'
                      ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-500/30'
                      : ticket.status === 'In Progress'
                      ? 'bg-yellow-800/30 text-yellow-300 border border-yellow-500/30'
                      : 'bg-green-900/30 text-green-400 border border-green-500/30'
                  }`}
                >
                  {ticket.status}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    ticket.priority === 'High'
                      ? 'bg-red-900/30 text-red-400 border border-red-500/30'
                      : ticket.priority === 'Medium'
                      ? 'bg-orange-900/30 text-orange-400 border border-orange-500/30'
                      : 'bg-gray-700 text-gray-400 border border-gray-600'
                  }`}
                >
                  {ticket.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button className="w-full bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors border border-yellow-500">
          Create New Ticket
        </button>
        <button className="w-full  text-gray-300 font-bold py-3 px-6 rounded-lg bg-[rgba(20,20,20,0)] border border-yellow-500/50 transition-colors ">
          View All Tickets
        </button>
      </div>
    </div>
  );
};

export default SupportTicketsPanel;