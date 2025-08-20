import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './styles/theme.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import useRevealOnScroll from './hooks/useRevealOnScroll';

const root = ReactDOM.createRoot(document.getElementById('root'));
function Root() {
  useRevealOnScroll();
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
