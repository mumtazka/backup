import { Github, Instagram, Linkedin, MessageCircle, Twitter } from 'lucide-react';
import { socialLinks } from '../data';

const iconMap = {
  LinkedIn: Linkedin,
  GitHub: Github,
  WhatsApp: MessageCircle,
  Instagram: Instagram,
  Twitter: Twitter,
} as const;

const SocialSidebar = () => {
  return (
    <>
      <aside className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-20">
        <div className="flex flex-col gap-6">
          {socialLinks.map((link, index) => {
            const Icon = iconMap[link.name as keyof typeof iconMap];

            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-500 transition-all duration-300 ${link.color} hover:scale-110 relative group`}
                style={{
                  animation: `slideInLeft 0.5s ease-out ${index * 0.1}s forwards`,
                  opacity: 0,
                }}
                aria-label={link.name}
              >
                <Icon size={26} />
                <span className="absolute left-full ml-4 px-3 py-1 bg-white text-black text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                  {link.name}
                </span>
              </a>
            );
          })}
        </div>
        <div className="mt-8 w-px h-24 bg-gradient-to-b from-muted-foreground to-transparent mx-auto" />
      </aside>

      <aside className="lg:hidden fixed bottom-6 left-6 right-6 z-20 glass rounded-full border border-white/10 shadow-2xl shadow-primary/5">
        <div className="flex justify-around items-center py-3 px-2">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.name as keyof typeof iconMap];

            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-muted-foreground transition-all duration-300 ${link.color} active:scale-95 p-2 rounded-full hover:bg-white/5`}
                aria-label={link.name}
              >
                <Icon size={22} />
              </a>
            );
          })}
        </div>
      </aside>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default SocialSidebar;
