import React, { useState, useEffect, useRef } from 'react';

// --- Icon Components (Placeholder - Use actual icons or a library like Lucide React) ---
const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);


// --- Sample Portfolio Data (Keep your existing data structure) ---
const portfolioItemsData = [
  {
    id: 1,
    title: "Dự án Tinh Vân",
    category: "Phát triển Web Full-Stack",
    image: "https://placehold.co/800x600/6D28D9/E0E7FF?text=Tinh+Vân+App", // Purple, cosmic
    description: "Một ứng dụng web tương tác cao, lấy cảm hứng từ vẻ đẹp của các tinh vân trong vũ trụ, sử dụng Next.js và Supabase. Tập trung vào trải nghiệm người dùng mượt mà và giao diện thiên văn độc đáo.",
    detailsImage: "https://placehold.co/1200x800/6D28D9/E0E7FF?text=Chi+Tiết+Tinh+Vân",
    videoUrl: "https://videos.pexels.com/video-files/3129957/3129957-hd_1280_720_24fps.mp4", // Abstract space video
    technologies: ["Next.js", "React", "Supabase", "Tailwind CSS", "GSAP"],
    liveLink: "#", // Placeholder
    repoLink: "#", // Placeholder
    size: "large", // 'small', 'medium', 'large' for varied grid item size
  },
  {
    id: 2,
    title: "Thiết kế Thiên Hà",
    category: "Thiết kế UI/UX & Branding",
    image: "https://placehold.co/600x800/DB2777/FBCFE8?text=Thiên+Hà+Brand", // Pink, portrait
    description: "Bộ nhận diện thương hiệu và hệ thống thiết kế cho một startup công nghệ không gian. Tạo nên một ngôn ngữ hình ảnh hiện đại, tối giản và đầy cảm hứng.",
    detailsImage: "https://placehold.co/1000x1200/DB2777/FBCFE8?text=Chi+Tiết+Thiên+Hà",
    technologies: ["Figma", "Adobe Illustrator", "User Research", "Brand Strategy"],
    size: "medium",
  },
  {
    id: 3,
    title: "Ứng dụng Hố Đen",
    category: "Ứng dụng Di động",
    image: "https://placehold.co/800x600/047857/A7F3D0?text=Hố+Đen+Mobile", // Emerald, dark
    description: "Ứng dụng di động giúp quản lý dữ liệu cá nhân một cách an toàn và riêng tư, với giao diện lấy cảm hứng từ sự bí ẩn của hố đen.",
    detailsImage: "https://placehold.co/1200x800/047857/A7F3D0?text=Chi+Tiết+Hố+Đen",
    technologies: ["React Native", "Firebase", "Cryptography"],
    size: "medium",
  },
  {
    id: 4,
    title: "Nhiếp ảnh Sao Chổi",
    category: "Nhiếp ảnh Thiên Văn",
    image: "https://placehold.co/800x1000/F59E0B/FEF3C7?text=Sao+Chổi+Series", // Amber, portrait
    description: "Bộ ảnh nghệ thuật ghi lại vẻ đẹp của các hiện tượng thiên văn, từ sao chổi đến mưa sao băng, sử dụng kỹ thuật phơi sáng dài và xử lý hậu kỳ tinh tế.",
    detailsImage: "https://placehold.co/1000x1200/F59E0B/FEF3C7?text=Chi+Tiết+Sao+Chổi",
    technologies: ["DSLR Astrophotography", "Adobe Lightroom", "PixInsight"],
    size: "large",
  },
   {
    id: 5,
    title: "Video Vũ Trụ Giãn Nở",
    category: "Motion Graphics & Video",
    image: "https://placehold.co/800x600/3B82F6/DBEAFE?text=Vũ+Trụ+Motion", // Blue
    description: "Một video motion graphics giải thích các khái niệm phức tạp về vũ trụ học một cách trực quan và hấp dẫn, sử dụng hiệu ứng 3D và âm nhạc du dương.",
    detailsImage: "https://placehold.co/1200x700/3B82F6/DBEAFE?text=Chi+Tiết+Motion",
    videoUrl: "https://videos.pexels.com/video-files/857251/857251-hd_1280_720_25fps.mp4", // Space/abstract video
    technologies: ["Adobe After Effects", "Cinema 4D", "Sound Design"],
    size: "medium",
  },
];

// --- Project Detail Modal ---
const ProjectDetailModal = ({ project, onClose, gsapReady }) => {
  const modalContentRef = useRef(null);
  const modalBgRef = useRef(null);

  useEffect(() => {
    if (project && gsapReady && window.gsap) {
      const gsap = window.gsap;
      document.body.style.overflow = 'hidden';
      gsap.fromTo(modalBgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.inOut' });
      gsap.fromTo(modalContentRef.current, 
        { opacity: 0, scale: 0.9, y: 20 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)', delay:0.1 }
      );
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [project, gsapReady]);

  if (!project) return null;

  return (
    <div 
        ref={modalBgRef}
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl flex items-center justify-center z-[200] p-4 cursor-pointer"
        onClick={onClose}
    >
      <div
        ref={modalContentRef}
        className="relative bg-gradient-to-br from-slate-800 via-gray-900 to-slate-900 text-slate-100 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden cursor-default border border-slate-700/50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-sky-400 transition-colors z-20 p-2 bg-slate-700/50 hover:bg-slate-600/80 rounded-full"
          aria-label="Đóng chi tiết"
        >
          <CloseIcon />
        </button>

        <div className="overflow-y-auto flex-grow styled-scrollbar"> {/* Custom scrollbar if needed */}
          {project.videoUrl ? (
            <div className="aspect-video bg-black rounded-t-2xl overflow-hidden">
              <video src={project.videoUrl} controls autoPlay muted loop className="w-full h-full object-cover" playsInline>
                Trình duyệt không hỗ trợ video.
              </video>
            </div>
          ) : project.detailsImage && (
            <div className="w-full max-h-[50vh] overflow-hidden rounded-t-2xl bg-slate-900">
              <img src={project.detailsImage} alt={`Chi tiết ${project.title}`} className="w-full h-full object-contain" />
            </div>
          )}
          
          <div className="p-6 md:p-8 lg:p-10">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-sky-400" 
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {project.title}
            </h2>
            <p className="text-sm md:text-base text-sky-500 mb-6" style={{fontFamily: 'Montserrat, sans-serif'}}>
              {project.category}
            </p>

            <div 
              className="prose prose-lg max-w-none prose-invert prose-p:text-slate-300 prose-headings:text-sky-400 prose-strong:text-sky-300 prose-a:text-teal-400 hover:prose-a:text-teal-300"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <p>{project.description}</p>
            </div>

            {project.technologies && project.technologies.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-700">
                <h4 className="text-lg font-semibold mb-4 text-sky-300" style={{fontFamily: 'Montserrat, sans-serif'}}>Công nghệ nổi bật:</h4>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map(tech => (
                    <span key={tech} className="bg-sky-800/70 text-sky-300 px-4 py-1.5 rounded-full text-sm shadow-md border border-sky-700/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 pt-6 border-t border-slate-700 flex flex-col sm:flex-row gap-4">
              {project.liveLink && project.liveLink !== "#" && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 group">
                  Xem trực tiếp <ExternalLinkIcon />
                </a>
              )}
              {project.repoLink && project.repoLink !== "#" && (
                 <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 group">
                  Mã nguồn <ExternalLinkIcon />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const PortfolioSection = ({ gsapReady }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const portfolioGridRef = useRef(null);
  const animatedItemsRef = useRef([]); // Store refs of items for GSAP

  useEffect(() => {
    animatedItemsRef.current = []; // Clear refs on each render before collecting them
  }, []);

  useEffect(() => {
    if (gsapReady && window.gsap && animatedItemsRef.current.length > 0) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      animatedItemsRef.current.forEach((item, index) => {
        if (item) { // Ensure item is not null
          gsap.fromTo(item,
            { opacity: 0, y: 60, scale: 0.9 },
            {
              opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 90%', // Start animation a bit earlier
                toggleActions: 'play none none none',
              },
              delay: index * 0.1 // Staggered delay
            }
          );
        }
      });
    }
    // Cleanup ScrollTriggers if necessary, though toggleActions 'play none none none' often doesn't require explicit cleanup for simple fromTo.
  }, [gsapReady, portfolioItemsData]); // Re-run if items change

  const getItemSizeClass = (size) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2'; // Larger items span more
      case 'medium':
        return 'md:col-span-1 md:row-span-1'; // Default medium size
      default: // 'small' or undefined
        return 'md:col-span-1 md:row-span-1'; // Smallest items
    }
  };


  return (
    <section id="portfolio" className="min-h-screen py-24 md:py-32 px-4 md:px-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-900 text-slate-100 overflow-hidden">
      <div className="container mx-auto">
        <header className="text-center mb-16 md:mb-20" ref={(el) => el && animatedItemsRef.current.push(el)}>
          <h2 
            className="text-5xl md:text-6xl font-bold inline-block pb-3 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-purple-400" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Vũ Trụ Sáng Tạo
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mt-4 max-w-2xl mx-auto" style={{fontFamily: 'Montserrat, sans-serif'}}>
            Mỗi dự án là một hành tinh, một khám phá mới trong hành trình không ngừng kiến tạo.
          </p>
        </header>
        
        {/* Dynamic Masonry-like Grid */}
        <div 
          ref={portfolioGridRef} 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 auto-rows-fr" 
          // Using `auto-rows-fr` for more flexible row heights if needed, or use specific aspect ratios on items
        >
          {portfolioItemsData.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => el && animatedItemsRef.current.push(el)} // Add item to refs for GSAP
              className={`portfolio-nebula-card group relative rounded-2xl overflow-hidden shadow-xl cursor-pointer 
                          bg-slate-800/40 backdrop-blur-md border border-slate-700/50
                          hover:border-sky-500/70 hover:shadow-sky-500/20 transition-all duration-300 ease-out
                          transform hover:scale-[1.03]
                          ${getItemSizeClass(item.size)}
                          aspect-w-1 aspect-h-1 ${item.size === 'large' ? 'sm:aspect-w-16 sm:aspect-h-9' : 'sm:aspect-w-1 sm:aspect-h-1'}`} // Maintain aspect ratio
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-110 group-hover:brightness-125"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex flex-col justify-end p-5 md:p-6">
                <h3 
                    className="text-xl md:text-2xl font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-in-out" 
                    style={{ fontFamily: 'Playfair Display, serif' }}
                >
                    {item.title}
                </h3>
                <p className="text-sm text-sky-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 ease-in-out" style={{fontFamily: 'Montserrat, sans-serif'}}>
                  {item.category}
                </p>
              </div>
              {/* Clickable overlay */}
              <div 
                className="absolute inset-0 cursor-pointer"
                onClick={() => setSelectedProject(item)}
                aria-label={`Xem chi tiết dự án ${item.title}`}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <ProjectDetailModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)}
        gsapReady={gsapReady}
      />
    </section>
  );
};

export default PortfolioSection;
