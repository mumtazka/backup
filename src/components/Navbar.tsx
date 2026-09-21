import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navigation } from '../data';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const current = ['home', 'about', 'skills', 'experience', 'projects', 'education'].find((id) => {
        const element = document.getElementById(id);
        if (!element) return false;

        const bounds = element.getBoundingClientRect();
        return bounds.top <= 100 && bounds.bottom >= 100;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'shadow-lg' : ''}`}
      style={{
        backgroundColor: scrolled ? 'rgba(9, 25, 47, 0.7)' : 'rgba(9, 25, 47, 0.9)',
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            data-cursor
            className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="text-foreground">Mumtaz</span>
            <span className="text-primary">.</span>
          </button>
          <nav className="nav-dock hidden md:flex items-center gap-1 p-1 rounded-full border border-white/5 bg-background/20">
            {navigation.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                data-cursor
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                  activeSection === item.id
                    ? 'text-primary bg-primary/10 nav-dock__item--active'
                    : 'text-gray-300 hover:text-foreground hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            data-cursor
            className="md:hidden p-2 text-foreground hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          className="md:hidden border-t"
          style={{
            backgroundColor: 'rgba(9, 25, 47, 0.7)',
            backdropFilter: 'blur(12px) saturate(180%)',
            WebkitBackdropFilter: 'blur(12px) saturate(180%)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-300 hover:text-foreground hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
