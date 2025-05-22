import React, { useState, useRef, useEffect } from 'react';

// --- Data for Blog Posts (Sample) ---
const blogPostsData = [
  {
    id: 1,
    title: "Hành Trình Đến Với Lập Trình",
    date: "15 Tháng Năm, 2024",
    category: "Phát triển Web",
    excerpt: "Chia sẻ về những ngày đầu tiên tôi làm quen với code, những thử thách và niềm vui đã định hình con đường sự nghiệp của tôi...",
    image: "https://placehold.co/800x450/2D3748/FFFFFF?text=Coding+Journey", // Aspect ratio 16:9
    readingTime: "5 phút đọc",
    tags: ["cá nhân", "sự nghiệp", "học lập trình"],
    fullContent: `
      <p>Từ những dòng "Hello World" ngô nghê đến việc xây dựng các ứng dụng phức tạp, hành trình đến với lập trình của tôi là một chuỗi những khám phá đầy thú vị. Ban đầu, thế giới của những thẻ HTML, những dòng lệnh CSS và logic JavaScript dường như thật xa lạ và có phần đáng sợ.</p>
      <p>Tôi nhớ những đêm thức trắng để gỡ lỗi một hàm không chạy, hay cảm giác vỡ òa khi một tính năng phức tạp cuối cùng cũng hoạt động trơn tru. Chính những thử thách đó đã tôi luyện sự kiên nhẫn và khả năng giải quyết vấn đề của tôi. Framework như React mở ra một cánh cửa mới, cho phép tôi xây dựng giao diện người dùng tương tác và linh hoạt hơn bao giờ hết.</p>
      <img src="https://placehold.co/700x400/374151/E0E0E0?text=Code+Editor" alt="Một đoạn code ví dụ" class="rounded-lg my-6 shadow-md"/>
      <p>Không chỉ là công việc, lập trình đã trở thành một phần đam mê, một cách để tôi thể hiện sự sáng tạo và mang lại giá trị cho cộng đồng. Mỗi dự án hoàn thành không chỉ là một sản phẩm, mà còn là một dấu ấn, một câu chuyện về sự nỗ lực và không ngừng học hỏi.</p>
      <p>Hành trình này vẫn còn dài, và tôi luôn hào hứng đón chờ những thử thách và cơ hội mới phía trước.</p>
    `
  },
  {
    id: 2,
    title: "Sức Mạnh Của Thiết Kế Tối Giản",
    date: "10 Tháng Tư, 2024",
    category: "Thiết kế UI/UX",
    excerpt: "Tại sao 'less is more' lại là một triết lý mạnh mẽ trong thiết kế web, và làm thế nào để áp dụng nó một cách hiệu quả...",
    image: "https://placehold.co/800x450/2B6CB0/FFFFFF?text=Minimalist+Design",
    readingTime: "4 phút đọc",
    tags: ["thiết kế", "tối giản", "UI/UX"],
    fullContent: `
      <p>Trong một thế giới số ngày càng trở nên phức tạp và đầy ắp thông tin, thiết kế tối giản nổi lên như một làn gió mới, mang lại sự rõ ràng và tập trung. Triết lý "less is more" không chỉ là về việc loại bỏ những yếu tố không cần thiết, mà còn là về việc làm nổi bật những gì thực sự quan trọng.</p>
      <p>Một giao diện người dùng sạch sẽ, với không gian trắng được sử dụng hợp lý, font chữ dễ đọc và hệ thống điều hướng trực quan, sẽ giúp người dùng dễ dàng tìm thấy thông tin họ cần và có một trải nghiệm mượt mà hơn. Điều này đặc biệt quan trọng trong thiết kế web và ứng dụng di động, nơi sự chú ý của người dùng là có hạn.</p>
      <blockquote><p class="text-xl italic font-medium text-slate-300">"Sự hoàn hảo đạt được không phải khi không còn gì để thêm vào, mà là khi không còn gì để bỏ đi." - Antoine de Saint-Exupéry</p></blockquote>
      <p>Áp dụng thiết kế tối giản đòi hỏi sự cân nhắc kỹ lưỡng về mục tiêu của sản phẩm và nhu cầu của người dùng. Mỗi yếu tố trên trang phải có một mục đích rõ ràng. Việc loại bỏ sự lộn xộn không chỉ cải thiện tính thẩm mỹ mà còn tăng cường hiệu suất và khả năng sử dụng.</p>
      <p>Hãy nhớ rằng, sự đơn giản chính là đỉnh cao của sự tinh tế.</p>
    `
  },
  // Add more blog posts here...
];

// --- Close Icon for Modals ---
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

// --- Artistic Blog Post Detail Modal ---
const ArtisticBlogPostModal = ({ isOpen, onClose, post, gsapReady }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen && gsapReady && window.gsap && modalRef.current && contentRef.current) {
      const gsap = window.gsap;
      gsap.fromTo(modalRef.current, 
        { opacity: 0, scale: 0.9 }, 
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
      );
      gsap.fromTo(contentRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
      );
    }
  }, [isOpen, gsapReady, post]);

  if (!isOpen || !post) return null;

  return (
    <div 
        ref={modalRef}
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-lg flex items-center justify-center z-[200] p-4 transition-opacity duration-300 ease-out"
        onClick={onClose} // Close on backdrop click
    >
      <div 
        className="relative bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 text-slate-200 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden cursor-default" // Darker gradient
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking on modal content
      >
        <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-sky-400 transition-colors z-20 p-2 bg-slate-700/50 hover:bg-slate-600/80 rounded-full" // Adjusted for dark theme
            aria-label="Đóng bài viết"
        >
            <CloseIcon />
        </button>

        {post.image && (
            <div className="w-full h-56 md:h-72 lg:h-80 overflow-hidden rounded-t-xl">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover"/>
            </div>
        )}
        
        <div className="overflow-y-auto flex-grow" ref={contentRef}>
            <div className="p-6 md:p-8 lg:p-10">
                <h2 
                    className="text-3xl md:text-4xl font-bold mb-3 text-sky-400" // Adjusted for dark theme
                    style={{ fontFamily: 'Playfair Display, serif' }}
                >
                    {post.title}
                </h2>
                <div className="flex items-center space-x-4 text-xs md:text-sm text-slate-400 mb-6"> {/* Adjusted for dark theme */}
                    <span>{post.date}</span>
                    {post.category && <span>&bull; {post.category}</span>}
                    {post.readingTime && <span>&bull; {post.readingTime}</span>}
                </div>

                <div 
                    className="prose prose-lg max-w-none prose-invert {/* prose-slate changed to prose-invert for dark theme */}
                               first-letter:text-6xl first-letter:font-bold first-letter:text-sky-400 {/* Adjusted for dark theme */}
                               first-letter:mr-3 first-letter:float-left first-letter:leading-none
                               prose-headings:font-serif prose-headings:text-sky-500 {/* Adjusted for dark theme */}
                               prose-blockquote:border-sky-600 prose-blockquote:text-slate-300 {/* Adjusted for dark theme */}
                               prose-a:text-sky-400 hover:prose-a:text-sky-300" // Adjusted for dark theme
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                    dangerouslySetInnerHTML={{ __html: post.fullContent || "<p>Nội dung đang được cập nhật...</p>" }}
                >
                </div>

                {post.tags && post.tags.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-slate-700"> {/* Adjusted for dark theme */}
                        <h4 className="text-sm font-semibold text-slate-400 mb-3">Tags:</h4> {/* Adjusted for dark theme */}
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 text-xs bg-sky-800 text-sky-300 rounded-full"> {/* Adjusted for dark theme */}
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};


// --- Original Modal Component (for Suggest Ideas & Summarize) ---
const OriginalModal = ({ isOpen, onClose, title, children }) => {
  // This modal is already dark-themed, so no major changes needed here unless desired
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[150] p-4">
      <div className="bg-gray-800 text-gray-100 rounded-lg shadow-2xl w-full max-w-2xl max-h-[85vh] p-6 md:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 transition-colors"
          aria-label="Đóng modal"
        >
          <CloseIcon />
        </button>
        <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-yellow-400" style={{ fontFamily: 'Montserrat, sans-serif' }}>{title}</h3>
        <div className="overflow-y-auto max-h-[calc(85vh-120px)] pr-2 text-gray-300 prose prose-invert prose-sm sm:prose-base" style={{ fontFamily: 'Merriweather, serif' }}>
          {children}
        </div>
      </div>
    </div>
  );
};


const BlogSection = ({ gsapReady }) => {
  const scrollContainerRef = useRef(null);
  const [isOriginalModalOpen, setIsOriginalModalOpen] = useState(false);
  const [originalModalContent, setOriginalModalContent] = useState({ title: '', content: '' });
  const [selectedPost, setSelectedPost] = useState(null); 

  const [isLoading, setIsLoading] = useState(false);
  const [ideaTopic, setIdeaTopic] = useState('');

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5); 
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
        checkScrollability(); 
        container.addEventListener('scroll', checkScrollability, { passive: true });
        window.addEventListener('resize', checkScrollability);
        
        const images = container.querySelectorAll('img');
        let loadedImages = 0;
        const totalImages = images.length;

        if (totalImages === 0) {
            checkScrollability();
        } else {
            images.forEach(img => {
                if (img.complete) {
                    loadedImages++;
                } else {
                    img.onload = () => {
                        loadedImages++;
                        if (loadedImages === totalImages) checkScrollability();
                    };
                    img.onerror = () => { 
                        loadedImages++;
                        if (loadedImages === totalImages) checkScrollability();
                    };
                }
            });
            if (loadedImages === totalImages) checkScrollability(); 
        }

        return () => {
            container.removeEventListener('scroll', checkScrollability);
            window.removeEventListener('resize', checkScrollability);
        };
    }
  }, [blogPostsData]);


  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8; 
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScrollability, 350);
    }
  };

  const callGeminiAPI = async (prompt) => {
    setIsLoading(true);
    setOriginalModalContent({ title: 'Đang xử lý...', content: 'Vui lòng chờ trong giây lát...' });

    let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiKey = "AIzaSyD2JYsWmGZOiCJXdNe419xNuzhbFqpF4Ik"; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);
        const errorMessage = errorData?.error?.message || 'Không có thông tin lỗi cụ thể.';
        throw new Error(`Lỗi API: ${response.status} ${response.statusText}. Chi tiết: ${errorMessage}`);
      }

      const result = await response.json();
      
      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        return result.candidates[0].content.parts[0].text;
      } else {
        console.error("Unexpected API response structure:", result);
        throw new Error('Không nhận được nội dung hợp lệ từ API.');
      }
    } catch (error) {
      console.error("Lỗi khi gọi Gemini API:", error);
      setOriginalModalContent({ title: 'Lỗi API', content: error.message });
      setIsOriginalModalOpen(true); 
      return null; 
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestIdeas = async () => {
    if (!ideaTopic.trim()) {
      setOriginalModalContent({ title: 'Thông báo', content: 'Vui lòng nhập chủ đề để gợi ý ý tưởng.' });
      setIsOriginalModalOpen(true);
      return;
    }
    setIsOriginalModalOpen(true); 
    const prompt = `Hãy gợi ý 5 ý tưởng tiêu đề bài blog về chủ đề "${ideaTopic}". Mỗi ý tưởng cần ngắn gọn, hấp dẫn và độc đáo. Trình bày dưới dạng danh sách có đánh số.`;
    const ideas = await callGeminiAPI(prompt);
    if (ideas) {
      const formattedIdeas = ideas.split('\n').map((idea, index) => <p key={index} className="mb-1">{idea.replace(/^\d+\.\s*/, '')}</p>);
      setOriginalModalContent({ title: `✨ Ý tưởng cho chủ đề: ${ideaTopic}`, content: formattedIdeas });
    }
  };

  const handleSummarizePost = async (excerpt, title) => {
    setIsOriginalModalOpen(true); 
    const prompt = `Tóm tắt đoạn văn sau thành 2-3 câu ngắn gọn, giữ lại ý chính và làm cho nó hấp dẫn hơn. Đoạn văn: "${excerpt}"`;
    const summary = await callGeminiAPI(prompt);
    if (summary) {
      setOriginalModalContent({ title: `✨ Tóm tắt: ${title}`, content: <p>{summary}</p> });
    }
  };

  const handleReadMore = async (post) => {
    if (!post.fullContent) {
        setIsLoading(true); 
        setIsOriginalModalOpen(true); 
        setOriginalModalContent({ title: 'Đang tải bài viết...', content: 'Vui lòng chờ trong giây lát...' });
        
        const prompt = `Bạn là một blogger chuyên nghiệp. Hãy viết một bài blog hoàn chỉnh dựa trên thông tin sau:\n\nTiêu đề: "${post.title}"\nĐoạn trích/Ý chính: "${post.excerpt}"\n\nBài viết cần có cấu trúc rõ ràng (mở bài, các đoạn thân bài được phân tách rõ ràng, kết bài), nội dung sâu sắc, hấp dẫn và có độ dài khoảng 400-600 từ. Sử dụng ngôn ngữ tự nhiên, dễ hiểu. Xuất ra dưới dạng HTML hợp lệ, sử dụng thẻ <p> cho các đoạn văn, <img> cho hình ảnh nếu có (sử dụng placeholder nếu không có ảnh cụ thể), <blockquote> cho trích dẫn.`;
        const generatedHtmlContent = await callGeminiAPI(prompt);
        
        setIsLoading(false);
        setIsOriginalModalOpen(false); 

        if (generatedHtmlContent) {
            setSelectedPost({ ...post, fullContent: generatedHtmlContent });
        } else {
            setOriginalModalContent({ title: 'Lỗi tải bài viết', content: 'Không thể tạo nội dung bài viết. Vui lòng thử lại.' });
            setIsOriginalModalOpen(true);
        }
    } else {
        setSelectedPost(post); 
    }
  };


  return (
    <section id="blog" className="min-h-screen py-20 px-0 md:px-6 bg-slate-900 text-slate-200 overflow-hidden"> {/* Main background to dark */}
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8 px-4 md:px-0">
            <h2 className="text-4xl md:text-5xl font-bold text-sky-400" style={{ fontFamily: 'Playfair Display, serif' }}> {/* Text color adjusted */}
            Blog & Chia Sẻ
            </h2>
            <div className="hidden md:flex items-center space-x-3">
                <button
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft || isLoading}
                    className="p-2 rounded-full bg-slate-700/70 hover:bg-sky-700 text-sky-300 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" /* Button adjusted */
                    aria-label="Cuộn sang trái"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight || isLoading}
                    className="p-2 rounded-full bg-slate-700/70 hover:bg-sky-700 text-sky-300 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" /* Button adjusted */
                    aria-label="Cuộn sang phải"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
        </div>

        <div className="mb-12 px-4 md:px-0 max-w-xl mx-auto text-center">
            <h3 className="text-xl sm:text-2xl font-semibold text-sky-500 mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Cần cảm hứng viết bài?</h3> {/* Text color adjusted */}
            <p className="text-slate-400 mb-4 text-sm sm:text-base">Nhập một chủ đề và để Gemini giúp bạn!</p> {/* Text color adjusted */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                <input 
                    type="text"
                    value={ideaTopic}
                    onChange={(e) => setIdeaTopic(e.target.value)}
                    placeholder="Nhập chủ đề (ví dụ: React, Du lịch...)"
                    className="w-full sm:w-auto flex-grow p-3 rounded-md bg-slate-800 border border-slate-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all duration-300 placeholder-slate-500 text-slate-200 shadow-sm" /* Input adjusted */
                />
                <button 
                    onClick={handleSuggestIdeas}
                    disabled={isLoading}
                    className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 disabled:bg-sky-800/50 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center shadow hover:shadow-md" /* Button adjusted */
                >
                    <span className="mr-2">✨</span> Gợi ý
                </button>
            </div>
        </div>
        
        <div 
            ref={scrollContainerRef} 
            className="flex overflow-x-auto space-x-6 md:space-x-8 pb-10 pl-4 pr-4 md:pl-2 md:pr-2 no-scrollbar"
        >
          {blogPostsData.map((post) => (
            <div
              key={post.id}
              className="blog-post-card group bg-slate-800 rounded-xl shadow-lg hover:shadow-xl w-[280px] sm:w-[320px] md:w-[350px] flex-shrink-0 overflow-hidden transform transition-all duration-300 hover:-translate-y-1.5 border border-transparent hover:border-sky-700 flex flex-col" /* Card bg and border adjusted */
            >
              <div className="h-44 sm:h-52 w-full overflow-hidden rounded-t-xl"> 
                <img
                  src={post.image}
                  alt={`Hình ảnh cho bài viết ${post.title}`}
                  className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x250/4A5568/A0AEC0?text=Image+Error"; }} /* Darker placeholder */
                />
              </div>
              <div className="p-4 md:p-5 flex flex-col flex-grow">
                <p className="text-xs text-sky-400 mb-1.5" style={{ fontFamily: 'Montserrat, sans-serif' }}> {/* Text color adjusted */}
                  {post.date} {post.category && `• ${post.category}`}
                </p>
                <h3 className="text-lg md:text-xl font-semibold mb-2.5 text-slate-100 group-hover:text-sky-300 transition-colors duration-300" style={{ fontFamily: 'Playfair Display, serif' }}> {/* Text color adjusted */}
                  {post.title}
                </h3>
                <p className="text-sm text-slate-300 mb-3 leading-relaxed flex-grow line-clamp-3" style={{ fontFamily: 'Montserrat, sans-serif' }}> {/* Text color adjusted */}
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-2.5 border-t border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5"> {/* Border adjusted */}
                    <button
                        onClick={() => handleReadMore(post)}
                        disabled={isLoading && selectedPost?.id !== post.id} 
                        className="inline-flex items-center text-sky-400 font-semibold hover:text-sky-300 transition-colors duration-300 disabled:opacity-60 text-sm group/readmore" /* Text color adjusted */
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                        Đọc thêm
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 transform transition-transform duration-300 group-hover/readmore:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        onClick={() => handleSummarizePost(post.excerpt, post.title)}
                        disabled={isLoading}
                        className="text-xs bg-teal-600 hover:bg-teal-700 disabled:bg-teal-800/50 text-white font-medium py-1.5 px-3 rounded-md transition-colors duration-300 flex items-center justify-center shadow-sm hover:shadow" /* Button adjusted for dark theme */
                    >
                       <span className="mr-1">✨</span> Tóm tắt
                    </button>
                </div>
              </div>
            </div>
          ))}
           <div className="flex-shrink-0 w-1 md:w-4"></div> 
        </div>
      </div>

      {/* Original Modal for Suggest/Summarize - Already dark-themed */}
      <OriginalModal 
        isOpen={isOriginalModalOpen} 
        onClose={() => { 
            if (!isLoading) { 
                setIsOriginalModalOpen(false);
            }
        }}
        title={originalModalContent.title}
      >
        {isLoading && originalModalContent.title === 'Đang xử lý...' ? ( 
            <div className="flex flex-col justify-center items-center py-8 min-h-[200px]">
                <svg className="animate-spin h-10 w-10 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="ml-3 mt-4 text-lg">{originalModalContent.content}</p>
            </div>
        ) : (
            originalModalContent.content 
        )}
      </OriginalModal>

      {/* New Artistic Modal for Full Blog Post - Dark theme applied */}
      <ArtisticBlogPostModal 
        isOpen={!!selectedPost} 
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
        gsapReady={gsapReady}
      />
    </section>
  );
};

export default BlogSection;
