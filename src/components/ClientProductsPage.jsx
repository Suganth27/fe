import React, { useState, useRef } from 'react';
import { Users, Package } from 'lucide-react';
import ActionsMenu from './ActionsMenu';
import clients from '../data/clients';

// Helper to get client names for a product
const getClientNamesForProduct = (productName) =>
  clients.filter(c => c.productType === productName).map(c => c.name);

// Placeholder product data
const products = [
  {
    name: 'Loan',
    description: 'Personal and business loans.',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    name: 'Investment',
    description: 'Investment products for wealth growth.',
    color: 'bg-green-100 text-green-800',
  },
  {
    name: 'Finance',
    description: 'Finance management and advisory.',
    color: 'bg-purple-100 text-purple-800',
  },
  {
    name: 'Insurance',
    description: 'Comprehensive insurance plans.',
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    name: 'Savings',
    description: 'Savings accounts for all ages.',
    color: 'bg-pink-100 text-pink-800',
  },
  {
    name: 'Mortgage',
    description: 'Home and property mortgage solutions.',
    color: 'bg-red-100 text-red-800',
  },
  {
    name: 'Child Savings',
    description: 'Savings plans for children.',
    color: 'bg-teal-100 text-teal-800',
  },
];

const ClientProductsPage = () => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [showPopover, setShowPopover] = useState(false);
  const hoverTimeout = useRef();

  // Improved hover handlers
  const handleMouseEnter = (productName) => {
    clearTimeout(hoverTimeout.current);
    setHoveredProduct(productName);
    setShowPopover(true);
  };
  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setShowPopover(false);
      setHoveredProduct(null);
    }, 150); // short delay to allow moving to popover
  };
  const handlePopoverEnter = () => {
    clearTimeout(hoverTimeout.current);
    setShowPopover(true);
  };
  const handlePopoverLeave = () => {
    setShowPopover(false);
    setHoveredProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">Client Products</h1>
      </div>
      <br></br>
      {/* Subtitle */}
      <div className="flex items-center gap-3 px-6 pt-2 pb-2">
        <Package className="text-gray-500" size={20} />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Finance Products</h2>
          <p className="text-sm text-gray-500">Overview of all products and their client associations</p>
        </div>
      </div>
      {/* ActionsMenu below header */}
      <div className="px-6 pt-4 pb-2">
        <ActionsMenu
          isOpen={isActionsOpen}
          onToggle={() => setIsActionsOpen(!isActionsOpen)}
          onSelect={() => setIsActionsOpen(false)}
        />
      </div>
      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-6 px-6 py-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const clientNames = getClientNamesForProduct(product.name);
          return (
            <div key={product.name} className="p-6 transition-all duration-300 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${product.color}`}>{product.name}</span>
              </div>
              <p className="mb-4 text-gray-700">{product.description}</p>
              <div className="relative flex items-center gap-2 mt-2">
                <Users className="text-blue-500" size={16} />
                <span
                  className="text-sm font-semibold text-gray-800 cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(product.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  {clientNames.length} Clients
                </span>
                {/* Popover */}
                {showPopover && hoveredProduct === product.name && clientNames.length > 0 && (
                  <div
                    className="absolute left-0 z-20 w-48 p-3 mt-8 text-xs text-gray-900 bg-white border border-gray-200 rounded-lg shadow-lg opacity-95"
                    onMouseEnter={handlePopoverEnter}
                    onMouseLeave={handlePopoverLeave}
                  >
                    <div className="mb-1 font-semibold text-gray-700">Associated Clients:</div>
                    <ul className="list-disc list-inside">
                      {clientNames.map((name) => (
                        <li key={name}>{name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClientProductsPage; 