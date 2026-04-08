import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroNew } from './features/home/components/HeroNew';
import { ResearchAxes } from './features/home/components/ResearchAxes';
import { FutureLab } from './features/home/components/FutureLab';
import { NewsModern } from './features/home/components/NewsModern';

// Pages
import { AboutPage } from './features/about/AboutPage';
import { NewsPage } from './features/news/NewsPage';
import { ResearchPage } from './features/research/ResearchPage';
import { ContactPage } from './features/contact/ContactPage';
import { AchievementsPage } from './features/achievements/AchievementsPage';
import { MembersPage } from './features/members/MembersPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage.toLowerCase()) {
      case 'home':
        return (
          <>
            <HeroNew onNavigate={setCurrentPage} />
            <ResearchAxes />
            <FutureLab />
            <NewsModern />
          </>
        );
      case 'about':
        return <AboutPage />;
      case 'news':
        return <NewsPage />;
      case 'research':
        return <ResearchPage />;
      case 'achievements':
        return <AchievementsPage />;
      case 'members':
        return <MembersPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return (
           <>
            <HeroNew onNavigate={setCurrentPage} />
            <ResearchAxes />
            <FutureLab />
            <NewsModern />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F5F0] font-sans selection:bg-[#F4991A]/30 flex flex-col">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="flex-grow fade-in">
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;