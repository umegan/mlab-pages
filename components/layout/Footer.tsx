import { Microscope } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer = ({ onNavigate }: FooterProps) => {
  const links = ['About', 'News', 'Research', 'Achievements', 'Contact'];

  return (
    <footer className="bg-[#344F1F] text-[#F9F5F0]">
      <div className="max-w-[1440px] mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left: Logo + Title */}
          <div className="flex items-center space-x-2">
            <Microscope className="w-6 h-6 text-[#F9F5F0]" />
            <span className="text-lg font-bold tracking-tight">ロボットビジョン・Spatial AI（松岡）研究室</span>
          </div>

          {/* Center/Right: Links */}
          <nav>
            <ul className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8">
              {links.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate(item.toLowerCase())}
                    className="text-sm font-medium hover:text-[#F4991A] transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-8 pt-4 border-t border-[#F9F5F0]/20 text-center md:text-left">
          <p className="text-xs text-[#F9F5F0]/80">
            © 2024 Robot Vision & Spatial AI Lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
