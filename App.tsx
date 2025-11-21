
import React, { useState } from 'react';
import { FadeIn } from './components/FadeIn';
import { ReservationModal } from './components/ReservationModal';
import { CurriculumModal } from './components/CurriculumModal';
import { PolicyModal } from './components/PolicyModal';
import { StatItem, CurriculumItem, SystemItem } from './types';
import { 
  ArrowRight, 
  Terminal, 
  Target, 
  Cpu, 
  Clock, 
  Microscope, 
  Zap,
  BookOpen,
  ChevronRight,
  MessageCircle
} from 'lucide-react';

// --- Data Definitions ---

const stats: StatItem[] = [
  {
    value: "Logic",
    label: "평가원적 코드",
    description: "주관적 감상이 아닌, 출제자가 설계한 논리적 알고리즘을 체화합니다."
  },
  {
    value: "Insight",
    label: "압도적 통찰",
    description: "지문의 구조를 꿰뚫어 보는 시각. 킬러 문항도 패턴으로 보입니다."
  },
  {
    value: "Control",
    label: "독한 관리",
    description: "새벽까지 이어지는 과제 점검. 성적표가 바뀔 때까지 타협하지 않습니다."
  }
];

const curriculum: CurriculumItem[] = [
  {
    season: "STEP 01",
    period: "The Beginning",
    title: "논리의 정립",
    description: "수능 국어의 본질적 문법과 독해 원리를 체화하여 흔들리지 않는 기초를 다집니다.",
    details: [
      "평가원 기출 어휘 및 독해 매커니즘 총정리",
      "문법 전 영역(음운, 단어, 문장) 개념 완벽 체화",
      "비문학 정보 처리 훈련 및 구조 독해",
      "고전 시가 필수 어휘 및 해석법 마스터"
    ]
  },
  {
    season: "STEP 02",
    period: "Deep Dive",
    title: "약점의 극복",
    description: "고난도 제재와 킬러 문항을 집중 공략하여 사고의 확장을 이뤄냅니다.",
    details: [
      "경제, 법, 과학, 기술 등 고난도 독서 제재 집중 훈련",
      "매주 고난도 하프 모의고사 진행 및 1:1 피드백",
      "낯선 문학 작품 스스로 해석하는 '자생력' 배양",
      "개인별 오답 데이터를 기반으로 한 취약점 클리닉"
    ]
  },
  {
    season: "STEP 03",
    period: "Final Touch",
    title: "실전의 완성",
    description: "수능과 가장 유사한 환경에서의 실전 훈련으로 1교시의 압박감을 이겨냅니다.",
    details: [
      "EBS 연계 교재(수특/수완) 핵심 제재 총정리",
      "실전 모의고사(파이널) 주 2회 실시 및 분석",
      "시간 단축을 위한 문제 풀이 루틴 확립",
      "시험장 멘탈 관리 및 행동 강령 최종 점검"
    ]
  }
];

const systems: SystemItem[] = [
  {
    title: "Morning Routine",
    description: "매일 아침 8시, 국어적 뇌를 깨우는 미니 과제로 하루를 시작합니다.",
    icon: <Clock className="w-6 h-6 text-blue-400" />
  },
  {
    title: "1:1 Deep Clinic",
    description: "단순 첨삭이 아닙니다. 학생의 사고 회로를 역추적하여 교정합니다.",
    icon: <Microscope className="w-6 h-6 text-purple-400" />
  },
  {
    title: "24/7 Q&A",
    description: "모르는 것은 알 때까지. 밤 12시에도 이어지는 실시간 질의응답.",
    icon: <MessageCircle className="w-6 h-6 text-emerald-400" />
  }
];

// --- Components ---

const BentoCard: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  delay?: number 
}> = ({ children, className = "", delay = 0 }) => (
  <FadeIn delay={delay} className={`bg-[#111113] border border-white/10 rounded-3xl p-6 md:p-8 hover:border-white/20 transition-colors duration-500 ${className}`}>
    {children}
  </FadeIn>
);

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false);
  const [policyModal, setPolicyModal] = useState<{ isOpen: boolean; title: string; content: string }>({
    isOpen: false,
    title: '',
    content: ''
  });

  const openPolicy = (type: 'privacy' | 'terms') => {
    if (type === 'privacy') {
      setPolicyModal({
        isOpen: true,
        title: '개인정보 처리방침',
        content: 'W 국어 연구소(이하 "연구소")는 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립, 공개합니다.\n\n1. 개인정보의 처리 목적\n연구소는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.\n- 상담 신청 및 관리: 상담 신청 확인, 상담 일정 조율, 상담 결과 안내 등\n\n2. 처리하는 개인정보 항목\n연구소는 상담 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.\n- 수집항목: 이름, 연락처, 학교/학년, 성적 정보, 상담 희망 내용\n- 수집방법: 홈페이지 상담 신청 양식\n\n3. 개인정보의 처리 및 보유 기간\n연구소는 법령에 따른 개인정보 보유, 이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유, 이용 기간 내에서 개인정보를 처리, 보유합니다.\n- 상담 완료 후 1년간 보관 후 파기'
      });
    } else {
      setPolicyModal({
        isOpen: true,
        title: '이용약관',
        content: '제1조 (목적)\n본 약관은 W 국어 연구소(이하 "연구소")가 제공하는 교육 서비스의 이용 조건 및 절차, 연구소와 이용자의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.\n\n제2조 (용어의 정의)\n1. "이용자"란 본 약관에 따라 연구소가 제공하는 서비스를 이용하는 회원을 말합니다.\n2. "서비스"란 연구소가 제공하는 온/오프라인 교육 및 관련 제반 서비스를 의미합니다.\n\n제3조 (약관의 효력 및 변경)\n1. 본 약관은 서비스를 이용하고자 하는 모든 이용자에게 그 효력이 발생합니다.\n2. 연구소는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있습니다.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px] opacity-50 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px] opacity-50 animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-10 md:py-20">
        
        {/* Header */}
        <FadeIn direction="down" className="flex justify-between items-center mb-24 md:mb-32">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="font-serif text-lg font-bold italic">W</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-200">0.1% KOREAN</span>
          </div>
          <button 
            onClick={() => setIsReservationOpen(true)}
            className="bg-[#1c1c1e] hover:bg-[#2c2c2e] text-white px-5 py-2 rounded-full text-sm font-medium transition-all border border-white/10 hover:border-white/30 flex items-center gap-2 group"
          >
            상담 예약
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-gray-400 group-hover:text-white" />
          </button>
        </FadeIn>

        {/* Hero Section */}
        <section className="mb-32">
          <FadeIn delay={100} className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              PREMIUM KOREAN SOLUTION
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-8">
              감각이 아닌,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                통제된 논리.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
              대치동 상위 0.1%를 위한 시크릿 솔루션.<br />
              출제자의 알고리즘을 역추적하여 수능 국어를 정복합니다.
            </p>
          </FadeIn>
          
          <FadeIn delay={300} className="flex flex-wrap gap-4">
            <button 
              onClick={() => setIsCurriculumOpen(true)}
              className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              커리큘럼 확인하기
            </button>
            <button 
              onClick={() => setIsReservationOpen(true)}
              className="bg-[#1c1c1e] text-white hover:bg-[#2c2c2e] border border-white/10 px-8 py-4 rounded-full font-medium text-lg transition-all"
            >
              무료 상담 신청
            </button>
          </FadeIn>
        </section>

        {/* Bento Grid - Philosophy & Stats */}
        <section className="mb-32">
          <FadeIn delay={400} className="mb-8 flex items-center gap-3">
            <Terminal className="w-5 h-5 text-gray-500" />
            <h2 className="text-sm font-bold text-gray-500 tracking-widest uppercase">Our Philosophy</h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Card */}
            <BentoCard className="md:col-span-2 bg-gradient-to-br from-[#1a1a1c] to-[#0a0a0a]" delay={500}>
              <div className="h-full flex flex-col justify-between min-h-[240px]">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Cpu className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">알고리즘적 사고</h3>
                  <p className="text-gray-400 leading-relaxed max-w-lg">
                    국어는 느낌으로 푸는 것이 아닙니다. <br/>
                    지문에 숨겨진 논리적 장치를 발견하고, <br/>
                    출제자가 설계한 정답의 경로를 따라가는 훈련입니다.
                  </p>
                </div>
              </div>
            </BentoCard>

            {/* Secondary Card */}
            <BentoCard className="bg-[#151517]" delay={600}>
              <div className="h-full flex flex-col justify-between">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">초개인화</h3>
                  <p className="text-gray-400 leading-relaxed">
                    획일화된 강의가 아닌,<br/>
                    오직 당신만의 약점을<br/>
                    집요하게 파고듭니다.
                  </p>
                </div>
              </div>
            </BentoCard>

            {/* Stats Cards Row */}
            {stats.map((stat, idx) => (
              <BentoCard key={idx} delay={700 + (idx * 100)}>
                <div className="flex flex-col h-full">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-auto">
                    {stat.value}
                  </span>
                  <div className="mt-8">
                    <h4 className="text-xl font-bold text-white mb-2">{stat.label}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </BentoCard>
            ))}
          </div>
        </section>

        {/* Systems Grid */}
        <section className="mb-32">
          <FadeIn className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">System</h2>
              <p className="text-gray-400">0.1%를 만드는 디테일의 차이</p>
            </div>
            <button 
              onClick={() => setIsReservationOpen(true)}
              className="hidden md:flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              시스템 체험하기 <ChevronRight className="w-4 h-4" />
            </button>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {systems.map((sys, idx) => (
              <FadeIn key={idx} delay={200 * idx} className="group">
                <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 hover:bg-[#111] transition-all duration-500 h-full flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors duration-500"></div>
                  
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                    {sys.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{sys.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {sys.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative rounded-[2.5rem] overflow-hidden bg-[#111] border border-white/10 text-center py-24 px-6 mb-20">
           <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
           
           <div className="relative z-10 max-w-2xl mx-auto">
             <div className="w-16 h-16 mx-auto bg-white text-black rounded-full flex items-center justify-center mb-8 shadow