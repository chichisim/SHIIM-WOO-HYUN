
import React, { useState, useEffect } from 'react';
import { FadeIn } from './components/FadeIn';
import { Button } from './components/Button';
import { ReservationModal } from './components/ReservationModal';
import { StatItem, CurriculumItem, SystemItem } from './types';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Brain,
  Clock,
  PenTool,
  Trophy,
  Target,
  ArrowRight
} from 'lucide-react';

const stats: StatItem[] = [
  {
    value: "Standard",
    label: "평가원적 사고",
    description: "주관을 배제하고 출제자의 의도를 꿰뚫는 논리적 표준을 제시합니다."
  },
  {
    value: "Contents",
    label: "압도적 콘텐츠",
    description: "시중 문제집과는 차원이 다른, 대치동 최상위권 전용 자체 제작 문항."
  },
  {
    value: "Control",
    label: "독한 관리",
    description: "타협하지 않는 과제 검사와 성적 관리로 반드시 1등급을 만듭니다."
  }
];

const curriculum: CurriculumItem[] = [
  {
    season: "STEP 01",
    period: "Grade 10",
    title: "예비 고1: 공통국어 완성",
    description: "고등 국어의 토대를 다지는 핵심 과정. 문법, 문학, 독서의 기본 개념을 확실히 잡고, 내신과 모의고사 모두를 대비하는 탄탄한 기초를 완성합니다.",
    details: []
  },
  {
    season: "STEP 02",
    period: "Grade 11",
    title: "예비 고2: 문학·독서 집중",
    description: "수능 국어의 핵심 영역을 깊이 있게 파고드는 단계. 작품 분석 능력과 비문학 독해 스킬을 동시에 끌어올리며, 고난도 문항 대응력을 기릅니다.",
    details: []
  },
  {
    season: "STEP 03",
    period: "Grade 12",
    title: "예비 고3: 실전 파이널",
    description: "수능 직전, 최종 마무리를 위한 고강도 트레이닝. 실전 모의고사와 시간 관리 훈련을 통해 실수 없는 완벽한 시험 감각을 체득합니다.",
    details: []
  }
];

const systems: SystemItem[] = [
  {
    title: "Daily Routine",
    description: "매일 아침 8시, 국어 공부로 하루를 시작합니다. 감을 잃지 않도록 매일 제공되는 미니 과제.",
    icon: <Clock className="w-6 h-6" />
  },
  {
    title: "Weakness Clinic",
    description: " 매주 직접 진행되는 1:1 대면 첨삭. 학생의 사고 과정을 역추적하여 오개념을 뿌리 뽑습니다.",
    icon: <Brain className="w-6 h-6" />
  },
  {
    title: "Survival Test",
    description: "매주 실전과 동일한 환경에서 진행되는 서바이벌 모의고사. 성적 게시 및 누적 데이터를 통한 정밀한 위치 파악.",
    icon: <PenTool className="w-6 h-6" />
  }
];

const gradeCutoffs = [
  {
    subject: "화법과 작문",
    grades: [
      { grade: "1등급", score: "89~91", percent: "4%" },
      { grade: "2등급", score: "81~84", percent: "11%" },
      { grade: "3등급", score: "72~76", percent: "23%" }
    ]
  },
  {
    subject: "언어와 매체",
    grades: [
      { grade: "1등급", score: "85~87", percent: "4%" },
      { grade: "2등급", score: "77~80", percent: "11%" },
      { grade: "3등급", score: "69~72", percent: "23%" }
    ]
  }
];

const differentiators = [
  {
    id: 1,
    title: "양방향 수업",
    description: "일반적인 주입식 강의가 아닙니다. 수업 중간중간 끊임없이 질문을 던지고, 학생이 스스로 설명할 수 있게 만듭니다. 오개념을 그 자리에서 즉시 삭제하고 올바른 독해 습관을 심어주는 '진짜 교정' 수업입니다."
  },
  {
    id: 2,
    title: "24수능 백분위 100의 검증된 노하우",
    description: "이론이 아닌 실전에서 증명된 최상위권 학습법. 상위권만이 알 수 있는 직관적 문제 접근법과 시간 관리 전략을 체계적으로 전수합니다. 고득점의 비밀을 경험으로 체득한 생생한 인사이트를 만나보세요."
  },
  {
    id: 3,
    title: "1:1 초밀착 관리 시스템",
    description: "대형 강의에서는 불가능한, 완벽한 개인 맞춤 솔루션. 학생 개개인의 약점을 정밀 분석하고, 실시간 피드백으로 즉각 보완합니다. 단 한 명의 학생도 놓치지 않는 세심한 케어로 확실한 성적 향상을 목표로 합니다."
  }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      <ReservationModal isOpen={isReservationOpen} onClose={() => setIsReservationOpen(false)} />

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold font-serif">W</div>
            <span className="text-lg font-medium tracking-wider hidden sm:block">국어 연구소</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('philosophy')} className="text-sm font-light text-gray-300 hover:text-white transition-colors tracking-widest">철학</button>
            <button onClick={() => scrollToSection('percentile')} className="text-sm font-light text-gray-300 hover:text-white transition-colors tracking-widest">강사 소개</button>
            <button onClick={() => scrollToSection('curriculum')} className="text-sm font-light text-gray-300 hover:text-white transition-colors tracking-widest">커리큘럼</button>
            <button onClick={() => scrollToSection('cutoff')} className="text-sm font-light text-gray-300 hover:text-white transition-colors tracking-widest">26수능 등급컷</button>
            <button onClick={() => scrollToSection('system')} className="text-sm font-light text-gray-300 hover:text-white transition-colors tracking-widest">관리시스템</button>
            <button 
              onClick={() => setIsReservationOpen(true)} 
              className="px-5 py-2 bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors rounded-sm ml-2"
            >
              학부모 상담 예약
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black border-b border-white/10 p-6 flex flex-col gap-6 md:hidden h-screen z-40">
            <button onClick={() => scrollToSection('philosophy')} className="text-left py-2 text-2xl font-light text-white">철학</button>
            <button onClick={() => scrollToSection('percentile')} className="text-left py-2 text-2xl font-light text-white">강사 소개</button>
            <button onClick={() => scrollToSection('curriculum')} className="text-left py-2 text-2xl font-light text-white">커리큘럼</button>
            <button onClick={() => scrollToSection('cutoff')} className="text-left py-2 text-2xl font-light text-white">26수능 등급컷</button>
            <button onClick={() => scrollToSection('system')} className="text-left py-2 text-2xl font-light text-white">관리시스템</button>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsReservationOpen(true);
              }} 
              className="text-left py-2 text-2xl font-bold text-white border-t border-white/10 mt-4 pt-6 flex items-center justify-between"
            >
              학부모 상담 예약
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-neutral-800/20 via-black to-black pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
          <FadeIn delay={100}>
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="h-[1px] w-8 bg-white/50"></div>
              <span className="text-xs md:text-sm font-light tracking-[0.3em] uppercase text-gray-300">The Standard of Korean SAT</span>
              <div className="h-[1px] w-8 bg-white/50"></div>
            </div>
          </FadeIn>
          
          <FadeIn delay={300}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tighter break-keep">
              결국, 승리하는 국어는<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">따로 있습니다.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={500} className="space-y-8">
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light break-keep pt-4">
              수능 1교시, 그 압도적인 긴장감 속에서도<br className="hidden md:block" />
              흔들리지 않을 실력을 만드는 본질적 학습법.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button onClick={() => scrollToSection('curriculum')} className="min-w-[200px]" icon>
                커리큘럼 확인
              </Button>
              <Button variant="text" onClick={() => scrollToSection('percentile')} className="text-gray-400 hover:text-white">
                백분위 100의 비밀
              </Button>
            </div>
          </FadeIn>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-pulse text-gray-600">
          <ChevronDown size={32} strokeWidth={1} />
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-32 bg-neutral-950 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                수능 국어,<br />
                <span className="text-gray-500">감(感)</span>이 아닌<br />
                <span className="text-white">논리(論理)</span>입니다.
              </h2>
              <div className="mt-8 w-20 h-1 bg-white"></div>
            </FadeIn>

            <div className="space-y-12">
              <FadeIn delay={200}>
                <p className="text-xl text-gray-300 leading-relaxed font-light break-keep">
                  대부분의 학생들은 지문을 '읽는' 것이 아니라 글자를 '보는' 것에 그칩니다.
                  본 수업에서는 평가원이 요구하는 사고의 과정을 정확하게 알고리즘화하여,
                  어떤 난이도의 지문이 나와도 흔들리지 않는 독해력을 완성합니다.
                </p>
              </FadeIn>
              
              <div className="grid gap-8">
                {stats.map((stat, idx) => (
                  <FadeIn key={idx} delay={300 + (idx * 100)}>
                    <div className="group">
                      <div className="text-xs font-serif text-gray-500 mb-2 tracking-wider uppercase">{stat.value}</div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-gray-300 transition-colors">{stat.label}</h3>
                      <p className="text-gray-400 font-light leading-relaxed">{stat.description}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Percentile 100 Section */}
      <section id="percentile" className="py-32 px-6 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-black to-black pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
           <div className="flex flex-col lg:flex-row gap-16 items-center">
             <div className="lg:w-1/2">
               <FadeIn>
                 <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 rounded-full mb-6">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs uppercase tracking-widest text-gray-300">Top 0.1% Class</span>
                 </div>
                 <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                   백분위 <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-600">100</span>의 <br />
                   노하우를 <br />
                   경험하십시오.
                 </h2>
                 <p className="text-xl text-gray-400 leading-relaxed font-light mb-8">
                   대한민국 국어 입시의 정점을 경험한 선배가 만든, 완전히 새로운 학습 시스템. 단순한 주입식 강의가 아닌, 수강생과 강사가 서로 대화하며 국어의 본질을 꿰뚫을 수 있는 직관력을 키우는 특별한 커리큘럼입니다. 성적 향상은 물론, 국어에 대한 근본적인 사고방식을 바꿔드립니다.<br />
                   24 수능 국어 백분위 100 강사의 검증된 노하우<br />
                   
                 </p>
                 <ul className="space-y-4 text-gray-300 font-light">
                   <li className="flex items-center gap-4">
                     <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                     <span>평가원 기출의 모든 선지를 분석하는 치밀함</span>
                   </li>
                   <li className="flex items-center gap-4">
                     <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                     <span>어떤 제재가 나와도 뚫어내는 독해력</span>
                   </li>
                   <li className="flex items-center gap-4">
                     <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                     <span>시간 부족을 원천 차단하는 실전 행동 강령</span>
                   </li>
                 </ul>
               </FadeIn>
             </div>
             <div className="lg:w-1/2 w-full">
                <FadeIn delay={200} direction="left">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-neutral-900/50 p-8 border border-white/10 text-center">
                      <div className="text-4xl font-bold text-white mb-2">100</div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest">Percentile</div>
                    </div>
                    <div className="bg-neutral-900/50 p-8 border border-white/10 text-center">
                      <div className="text-4xl font-bold text-white mb-2">0.1%</div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest">Top Rank</div>
                    </div>
                    <div className="bg-neutral-900/50 p-8 border border-white/10 text-center col-span-2">
                      <div className="text-4xl font-bold text-white mb-2">Perfect</div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest">Score Goal</div>
                    </div>
                  </div>
                </FadeIn>
             </div>
           </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="py-32 px-6 bg-neutral-950 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold">세 가지 결정적 차별점</h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {differentiators.map((item, idx) => (
              <FadeIn key={item.id} delay={idx * 200} className="h-full">
                <div className="relative h-full border border-white p-8 pt-16 rounded-sm hover:bg-white/5 transition-duration-300 group">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] z-10 group-hover:scale-110 transition-transform">
                    {item.id}
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-6">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-center font-light break-keep">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-32 px-6 bg-black relative border-t border-white/5">
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn className="text-center mb-20">
            <span className="text-sm text-gray-500 tracking-[0.5em] uppercase block mb-4">Curriculum</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">체계적인 학년별 커리큘럼</h2>
            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed break-keep">
              예비 고1부터 예비 고3까지, 각 학년의 목표에 최적화된 맞춤형 프로그램.<br className="hidden md:block" /> 
              기초부터 실전까지 단계별로 완성하는 커리큘럼입니다.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {curriculum.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 150} className="h-full">
                <div className="h-full relative bg-neutral-900/30 border border-white/10 hover:border-white/40 p-8 md:p-10 rounded-sm transition-all duration-300 hover:-translate-y-2 group overflow-hidden">
                  {/* Big Number Background */}
                  <div className="absolute -top-4 -right-4 text-[120px] font-black text-white/5 font-serif group-hover:text-white/10 transition-colors select-none pointer-events-none">
                    {idx + 1}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="inline-block px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs font-bold text-white mb-6">
                      {item.season}
                    </div>
                    <h3 className="text-2xl font-bold mb-6 text-white leading-snug min-h-[64px] flex items-center">
                      {item.title.split(':').map((part, i) => (
                        <React.Fragment key={i}>
                          {i === 0 ? <span className="text-blue-400 mr-2">{part}:</span> : part}
                        </React.Fragment>
                      ))}
                    </h3>
                    <p className="text-gray-400 leading-relaxed font-light break-keep">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 2026 CSAT Grade Cutoff Section */}
      <section id="cutoff" className="py-32 px-6 bg-neutral-950 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <span className="text-sm text-red-500 tracking-[0.5em] uppercase block mb-4 font-bold">Target</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">26수능 예측 등급컷</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              갈수록 어려워지는 수능 국어, 1등급의 벽은 높습니다.<br />
              안정적인 1등급을 위해서는 흔들리지 않는 실력이 필요합니다.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {gradeCutoffs.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 200}>
                <div className="bg-neutral-900 border border-white/10 overflow-hidden rounded-lg">
                   <div className="p-6 bg-white/5 border-b border-white/10 flex justify-between items-center">
                     <h3 className="text-xl font-bold text-white">{item.subject}</h3>
                     <Target className="w-5 h-5 text-gray-400" />
                   </div>
                   <div className="p-6">
                     <div className="space-y-4">
                       {item.grades.map((grade, gIdx) => (
                         <div key={gIdx} className="flex justify-between items-center p-4 bg-black border border-white/5 rounded hover:border-white/20 transition-colors">
                            <div className="flex items-center gap-3">
                              <span className={`text-sm font-bold px-2 py-1 rounded ${gIdx === 0 ? 'bg-white text-black' : 'bg-gray-800 text-gray-300'}`}>
                                {grade.grade}
                              </span>
                              <span className="text-gray-400 text-sm">상위 {grade.percent}</span>
                            </div>
                            <div className="text-xl font-bold tabular-nums text-white">
                              {grade.score}<span className="text-xs text-gray-500 ml-1 font-normal">점</span>
                            </div>
                         </div>
                       ))}
                     </div>
                     <p className="text-xs text-gray-500 mt-4 text-right">* 난이도에 따른 예상 원점수입니다.</p>
                   </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Management System Section */}
      <section id="system" className="py-32 px-6 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <FadeIn>
                <span className="text-sm text-blue-400 tracking-[0.3em] uppercase font-semibold">Management</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
                  성적은 <br />
                  <span className="text-gray-500 line-through decoration-gray-500/50 decoration-2">강의만으로</span><br />
                  오르지 않습니다.
                </h2>
              </FadeIn>
              <FadeIn delay={200}>
                <p className="text-lg text-gray-400 font-light leading-relaxed">
                  강의는 기본입니다. 중요한 것은 '자습'의 퀄리티입니다.
                  수업이 끝난 직후부터 다음 수업이 시작될 때까지,
                  수험생의 일주일을 완벽하게 통제하고 관리합니다.
                </p>
              </FadeIn>
              <FadeIn delay={400}>
                 <Button variant="outline" onClick={() => setIsReservationOpen(true)}>
                   상담 예약하기
                 </Button>
              </FadeIn>
            </div>

            <div className="grid gap-6">
              {systems.map((sys, idx) => (
                <FadeIn key={idx} delay={200 + (idx * 150)} direction="left">
                  <div className="bg-neutral-900/50 p-6 md:p-8 border-l-2 border-white/20 hover:border-white transition-colors flex gap-6 items-start">
                    <div className="bg-black p-3 rounded-full text-white border border-white/10">
                      {sys.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{sys.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed break-keep">{sys.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10 bg-neutral-950 text-gray-600 text-xs md:text-sm font-light">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
            <div className="max-w-lg">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-white text-black flex items-center justify-center font-bold font-serif text-xs">W</div>
                <span className="font-medium text-white text-lg tracking-wider">국어 연구소</span>
              </div>
              <p className="leading-relaxed mb-6">
              
                우리는 타협하지 않는 퀄리티로 수능 국어의 새로운 기준을 제시합니다.
              </p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              &copy; {new Date().getFullYear()} W Korean Lab. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
              <a href="#" className="hover:text-white transition-colors">이용약관</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
