import React from 'react';
import ReactDOM from 'react-dom/client'; // Sử dụng createRoot cho React 18+
import './index.css'; // File CSS toàn cục (bao gồm cả cấu hình Tailwind nếu có, hoặc các style base)
import App from './App';
// import reportWebVitals from './reportWebVitals'; // Bạn có thể bật lại nếu muốn đo performance

// Tìm phần tử root trong HTML
const rootElement = document.getElementById('root');

// Tạo một root instance
const root = ReactDOM.createRoot(rootElement);

// Render ứng dụng App vào root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
