import React, { useState } from 'react';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from './Button';
import emailjs from '@emailjs/browser';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    studentName: '',
    schoolInfo: '',
    concern: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // EmailJS Configuration
    // 무료로 자동 메일 발송 기능을 사용하려면 https://www.emailjs.com/ 에서 계정을 생성하고
    // 아래 키 값들을 교체해주세요.
    const serviceId = 'YOUR_SERVICE_ID';
    const templateId = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';
    
    // 받는 사람 이메일
    const targetEmail = 'chichi0714@naver.com';

    try {
      // 키가 설정되어 있지 않다면 에러를 발생시켜 Fallback(메일 앱 열기)으로 이동합니다.
      if (serviceId === 'YOUR_SERVICE_ID') {
        throw new Error('EmailJS keys are not configured');
      }

      // EmailJS를 통한 이메일 전송 시도
      await emailjs.send(serviceId, templateId, {
        to_email: targetEmail,
        parent_name: formData.parentName,
        phone: formData.phone,
        student_name: formData.studentName,
        school_info: formData.schoolInfo,
        concern: formData.concern,
      }, publicKey);

      // 전송 성공
      setIsSubmitted(true);

    } catch (error) {
      console.log('EmailJS 전송 실패 또는 미설정. 메일 앱을 엽니다.', error);

      // Fallback: 기본 메일 앱 열기 (mailto)
      // 사용자의 메일 클라이언트가 열리며 내용이 채워집니다.
      const subject = encodeURIComponent(`[학부모 상담 신청] ${formData.parentName} 학부모님`);
      const body = encodeURIComponent(
        `[상담 신청 내역]\n\n` +
        `■ 학부모 성함: ${formData.parentName}\n` +
        `■ 연락처: ${formData.phone}\n` +
        `■ 학생 이름: ${formData.studentName}\n` +
        `■ 학교/학년: ${formData.schoolInfo}\n` +
        `■ 상담 희망 내용:\n${formData.concern}\n\n` +
        `위 내용을 바탕으로 상담을 신청합니다.`
      );

      window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
      
      // UI상으로는 완료 처리
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className="relative bg-neutral-950 border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl transition-all duration-300 animate-[fadeIn_0.3s_ease-out]">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10 bg-black/50 rounded-full p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-10">
          {isSubmitted ? (
            <div className="text-center py-20 space-y-6">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">상담 신청이 완료되었습니다.</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                학부모님의 소중한 고민,<br />
                확인 후 <strong>{formData.phone}</strong> 번호로<br /> 
                빠르게 연락드리겠습니다.
              </p>
              <Button onClick={onClose} className="mt-8 min-w-[200px]">
                확인
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-10 text-center md:text-left">
                <span className="text-xs font-bold text-blue-500 tracking-widest uppercase mb-3 block">Parent Consultation</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">학부모 상담 예약</h2>
                <p className="text-gray-400 font-light text-sm md:text-base break-keep leading-relaxed">
                  학생의 성적 향상을 위한 첫걸음입니다.<br className="hidden md:block"/>
                  현재 상황을 남겨주시면 심층 분석을 통해 1:1 맞춤 솔루션을 제공해 드립니다.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 block">학부모님 성함</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-black border border-white/10 rounded-sm p-3.5 text-white focus:border-white/60 focus:ring-1 focus:ring-white/60 transition-all outline-none placeholder:text-gray-800 font-light"
                      placeholder="성함을 입력해 주세요"
                      value={formData.parentName}
                      onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 block">연락처</label>
                    <input 
                      required
                      type="tel" 
                      className="w-full bg-black border border-white/10 rounded-sm p-3.5 text-white focus:border-white/60 focus:ring-1 focus:ring-white/60 transition-all outline-none placeholder:text-gray-800 font-light"
                      placeholder="010-0000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 block">학생 이름</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-black border border-white/10 rounded-sm p-3.5 text-white focus:border-white/60 focus:ring-1 focus:ring-white/60 transition-all outline-none placeholder:text-gray-800 font-light"
                      placeholder="학생 이름을 입력해 주세요"
                      value={formData.studentName}
                      onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 block">학교 / 학년</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-black border border-white/10 rounded-sm p-3.5 text-white focus:border-white/60 focus:ring-1 focus:ring-white/60 transition-all outline-none placeholder:text-gray-800 font-light"
                      placeholder="예) 서울고 3학년"
                      value={formData.schoolInfo}
                      onChange={(e) => setFormData({...formData, schoolInfo: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 block">상담 희망 내용</label>
                  <textarea 
                    className="w-full bg-black border border-white/10 rounded-sm p-3.5 text-white focus:border-white/60 focus:ring-1 focus:ring-white/60 transition-all outline-none min-h-[120px] resize-none placeholder:text-gray-800 font-light"
                    placeholder="현재 등급, 취약한 파트(문학/비문학 등), 목표 대학 등 상담받고 싶은 내용을 자유롭게 적어주세요."
                    value={formData.concern}
                    onChange={(e) => setFormData({...formData, concern: e.target.value})}
                  />
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-white text-black hover:bg-gray-200 border-transparent font-bold py-4 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        전송 중...
                      </span>
                    ) : (
                      "상담 예약 신청하기"
                    )}
                  </Button>
                  <p className="text-center text-[11px] text-gray-600 mt-4 font-light">
                    * 신청해주신 정보는 상담 예약 확인 용도로만 사용되며, 상담 완료 후 안전하게 파기됩니다.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};