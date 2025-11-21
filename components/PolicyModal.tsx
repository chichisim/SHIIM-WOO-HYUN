import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, title, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[110] flex items-center justify-center px-4 sm:px-6 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative bg-[#1c1c1e] w-full max-w-2xl max-h-[80vh] flex flex-col rounded-2xl shadow-2xl border border-white/10 transition-all duration-500 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
        <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 bg-[#2c2c2e] hover:bg-[#3a3a3c] rounded-full text-[#86868b] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto text-[#d1d1d6] text-sm leading-7 whitespace-pre-wrap font-light custom-scrollbar">
            {content}
        </div>
      </div>
    </div>
  );
};