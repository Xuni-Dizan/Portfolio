import React, { useEffect, useRef } from 'react';

// Giả sử GSAP đã được load toàn cục qua window.gsap
// và gsapReady, isAppLoading props được truyền từ App.js

const HeroSection = ({ 
    yourName = "Tên Của Bạn", 
    yourShortDescription = "Mô tả ngắn về bạn", 
    gsapReady, 
    videoSrc = "https://videos.pexels.com/video-files/857251/857251-hd_1280_720_25fps.mp4",
    isAppLoading // New prop to know when preloader is done
}) => {
  const heroContentRef = useRef(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Autoplay video, muted để trình duyệt cho phép
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.warn("Video autoplay prevented. User interaction might be required or check browser policy.", error);
      });
    }
  }, [videoSrc]);

  useEffect(() => {
    // Animations will only run if GSAP is ready AND the app is not in the loading state (preloader is done)
    if (gsapReady && !isAppLoading && window.gsap && heroContentRef.current && nameRef.current && descriptionRef.current) {
      const gsap = window.gsap;
      const nameEl = nameRef.current;
      const descriptionEl = descriptionRef.current;

      // Prepare elements for animation
      // The heroContentRef starts with opacity-0 from JSX, GSAP will make it visible.
      gsap.set(heroContentRef.current, { opacity: 1 }); // Make container visible for animations to run correctly

      
      // --- Name Animation: "Nở Rộ Nghệ Thuật" ---
      const nameChars = yourName.split('');
      nameEl.innerHTML = ''; // Clear existing content
      nameChars.forEach(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0'; 
        span.style.transform = 'translateY(50px) scale(0.5) rotateZ(-20deg)'; 
        nameEl.appendChild(span);
      });
      const nameLetterSpans = nameEl.querySelectorAll('span');

      // --- Description Animation: "Dòng Chảy Êm Đềm" ---
      const descWords = yourShortDescription.split(' ');
      descriptionEl.innerHTML = ''; // Clear existing content
      descWords.forEach(word => {
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block'; 
        wordSpan.style.overflow = 'hidden'; 
        
        const innerWordSpan = document.createElement('span');
        innerWordSpan.textContent = word + (descWords.indexOf(word) < descWords.length - 1 ? '\u00A0' : ''); 
        innerWordSpan.style.display = 'inline-block';
        innerWordSpan.style.transform = 'translateY(100%)'; 
        
        wordSpan.appendChild(innerWordSpan);
        descriptionEl.appendChild(wordSpan);
      });
      const descWordSpans = descriptionEl.querySelectorAll('span > span');


      // --- GSAP Timeline for Hero Content ---
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }});

      // Increased delay to ensure App.js main content fade-in is complete (assuming 0.8s fade-in in App.js)
      // This helps prevent HeroSection animations from starting while the main app container is still partially transparent,
      // which could affect layout calculations for other sections like BlogSection.
      const heroAnimationDelay = 0.85; // Slightly more than App.js main content fade-in

      tl.to(nameLetterSpans, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateZ: 0,
          duration: 0.8,
          stagger: 0.08, 
          delay: heroAnimationDelay, // Apply the calculated delay
          ease: 'elastic.out(1, 0.75)' 
        })
        .to(descWordSpans, {
          y: '0%',
          duration: 0.6,
          stagger: 0.1, 
          ease: 'power2.out'
        }, "-=0.5"); 

    } else if (heroContentRef.current && window.gsap) {
      // If not ready or still loading, ensure content remains hidden (it starts as opacity-0 via JSX class)
      // This explicit set might be redundant if JSX class handles it, but ensures state.
      window.gsap.set(heroContentRef.current, { opacity: 0 });
    }
  }, [gsapReady, isAppLoading, yourName, yourShortDescription]); 

  const handleVideoError = (e) => {
    const videoElement = e.target;
    let errorMessage = "An unknown video error occurred.";
    if (videoElement.error) {
      switch (videoElement.error.code) {
        case videoElement.error.MEDIA_ERR_ABORTED:
          errorMessage = "Video playback aborted by the user or script.";
          break;
        case videoElement.error.MEDIA_ERR_NETWORK:
          errorMessage = "A network error caused the video download to fail part-way.";
          break;
        case videoElement.error.MEDIA_ERR_DECODE:
          errorMessage = "The video playback was aborted due to a corruption problem or because the video used features your browser did not support.";
          break;
        case videoElement.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
          errorMessage = "The video could not be loaded, either because the server or network failed or because the format is not supported.";
          break;
        default:
          errorMessage = `An unknown error occurred. Code: ${videoElement.error.code}`;
      }
    }
    console.error("Video Error:", errorMessage, "Source:", videoElement.currentSrc);
  };


  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={videoSrc} 
          autoPlay
          loop
          muted
          playsInline 
          onError={handleVideoError} 
        >
          Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-10"></div>
      </div>

      {/* Nội dung Hero - Starts with opacity-0 and GSAP will fade it in */}
      <div ref={heroContentRef} className="relative z-20 flex flex-col items-center justify-center text-center p-4 opacity-0">
        <h1
          ref={nameRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-6 md:mb-8" 
          style={{ fontFamily: 'Ms Madi, cursive', minHeight: '120px' }} 
        >
          {/* Content will be populated by GSAP */}
        </h1>
        <p 
          ref={descriptionRef}
          className="text-xl md:text-2xl lg:text-3xl text-sky-300 mt-2" 
          style={{ fontFamily: 'Montserrat, sans-serif', minHeight: '40px' }} 
        >
          {/* Content will be populated by GSAP */}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
