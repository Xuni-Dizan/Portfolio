import React, { useState } from 'react';

// Placeholder cho các icon mạng xã hội (sử dụng SVG hoặc một thư viện icon như Lucide React sau này)
const FacebookIcon = () => <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.81C10.44 7.31 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>;
const InstagramIcon = () => <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/></svg>;
const LinkedInIcon = () => <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"/></svg>;
const GitHubIcon = () => <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21V19.21C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.83,16.41C14.17,16.72 14.5,17.33 14.5,18.26V21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/></svg>;


const ContactSection = ({ gsapReady }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Simulate API call
    try {
      // Đây là nơi bạn sẽ thực hiện API call thực tế (ví dụ: dùng fetch hoặc axios)
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
      console.log("Form data submitted:", formData); // Log ra console để kiểm tra
      await new Promise(resolve => setTimeout(resolve, 1500)); // Giả lập độ trễ mạng
      
      setSubmitMessage('Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công.');
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitMessage('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Hiệu ứng cho các input field khi focus
  // Tailwind CSS đã có sẵn các pseudo-class như focus:border-yellow-500, focus:ring-yellow-500
  // nên không cần thêm JS phức tạp cho micro-interaction cơ bản này.

  // Hiệu ứng floating cho icon mạng xã hội (CSS Animation)
  // CSS sẽ được thêm vào global style hoặc inline trong JSX nếu cần
  // Ví dụ:
  // @keyframes float {
  //   0% { transform: translateY(0px); }
  //   50% { transform: translateY(-8px); }
  //   100% { transform: translateY(0px); }
  // }
  // .social-icon:hover { animation: float 1.5s ease-in-out infinite; }

  const socialLinks = [
    { name: 'Facebook', icon: <FacebookIcon />, href: '#', animationDelay: '0s' },
    { name: 'Instagram', icon: <InstagramIcon />, href: '#', animationDelay: '0.1s' },
    { name: 'LinkedIn', icon: <LinkedInIcon />, href: '#', animationDelay: '0.2s' },
    { name: 'GitHub', icon: <GitHubIcon />, href: '#', animationDelay: '0.3s' },
  ];


  return (
    <section id="contact" className="py-20 md:py-28 px-4 bg-black text-gray-300">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-yellow-400" style={{ fontFamily: 'Abril Fatface, cursive' }}>
          Kết Nối Với Tôi
        </h2>
        <p className="mb-10 md:mb-12 text-lg text-gray-400 max-w-xl mx-auto" style={{ fontFamily: 'Merriweather, serif' }}>
          Tôi luôn sẵn lòng lắng nghe những ý tưởng mới, cơ hội hợp tác, hoặc đơn giản là một lời chào. Đừng ngần ngại liên hệ!
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 text-left bg-gray-900 p-8 md:p-10 rounded-xl shadow-2xl">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Tên của bạn</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              placeholder="Ví dụ: Nguyễn Văn A" 
              required
              className="w-full p-3.5 rounded-md bg-gray-800 border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 outline-none transition-all duration-300 placeholder-gray-500 text-white shadow-sm" 
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="ban@email.com" 
              required
              className="w-full p-3.5 rounded-md bg-gray-800 border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 outline-none transition-all duration-300 placeholder-gray-500 text-white shadow-sm" 
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Nội dung tin nhắn</label>
            <textarea 
              id="message" 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              placeholder="Hãy cho tôi biết bạn đang nghĩ gì..." 
              rows="5" 
              required
              className="w-full p-3.5 rounded-md bg-gray-800 border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 outline-none transition-all duration-300 placeholder-gray-500 text-white shadow-sm resize-none"
            ></textarea>
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-700 text-gray-900 font-bold py-3.5 px-10 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 shadow-lg hover:shadow-yellow-500/30"
          >
            {isSubmitting ? 'Đang gửi...' : 'Gửi Tin Nhắn'}
          </button>
          {submitMessage && (
            <p className={`mt-4 text-sm ${submitMessage.includes('lỗi') ? 'text-red-400' : 'text-green-400'}`}>
              {submitMessage}
            </p>
          )}
        </form>

        <div className="mt-16 md:mt-20">
          <p className="mb-6 text-lg text-gray-400" style={{ fontFamily: 'Montserrat, sans-serif' }}>Hoặc tìm tôi trên mạng xã hội:</p>
          <div className="flex justify-center space-x-5 md:space-x-6">
            {socialLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                aria-label={link.name} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon text-gray-400 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-gray-700/50"
                // style={{ animationDelay: link.animationDelay }} // Dùng nếu có animation CSS 'float'
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* CSS cho animation floating (nếu không dùng Tailwind plugin cho animation) */}
      <style jsx global>{`
        .social-icon {
          animation: float 3s ease-in-out infinite;
        }
        .social-icon:nth-child(1) { animation-delay: 0s; }
        .social-icon:nth-child(2) { animation-delay: 0.2s; }
        .social-icon:nth-child(3) { animation-delay: 0.4s; }
        .social-icon:nth-child(4) { animation-delay: 0.6s; }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
