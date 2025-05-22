import React, { useEffect, useRef, useState } from 'react';

// --- Icon Components (Inline SVGs for self-containment) ---
const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-sky-600 group-hover:text-sky-500 transition-colors duration-300">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
    <line x1="12" y1="4" x2="12" y2="20"></line>
  </svg>
);

const SportsIcon = ({ sport }) => {
  if (sport === 'volleyball') return <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 group-hover:text-emerald-500 transition-colors duration-300"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a10 10 0 0 0-10 10c0 4.48 2.94 8.28 7 9.5A10 10 0 0 1 12 22a10 10 0 0 1 3-19.5c4.06 1.22 7 5.02 7 9.5a10 10 0 0 0-10-10Z"></path></svg>;
  if (sport === 'football') return <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 group-hover:text-blue-500 transition-colors duration-300"><circle cx="12" cy="12" r="10"></circle><path d="m15.64 16.14-1.29-1.29a2.5 2.5 0 0 0-3.54 0l-1.29 1.29a2.5 2.5 0 0 0 0 3.54l1.29 1.29a2.5 2.5 0 0 0 3.54 0l1.29-1.29a2.5 2.5 0 0 0 0-3.54Z"></path><path d="m8.36 7.86 1.29 1.29a2.5 2.5 0 0 0 3.54 0l1.29-1.29a2.5 2.5 0 0 0 0-3.54l-1.29-1.29a2.5 2.5 0 0 0-3.54 0L8.36 4.32a2.5 2.5 0 0 0 0 3.54Z"></path></svg>;
  if (sport === 'badminton') return <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 group-hover:text-purple-500 transition-colors duration-300"><path d="M11.5 10c-2.33.78-4.93 3.28-5.5 6.08.23.9.5 1.58.9 2.12.5.65 1.2 1.13 2.1 1.3.3-.4.5-.8.8-1.1.5-.8 1.4-1.1 2.2-1.1.8 0 1.7.3 2.2 1.1.3.3.5.7.8 1.1.9-.17 1.6-.65 2.1-1.3.4-.54.67-1.22.9-2.12-.57-2.8-3.17-5.3-5.5-6.08Z"></path><path d="M17.5 4c-2.33.78-4.93 3.28-5.5 6.08"></path><path d="m12 10 3.5-2.5"></path><path d="m12 10-3.5-2.5"></path><path d="M12 10v0"></path><path d="M5 22v-2"></path><path d="M7 20v-2"></path><path d="M9 22v-2"></path><path d="M11 20v-2"></path><path d="M13 22v-2"></path><path d="M15 20v-2"></path><path d="M17 22v-2"></path><path d="M19 20v-2"></path></svg>;
  return null;
};

const MusicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600 group-hover:text-pink-500 transition-colors duration-300">
    <path d="M9 18V5l12-2v13"></path>
    <circle cx="6" cy="18" r="3"></circle>
    <circle cx="18" cy="16" r="3"></circle>
  </svg>
);

const PlayIcon = ({size = 24}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>;
const PauseIcon = ({size = 24}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

// --- Generic Modal Component ---
const DetailModal = ({ isOpen, onClose, title, children, titleFont = 'Playfair Display, serif', bgColor = 'bg-white', contentPadding = "p-6 md:p-8" }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-slate-800/70 backdrop-blur-md flex items-center justify-center z-[200] p-4 transition-opacity duration-300 ease-out"
    >
      <div 
        className={`relative ${bgColor} text-slate-700 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden`}
      >
        <header className={`flex items-center justify-between p-5 border-b border-slate-200 sticky top-0 ${bgColor} z-10`}>
          <h3 
            className="text-2xl md:text-3xl font-semibold text-sky-700" 
            style={{ fontFamily: titleFont }}
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-sky-600 transition-colors"
            aria-label="Đóng modal"
          >
            <CloseIcon />
          </button>
        </header>
        <div className={`overflow-y-auto ${contentPadding}`}>
          {children}
        </div>
      </div>
    </div>
  );
};


const AboutSection = ({ gsapReady }) => {
  const sectionRef = useRef(null);
  const animatedElementsRef = useRef([]);
  const parallaxGridImageRefs = useRef([]); 
  
  const [modalState, setModalState] = useState({ isOpen: false, type: null, data: null });
  const [activeAudio, setActiveAudio] = useState({ src: null, isPlaying: false, id: null });
  const audioRefs = useRef({}); 
  const [lightbox, setLightbox] = useState({ open: false, active: null });

  // --- Creative Gallery Data ---
  const creativeSnaps = [
    { id: 1, image: 'https://placehold.co/800x600/F9D5E5/3A0CA3?text=Sáng+tạo+1', caption: 'Khám phá màu sắc.' },
    { id: 2, image: 'https://placehold.co/800x600/FFD6A5/FF5714?text=Sáng+tạo+2', caption: 'Thoải mái bay bổng.' },
    { id: 3, image: 'https://placehold.co/800x600/9FA8DA/3F37C9?text=Sáng+tạo+3', caption: 'Hòa quyện ánh sáng.' },
    { id: 4, image: 'https://placehold.co/800x600/B2F2BB/40916C?text=Sáng+tạo+4', caption: 'Tĩnh lặng tinh tế.' }
  ];

  // GSAP Animations
  useEffect(() => {
    if (!gsapReady || !window.gsap || !window.ScrollTrigger) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    let allTriggers = [];

    // Header Animation
    const headerTitle = sectionRef.current.querySelector('.about-header-title');
    const headerLine = sectionRef.current.querySelector('.about-header-line');
    if (headerTitle && headerLine) {
      const tlHeader = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tlHeader
        .from(headerTitle, { opacity: 0, y: 50, duration: 1 })
        .from(headerLine, { scaleX: 0, duration: 0.8, ease: 'power2.out' }, "-=0.5");
      allTriggers.push(tlHeader);
    }

    // General Scroll-Triggered Animations
    animatedElementsRef.current.forEach((el) => {
      if (el) {
        const anim = gsap.from(el, {
          opacity: 0, y: 70, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        });
        if (anim.scrollTrigger) allTriggers.push(anim.scrollTrigger);
      }
    });
    
    // Parallax for Creative Snaps Grid Images
    parallaxGridImageRefs.current.forEach((el) => {
      if (el) {
        const parallaxAnim = gsap.to(el, {
          yPercent: -10, 
          ease: 'none',
          scrollTrigger: { 
            trigger: el, 
            start: 'top bottom', 
            end: 'bottom top', 
            scrub: 1.5 
          },
        });
        if (parallaxAnim.scrollTrigger) allTriggers.push(parallaxAnim.scrollTrigger);
      }
    });

    // GSAP for the new "Luminous Flow Timeline"
    const timelinePath = sectionRef.current.querySelector('.timeline-flow-path');
    const timelineNodes = sectionRef.current.querySelectorAll('.timeline-luminous-node');
    const timelineEventCards = sectionRef.current.querySelectorAll('.timeline-event-card-luminous');

    if (timelinePath) {
      const pathLength = timelinePath.getTotalLength();
      const pathAnim = gsap.fromTo(timelinePath, 
        { strokeDasharray: pathLength, strokeDashoffset: pathLength },
        { strokeDashoffset: 0, duration: 3, ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".luminous-timeline-container", 
            start: "top center", 
            end: "bottom center", 
            scrub: 1,
          }
        }
      );
      if(pathAnim.scrollTrigger) allTriggers.push(pathAnim.scrollTrigger);
    }

    timelineNodes.forEach((node) => { // Removed index from forEach as it's not used for nodeAnim
      const nodeAnim = gsap.fromTo(node, 
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: node,
            start: "top 80%", 
            toggleActions: 'play none none none',
          }
        }
      );
      if(nodeAnim.scrollTrigger) allTriggers.push(nodeAnim.scrollTrigger);
    });

    timelineEventCards.forEach((card, index) => {
      // Determine xOffset based on index for alternating effect, only for desktop
      // On mobile, xOffset will be 0 (or a small positive value if cards are to the right of the line)
      let xOffset = 0;
      if (typeof window !== 'undefined' && window.innerWidth >= 768) { // md breakpoint
        xOffset = index % 2 === 0 ? -50 : 50; // Alternating for desktop
      } else {
        xOffset = 20; // Example: All cards slightly to the right on mobile
      }

      const cardAnim = gsap.from(card, 
        { 
          opacity: 0, 
          x: xOffset, // Use calculated xOffset
          y:30, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: 'play none none none',
          }
        }
      );
       if(cardAnim.scrollTrigger) allTriggers.push(cardAnim.scrollTrigger);
    });


    return () => {
      allTriggers.forEach(trigger => {
        if (trigger && typeof trigger.kill === 'function') trigger.kill();
        else if (trigger && typeof trigger.revert === 'function') trigger.revert();
      });
      allTriggers = [];
    };
  }, [gsapReady, creativeSnaps.length]); 

  const addAnimatedElement = (el) => {
    if (el && !animatedElementsRef.current.includes(el)) animatedElementsRef.current.push(el);
  };

  const addParallaxGridImageRef = (el) => {
    if (el && !parallaxGridImageRefs.current.includes(el)) {
      parallaxGridImageRefs.current.push(el);
    }
  };


  // --- Hobby Data & Click Handlers ---
  const hobbies = [
    {
      id: "programming",
      name: "Lập trình",
      description: "Kiến tạo giải pháp số, từ ý tưởng đến hiện thực.",
      icon: <CodeIcon />,
      color: "sky",
      action: () => {
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
          portfolioSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.warn("Portfolio section (id='portfolio') not found for navigation.");
        }
      }
    },
    {
      id: "sports",
      name: "Thể thao",
      description: "Bóng chuyền, bóng đá, cầu lông - năng lượng và đồng đội.",
      icon: <SportsIcon sport="volleyball" />,
      sportsIcons: [<SportsIcon key="vb" sport="volleyball"/>, <SportsIcon key="fb" sport="football"/>, <SportsIcon key="bm" sport="badminton"/>],
      color: "emerald",
      action: () => setModalState({ isOpen: true, type: 'sports', data: sportsTimelineData })
    },
    {
      id: "singing",
      name: "Ca hát",
      description: "Giai điệu là nơi tâm hồn cất lời.",
      icon: <MusicIcon />,
      color: "pink",
      action: () => setModalState({ isOpen: true, type: 'singing', data: favoriteSongsData })
    },
  ];

  // --- Data for Sports Timeline Modal ---
  const sportsTimelineData = [
    { year: "2016", title: "Giải bóng chuyền Sinh Viên", image: "https://placehold.co/600x400/34D399/1F2937?text=Volleyball+Team+2016", description: "Lần đầu tiên tham gia giải đấu lớn, học hỏi được tinh thần đồng đội và sự kiên trì." },
    { year: "2019", title: "Câu lạc bộ Cầu Lông", image: "https://placehold.co/600x400/A78BFA/1F2937?text=Badminton+Club+2019", description: "Tham gia CLB cầu lông, rèn luyện kỹ thuật và có thêm nhiều người bạn cùng đam mê." },
    { year: "Hàng tuần", title: "Trận bóng đá cuối tuần", image: "https://placehold.co/600x400/60A5FA/1F2937?text=Weekend+Football", description: "Những trận cầu nảy lửa cùng anh em, giải tỏa căng thẳng và tái tạo năng lượng." },
  ];

  // --- Data for Favorite Songs Modal ---
  const favoriteSongsData = [
    { id: "song1", title: "Phép Màu", artist: "Maydays", description: "30s cover nhẹ nhẹ đóa", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { id: "song2", title: "Phép Màu", artist: "Maydays", description: "Tiếp nè", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { id: "song3", title: "Đêm Trăng Tình Yêu", artist: "Nguyễn Văn Chung", description: "Hứng hứng làm chút cho suy", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { id: "song4", title: "Anh Chẳng Thể", artist: "Phạm Kỳ", description: "Suy quá nên thử", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { id: "song5", title: "Mưa", artist: "Jank", description: "Nốt đi", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { id: "song6", title: "Mưa", artist: "Jank", description: "Cũng cũng", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { id: "song7", title: "Tao Buồn", artist: "ĐạtG", description: "Chia tay buồn quá... Thật may tớ đã không gục ngã", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  ];
  
  const handlePlayPauseSong = (songId, src) => {
    const currentAudioElement = audioRefs.current[songId];
    if (!currentAudioElement) return;

    if (activeAudio.id && activeAudio.id !== songId && audioRefs.current[activeAudio.id]) {
        audioRefs.current[activeAudio.id].pause();
    }

    if (activeAudio.id === songId && activeAudio.isPlaying) {
        currentAudioElement.pause();
        setActiveAudio({ src: null, isPlaying: false, id: null });
    } else {
        currentAudioElement.play().catch(error => console.error("Error playing audio:", error));
        setActiveAudio({ src, isPlaying: true, id: songId });
    }
  };
  
  useEffect(() => { 
    const activeAudioElement = activeAudio.id ? audioRefs.current[activeAudio.id] : null;
    if (activeAudioElement) {
        const handleEnded = () => setActiveAudio({ src: null, isPlaying: false, id: null });
        activeAudioElement.addEventListener('ended', handleEnded);
        const handlePauseEvent = () => { 
            if (activeAudio.id === Object.keys(audioRefs.current).find(key => audioRefs.current[key] === activeAudioElement) && activeAudioElement.paused) {
                 setActiveAudio(prev => ({ ...prev, isPlaying: false }));
            }
        };
        activeAudioElement.addEventListener('pause', handlePauseEvent); 

        return () => {
            activeAudioElement.removeEventListener('ended', handleEnded);
            activeAudioElement.removeEventListener('pause', handlePauseEvent);
        }
    }
  }, [activeAudio.id, activeAudio.isPlaying]);


  // --- Data for Main Journey Timeline ---
  const timelineEvents = [
    { year: "2015", title: "Khởi Nguồn Đam Mê", description: "Những dòng code đầu tiên, như hạt mầm gieo vào vùng đất tò mò, mở ra một chân trời mới đầy hứa hẹn và thử thách." },
    { year: "2018", title: "Dấu Ấn Khởi Nghiệp", description: "Bước vào thế giới startup, nơi mỗi ngày là một bài học, rèn giũa bản lĩnh và tư duy sáng tạo không ngừng nghỉ." },
    { year: "2021", title: "Định Hình Chuyên Môn", description: "Tập trung sâu hơn vào kiến trúc front-end và nghệ thuật trải nghiệm người dùng, tìm kiếm sự hoàn hảo trong từng pixel." },
    { year: "Hiện tại", title: "Hành Trình Vô Tận", description: "Luôn giữ ngọn lửa học hỏi, khám phá những công nghệ mới, và mang những ý tưởng độc đáo vào cuộc sống." },
  ];

  return (
    <section 
        id="about" 
        ref={sectionRef} 
        className="min-h-screen py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sky-50 via-slate-100 to-gray-200 text-slate-700 overflow-hidden antialiased"
    >
      <div className="container mx-auto">
        <header className="text-center mb-20 md:mb-28">
            <h2 
                className="about-header-title text-5xl md:text-6xl font-bold text-slate-800 inline-block pb-3" 
                style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Câu Chuyện Về Tôi
            </h2>
            <div className="about-header-line w-28 h-1 bg-sky-500 mx-auto mt-2"></div>
        </header>

        <div ref={addAnimatedElement} className="max-w-2xl mx-auto text-center mb-20 md:mb-28">
            <p 
                className="text-lg md:text-xl leading-relaxed text-slate-600"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
                Chào mừng bạn đến với không gian cá nhân của tôi. Đây là nơi tôi chia sẻ về hành trình, đam mê và những điều làm nên con người mình - một sự pha trộn giữa logic của mã lệnh và cảm xúc của nghệ thuật.
            </p>
        </div>

        <div className="mb-20 md:mb-28">
            <h3 
                ref={addAnimatedElement}
                className="text-3xl md:text-4xl font-semibold text-center mb-12 md:mb-16 text-slate-700" 
                style={{ fontFamily: 'Playfair Display, serif' }}
            >
                Những Đam Mê
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {hobbies.map((hobby) => (
                    <div 
                        key={hobby.id} 
                        ref={addAnimatedElement}
                        onClick={hobby.action} 
                        className={`hobby-card group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out transform hover:-translate-y-2 border-t-4 border-${hobby.color}-400 cursor-pointer`}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 p-3 bg-slate-100 rounded-full inline-block group-hover:bg-slate-200 transition-colors">
                                {hobby.sportsIcons ? (
                                    <div className="flex space-x-2">
                                        {hobby.sportsIcons.map((icon, i) => <div key={i} className={`transform transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-${i % 2 === 0 ? '6' : '-6'}`}>{icon}</div>)}
                                    </div>
                                ) : (
                                    <div className="transform transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3">{hobby.icon}</div>
                                )}
                            </div>
                            <h4 className="text-xl font-semibold mb-2 text-slate-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>{hobby.name}</h4>
                            <p className="text-sm text-slate-500 leading-relaxed mb-4">{hobby.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        {/* --- NEW "Luminous Flow" Journey Timeline Section --- */}
        <div className="mb-28 md:mb-36 luminous-timeline-container">
            <h3 
                ref={addAnimatedElement}
                className="text-4xl md:text-5xl font-semibold text-center mb-20 md:mb-28 text-slate-700"
                style={{ fontFamily: 'Playfair Display, serif' }}
            >
                Dòng Chảy Thời Gian
            </h3>
            <div className="relative max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4 py-8 min-h-[650px]"> {/* Added min-h to ensure SVG has space */}
                {/* SVG Path for the Winding Timeline */}
                <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 overflow-visible" viewBox="0 0 100 600" preserveAspectRatio="none">
                    <path 
                        className="timeline-flow-path"
                        d="M 50 20 
                           C 50 100, 30 120, 50 200 
                           S 70 280, 50 380 
                           C 30 480, 50 500, 50 580" 
                        stroke="url(#timelineGradient)" 
                        strokeWidth="3" 
                        fill="none"
                        strokeLinecap="round"
                        style={{ filter: "drop-shadow(0px 2px 3px rgba(79, 171, 240, 0.4))" }} 
                    />
                    <defs>
                        <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{stopColor: "rgb(125 211 252)", stopOpacity: 0.8}} /> 
                            <stop offset="100%" style={{stopColor: "rgb(59 130 246)", stopOpacity: 1}} /> 
                        </linearGradient>
                    </defs>
                </svg>

                {timelineEvents.map((event, index) => {
                    const yPositions = [50, 200, 380, 550]; 
                    const nodeY = yPositions[index] || (20 + index * 150); 
                    
                    // Card positioning logic:
                    // On mobile: card is to the right of the center line.
                    // On desktop: alternates.
                    const isLeftCardDesktop = index % 2 === 0;
                    
                    return (
                        <div
                            key={index}
                            // This outer div is mainly for vertical stacking of event blocks.
                            // The actual positioning of node and card is absolute within this, or using flex for desktop.
                            // For simplicity with absolute SVG path, let's keep node and card absolutely positioned relative to the SVG's container.
                            // The parent 'relative max-w-xl...' is the positioning context.
                            // Each event block needs a defined height or to rely on its content.
                            // The mb-28/36 on this div is for spacing BETWEEN event blocks.
                            className="timeline-event-block" // New class for potential height control if needed
                            style={{ height: 'auto' }} // Let content dictate height, or set a min-height if all cards are similar
                        >
                            {/* Luminous Node - Positioned based on SVG path logic */}
                            <div 
                                ref={el => { /* Add to GSAP target if needed for node animation */ }}
                                className="timeline-luminous-node absolute left-1/2 -translate-x-1/2 
                                           w-7 h-7 md:w-8 md:h-8 bg-white border-[3px] border-sky-500 rounded-full z-20 
                                           shadow-xl shadow-sky-400/50 flex items-center justify-center
                                           hover:border-sky-300 transition-all duration-300 transform hover:scale-110" // Removed group-hover as node is not the group
                                style={{ top: `${nodeY - 14}px`}} 
                            >
                                <div className="w-3 h-3 md:w-3.5 md:h-3.5 bg-sky-500 rounded-full hover:bg-sky-400 transition-colors"></div>
                            </div>

                            {/* Event Card */}
                            <div 
                                ref={el => { /* Add to GSAP target for card animation */ }}
                                className={`timeline-event-card-luminous 
                                            p-6 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl 
                                            border border-slate-200/70 hover:border-sky-300 
                                            transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-sky-100/70
                                            absolute z-10
                                            w-[calc(100%-4rem)] sm:w-3/4 md:w-2/5 lg:w-[calc(40%-2rem)] /* Widths for mobile and desktop */
                                            ${isLeftCardDesktop 
                                                ? 'md:left-auto md:right-[calc(50%+2rem)] md:text-right' /* Desktop Left */
                                                : 'md:left-[calc(50%+2rem)] md:text-left' /* Desktop Right */
                                            }
                                            left-[calc(50%+1.5rem)] /* Mobile: card to the right of center line */
                                            `}
                                style={{ 
                                    top: `${nodeY - 40}px`, // Align card top relative to node's Y
                                }}
                            >
                                <p className="text-sm font-bold text-sky-600 mb-2 tracking-wider uppercase" style={{fontFamily: 'Montserrat, sans-serif'}}>
                                    {event.year}
                                </p>
                                <h4 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3" style={{fontFamily: 'Playfair Display, serif'}}>
                                    {event.title}
                                </h4>
                                <p className="text-base text-slate-600 leading-relaxed" style={{fontFamily: 'Montserrat, sans-serif'}}>
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>


        {/* ---- NEW Creative Journey / Khoảnh Khắc Sáng Tạo ---- */}
        <div className="mb-20 md:mb-28">
            <h3 
                ref={addAnimatedElement}
                className="text-3xl md:text-4xl font-semibold text-center mb-12 md:mb-16 text-slate-700" 
                style={{ fontFamily: 'Playfair Display, serif' }}
            >
                Khoảnh Khắc Sáng Tạo
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
                {creativeSnaps.map((snap, idx) => (
                <div 
                    key={snap.id} 
                    ref={addAnimatedElement} 
                    className="relative rounded-lg overflow-hidden shadow-xl group cursor-pointer aspect-[3/2] sm:aspect-square lg:aspect-[4/3]" 
                    onClick={() => setLightbox({ open: true, active: snap })}
                >
                    <img
                        ref={el => parallaxGridImageRefs.current[idx] = el} 
                        src={snap.image}
                        alt={snap.caption}
                        className="w-full h-full object-cover transform transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/50 transition-all duration-300"></div>
                    <p className="absolute bottom-4 left-4 text-white font-medium text-base md:text-lg drop-shadow-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {snap.caption}
                    </p>
                </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {lightbox.open && lightbox.active && (
                <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[250] p-4 cursor-pointer"
                    onClick={() => setLightbox({ open: false, active: null })} 
                >
                    <div 
                        className="bg-white rounded-xl overflow-hidden shadow-2xl max-w-4xl w-auto max-h-[90vh] relative cursor-default"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <button 
                            onClick={() => setLightbox({ open: false, active: null })} 
                            className="absolute top-3 right-3 text-white p-2 bg-black/40 hover:bg-black/60 rounded-full z-10 transition-colors"
                            aria-label="Đóng lightbox"
                        >
                            <CloseIcon />
                        </button>
                        <img src={lightbox.active.image} alt={lightbox.active.caption} className="block w-full h-auto object-contain max-h-[calc(90vh-80px)]" /> 
                        {lightbox.active.caption && (
                            <div className="p-4 text-center bg-white">
                                <h4 className="text-lg font-semibold text-slate-700" style={{ fontFamily: 'Playfair Display, serif' }}>
                                {lightbox.active.caption}
                                </h4>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>


        <div ref={addAnimatedElement} className="text-center pt-12 mt-12 border-t border-slate-200">
            <p 
                className="text-2xl md:text-3xl leading-snug text-sky-700"
                style={{ fontFamily: 'Playfair Display, serif' }}
            >
            "Kiến tạo tương lai, nơi mỗi pixel kể một câu chuyện, mỗi tương tác khơi gợi một cảm xúc."
            </p>
        </div>
      </div>

      {/* Modals for Hobbies */}
      <DetailModal 
        isOpen={modalState.isOpen && modalState.type === 'sports'}
        onClose={() => setModalState({ isOpen: false, type: null, data: null })}
        title="Hành Trình Thể Thao"
        bgColor="bg-slate-50"
      >
        <div className="space-y-10 p-2">
          {sportsTimelineData.map((item, index) => (
            <div key={index} className={`flex items-center gap-x-6 gap-y-4 ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col md:flex-row`}>
              <div className="w-full md:w-1/2 flex-shrink-0">
                <img src={item.image} alt={item.title} className="rounded-lg shadow-md object-cover aspect-video w-full"/>
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-sm font-semibold text-emerald-600 mb-1" style={{fontFamily: 'Montserrat, sans-serif'}}>{item.year}</p>
                <h4 className="text-xl font-bold text-slate-700 mb-2" style={{fontFamily: 'Montserrat, sans-serif'}}>{item.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </DetailModal>

      <DetailModal 
        isOpen={modalState.isOpen && modalState.type === 'singing'}
        onClose={() => {
            if (activeAudio.src && audioRefs.current[activeAudio.id]) {
                audioRefs.current[activeAudio.id].pause();
            }
            setActiveAudio({ src: null, isPlaying: false, id: null });
            setModalState({ isOpen: false, type: null, data: null });
        }}
        title="Giai Điệu Yêu Thích"
        bgColor="bg-pink-50" 
        contentPadding="p-0" 
      >
        <div className="divide-y divide-pink-200">
          {favoriteSongsData.map((song) => (
            <div key={song.id} className="p-6 group hover:bg-pink-100/60 transition-colors duration-200">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold text-pink-700 group-hover:text-pink-800 truncate" style={{fontFamily: 'Montserrat, sans-serif'}} title={song.title}>{song.title}</h4>
                  <p className="text-sm text-pink-500 group-hover:text-pink-600 mb-1 truncate" title={song.artist}>{song.artist}</p>
                </div>
                <button 
                    onClick={() => handlePlayPauseSong(song.id, song.audioSrc)}
                    className="p-3 rounded-full hover:bg-pink-200 text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200"
                    aria-label={activeAudio.id === song.id && activeAudio.isPlaying ? "Pause" : "Play"}
                >
                    <audio ref={el => audioRefs.current[song.id] = el} src={song.audioSrc} className="hidden" preload="metadata"></audio>
                    {activeAudio.id === song.id && activeAudio.isPlaying ? <PauseIcon size={28}/> : <PlayIcon size={28}/>}
                </button>
              </div>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed line-clamp-2">{song.description}</p>
            </div>
          ))}
        </div>
      </DetailModal>

    </section>
  );
};

export default AboutSection;
