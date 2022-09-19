import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { AuthProvider } from './context/AuthProvider';
import { BlogsProvider } from './context/BlogsProvider';
// import { CommentsProvider } from './context/CommentsProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
      <BlogsProvider>
      {/* <CommentsProvider> */}
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
      {/* </CommentsProvider> */}
      </BlogsProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
