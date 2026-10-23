import heroImage from './assets/vibe.webp';
import programmingIcon from './assets/code.webp';
import programmingBg from './assets/codebg.webp';
import aiIcon from './assets/ai.webp';
import aiBg from './assets/aibg.webp';
import softSkillIcon from './assets/handshake.webp';
import softSkillBg from './assets/skillbg.webp';
import metrolistCover from './assets/metrolist-desktop.webp';
import metrolistImage1 from './assets/metrolist-desktop.webp';
import metrolistImage2 from './assets/metrolist-desktop-detail.webp';
import metrolistSettings from './assets/metrolist-settings.webp';
import metrolistListenTogether from './assets/metrolist-listen-together.webp';
import metrolistLyrics from './assets/metrolist-lyrics.webp';
import simpelCover from './assets/simpel.webp';
import simpelImage1 from './assets/simpel.webp';
import simpelImage2 from './assets/simpel2.webp';
import simpelImage3 from './assets/simpel3.webp';
import simpelImage4 from './assets/simpel4.webp';
import resumeFile from './assets/cv.pdf';

export type NavItem = {
  id: string;
  label: string;
};

export type SocialLink = {
  name: string;
  url: string;
  color: string;
};

export type SkillCategory = {
  name: string;
  icon: string;
  bgImage: string;
  description: string;
};

export type ProjectItem = {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  technologies: string[];
  cover: string;
  images: string[];
  url?: string;
};

export type EducationItem = {
  id: number;
  institution: string;
  degree: string;
  duration: string;
  description: string;
  status: 'current' | 'completed';
};

export type CertificationItem = {
  id: number;
  title: string;
  issuer: string;
  year: string;
  description: string;
};

export const profile = {
  name: 'Mumtaz Kholafiyan Alfan',
  title: 'Informatics Undergraduate',
  location: 'Semarang, Indonesia',
  phone: '+62 858 0121 4943',
  email: 'mumtazalfan1307@gmail.com',
  bio: 'I am an undergraduate Informatics student at Diponegoro University who enjoys turning curious ideas into thoughtful digital experiences. I build with modern web technologies, learn in public, and keep exploring where software, design, and AI meet.',
  heroImage,
  socialMedia: {
    github: 'https://github.com/mumtazka',
    linkedin: 'https://linkedin.com/in/mumtazalfan',
    instagram: 'https://instagram.com/mumtazzka_',
    twitter: 'https://twitter.com/mumtazalfan',
    whatsapp: 'https://wa.me/6285801214943',
  },
} as const;

export const navigation: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
];

export const socialLinks: SocialLink[] = [
  { name: 'LinkedIn', url: profile.socialMedia.linkedin, color: 'hover:text-blue-400' },
  { name: 'GitHub', url: profile.socialMedia.github, color: 'hover:text-white' },
  { name: 'WhatsApp', url: profile.socialMedia.whatsapp, color: 'hover:text-green-400' },
  { name: 'Instagram', url: profile.socialMedia.instagram, color: 'hover:text-pink-400' },
  { name: 'Twitter', url: profile.socialMedia.twitter, color: 'hover:text-sky-400' },
];

export const skillCategories: SkillCategory[] = [
  {
    name: 'Programming',
    icon: programmingIcon,
    bgImage: programmingBg,
    description:
      'Experienced with React, TypeScript, SQL databases, backend APIs, hosting, domains, and server setup.',
  },
  {
    name: 'AI',
    icon: aiIcon,
    bgImage: aiBg,
    description:
      'Strong in prompt engineering, automation, AI feature integration, and understanding how AI systems behave.',
  },
  {
    name: 'Soft Skills',
    icon: softSkillIcon,
    bgImage: softSkillBg,
    description:
      'Good teamwork, responsibility, adaptability, and writing clarity. Speaking confidence needs a bit of improvement.',
  },
];

export const projects: ProjectItem[] = [
  {
    id: 1,
    title: 'Metrolist Desktop Music Player',
    category: 'Open-source Desktop App',
    year: '2025',
    description: 'A Kotlin desktop music player born from boredom and a small rebellion against expensive Spotify subscriptions. Still under development, and everyone is welcome to contribute.',
    technologies: ['Kotlin', 'Compose Desktop', 'Open source'],
    cover: metrolistCover,
    images: [metrolistImage1, metrolistImage2, metrolistSettings, metrolistListenTogether, metrolistLyrics],
  },
  {
    id: 2,
    title: 'SIMPEL_Kuliah',
    category: 'Internship project',
    year: '2025',
    description: 'A web platform for managing equipment loans, room bookings, and service reports for Vokasi UNY. I worked on debugging, adding features, and improving the overall experience.',
    technologies: ['React', 'TypeScript', 'Supabase'],
    cover: simpelCover,
    images: [simpelImage1, simpelImage2, simpelImage3, simpelImage4],
    url: 'http://simpel-kuliah.netlify.app/',
  },
];

export const education: EducationItem[] = [
  {
    id: 1,
    institution: 'Universitas Diponegoro',
    degree: 'S1 Informatika',
    duration: '2026 - Present',
    description: 'Undergraduate student focused on software development, computing fundamentals, and building useful products.',
    status: 'current',
  },
  {
    id: 2,
    institution: 'SMK Negeri 2 Pengasih',
    degree: 'TJKT',
    duration: '2023 - 2026',
    description: 'Studied computer networks, system administration, and the foundations that led me into software development.',
    status: 'completed',
  },
];

export const certifications: CertificationItem[] = [
  {
    id: 1,
    title: 'Generative AI',
    issuer: 'Microsoft & LinkedIn',
    year: '2024',
    description: 'Basic of AI Generative',
  },
  {
    id: 2,
    title: 'AI and Robotics',
    issuer: 'Electronic Engineering UNY',
    year: '2025',
    description: 'Robotics and AI Integration',
  },
];

export { heroImage, resumeFile };
