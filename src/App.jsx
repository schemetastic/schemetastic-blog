import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import TagPage from './pages/TagPage';

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <Router>
      <div className="page-wrapper">
        <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<PostPage />} />
            <Route path="/tags" element={<TagPage />} />
          </Routes>
        </main>
        
        <Footer />
        
        {isSearchOpen && (
          <SearchModal onClose={() => setIsSearchOpen(false)} />
        )}
      </div>
    </Router>
  );
}

export default App;
