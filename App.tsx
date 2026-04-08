import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroNew } from './features/home/components/HeroNew';
import { ResearchAxes } from './features/home/components/ResearchAxes';
import { FutureLab } from './features/home/components/FutureLab';
import { NewsModern } from './features/home/components/NewsModern';
import { RecentAchievements } from './features/home/components/RecentAchievements';
import { LabIntro } from './features/home/components/LabIntro';

// Pages
import { NewsPage } from './features/news/NewsPage';
import { NewsDetailPage } from './features/news/NewsDetailPage';
import { ResearchPage } from './features/research/ResearchPage';
import { ContactPage } from './features/contact/ContactPage';
import { AchievementsPage } from './features/achievements/AchievementsPage';
import { MembersPage } from './features/members/MembersPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);

  const navigateToNewsDetail = (id: string) => {
    setSelectedNewsId(id);
    setCurrentPage('news-detail');
  };

  const renderPage = () => {
    switch (currentPage.toLowerCase()) {
      case 'home':
        return (
          <>
            <HeroNew onNavigate={setCurrentPage} />
            <LabIntro onNavigate={setCurrentPage} />
            <ResearchAxes />
            <FutureLab />
            <NewsModern onNavigate={setCurrentPage} onSelectNews={navigateToNewsDetail} />
            <RecentAchievements onNavigate={setCurrentPage} />
          </>
        );
      case 'news':
        return <NewsPage />;
      case 'news-detail':
        return selectedNewsId
          ? <NewsDetailPage newsId={selectedNewsId} onNavigate={setCurrentPage} />
          : <NewsPage />;
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
            <LabIntro onNavigate={setCurrentPage} />
            <ResearchAxes />
            <FutureLab />
            <NewsModern onNavigate={setCurrentPage} onSelectNews={navigateToNewsDetail} />
            <RecentAchievements onNavigate={setCurrentPage} />
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