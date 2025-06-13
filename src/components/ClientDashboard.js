import React, { useState } from 'react';
import '../App.css';
import initialClients from '../data/clients';
import { v4 as uuidv4 } from 'uuid';
import logs from '../data/log';
import { getStatusColor, getLogStatusColor } from '../utils/utils';
import ActionsMenu from './ActionsMenu';
import AddClientForm from './AddClientForm';
import { Search, Users, Bookmark, Edit, Trash2, Plus, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [currentView, setCurrentView] = useState('logs');
  const [showAddForm, setShowAddForm] = useState(false);

  const [clients, setClients] = useState(initialClients);
  const navigate = useNavigate();

  const handleCopy = (client) => {
    const text = `Name: ${client.name}\nCompany: ${client.company}\nClient ID: ${client.clientId}\nProduct: ${client.productType}`;
    navigator.clipboard.writeText(text)
      .catch(err => console.error('Failed to copy:', err));
  };
  
  const filteredClients = clients.filter(
    client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50" onClick={() => setIsActionsOpen(false)}>
    {showAddForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <AddClientForm 
      onClose={() => setShowAddForm(false)}
      onAddClient={(newClient) => {
        const clientWithId = {
          ...newClient,
          id: uuidv4(),
          status: 'active',
          phone: newClient.phone || 'Not provided',
          dob: newClient.dob || 'N/A',
          gender: newClient.gender || 'Not specified',
          clientId: newClient.clientId || 'CL-000',
          productType: newClient.productType || 'General'
        };
        setClients(prev => [...prev, clientWithId]);
      }}
    />
  </div>
)}

      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Client Dashboard</h1>
          <button onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 text-white transition-all duration-300 bg-gray-900 rounded-lg hover:bg-gray-800 hover:scale-105 hover:shadow-md"
          >
          <Plus size={16} />
            Add Client
          </button>

        </div>
      </div>

      <div className="p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Users className="text-gray-500" size={20} />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {currentView === 'logs' ? 'Database Logs' : 'Clients'}
              </h2>
              <p className="text-sm text-gray-500">
                {currentView === 'logs' ? 'System activity and operations log' : 'Manage your clients'}
              </p>
            </div>
          </div>
          {currentView === 'clients' && (
            <div className="relative">
              <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={16} />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 py-2 pl-10 pr-4 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
        </div>
            
        <div className="flex items-center justify-between mb-6">
          <ActionsMenu
            isOpen={isActionsOpen}
            onToggle={() => setIsActionsOpen(!isActionsOpen)}
            onSelect={(view) => {
              if (view === 'mail') {
                navigate('/mail-messaging');
              } else {
                setCurrentView(view);
              }
              setIsActionsOpen(false);
            }}
          />
        
          <div className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-800"
            onClick={() => setCurrentView('clients')}>
            <Bookmark size={16} />
            <span className="text-sm">Saved Clients</span>
          </div>
        </div>

        {currentView === 'logs' ? (
          <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Log ID</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">User ID</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Timestamp</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Action</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Description</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Username</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {logs.map((log, index) => (
                    <tr key={log.logId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{log.logId}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{log.userId}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{log.timestamp}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                          {log.action}
                        </span>
                      </td>
                      <td className="max-w-xs px-6 py-4 text-sm text-gray-500 truncate">{log.description}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{log.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLogStatusColor(log.status)}`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredClients.map((client) => (
                <div key={client.id} className="p-6 transition-all duration-300 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                        <button 
                          onClick={() => handleCopy(client)}
                          className="text-gray-400 transition-colors hover:text-gray-600"
                          title="Copy client details"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">{client.company}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 mb-4 text-sm gap-x-4 gap-y-2">
                    <div className="flex items-center gap-1 truncate">
                      <span className="text-xs text-gray-500">ID:</span>
                      <span className="font-mono text-xs text-gray-700 truncate">{client.clientId}</span>
                    </div>
                    <div className="flex items-center gap-1 truncate">
                      <span className="text-xs text-gray-500">Phone:</span>
                      <span className="text-xs text-gray-700 truncate">{client.phone}</span>
                    </div>
                    <div className="flex items-center gap-1 truncate">
                      <span className="text-xs text-gray-500">DOB:</span>
                      <span className="text-xs text-gray-700">{new Date(client.dob).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1 truncate">
                      <span className="text-xs text-gray-500">Gender:</span>
                      <span className="text-xs text-gray-700 capitalize">{client.gender}</span>
                    </div>
                    <div className="flex items-center col-span-2 gap-1">
                      <span className="text-xs text-gray-500">Product:</span>
                      <span className={`px-2 py-1 text-[0.7rem] font-medium rounded-full ${
                        client.productType === 'Loan' ? 'bg-green-100 text-green-800' :
                        client.productType === 'Investment' ? 'bg-blue-100 text-blue-800' :
                        client.productType === 'Finance' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {client.productType}
                      </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-xs text-blue-600 cursor-pointer hover:underline">{client.email}</span>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
                      <Edit size={14} />
                      Edit
                    </button>
                    <button className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm font-medium text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100">
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredClients.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-gray-500">No clients found matching your search.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;