import React, { useState } from 'react';

const AddClientForm = ({ onClose, onAddClient }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    clientId: '',
    productType: 'Loan'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddClient(formData);
    onClose();
  };

  return (
    <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">Add New Client</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Client Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={(e) => setFormData({...formData, company: e.target.value})}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={(e) => setFormData({...formData, dob: e.target.value})}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="clientId"
          placeholder="Client ID"
          value={formData.clientId}
          onChange={(e) => setFormData({...formData, clientId: e.target.value})}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={(e) => setFormData({...formData, gender: e.target.value})}
          className="w-full px-4 py-2 border rounded-md"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select
          name="productType"
          value={formData.productType}
          onChange={(e) => setFormData({...formData, productType: e.target.value})}
          className="w-full px-4 py-2 border rounded-md"
          required
        >
          <option value="Loan">Loan</option>
          <option value="Investment">Investment</option>
          <option value="Finance">Finance</option>
          <option value="Insurance">Insurance</option>
        </select>
        <div className="flex justify-end gap-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClientForm;
