import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Home, Plus } from 'lucide-react';
import ActionsMenu from './ActionsMenu';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// Placeholder data for products
const productStats = {
  Loan: 5,
  Investment: 3,
  Finance: 2,
  Insurance: 2,
  Savings: 1,
  Mortgage: 1,
  'Child Savings': 1,
};

const familyStats = {
  Loan: 2,
  Investment: 1,
  Finance: 1,
  Insurance: 1,
  Savings: 0,
  Mortgage: 1,
  'Child Savings': 0,
};

const ProductsPage = () => {
  const [isActionsOpen, setIsActionsOpen] = React.useState(false);
  const [showAddProduct, setShowAddProduct] = React.useState(false);
  const [products, setProducts] = React.useState(Object.keys(productStats));
  const [productCounts, setProductCounts] = React.useState({ ...productStats });

  // Add Product Form
  const AddProductForm = ({ onClose, onAdd }) => {
    const [name, setName] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!name.trim()) return;
      onAdd(name, desc);
      onClose();
    };
    return (
      <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <textarea
            placeholder="Product Description"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            rows={3}
          />
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded">Add</button>
          </div>
        </form>
      </div>
    );
  };

  // Add product handler
  const handleAddProduct = (name, desc) => {
    setProducts(prev => [...prev, name]);
    setProductCounts(prev => ({ ...prev, [name]: 0 }));
  };

  // Updated chart data
  const pieData = {
    labels: products,
    datasets: [
      {
        label: 'Clients',
        data: products.map(p => productCounts[p] || 0),
        backgroundColor: [
          '#2563eb', '#22d3ee', '#a21caf', '#f59e42', '#10b981', '#f43f5e', '#fbbf24', '#6366f1', '#f472b6', '#facc15', '#4ade80', '#f87171', '#a3e635', '#fcd34d'
        ],
        borderWidth: 1,
      },
    ],
  };
  const barData = {
    labels: products,
    datasets: [
      {
        label: 'Clients',
        data: products.map(p => productCounts[p] || 0),
        backgroundColor: '#2563eb',
      },
      {
        label: 'Families',
        data: products.map(p => familyStats[p] || 0),
        backgroundColor: '#f59e42',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Home className="text-gray-400" size={22} />
          <h1 className="text-2xl font-semibold text-gray-900">Products Dashboard</h1>
        </div>
      </div>

      {/* Manage Products Section */}
      <div className="flex items-start justify-between px-6 pt-6 pb-2">
        {/* Left: Title, Description, ActionsMenu */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Manage Products</h2>
          <p className="text-sm text-gray-500">Manage your products</p>
          <div className="mt-2">
            <ActionsMenu
              isOpen={isActionsOpen}
              onToggle={() => setIsActionsOpen(!isActionsOpen)}
              onSelect={() => setIsActionsOpen(false)}
            />
          </div>
        </div>

        {/* Right: Add New Product */}
        <div className="flex items-center">
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-gray-900 rounded-lg hover:bg-gray-800" onClick={() => setShowAddProduct(true)}>
            <Plus size={16} />
            Add New Product
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 px-6 py-8 md:grid-cols-3">
        <div className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <span className="mb-2 text-sm text-gray-500">Total Products</span>
          <span className="text-3xl font-bold text-blue-700">
            {Object.keys(productStats).length}
          </span>
        </div>
        <div className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <span className="mb-2 text-sm text-gray-500">Total Clients</span>
          <span className="text-3xl font-bold text-blue-700">
            {Object.values(productStats).reduce((a, b) => a + b, 0)}
          </span>
        </div>
        <div className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <span className="mb-2 text-sm text-gray-500">Total Families</span>
          <span className="text-3xl font-bold text-blue-700">
            {Object.values(familyStats).reduce((a, b) => a + b, 0)}
          </span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-8 px-6 pb-8 md:grid-cols-2">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Product Distribution (Clients)
          </h2>
          <Pie data={pieData} />
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Product Comparison (Clients vs Families)
          </h2>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <AddProductForm
            onClose={() => setShowAddProduct(false)}
            onAdd={handleAddProduct}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;