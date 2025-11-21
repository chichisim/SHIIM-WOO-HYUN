
import React, { useState, useEffect } from 'react';
import { FadeIn } from './components/FadeIn';
import { Button } from './components/Button';
import { ReservationModal } from './components/ReservationModal';
import { StatItem, CurriculumItem, SystemItem } from './types';
import { 
  Menu, 
  X, 
  Brain,
  Clock,
  PenTool,
  Trophy,
  Target,
  ArrowRight,
  ChevronRight,
  Zap,
  ShieldCheck,
  Users
} from 'lucide-react';

const stats: StatItem[] = [
  {
    value: "Standard",
    label: "평가원적 사고",
    description: "주관을 배제하고 출제자의 의도를 꿰뚫는 논리적 표준."
  },
  {
    value: "Contents",
    label: "압도적 콘텐츠",
    description: "시중 문제집과는 차원이 다른, 최상위권 전용 자체 제작 문항."
  },
  {
    value: "Control",
    label: "독한 관리",
    description: "타협하지 않는 과제 검사와 성적 관리로 1등급을 만듭니다."
  }
];

const curriculum: CurriculumItem[] = [
  {
    season: "STEP 01",
    period: "Grade 10",
    title: "공통국어 완성",
    description: "고등 국어의 토대를 다지는 핵심 과정. 문법, 문학, 독서의 기본 개념을 확실히 잡고 탄탄한 기초를 완성합니다.",
    details: []
  },
  {
    season: "STEP 02",
    period: "Grade 11",
    title: "문학·독서 집중",
    description: "수능 국어의 핵심 영역을 깊이 있게 파고드는 단계. 작품 분석 능력과 비문학 독해 스킬을 동시에 끌어올립니다.",
    details: []
  },
  {
    season: "STEP 03",
    period: "Grade 12",
    title: "실전 파이널",
    description: "수능 직전, 최종 마무리를 위한 고강도 트레이닝. 실전 모의고사와 시간 관리 훈련을 통해 시험 감각을 체득합니다.",
    details: []
  }
];

const systems: SystemItem[] = [
  {
    title: "Daily Routine",
    description: "매일 아침 8시, 국어 공부로 하루를 시작합니다. 감을 잃지 않도록 매일 제공되는 미니 과제.",
    icon: <Clock className="w-5 h-5" />
  },
  {
    title: "Weakness Clinic",
    description: "매주 진행되는 1:1 대면 첨삭. 학생의 사고 과정을 역추적하여 오개념을 뿌리 뽑습니다.",
    icon: <Brain className="w-5 h-5" />
  },
  {
    title: "Survival Test",
    description: "매달 실전 환경에서 진행되는 모의고사. 누적 데이터를 통한 정밀한 위치 파악.",
    icon: <PenTool className="w-5 h-5" />
  }
];

const differentiators = [
  {
    id: "01",
    title: "양방향 호흡",
    sub: "Interactive Learning",
    desc: "강의는 듣는 것이 아니라, 하는 것입니다. 끊임없는 문답으로 사고력을 깨웁니다.",
    icon: <Users className="w-6 h-6 text-blue-400" />
  },
  {
    id: "02",
    title: "증명된 감각",
    sub: "Proven Expertise",
    desc: "백분위 100. 이론가는 알 수 없는 실전의 호흡과 전략을 그대로 전수합니다.",
    icon: <Trophy className="w-6 h-6 text-blue-400" />
  },
  {
    id: "03",
    title: "집요한 관리",
    sub: "Hyper-Personalized Care",
    desc: "단 한 명도 놓치지 않습니다. 개인의 약점이 강점이 될 때까지 파고듭니다.",
    icon: <ShieldCheck className="w-6 h-6 text-blue-400" />
  }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] font-sans selection:bg-[#0071e3] selection:text-white">
      <ReservationModal isOpen={isReservationOpen} onClose={() => setIsReservationOpen(false)} />

      {/* Apple Style Global Nav */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#1d1d1f]/70 backdrop-blur-xl border-b border-white/10' : 'bg-transparent pt-4'}`}>
        <div className="max-w-[980px] mx-auto px-6 h-12 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer opacity-90 hover:opacity-100 transition-opacity" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-xl font-bold tracking-tight">W Lab.</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-xs font-light text-[#e8e8ed] tracking-wide">
            <button onClick={() => scrollToSection('philosophy')} className="hover:text-white transition-colors">철학</button>
            <button onClick={() => scrollToSection('difference')} className="hover:text-white transition-colors">차별점</button>
            <button onClick={() => scrollToSection('percentile')} className="hover:text-white transition-colors">강사 소개</button>
            <button onClick={() => scrollToSection('curriculum')} className="hover:text-white transition-colors">커리큘럼</button>
            <button onClick={() => scrollToSection('system')} className="hover:text-white transition-colors">관리시스템</button>
            <button 
              onClick={() => setIsReservationOpen(true)} 
              className="bg-white text-black px-3 py-1 rounded-full text-xs font-medium hover:bg-[#e8e8ed] transition-colors"
            >
              상담 예약
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-[#f5f5f7]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#1d1d1f] border-b border-white/10 p-6 flex flex-col gap-4 md:hidden min-h-screen z-40">
            <button onClick={() => scrollToSection('philosophy')} className="text-left py-3 text-xl font-semibold text-[#f5f5f7] border-b border-white/10">철학</button>
            <button onClick={() => scrollToSection('difference')} className="text-left py-3 text-xl font-semibold text-[#f5f5f7] border-b border-white/10">차별점</button>
            <button onClick={() => scrollToSection('percentile')} className="text-left py-3 text-xl font-semibold text-[#f5f5f7] border-b border-white/10">강사 소개</button>
            <button onClick={() => scrollToSection('curriculum')} className="text-left py-3 text-xl font-semibold text-[#f5f5f7] border-b border-white/10">커리큘럼</button>
            <button onClick={() => scrollToSection('system')} className="text-left py-3 text-xl font-semibold text-[#f5f5f7] border-b border-white/10">관리시스템</button>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsReservationOpen(true);
              }} 
              className="text-left py-3 text-xl font-semibold text-[#2997ff] mt-2"
            >
              상담 예약하기 >
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section - Apple Pro Style */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center z-10">
          <FadeIn delay={100}>
            <h2 className="text-[#f5f5f7] text-lg md:text-xl font-semibold mb-6 tracking-wide">
              Korean 0.1%
            </h2>
          </FadeIn>
          
          <FadeIn delay={300}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tighter mb-8">
              승리하는 국어.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#a1c4fd] via-white to-[#c2e9fb]">
                그 격차의 시작.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={500}>
            <p className="text-xl md:text-2xl text-[#86868b] font-normal max-w-2xl mx-auto leading-relaxed mb-10">
              수능 1교시의 압도적인 긴장감 속에서도<br className="hidden md:block"/>
              흔들리지 않는 견고한 실력을 완성합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button onClick={() => scrollToSection('curriculum')}>
                커리큘럼 확인
              </Button>
              <Button variant="link" onClick={() => scrollToSection('percentile')} className="text-lg">
                더 알아보기 <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </FadeIn>
        </div>
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* Philosophy Section - Bento Grid */}
      <section id="philosophy" className="py-32 px-6 bg-[#000000]">
        <div className="max-w-[980px] mx-auto">
          <FadeIn className="mb-16 text-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              감(感)이 아닌,<br />
              <span className="text-[#86868b]">논리(論理)의 영역.</span>
            </h2>
            <p className="text-xl text-[#86868b] max-w-2xl mx-auto">
              평가원이 요구하는 사고의 과정을 알고리즘화하여, <br />
              어떤 난이도에도 흔들리지 않는 독해력을 완성합니다.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <FadeIn key={idx} delay={idx * 150} className="h-full">
                <div className="bg-[#1d1d1f] p-8 rounded-3xl h-full flex flex-col justify-between hover:scale-[1.02] transition-transform duration-500">
                  <div>
                    <div className="text-xs font-bold text-[#86868b] uppercase tracking-wider mb-3">{stat.value}</div>
                    <h3 className="text-2xl font-bold text-white mb-3">{stat.label}</h3>
                  </div>
                  <p className="text-[#86868b] text-sm leading-relaxed">{stat.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: Three Decisive Differentiators */}
      <section id="difference" className="py-32 px-6 bg-[#101010]">
        <div className="max-w-[980px] mx-auto">
          <FadeIn className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              세 가지 결정적 차이.
            </h2>
            <p className="text-xl text-[#86868b]">
              평범함과 탁월함을 가르는 기준.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {differentiators.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 150} className="h-full">
                <div className="bg-[#000000] border border-[#333] p-8 rounded-3xl h-full relative overflow-hidden group hover:border-[#555] transition-colors duration-300">
                  {/* Large Number Background */}
                  <div className="absolute -top-6 -right-6 text-[120px] font-bold text-white opacity-[0.03] select-none leading-none group-hover:opacity-[0.05] transition-opacity">
                    {item.id}
                  </div>
                  
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="mb-6 p-3 bg-[#1d1d1f] rounded-full w-fit">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                    <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-4 block">{item.sub}</span>
                    <p className="text-[#86868b] text-base leading-relaxed mt-auto">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Percentile Section - Large Feature */}
      <section id="percentile" className="py-32 px-6 bg-[#000000]">
        <div className="max-w-[980px] mx-auto">
          <div className="bg-[#1d1d1f] rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
            
            <div className="p-10 md:p-20 text-center">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#000000] rounded-full mb-8 border border-white/10">
                  <Trophy className="w-3 h-3 text-[#ffd60a]" />
                  <span className="text-xs font-semibold text-white">Top 0.1% Class</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                  백분위 100.<br />
                  <span className="text-[#86868b]">그 정점의 노하우.</span>
                </h2>
                
                <p className="text-lg text-[#86868b] max-w-2xl mx-auto mb-12 leading-relaxed">
                  대한민국 국어 입시의 정점을 경험한 선배가 만든 새로운 학습 시스템.<br />
                  단순한 강의가 아닌, 수강생과 강사가 호흡하며<br />
                  국어의 본질을 꿰뚫는 직관력을 키웁니다.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                  <div className="bg-[#000000] p-6 rounded-2xl border border-[#333]">
                    <h4 className="text-white font-bold mb-1">치밀한 분석</h4>
                    <p className="text-sm text-[#86868b]">평가원 기출의 모든 선지를 해부합니다.</p>
                  </div>
                  <div className="bg-[#000000] p-6 rounded-2xl border border-[#333]">
                    <h4 className="text-white font-bold mb-1">강력한 독해</h4>
                    <p className="text-sm text-[#86868b]">어떤 제재가 나와도 뚫어내는 힘.</p>
                  </div>
                  <div className="bg-[#000000] p-6 rounded-2xl border border-[#333]">
                    <h4 className="text-white font-bold mb-1">실전 전략</h4>
                    <p className="text-sm text-[#86868b]">시간 부족을 해결하는 행동 강령.</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum - Horizontal Scroll / Grid */}
      <section id="curriculum" className="py-32 px-6 bg-[#000000]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Curriculum</h2>
              <p className="text-[#86868b] text-lg">기초부터 실전까지, 완벽한 로드맵.</p>
            </div>
            <Button variant="secondary" size="sm" icon>전체 강의 계획서 보기</Button>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {curriculum.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 150}>
                <div className="group relative bg-[#1d1d1f] rounded-3xl p-8 h-[400px] flex flex-col justify-between overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="relative z-10">
                    <span className="text-xs font-bold text-blue-400 mb-2 block">{item.season}</span>
                    <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-[#86868b] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="absolute -bottom-4 -right-4 text-[140px] font-bold text-[#000] opacity-30 select-none group-hover:scale-110 transition-transform duration-700">
                    {idx + 1}
                  </div>
                  <div className="mt-8 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-[#2c2c2e] flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* System & Grades - New Simplified Design */}
      <section id="system" className="py-32 px-6 bg-[#101010]">
        <div className="max-w-[980px] mx-auto space-y-32">
          
          {/* New Grade Cutoff Section - Simplified Text */}
          <FadeIn>
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
                26수능의 충격.<br className="hidden md:block" />
                27수능의 예고편.
              </h2>
              <p className="text-[#86868b] mb-12 max-w-2xl mx-auto text-base leading-relaxed font-medium">
                2022 개정 교육과정의 마지막 해.<br />
                가장 어려울 수도 있는 수능이 당신을 기다리고 있습니다.
              </p>

              <div className="grid grid-cols-3 gap-4 md:gap-8 py-10 border-y border-white/10 mb-12">
                <div>
                  <span className="text-6xl md:text-8xl font-bold text-white block mb-2 tracking-tighter">85</span>
                  <span className="text-white font-bold text-sm md:text-base block mb-1">국어 1등급 컷</span>
                  <span className="text-[#86868b] text-xs">언어와 매체 기준</span>
                </div>
                <div>
                  <span className="text-6xl md:text-8xl font-bold text-white block mb-2 tracking-tighter">77</span>
                  <span className="text-white font-bold text-sm md:text-base block mb-1">국어 2등급 컷</span>
                  <span className="text-[#86868b] text-xs">언어와 매체 기준</span>
                </div>
                <div>
                  <span className="text-6xl md:text-8xl font-bold text-white block mb-2 tracking-tighter">69</span>
                  <span className="text-white font-bold text-sm md:text-base block mb-1">국어 3등급 컷</span>
                  <span className="text-[#86868b] text-xs">언어와 매체 기준</span>
                </div>
              </div>

              <p className="text-[#86868b] max-w-3xl mx-auto leading-relaxed text-base font-medium">
                교육과정 마지막 해의 수능은 역사적으로 늘 '불수능'이었습니다.<br className="hidden md:block" />
                난이도에 흔들리지 않는 압도적인 실력,<br className="hidden md:block" />
                위기를 기회로 만드는 전략이 필요합니다.
              </p>
            </div>
          </FadeIn>

          {/* Management System */}
          <div className="grid lg:grid-cols-2 gap-16 items-center pt-16">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                성적은 강의실 밖에서<br />
                완성됩니다.
              </h2>
              <p className="text-lg text-[#86868b] mb-8 leading-relaxed">
                강의는 기본입니다. 중요한 것은 '자습'의 퀄리티입니다.
                수업이 끝난 직후부터 다음 수업이 시작될 때까지,
                수험생의 일주일을 완벽하게 관리합니다.
              </p>
              <Button onClick={() => setIsReservationOpen(true)}>상담 예약하기</Button>
            </FadeIn>
            
            <div className="space-y-4">
              {systems.map((sys, idx) => (
                <FadeIn key={idx} delay={idx * 150}>
                  <div className="bg-[#1d1d1f] p-6 rounded-2xl flex items-start gap-5 hover:bg-[#2c2c2e] transition-colors cursor-default">
                    <div className="p-3 bg-black rounded-full text-blue-400">
                      {sys.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{sys.title}</h4>
                      <p className="text-sm text-[#86868b] leading-relaxed">{sys.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Epilogue - Apple "One More Thing" Style */}
      <section className="py-40 px-6 bg-[#000000] flex items-center justify-center text-center">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tighter mb-8">
              국어를 대하는<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#86868b] to-[#333]">
                젊은 감각.
              </span>
            </h2>
            <p className="text-2xl md:text-3xl text-[#f5f5f7] font-medium tracking-tight">
              안녕하세요, 심우현입니다.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#1d1d1f] text-[#86868b] text-xs">
        <div className="max-w-[980px] mx-auto border-t border-[#424245] pt-8">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <p className="mb-2 font-semibold text-white">W Korean Lab.</p>
              <p>우리는 타협하지 않는 퀄리티로 수능 국어의 새로운 기준을 제시합니다.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white hover:underline">개인정보처리방침</a>
              <a href="#" className="hover:text-white hover:underline">이용약관</a>
              <a href="#" className="hover:text-white hover:underline">오시는 길</a>
            </div>
          </div>
          <div className="mt-8 text-[#6e6e73]">
            Copyright © {new Date().getFullYear()} W Korean Lab. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
