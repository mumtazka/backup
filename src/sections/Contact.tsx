import { useMemo, useRef, useState, type FormEvent } from 'react';
import { CheckCircle2, Github, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Twitter } from 'lucide-react';
import { profile, socialLinks } from '../data';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTilt } from '../hooks/useTilt';

const iconMap = {
  LinkedIn: Linkedin,
  GitHub: Github,
  WhatsApp: MessageCircle,
  Instagram: Instagram,
  Twitter: Twitter,
} as const;

const Contact = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [feedback, setFeedback] = useState('');

  const year = useMemo(() => new Date().getFullYear(), []);
  useScrollReveal(footerRef);
  useTilt(footerRef);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setProgress(0);
    setFeedback('');

    const duration = 1200;
    const step = 30;
    const increment = 100 / (duration / step);

    const timer = window.setInterval(() => {
      setProgress((value) => {
        const next = value + increment;
        if (next >= 100) {
          window.clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, step);

    if (!name.trim() || !email.trim() || !message.trim()) {
      window.clearInterval(timer);
      setStatus('error');
      setFeedback('Please fill in all fields.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      window.clearInterval(timer);
      setStatus('error');
      setFeedback('Please enter a valid email address.');
      return;
    }

    await new Promise((resolve) => window.setTimeout(resolve, duration));
    window.clearInterval(timer);
    setStatus('success');
    setProgress(100);
    setFeedback('Message prepared successfully. You can continue by opening your email app.');
    window.setTimeout(() => {
      setStatus('idle');
      setProgress(0);
      setFeedback('');
    }, 5000);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.location)}`;

  return (
    <footer ref={footerRef} id="contact" className="contact-scene relative overflow-hidden border-t border-white/5 bg-background">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl bg-primary/10" />
        <div className="absolute -bottom-64 -right-24 h-[42rem] w-[42rem] rounded-full border border-primary/15" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div data-reveal className="lg:col-span-5 space-y-8 lg:pr-8">
            <div className="space-y-5">
              <p className="text-primary text-xs font-semibold uppercase tracking-[0.24em]">Start a conversation</p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.05em] leading-none text-foreground">
                Have an idea<br />
                <span className="text-primary text-glow">worth building?</span>
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-md">{profile.bio}</p>
            </div>

            <div className="space-y-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="contact-link flex items-start gap-3 group cursor-pointer"
              >
                <div className="p-2.5 bg-card border border-white/10 rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:border-primary/50">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors">
                    {profile.location}
                  </p>
                </div>
              </a>

              <a data-cursor href={`mailto:${profile.email}`} className="contact-link flex items-start gap-3 group cursor-pointer">
                <div className="p-2.5 bg-card border border-white/10 rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:border-primary/50">
                  <Mail size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors">
                    {profile.email}
                  </p>
                </div>
              </a>

              <a data-cursor href={`tel:${profile.phone.replace(/\s/g, '')}`} className="contact-link flex items-start gap-3 group cursor-pointer">
                <div className="p-2.5 bg-card border border-white/10 rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:border-primary/50">
                  <Phone size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors">
                    {profile.phone}
                  </p>
                </div>
              </a>
            </div>

            <div className="pt-4 hidden md:block">
              <p className="text-muted-foreground/60 text-xs uppercase tracking-wider mb-4">Connect With Me</p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => {
                  const Icon = iconMap[link.name as keyof typeof iconMap];

                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 border border-white/10 rounded-lg transition-all duration-300 ${link.color} hover:scale-110 relative group bg-card hover:border-primary/30`}
                      aria-label={link.name}
                    >
                      <Icon size={20} />
                      <span className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-popover text-popover-foreground text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-white/10">
                        {link.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div data-reveal data-reveal-delay="0.12" className="lg:col-span-7">
            <div data-tilt className="contact-console tilt-panel p-6 lg:p-8 backdrop-blur-sm h-full">
              <div className="space-y-2 mb-6">
                <h3 className="text-foreground font-bold text-xl flex items-center gap-2">
                  <Mail size={24} className="text-primary" />
                  Send Me a Message
                </h3>
                <p className="text-muted-foreground text-sm">Have a project in mind? Let&apos;s talk!</p>
              </div>

              <form className="space-y-4" onSubmit={submit}>
                <div className="space-y-4">
                  <div className="group relative">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="w-full px-5 py-3.5 text-sm bg-background/50 border border-white/10 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div className="group relative">
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="w-full px-5 py-3.5 text-sm bg-background/50 border border-white/10 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div className="group relative">
                    <textarea
                      placeholder="Your message..."
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      rows={5}
                      className="w-full px-5 py-3.5 text-sm bg-background/50 border border-white/10 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                    />
                    <div className="absolute bottom-3 right-4 text-xs text-muted-foreground">
                      {message.length} characters
                    </div>
                  </div>
                </div>

                {feedback ? (
                  <div
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border ${
                      status === 'success'
                        ? 'bg-green-500/10 border-green-500/20 text-green-400'
                        : 'bg-destructive/10 border-destructive/20 text-destructive'
                    }`}
                  >
                    {status === 'success' ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                    )}
                    <span className="text-xs">{feedback}</span>
                  </div>
                ) : null}

                <button
                  type="submit"
                  data-cursor
                  disabled={status === 'submitting' || status === 'success'}
                  className={`magnetic-button w-full flex items-center justify-center gap-2 px-5 py-4 font-semibold transition-all duration-300 relative overflow-hidden active:scale-95 rounded-xl border ${
                    status === 'success'
                      ? 'bg-green-500/20 text-green-500 border-green-500/30'
                      : 'bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20'
                  } ${status === 'submitting' || status === 'success' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {status === 'submitting' ? (
                    <>
                      <div
                        className="absolute inset-0 transition-all ease-out bg-primary/20"
                        style={{ width: `${progress}%`, transition: 'width 0.1s ease-out' }}
                      />
                      <div
                        className="absolute inset-0 animate-shimmer"
                        style={{
                          width: `${progress}%`,
                          background:
                            'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                          backgroundSize: '200% 100%',
                        }}
                      />
                    </>
                  ) : null}

                  <span
                    className={`relative z-10 flex items-center gap-2 transition-all duration-300 ${
                      status === 'submitting'
                        ? 'opacity-0 scale-75'
                        : status === 'success'
                          ? 'opacity-100 scale-100 animate-slide-in'
                          : 'opacity-100 scale-100'
                    }`}
                  >
                    {status === 'success' ? (
                      <>
                        <CheckCircle2 size={20} />
                        Message sent successfully!
                      </>
                    ) : (
                      <>
                        <Mail size={20} className="transition-transform duration-300" />
                        Send Message
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6 border-t border-white/5 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-muted-foreground text-xs">© {year} {profile.name}. All rights reserved.</p>
            <p className="text-muted-foreground/60 text-xs">Without problem, life is boring</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.9);
          }
          50% {
            transform: translateY(-2px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Contact;
