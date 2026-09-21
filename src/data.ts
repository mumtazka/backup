import heroImage from './assets/vibe.webp';
import programmingIcon from './assets/code.webp';
import programmingBg from './assets/codebg.webp';
import aiIcon from './assets/ai.webp';
import aiBg from './assets/aibg.webp';
import softSkillIcon from './assets/handshake.webp';
import softSkillBg from './assets/skillbg.webp';
import personalCover from './assets/perangkat1.webp';
import personalImage1 from './assets/perangkat1.webp';
import personalImage2 from './assets/perangkat2.webp';
import personalImage3 from './assets/perangkat3.webp';
import personalImage4 from './assets/perangkat4.webp';
import ubuntuCover from './assets/belajar1.webp';
import ubuntuImage1 from './assets/belajar1.webp';
import ubuntuImage2 from './assets/belajar2.webp';
import ubuntuImage3 from './assets/belajar3.webp';
import ubuntuImage4 from './assets/belajar4.webp';
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
  { id: 'contact', label: 'Contact' },
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
    title: 'Website about Personal Devices',
    category: 'Personal Project',
    year: '2025',
    description: 'Static website showcasing my personal devices.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    cover: personalCover,
    images: [personalImage1, personalImage2, personalImage3, personalImage4],
  },
  {
    id: 2,
    title: 'Learning Ubuntu Server',
    category: 'School Project',
    year: '2025',
    description: 'Website to learn server configuration.',
    technologies: ['HTML', 'Tailwind CSS', 'Alpine.js'],
    cover: ubuntuCover,
    images: [ubuntuImage1, ubuntuImage2, ubuntuImage3, ubuntuImage4],
  },
  {
    id: 3,
    title: 'SIMPEL_Kuliah',
    category: 'Internship project',
    year: '2025',
    description: 'Debug, add features and optimizing',
    technologies: ['React', 'TypeScript', 'Supabase'],
    cover: simpelCover,
    images: [simpelImage1, simpelImage2, simpelImage3, simpelImage4],
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
