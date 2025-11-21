
import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Loader2, ChevronRight } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    studentName: '',
    schoolInfo: '',
    concern: ''
  });

  // Handle animation states
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a brief processing delay for better UX, then open mail client
    setTimeout(() => {
      const targetEmail = 'chichi0714@naver.com';
      const subject = `[학부모 상담 신청] ${formData.parentName} 학부모님`;
      const body = 
        `[상담 신청 내역]\n\n` +
        `■ 학부모 성함: ${formData.parentName}\n` +
        `■ 연락처: ${formData.phone}\n` +
        `■ 학생 이름: ${formData.studentName}\n` +
        `■ 학교/학년: ${formData.schoolInfo}\n` +
        `■ 상담 희망 내용:\n${formData.concern}\n\n` +
        `위 내용을 바탕으로 상담을 신청합니다.`;

      // Encode URI components to ensure special characters are handled correctly
      window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      setIsLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Card - Apple Style: Dark Gray, Rounded Corners, Subtle Border */}
      <div className={`relative bg-[#1c1c1e] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl border border-white/10 transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 bg-[#2c2c2e] hover:bg-[#3a3a3c] text-[#86868b] hover:text-white transition-colors rounded-full p-2 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-12">
          {isSubmitted ? (
            <div className="text-center py-12 flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full flex items-center justify-center mb-8 border border-green-500/30 shadow-[0_0_30px_rgba(74,222,128,0.15)]">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">메일 앱이 실행되었습니다.</h3>
              <p className="text-[#86868b] text-lg leading-relaxed mb-10">
                작성된 내용을 확인 후<br />
                <span className="text-white font-semibold">전송 버튼</span>을 눌러주세요.<br />
                <span className="text-sm mt-2 block text-[#666]">(메일이 발송되어야 예약이 확정됩니다)</span>
              </p>
              <button 
                onClick={onClose} 
                className="bg-white text-black hover:bg-gray-100 px-10 py-4 rounded-full font-semibold text-lg transition-all hover:scale-[1.02] active:scale-95"
              >
                확인
              </button>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#0071e3]"></span>
                  <span className="text-xs font-bold text-[#0071e3] tracking-widest uppercase">Reservation</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">학부모 상담 예약</h2>
                <p className="text-[#86868b] text-base md:text-lg font-normal leading-relaxed">
                  학생의 현재 상황을 남겨주시면, <br className="hidden md:block" />
                  맞춤 클리닉을 제안해 드립니다.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <InputGroup label="학부모님 성함" placeholder="성함을 입력해 주세요">
                    <input 
                      required
                      type="text" 
                      className="w-full bg-transparent outline-none text-white placeholder-[#555] font-normal"
                      placeholder="성함을 입력해 주세요"
                      value={formData.parentName}
                      onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                    />
                  </InputGroup>
                  
                  <InputGroup label="연락처" placeholder="010-0000-0000">
                    <input 
                      required
                      type="tel" 
                      className="w-full bg-transparent outline-none text-white placeholder-[#555] font-normal"
                      placeholder="010-0000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </InputGroup>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <InputGroup label="학생 이름" placeholder="이름 입력">
                    <input 
                      required
                      type="text" 
                      className="w-full bg-transparent outline-none text-white placeholder-[#555] font-normal"
                      placeholder="이름 입력"
                      value={formData.studentName}
                      onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                    />
                  </InputGroup>
                  
                  <InputGroup label="학교 / 학년" placeholder="예) 서울고 3학년">
                    <input 
                      required
                      type="text" 
                      className="w-full bg-transparent outline-none text-white placeholder-[#555] font-normal"
                      placeholder="예) 홍천여고 3학년"
                      value={formData.schoolInfo}
                      onChange={(e) => setFormData({...formData, schoolInfo: e.target.value})}
                    />
                  </InputGroup>
                </div>

                <div className="bg-[#2c2c2e] rounded-2xl p-4 focus-within:ring-2 focus-within:ring-[#0071e3] transition-all duration-300">
                  <label className="text-xs font-medium text-[#86868b] block mb-2 ml-1">상담 희망 내용</label>
                  <textarea 
                    className="w-full bg-transparent outline-none text-white placeholder-[#555] min-h-[120px] resize-none font-normal leading-relaxed"
                    placeholder="현재 등급, 취약한 파트(문학/비문학 등), 목표 대학 등 상담받고 싶은 내용을 자유롭게 적어주세요."
                    value={formData.concern}
                    onChange={(e) => setFormData({...formData, concern: e.target.value})}
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="w-full bg-white text-black hover:bg-[#f5f5f7] rounded-full py-4 font-bold text-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>연동 중...</span>
                      </>
                    ) : (
                      <>
                        <span>예약 메일 보내기</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <div className="text-center mt-4 flex flex-col gap-1">
                    <p className="text-[11px] text-[#6e6e73] font-normal">
                      버튼을 누르면 메일 앱이 실행됩니다.
                    </p>
                    <p className="text-xs text-[#86868b]">
                      혹은 <a href="sms:01041776925" className="text-[#f5f5f7] hover:underline decoration-1 underline-offset-2">010-4177-6925</a>로 문자 주세요.
                    </p>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper Component for consistent input styling
const InputGroup: React.FC<{ label: string; placeholder: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="bg-[#2c2c2e] rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#0071e3] transition-all duration-300 group">
    <label className="text-xs font-medium text-[#86868b] block mb-1 ml-1 group-focus-within:text-[#0071e3] transition-colors">{label}</label>
    {children}
  </div>
);
