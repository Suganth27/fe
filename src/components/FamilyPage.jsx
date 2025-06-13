import React, { useState } from 'react';
import { Plus, Edit, Trash2, Users, Copy, Search } from 'lucide-react';
// import AddClientForm from './AddClientForm';

// Placeholder clients and families data
const initialClients = [
  { 
    id: 1, 
    name: 'Jane Cooper', 
    company: 'Acme Inc', 
    status: 'Active', 
    email: 'jane.cooper@example.com', 
    phone: '(555) 123-4567', 
    clientId: 'ACME-001', 
    dob: '1985-08-22', 
    gender: 'Female', 
    productType: 'Loan' 
},
  { 
    id: 2, 
    name: 'Alex Johnson', 
    company: 'Globex Corp', 
    status: 'Pending', 
    email: 'alex.johnson@example.com', 
    phone: '(555) 234-5678', 
    clientId: 'GLOBEX-002', 
    dob: '1992-03-15', 
    gender: 'Male', 
    productType: 'Investment' 
},
  { 
    id: 3, 
    name: 'Michael Brown', 
    company: 'Initech', 
    status: 'Active', 
    email: 'michael.brown@example.com', 
    phone: '(555) 345-6789', 
    clientId: 'INIT-003', 
    dob: '1978-11-30', 
    gender: 'Male', 
    productType: 'Finance' 
},
];
const initialFamilies = [
  {
    id: 1,
    familyName: 'Cooper Family',
    status: 'Active',
    members: [1, 2],
    email: 'cooper.family@example.com',
    phone: '(555) 999-9999',
    familyId: 'FAM-001',
    address: '123 Main St',
    productType: 'Loan',
  },
];

const statusOptions = ['Active', 'Inactive', 'Pending'];

const FamilyPage = () => {
  const [families, setFamilies] = useState(initialFamilies);
  const [clients] = useState(initialClients);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFamily, setEditFamily] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteFamilyId, setDeleteFamilyId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Add Family
  const handleAddFamily = (family) => {
    setFamilies(prev => [
      ...prev,
      { ...family, id: Date.now(), members: family.members || [], familyId: family.familyId || `FAM-${Date.now()}` }
    ]);
  };

  // Edit Family
  const handleEdit = (family) => {
    setEditFamily(family);
    setShowEditForm(true);
  };
  const handleUpdateFamily = (updatedFamily) => {
    setFamilies(prev => prev.map(f => f.id === editFamily.id ? { ...f, ...updatedFamily } : f));
    setShowEditForm(false);
  };

  // Delete Family
  const handleDelete = (familyId) => {
    setDeleteFamilyId(familyId);
    setShowDeleteConfirm(true);
  };
  const confirmDelete = () => {
    setFamilies(prev => prev.filter(f => f.id !== deleteFamilyId));
    setShowDeleteConfirm(false);
    setDeleteFamilyId(null);
  };
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeleteFamilyId(null);
  };

  // Filtered families
  const filteredFamilies = families.filter(fam => fam.familyName.toLowerCase().includes(searchTerm.toLowerCase()));

  // Family Form (Add/Edit)
  const FamilyForm = ({ initialValues = {}, onSubmit, onClose, submitLabel }) => {
    const [formData, setFormData] = useState({
      familyName: initialValues.familyName || '',
      email: initialValues.email || '',
      phone: initialValues.phone || '',
      address: initialValues.address || '',
      productType: initialValues.productType || 'Loan',
      status: initialValues.status || 'Active',
      members: initialValues.members || [],
      familyId: initialValues.familyId || '',
    });
    // Select clients to merge
    const handleMemberToggle = (clientId) => {
      setFormData((prev) => ({
        ...prev,
        members: prev.members.includes(clientId)
          ? prev.members.filter(id => id !== clientId)
          : [...prev.members, clientId],
      }));
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
      onClose();
    };
    return (
      <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">{submitLabel} Family</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" className="w-full px-4 py-2 border rounded-md" placeholder="Family Name" value={formData.familyName} onChange={e => setFormData({ ...formData, familyName: e.target.value })} required />
          <input type="email" className="w-full px-4 py-2 border rounded-md" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
          <input type="tel" className="w-full px-4 py-2 border rounded-md" placeholder="Phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
          <input type="text" className="w-full px-4 py-2 border rounded-md" placeholder="Address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
          <input type="text" className="w-full px-4 py-2 border rounded-md" placeholder="Family ID" value={formData.familyId} onChange={e => setFormData({ ...formData, familyId: e.target.value })} required />
          <select className="w-full px-4 py-2 border rounded-md" value={formData.productType} onChange={e => setFormData({ ...formData, productType: e.target.value })} required>
            <option value="Loan">Loan</option>
            <option value="Investment">Investment</option>
            <option value="Finance">Finance</option>
            <option value="Insurance">Insurance</option>
          </select>
          <select className="w-full px-4 py-2 border rounded-md" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} required>
            {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <div>
            <label className="block mb-1 font-medium">Select Family Members</label>
            <div className="p-2 overflow-y-auto border rounded max-h-32 bg-gray-50">
              {clients.map(client => (
                <label key={client.id} className="flex items-center gap-2 mb-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.members.includes(client.id)}
                    onChange={() => handleMemberToggle(client.id)}
                  />
                  <span className="text-sm">{client.name} ({client.company})</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded">{submitLabel}</button>
          </div>
        </form>
      </div>
    );
  };

  // Copy handler
  const handleCopy = (family) => {
    const text = `Family Name: ${family.familyName}\nFamily ID: ${family.familyId}\nProduct: ${family.productType}`;
    navigator.clipboard.writeText(text).catch(err => console.error('Failed to copy:', err));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add/Edit/Delete Modals */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <FamilyForm
            onClose={() => setShowAddForm(false)}
            onSubmit={handleAddFamily}
            submitLabel="Add"
          />
        </div>
      )}
      {showEditForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <FamilyForm
            initialValues={editFamily}
            onClose={() => setShowEditForm(false)}
            onSubmit={handleUpdateFamily}
            submitLabel="Update"
          />
        </div>
      )}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-sm p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Delete Family</h2>
            <p className="mb-6 text-gray-700">Are you sure you want to delete this family?</p>
            <div className="flex justify-end gap-4">
              <button onClick={cancelDelete} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={confirmDelete} className="px-4 py-2 text-white bg-red-600 rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Family Dashboard</h1>
          <button onClick={() => setShowAddForm(true)} className="flex items-center gap-2 px-4 py-2 text-white transition-all duration-300 bg-gray-900 rounded-lg hover:bg-gray-800 hover:scale-105 hover:shadow-md">
            <Plus size={16} />
            Add Family
          </button>
        </div>
      </div>
      {/* Search and Cards */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Users className="text-gray-500" size={20} />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Families</h2>
              <p className="text-sm text-gray-500">Manage your families</p>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={16} />
            <input
              type="text"
              placeholder="Search families..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-64 py-2 pl-10 pr-4 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFamilies.map(family => (
            <div key={family.id} className="p-6 transition-all duration-300 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:-translate-y-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{family.familyName}</h3>
                    <button onClick={() => handleCopy(family)} className="text-gray-400 transition-colors hover:text-gray-600" title="Copy family details">
                      <Copy size={14} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">{family.address}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${family.status === 'Active' ? 'bg-green-500' : family.status === 'Pending' ? 'bg-yellow-500' : 'bg-gray-400'}`}>{family.status}</span>
              </div>
              <div className="grid grid-cols-2 mb-4 text-sm gap-x-4 gap-y-2">
                <div className="flex items-center gap-1 truncate">
                  <span className="text-xs text-gray-500">ID:</span>
                  <span className="font-mono text-xs text-gray-700 truncate">{family.familyId}</span>
                </div>
                <div className="flex items-center gap-1 truncate">
                  <span className="text-xs text-gray-500">Phone:</span>
                  <span className="text-xs text-gray-700 truncate">{family.phone}</span>
                </div>
                <div className="flex items-center gap-1 truncate">
                  <span className="text-xs text-gray-500">Email:</span>
                  <span className="text-xs text-blue-600 truncate">{family.email}</span>
                </div>
                <div className="flex items-center gap-1 truncate">
                  <span className="text-xs text-gray-500">Product:</span>
                  <span className={`px-2 py-1 text-[0.7rem] font-medium rounded-full ${family.productType === 'Loan' ? 'bg-green-100 text-green-800' : family.productType === 'Investment' ? 'bg-blue-100 text-blue-800' : family.productType === 'Finance' ? 'bg-purple-100 text-purple-800' : 'bg-yellow-100 text-yellow-800'}`}>{family.productType}</span>
                </div>
                <div className="flex items-center col-span-2 gap-1">
                  <span className="text-xs text-gray-500">Members:</span>
                  <span className="text-xs text-gray-700 truncate">{family.members.map(id => {
                    const c = clients.find(cl => cl.id === id);
                    return c ? c.name : '';
                  }).join(', ')}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200" onClick={() => handleEdit(family)}>
                  <Edit size={14} />
                  Edit
                </button>
                <button className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm font-medium text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100" onClick={() => handleDelete(family.id)}>
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {filteredFamilies.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No families found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyPage; 