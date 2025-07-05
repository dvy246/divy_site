import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Save, X, Loader } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useContent } from '../../hooks/useContent';

interface EditableContentProps {
  name: string;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
  defaultContent?: string;
}

const EditableContent: React.FC<EditableContentProps> = ({
  name,
  multiline = false,
  className = '',
  placeholder = 'Enter content...',
  defaultContent = ''
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const { isAdmin } = useAuth();
  const { content, saveContent, isLoading, error } = useContent(name);

  // Use content from database, fallback to defaultContent, then empty string
  const displayContent = content || defaultContent || '';

  const handleStartEdit = () => {
    setEditValue(displayContent);
    setIsEditing(true);
  };

  const handleSave = async () => {
    await saveContent(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(displayContent);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className={`${className} flex items-center space-x-2`}>
        <Loader className="w-4 h-4 animate-spin text-navy-400" />
        <span className="text-navy-400">Loading...</span>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <span className={className}>
        {displayContent || placeholder}
      </span>
    );
  }

  if (isEditing) {
    return (
      <div className="relative group">
        {multiline ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`${className} border-2 border-gold-300 rounded-lg p-2 bg-white resize-none min-h-[100px]`}
            placeholder={placeholder}
            rows={4}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`${className} border-2 border-gold-300 rounded-lg p-2 bg-white`}
            placeholder={placeholder}
            autoFocus
          />
        )}
        <div className="absolute -top-2 -right-2 flex space-x-1">
          <motion.button
            onClick={handleSave}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600 transition-colors shadow-lg"
            title="Save changes"
          >
            <Save className="w-3 h-3" />
          </motion.button>
          <motion.button
            onClick={handleCancel}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors shadow-lg"
            title="Cancel editing"
          >
            <X className="w-3 h-3" />
          </motion.button>
        </div>
        {error && (
          <div className="absolute top-full left-0 mt-1 text-xs text-red-500 bg-white px-2 py-1 rounded shadow-lg">
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative group">
      <span className={className}>
        {displayContent || placeholder}
      </span>
      <motion.button
        onClick={handleStartEdit}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute -top-2 -right-2 bg-gold-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gold-600 shadow-lg"
        title="Edit content"
      >
        <Edit3 className="w-3 h-3" />
      </motion.button>
    </div>
  );
};

export default EditableContent;