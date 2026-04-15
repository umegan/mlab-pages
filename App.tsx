import { useMemo } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
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
import { ResearchProjectDetailPage } from './features/research/ResearchProjectDetailPage';
import { ContactPage } from './features/contact/ContactPage';
import { AchievementsPage } from './features/achievements/AchievementsPage';

function HomePage({
  onNavigate,
  onSelectNews,
}: {
  onNavigate: (page: string) => void;
  onSelectNews: (id: string) => void;
}) {
  return (
    <>
      <HeroNew onNavigate={onNavigate} />
      <LabIntro onNavigate={onNavigate} />
      <ResearchAxes />
      <FutureLab />
      <NewsModern onNavigate={onNavigate} onSelectNews={onSelectNews} />
      <RecentAchievements onNavigate={onNavigate} />
    </>
  );
}

function NewsDetailRoute({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { newsId } = useParams<{ newsId: string }>();

  if (!newsId) {
    return <Navigate to="/news" replace />;
  }

  return <NewsDetailPage newsId={newsId} onNavigate={onNavigate} />;
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const pagePathMap: Record<string, string> = {
    about: '/',
    achievements: '/achievements',
    contact: '/contact',
    home: '/',
    news: '/news',
    research: '/research',
  };

  const handleNavigate = (page: string) => {
    const path = pagePathMap[page.toLowerCase()] ?? '/';
    navigate(path);
  };

  const navigateToNewsDetail = (id: string) => {
    navigate(`/news/${id}`);
  };

  const currentPage = useMemo(() => {
    const pathname = location.pathname.toLowerCase();
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/news')) return 'news';
    if (pathname.startsWith('/research')) return 'research';
    if (pathname.startsWith('/achievements')) return 'achievements';
    if (pathname.startsWith('/contact')) return 'contact';
    return 'home';
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#F9F5F0] font-sans selection:bg-[#F4991A]/30 flex flex-col">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-grow fade-in">
        <Routes>
          <Route
            path="/"
            element={<HomePage onNavigate={handleNavigate} onSelectNews={navigateToNewsDetail} />}
          />
          <Route path="/news" element={<NewsPage onSelectNews={navigateToNewsDetail} />} />
          <Route path="/news/:newsId" element={<NewsDetailRoute onNavigate={handleNavigate} />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/research/:projectId" element={<ResearchProjectDetailPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
