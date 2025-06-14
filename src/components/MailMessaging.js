import React, { useState } from 'react';
import { ChevronDown, Paperclip, Image as ImageIcon, FileText, Plus } from 'lucide-react';
import ActionsMenu from './ActionsMenu';

const familyOptions = [
  { label: 'All Families', value: 'all' },
  { label: 'Family A', value: 'familyA' },
  { label: 'Family B', value: 'familyB' },
  { label: 'Only Female', value: 'female' },
  { label: 'Only Male', value: 'male' },
];

const templateOptions = [
  { label: 'Welcome', value: 'welcome' },
  { label: 'For Further Support', value: 'support' },
  { label: 'Greetings', value: 'greetings' },
];

const templateTexts = {
  welcome: "Welcome to our service! We're glad to have you.",
  support: "For further support, please contact our helpdesk.",
  greetings: "Greetings! Hope you're having a great day.",
};

const MailMessaging = () => {
  const [filter, setFilter] = useState(familyOptions[0].value);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);

  const [isActionsOpen, setIsActionsOpen] = useState(false);

  // Handle file/image insert
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(prev => [...prev, ...files]);
  };

  // Handle template selection
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setMessage(templateTexts[template]);
    setShowTemplateDropdown(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">Mail Messaging</h1>
        <button className="flex items-center gap-2 px-4 py-2 text-white bg-gray-900 rounded-lg hover:bg-gray-800">
          <Plus size={18} />
          New Mail
        </button>
      </div>
      <div className="px-6 pt-4 pb-2">
        <ActionsMenu
          isOpen={isActionsOpen}
          onToggle={() => setIsActionsOpen(!isActionsOpen)}
          onSelect={() => setIsActionsOpen(false)}
        />
      </div>
      {/* Controls Row: Filters, Insert, Templates */}
      <div className="flex items-center gap-4 px-6 py-4 bg-white border-b border-gray-100">
        {/* Filters Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            onClick={() => setShowFilterDropdown((prev) => !prev)}
          >
            Filters
            <ChevronDown size={16} />
          </button>
          {showFilterDropdown && (
            <div className="absolute left-0 z-10 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
              {familyOptions.map(opt => (
                <button
                  key={opt.value}
                  className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${filter === opt.value ? 'bg-gray-100 font-semibold' : ''}`}
                  onClick={() => {
                    setFilter(opt.value);
                    setShowFilterDropdown(false);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Insert Button */}
        <div className="relative">
          <label className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
            <Paperclip size={16} />
            Insert
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
              accept="image/*,application/pdf,.doc,.docx,.txt"
            />
          </label>
        </div>

        {/* Templates Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            onClick={() => setShowTemplateDropdown((prev) => !prev)}
          >
            Templates
            <ChevronDown size={16} />
          </button>
          {showTemplateDropdown && (
            <div className="absolute left-0 z-10 w-56 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
              {templateOptions.map(opt => (
                <button
                  key={opt.value}
                  className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${selectedTemplate === opt.value ? 'bg-gray-100 font-semibold' : ''}`}
                  onClick={() => handleTemplateSelect(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 px-6 py-2 border-b border-gray-100 bg-gray-50">
          {attachments.map((file, idx) => (
            <div key={idx} className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-200 rounded">
              {file.type.startsWith('image') ? (
                <ImageIcon size={14} className="text-blue-500" />
              ) : (
                <FileText size={14} className="text-gray-500" />
              )}
              <span className="truncate max-w-[100px]">{file.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Message Input Box */}
      <div className="flex flex-col justify-end flex-1 px-6 py-8">
        <div className="w-full max-w-2xl mx-auto">
          <textarea
            className="w-full min-h-[120px] p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-800 text-base bg-white"
            placeholder="Type your message here..."
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <div className="flex justify-end mt-4">
            <button
              className="flex items-center gap-2 px-6 py-2 font-medium text-white transition-all bg-blue-600 rounded-lg shadow hover:bg-blue-700"
              // onClick={handleSend} // Implement send logic as needed
            >
              <Plus size={16} />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailMessaging;