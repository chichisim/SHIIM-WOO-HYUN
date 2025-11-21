
import React, { useState, useEffect } from 'react';
import { X, Check, BookOpen } from 'lucide-react';
import { CurriculumItem } from '../types';

interface CurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CurriculumItem[];
}

export const CurriculumModal: React.FC<CurriculumModalProps> = ({ isOpen, onClose, items }) => {
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
    <div className={`fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative bg-[#1c1c1e] w-full max-w-4xl max-h-[85vh] rounded-[2rem] shadow-2xl border border-white/10 flex flex-col transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
        
        {/* Header (Fixed) */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/10 bg-[#1c1c1e]/80 backdrop-blur-xl sticky top-0 z-20 rounded-t-[2rem]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-[#0a84ff]" />
              <span className="text-xs font-bold text-[#0a84ff] uppercase tracking-widest">Full Curriculum</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">전체 강의 계획서</h2>
          </div>
          <button 
            onClick={onClose}
            className="bg-[#2c2c2e] hover:bg-[#3a3a3c] text-[#86868b] hover:text-white transition-colors rounded-full p-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body (Scrollable) */}
        <div className="overflow-y-auto p-6 md:p-10 no-scrollbar">
          <div className="space-y-12">
            {items.map((item, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12 border-l border-[#333]">
                {/* Timeline Dot */}
                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-[#0a84ff] shadow-[0_0_10px_#0a84ff]" />
                
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#2c2c2e] text-[#0a84ff] text-xs font-bold mb-2 border border-[#0a84ff]/20">
                    {item.season}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {item.title} {item.period && <span className="text-[#86868b] text-lg font-medium ml-2">({item.period})</span>}
                  </h3>
                  <p className="text-[#86868b] leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>

                {/* Detail Grid */}
                <div className="grid md:grid-cols-2 gap-3">
                  {item.details.map((detail, detailIdx) => (
                    <div key={detailIdx} className="flex items-start gap-3 bg-[#252527] p-4 rounded-xl border border-white/5 hover:bg-[#2c2c2e] transition-colors">
                      <div className="mt-1 min-w-[16px]">
                        <Check className="w-4 h-4 text-[#0a84ff]" />
                      </div>
                      <span className="text-sm md:text-base text-[#e8e8ed] leading-snug">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Message */}
          <div className="mt-16 text-center p-8 bg-[#252527] rounded-2xl border border-white/5">
            <p className="text-[#86868b] mb-4">개인의 성취도에 따라 세부 일정은 조정될 수 있습니다.</p>
            <button 
              onClick={() => {
                onClose();
                // Slight delay to allow modal to close before scrolling or opening the next modal
                setTimeout(() => {
                   // Trigger parent logic if needed, for now just close
                }, 300);
              }}
              className="text-[#0a84ff] font-semibold hover:underline"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
