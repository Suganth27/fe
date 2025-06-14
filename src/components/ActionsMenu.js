import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, House, Mail, Database, LogOut } from 'lucide-react';

const ActionsMenu = ({ isOpen, onToggle, onSelect }) => {
  const navigate = useNavigate();
  const [isDatabaseMenuOpen, setIsDatabaseMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        Actions
        <ChevronDown
          size={16}
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-10 w-56 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg top-full">
          <div className="py-2">
            <button
              className="flex items-center w-full gap-3 px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
              onClick={() => {
                onToggle();
                onSelect('logs');
                navigate('/logs');
              }}
            >
              <House size={16} className="text-green-600" />
              Home
            </button>
            <button
              className="flex items-center w-full gap-3 px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
              onClick={() => {
                onToggle();
                onSelect('mail');
                navigate('/mail-messaging');
              }}
            >
              <Mail size={16} className="text-blue-600" />
              Mail messaging
            </button>
            <div className="relative">
              <button
                className="flex items-center w-full gap-3 px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                onClick={() => setIsDatabaseMenuOpen(!isDatabaseMenuOpen)}
              >
                <Database size={16} className="text-yellow-600" />
                Database Operations
                <ChevronRight size={16} className="ml-auto" />
              </button>
              {isDatabaseMenuOpen && (
                <div className="absolute top-0 z-10 w-56 mt-0 bg-white border border-gray-200 rounded-lg shadow-lg left-full">
                  <div className="py-2">
                    <button
                      className="flex items-center w-full gap-3 px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                      onClick={() => {
                        onToggle();
                        onSelect('clientDetails');
                      }}
                    >
                      Client Details
                    </button>
                    <button
                      className="flex items-center w-full gap-3 px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                      onClick={() => {
                        onToggle();
                        onSelect('family');
                        navigate('/family');
                      }}
                    >
                      Family
                    </button>
                    <button
                      className="flex items-center w-full gap-3 px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                      onClick={() => {
                        onToggle();
                        onSelect('clientProducts');
                        navigate('/client-products');
                      }}
                    >
                      Client Products
                    </button>
                    <button
                      className="flex items-center w-full gap-3 px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                      onClick={() => {
                        onToggle();
                        onSelect('products');
                        navigate('/products');
                      }}
                    >
                      Products
                    </button>
                    <button
                      className="flex items-center w-full gap-3 px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                      onClick={() => {
                        onToggle();
                        onSelect('main');
                      }}
                    >
                      Back to Main
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              className="flex items-center w-full gap-3 px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
              onClick={() => {
                onToggle();
                onSelect('exit');
                window.history.back();
              }}
            >
              <LogOut size={16} className="text-red-600" />
              Exit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionsMenu;