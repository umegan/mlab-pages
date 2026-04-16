import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import mlabLogo from '../../features/contact/images/MLab_logo1.png';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Navbar = ({ onNavigate, currentPage }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    { label: 'ニュース', route: 'news' },
    { label: '研究', route: 'research' },
    { label: '業績', route: 'achievements' },
    { label: 'お問い合わせ', route: 'contact' }
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page.toLowerCase());
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#F9F5F0]/95 backdrop-blur-sm border-b border-[#344F1F]/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <img src={mlabLogo} alt="MLab logo" className="h-20 w-auto mr-3 object-contain" />
            <span className="text-[#344F1F] text-lg sm:text-xl font-bold tracking-tight group-hover:text-[#F4991A] transition-colors">
              ロボットビジョン・Spatial AI（松岡）研究室
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                className={`px-3 py-2 text-sm font-bold transition-colors ${
                  currentPage === item.route
                    ? 'text-[#F4991A]'
                    : 'text-[#344F1F] hover:text-[#F4991A]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#344F1F] hover:bg-[#F2EAD3] focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Announcement Banner */}
      <div className="bg-[#F4991A] text-white text-xs sm:text-sm py-1.5 px-4 flex items-center justify-center gap-4 font-medium tracking-wide">
        <span>🚧 このサイトはただいま更新中です</span>
        <button
          onClick={() => handleNavClick('contact')}
          className="underline underline-offset-2 hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          見学などのお問い合わせはこちら →
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#F9F5F0] border-t border-[#344F1F]/10 h-screen overflow-y-auto">
          <div className="px-4 pt-8 pb-20 space-y-4">
            {menuItems.map((item) => (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                className={`block w-full text-left px-3 py-4 text-xl font-bold border-b border-[#344F1F]/10 ${
                   currentPage === item.route
                    ? 'text-[#F4991A]'
                    : 'text-[#344F1F]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
