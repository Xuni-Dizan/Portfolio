import React, { useState, useEffect, useRef } from 'react';

// Dữ liệu testimonials mẫu
const testimonialsData = [
  {
    id: 1,
    quote: "Thật sự ấn tượng với sự chuyên nghiệp và sáng tạo mà bạn mang lại. Website không chỉ đẹp mà còn truyền tải đúng thông điệp cá nhân. Chắc chắn sẽ giới thiệu cho nhiều người!",
    author: "Nguyễn Văn An",
    company: "Giám đốc Sáng tạo, Alpha Agency",
    avatar: "https://placehold.co/100x100/8B5CF6/FFFFFF?text=NA" // Màu tím
  },
  {
    id: 2,
    quote: "Trải nghiệm làm việc cùng bạn rất tuyệt vời. Bạn không chỉ lắng nghe ý tưởng mà còn đưa ra những giải pháp vượt trội. Sản phẩm cuối cùng vượt xa mong đợi của tôi.",
    author: "Trần Thị Bích",
    company: "Nhà sáng lập, Beta Startup",
    avatar: "https://placehold.co/100x100/EC4899/FFFFFF?text=TB" // Màu hồng
  },
  {
    id: 3,
    quote: "Phong cách thiết kế độc đáo và cá tính, kết hợp với hiệu năng mượt mà. Đây thực sự là một website cá nhân đẳng cấp, thể hiện rõ nét con người bạn.",
    author: "Lê Minh Cường",
    company: "Nhiếp ảnh gia Tự do",
    avatar: "https://placehold.co/100x100/10B981/FFFFFF?text=LC" // Màu xanh lá
  },
  {
    id: 4,
    quote: "Tôi đặc biệt thích cách bạn kể chuyện qua từng chi tiết nhỏ trên website. Nó tạo ra một kết nối cảm xúc mạnh mẽ với người xem. Rất đáng để tham khảo!",
    author: "Phạm Thuỳ Dung",
    company: "Blogger & Content Creator",
    avatar: "https://placehold.co/100x100/F59E0B/FFFFFF?text=PD" // Màu cam
  }
];

// Icon cho nút điều khiển carousel
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);


const TestimonialsSection = ({ gsapReady, yourName = "Bạn" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const quoteRef = useRef(null);
  const authorRef = useRef(null);
  const companyRef = useRef(null);
  const avatarRef = useRef(null);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    if (gsapReady && window.gsap) {
      const elementsToAnimate = [quoteRef.current, authorRef.current, companyRef.current, avatarRef.current];
      elementsToAnimate.forEach(el => {
        if (el) {
          window.gsap.fromTo(el,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.1 }
          );
        }
      });
    }
  }, [currentIndex, gsapReady]);

  const currentTestimonial = testimonialsData[currentIndex];

  return (
    <section id="testimonials" className="py-20 md:py-28 px-4 bg-gray-900 text-gray-100">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 md:mb-20 text-yellow-400" style={{ fontFamily: 'Abril Fatface, cursive' }}>
          Phản Hồi Từ Cộng Đồng
        </h2>

        <div className="relative max-w-3xl mx-auto bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl overflow-hidden">
          {/* Nút điều khiển */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-5 top-1/2 transform -translate-y-1/2 bg-gray-700/50 hover:bg-yellow-500/80 text-white hover:text-gray-900 p-2 rounded-full transition-all duration-300 z-10 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-5 top-1/2 transform -translate-y-1/2 bg-gray-700/50 hover:bg-yellow-500/80 text-white hover:text-gray-900 p-2 rounded-full transition-all duration-300 z-10 focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon />
          </button>

          {/* Nội dung Testimonial */}
          <div className="text-center">
            <div ref={avatarRef} className="mb-6">
                <img 
                    src={currentTestimonial.avatar} 
                    alt={`Avatar của ${currentTestimonial.author}`} 
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full mx-auto object-cover border-4 border-yellow-400 shadow-lg"
                />
            </div>
            <p ref={quoteRef} className="text-lg md:text-xl italic text-gray-300 mb-8 min-h-[100px] md:min-h-[120px]" style={{ fontFamily: 'Playfair Display, serif' }}>
              "{currentTestimonial.quote.replace('bạn', yourName).replace('Bạn', yourName)}" {/* Cá nhân hóa tên */}
            </p>
            <p ref={authorRef} className="text-xl font-semibold text-yellow-400" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              - {currentTestimonial.author}
            </p>
            <p ref={companyRef} className="text-sm text-gray-400 mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {currentTestimonial.company}
            </p>
          </div>
          
          {/* Dấu chấm chỉ vị trí (optional) */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-yellow-400 scale-125' : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
