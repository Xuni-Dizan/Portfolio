import React, { useState, useEffect, useRef } from 'react';

// Import Components
import HeroSection from './components/HeroSection'; 
import AboutSection from './components/AboutSection'; 
import PortfolioSection from './components/PortfolioSection'; 
import BlogSection from './components/BlogSection'; 
import TestimonialsSection from './components/TestimonialsSection'; 
import ContactSection from './components/ContactSection'; 

// Placeholder cho các icon
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Dữ liệu mẫu cho các phần
const navLinks = [
  { id: 'hero', title: 'Trang Chủ' },
  { id: 'about', title: 'Giới Thiệu' },
  { id: 'portfolio', title: 'Portfolio' },
  { id: 'blog', title: 'Blog' },
  { id: 'testimonials', title: 'Đánh Giá' },
  { id: 'contact', title: 'Liên Hệ' },
];

// Preloader Component
const Preloader = ({ name, font, onLoaded }) => {
  const preloaderRef = useRef(null);
  const nameLettersRef = useRef([]);

  useEffect(() => {
    if (window.gsap) {
      const gsap = window.gsap;
      const letters = nameLettersRef.current;
      const preloaderElement = preloaderRef.current;

      gsap.set(letters, { opacity: 0, y: 30, scale: 0.7, filter: 'blur(5px)' });
      gsap.set(preloaderElement, { display: 'flex'});


      const tl = gsap.timeline({
        onComplete: () => {
          // Wait a bit after name animation before fading out preloader
          gsap.to(preloaderElement, { 
            opacity: 0, 
            duration: 0.8, 
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.set(preloaderElement, { display: 'none' });
              if (onLoaded) onLoaded();
            }
          });
        }
      });

      tl.to(letters, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(2)',
        delay: 0.5 // Initial delay before preloader name animation starts
      })
      .to(letters, { // Subtle glow/pulse effect after name appears
        textShadow: "0 0 15px rgba(255, 255, 255, 0.7), 0 0 25px rgba(103, 232, 249, 0.5)", // White and cyan glow
        duration: 0.7,
        repeat: 2, // Pulse a couple of times
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.05
      }, "-=0.3"); // Overlap slightly with the end of the previous animation

    }
  }, [onLoaded]);

  const letters = name.split('').map((char, index) => (
    <span 
      key={index} 
      ref={el => nameLettersRef.current[index] = el}
      style={{ display: 'inline-block', minWidth: char === ' ' ? '0.5ch' : 'auto' }} // Ensure space takes up width
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <div 
      ref={preloaderRef} 
      className="fixed inset-0 bg-gray-950 flex items-center justify-center z-[9999]" // Highest z-index
      style={{ display: 'none' }} // Initially hidden, GSAP will manage display
    >
      <h1 
        className="text-5xl md:text-7xl text-white"
        style={{ fontFamily: font }}
      >
        {letters}
      </h1>
    </div>
  );
};


// Component chính App
function App() {
  const [isLoading, setIsLoading] = useState(true); // Preloader is active by default
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const nameRef = useRef(null); 
  const [gsapReady, setGsapReady] = useState(false);

  const yourName = "Lưu Chí Vỹ"; 
  const yourShortDescription = "Web Developer & Creative Thinker";
  const heroVideoSrc = "https://videos.pexels.com/video-files/4782079/4782079-hd_1920_1080_25fps.mp4";

  useEffect(() => {
    const initializeGsap = () => {
      if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);
        setGsapReady(true); // GSAP is ready
        // Preloader will handle its own fade-out and then call handlePreloaderLoaded
        console.log("GSAP and ScrollTrigger registered successfully.");
      } else if (window.gsap && !window.ScrollTrigger) {
        console.warn("ScrollTrigger not found, attempting to load...");
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js", () => {
          if (window.ScrollTrigger) {
            window.gsap.registerPlugin(window.ScrollTrigger);
            setGsapReady(true);
            console.log("ScrollTrigger loaded and registered successfully.");
          } else {
            console.error("Failed to load ScrollTrigger.");
          }
        });
      } else if (!window.gsap) {
        console.warn("GSAP not found, attempting to load...");
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js", () => {
          if (window.gsap) {
            console.log("GSAP core loaded. Now attempting to load ScrollTrigger...");
            loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js", () => {
              if (window.ScrollTrigger) {
                window.gsap.registerPlugin(window.ScrollTrigger);
                setGsapReady(true);
                console.log("GSAP and ScrollTrigger loaded and registered successfully.");
              } else {
                console.error("Failed to load ScrollTrigger after loading GSAP core.");
              }
            });
          } else {
            console.error("Failed to load GSAP core.");
          }
        });
      }
    };

    const loadScript = (src, onLoad) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = onLoad;
      script.onerror = () => console.error(`Error loading script: ${src}`);
      document.body.appendChild(script);
    };

    const timer = setTimeout(initializeGsap, 100); // Delay slightly to ensure window.gsap might be available
    return () => clearTimeout(timer);
  }, []);
  
  const handlePreloaderLoaded = () => {
    setIsLoading(false); // Hide preloader and show main content
  };

  // GSAP Animation for the name in the header
  useEffect(() => {
    // Only run header name animation if GSAP is ready AND preloader is done
    if (gsapReady && !isLoading && window.gsap && nameRef.current) {
      const gsap = window.gsap;
      const nameEl = nameRef.current;
      const letters = nameEl.querySelectorAll('.name-letter');

      if (letters.length > 0) {
        gsap.fromTo(letters, 
          { opacity: 0, y: 20, scale: 0.8, rotationX: -90 }, 
          { 
            opacity: 1, y: 0, scale: 1, rotationX: 0,
            duration: 0.6, stagger: 0.07, ease: 'back.out(1.7)',
            delay: 0.3 // Delay after main content is visible
          }
        );

        letters.forEach(letter => {
          gsap.set(letter, { display: 'inline-block' }); 
          const tlHover = gsap.timeline({ paused: true, defaults: { duration: 0.2, ease: 'power2.inOut' } });
          tlHover
            .to(letter, { y: -3, color: '#67e8f9' }) 
            .to(letter, { y: 0, color: '#ffffff' }, "+=0.1"); 
          letter.animation = tlHover; 
          letter.addEventListener('mouseenter', () => letter.animation.play(0));
        });
      }
    }
  }, [gsapReady, isLoading, yourName]); // Depend on isLoading

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (gsapReady && navRef.current && window.gsap) {
      window.gsap.to(navRef.current, {
        backgroundColor: isScrolled ? 'rgba(26, 32, 44, 0.8)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)' : 'none',
        duration: 0.3,
        ease: 'power2.inOut'
      });
    }
  }, [isScrolled, gsapReady]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };
  
  const nameLetters = yourName.split('').map((char, index) => (
    <span key={index} className="name-letter origin-bottom" style={{ display: 'inline-block' }}> 
      {char === ' ' ? '\u00A0' : char} 
    </span>
  ));

  return (
    <> {/* Use Fragment to allow Preloader and main div at the same level initially */}
      {gsapReady && <Preloader name={yourName} font="'Abril Fatface', cursive" onLoaded={handlePreloaderLoaded} />}
      
      {!isLoading && ( // Render main content only when not loading
        <div className="bg-gray-900 text-white font-sans antialiased opacity-0" 
             ref={el => {
               if (el && gsapReady && window.gsap) { // Animate main content in after preloader
                 window.gsap.to(el, { opacity: 1, duration: 0.8, ease: 'power2.inOut' });
               }
             }}>
          <nav
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ease-in-out ${
              isScrolled ? 'bg-gray-800/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
            }`}
          >
            <div className="container mx-auto flex justify-between items-center">
              <a 
                href="#hero" 
                onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} 
                className="text-2xl md:text-3xl font-bold relative group" 
                style={{ fontFamily: 'Abril Fatface, cursive', color: '#ffffff' }} 
                ref={nameRef} 
              >
                {nameLetters}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-sky-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
              </a>
              <div className="hidden md:flex space-x-6">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                    className="hover:text-yellow-400 transition-colors duration-300"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {link.title}
                  </a>
                ))}
              </div>
              <div className="md:hidden">
                <button onClick={toggleMenu} aria-label="Toggle menu">
                  {isMenuOpen ? <XIcon /> : <MenuIcon />}
                </button>
              </div>
            </div>
            {isMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 bg-gray-800/95 backdrop-blur-md shadow-xl py-4">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                    className="block text-center py-3 px-4 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            )}
          </nav>

          <HeroSection
            yourName={yourName} // Pass the name for Hero section specific animation
            yourShortDescription={yourShortDescription}
            gsapReady={gsapReady} // Pass gsapReady to HeroSection
            videoSrc={heroVideoSrc}
            isAppLoading={isLoading} // Pass loading state to HeroSection
          />

          <AboutSection gsapReady={gsapReady} />
          <PortfolioSection gsapReady={gsapReady} />
          <BlogSection gsapReady={gsapReady} />
          <TestimonialsSection gsapReady={gsapReady} yourName={yourName} />
          <ContactSection gsapReady={gsapReady} />

          <footer className="py-8 text-center bg-gray-950 text-gray-500 border-t border-gray-800">
            <p>&copy; {new Date().getFullYear()} {yourName}. Thiết kế với <span className="text-red-500">❤️</span> và <span className="text-yellow-400">✨</span>.</p>
            <p className="text-xs mt-2">Được xây dựng bằng React, Tailwind CSS & GSAP.</p>
          </footer>

          {isScrolled && (
            <button
              onClick={() => scrollToSection('hero')}
              className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-yellow-500 hover:bg-yellow-600 text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 z-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
              aria-label="Scroll to top"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default App;
