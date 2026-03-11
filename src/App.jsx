import React, { useEffect, useState } from 'react';
import { Mail, Github, Linkedin, ArrowRight, ExternalLink, Menu, X, ChevronRight, Briefcase, Send, Phone, Globe, Instagram, Laptop, FileDown } from 'lucide-react';
import profileImage from './assets/profile.png';

// --- Styled Components / Assets ---

// Custom Behance Icon since it's not in Lucide
const BehanceIcon = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4H5v8h4zM9 20c2.21 0 4-1.79 4-4s-1.79-4-4-4H5v8h4z" />
    <path d="M17 12h5" />
    <path d="M17 16c0 1.1.9 2 2 2h1c1.1 0 2-.9 2-2v-1h-5v1z" />
  </svg>
);

const TornPaper = ({ children, className = "", noNotebookLines = false }) => (
  <div className={`relative bg-[#fdfdfd] shadow-xl mx-auto p-4 sm:p-6 md:p-16 border-l-[1px] border-red-200 ${className}`}
       style={{
         backgroundImage: noNotebookLines ? 'none' : 'linear-gradient(#e1e1e1 1px, transparent 1px)',
         backgroundSize: '100% 2.5rem',
         clipPath: 'polygon(0% 1%, 3% 0%, 97% 2%, 100% 0%, 99% 98%, 97% 100%, 2% 99%, 0% 97%, 1% 50%)'
       }}>
    {!noNotebookLines && (
      <>
        {/* Red notebook margin lines */}
        <div className="absolute left-10 md:left-14 top-0 bottom-0 w-[1px] bg-red-300 opacity-50"></div>
        <div className="absolute left-12 md:left-16 top-0 bottom-0 w-[1px] bg-red-300 opacity-30"></div>
      </>
    )}
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

const Doodle = ({ type, className = "" }) => {
  if (type === 'spiral') {
    return (
      <svg viewBox="0 0 100 100" className={`w-24 h-24 text-black opacity-80 ${className}`}>
        <path fill="none" stroke="currentColor" strokeWidth="2" d="M50,50 c0,0 15,5 15,15 s-15,15 -25,5 s-5-25 15-35 s35,5 45,25 s-15,45 -45,45 s-55-25 -45-55 s45-45 75-25" />
      </svg>
    );
  }
  if (type === 'arrow') {
    return (
      <svg viewBox="0 0 100 50" className={`w-20 h-10 text-black opacity-80 ${className}`}>
        <path fill="none" stroke="currentColor" strokeWidth="2" d="M10,25 Q40,10 80,25 M70,15 L80,25 L70,35" />
      </svg>
    );
  }
  if (type === 'circle') {
    return (
      <svg viewBox="0 0 100 100" className={`absolute inset-0 w-full h-full text-amber-800 opacity-40 ${className}`}>
        <ellipse cx="50" cy="50" rx="48" ry="25" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5,3" transform="rotate(-3)" />
        <ellipse cx="51" cy="49" rx="46" ry="22" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(2)" />
      </svg>
    );
  }
  return null;
};

const SkillArc = ({ percentage, label, isActive }) => {
  const radius = 40;
  const circumference = Math.PI * radius;
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setAnimatedPercentage(0);
      return;
    }

    const duration = 1000;
    let frameId;
    const start = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setAnimatedPercentage(progress * percentage);
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    setAnimatedPercentage(0);
    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [isActive, percentage]);

  const offset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-16 overflow-hidden">
        <svg className="w-full h-full transform -rotate-0" viewBox="0 0 100 50">
          <path
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="black"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
          <text x="50" y="45" textAnchor="middle" className="text-sm font-bold fill-black">{Math.round(animatedPercentage)}%</text>
        </svg>
      </div>
      <span className="mt-2 text-[10px] md:text-xs font-black uppercase tracking-widest text-center">{label}</span>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  const handlePageChange = (pageId) => {
    setActivePage(pageId);
    setIsMobileMenuOpen(false);
  };

  const handleContactFieldChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();

    const fullName = `${contactForm.firstName} ${contactForm.lastName}`.trim();
    const subject = 'portfolio support';
    const body = [
      `Name: ${fullName || 'N/A'}`,
      `Email: ${contactForm.email || 'N/A'}`,
      `Phone: ${contactForm.phone || 'N/A'}`,
      '',
      'Message:',
      contactForm.message || 'N/A',
    ].join('\n');

    const mailtoLink = `mailto:shriyanshtiwari78@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4 sm:p-6 md:p-16">
            <div className="relative mb-4">
              <Doodle type="circle" className="scale-150" />
              <h2 className="text-3xl md:text-4xl italic font-serif relative z-10 text-gray-800" style={{ fontFamily: "'Dancing Script', cursive" }}>
                Creative
              </h2>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-6">
              PORTFOLIO
            </h1>
            <p className="text-lg sm:text-xl font-mono text-gray-600 bg-amber-100/50 px-4 py-1 -rotate-1">
              Shriyansh Tiwari
            </p>
            <Doodle type="spiral" className="absolute top-10 left-10 hidden md:block" />
            <Doodle type="arrow" className="absolute bottom-20 right-20 rotate-45 hidden md:block" />

            <button
              onClick={() => setActivePage('about')}
              className="mt-12 group flex items-center gap-2 border-2 border-black px-6 py-2 hover:bg-black hover:text-white transition-all font-bold"
            >
              EXPLORE CONTENTS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        );

      case 'about':
        return (
          <div className="flex flex-col md:flex-row min-h-[70vh] overflow-hidden">
            {/* Left Dark Side */}
            <div className="w-full md:w-1/2 bg-[#121212] p-6 sm:p-8 md:p-16 text-white relative">
              <div className="relative z-10">
                <div className="inline-block relative mb-8">
                   <div className="bg-[#a68966] text-white px-6 py-2 text-3xl font-black uppercase -rotate-2 shadow-lg relative z-10">
                    ABOUT ME
                  </div>
                  <div className="absolute inset-0 bg-black/20 translate-x-1 translate-y-1 -rotate-2"></div>
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-6xl font-serif italic mb-8" style={{ fontFamily: "'Dancing Script', cursive" }}>
                  Shriyansh Tiwari
                </h3>

                <div className="space-y-6 text-gray-300 leading-relaxed font-light text-sm md:text-base max-w-md">
                  <p>
                    I am a passionate and detail-oriented <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">UI/UX Designer and Graphic Designer</span> with a strong interest in visual storytelling and brand identity. I specialize in creating impactful designs for digital products that bridge the gap between user needs and business goals.
                  </p>
                  <p>
                    I enjoy turning complex problems into intuitive, creative visuals that communicate clearly and effectively. I am always eager to learn new tools, improve my craft, and take on creative challenges that push the boundaries of design.
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}></div>
            </div>

            {/* Right Paper Side */}
            <div className="about-paper-clip w-full md:w-1/2 bg-[#fdfdfd] p-6 sm:p-8 md:p-16 relative flex items-center justify-center">
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-black/5 blur-sm z-0"></div>

              <div className="relative z-10 w-full max-w-sm">
                <Doodle type="spiral" className="absolute top-[-40px] right-[-20px] scale-75 opacity-40 rotate-12" />
                <Doodle type="spiral" className="absolute bottom-[-60px] left-[-20px] scale-90 opacity-40 -rotate-12" />

                <div className="relative group">
                  <div className="w-full aspect-[4/5] overflow-hidden border-[12px] border-white shadow-2xl rotate-3 transition-transform group-hover:rotate-0 duration-500 bg-gray-200">
                    <img
                      src={profileImage}
                      alt="Shriyansh Tiwari"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop";
                      }}
                    />
                  </div>
                  <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-32 h-10 bg-white/30 backdrop-blur-md -rotate-3 shadow-sm border border-white/40 pointer-events-none"></div>
                  <div className="absolute bottom-[-10px] right-[-10px] bg-amber-500 text-white px-3 py-1 font-mono text-[10px] uppercase tracking-tighter rotate-12 shadow-md">
                    DESIGN ARCHIVE // 2026
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: 'linear-gradient(#e1e1e1 1px, transparent 1px)', backgroundSize: '100% 2.5rem' }}></div>
            </div>
          </div>
        );

      case 'experience':
        const experiences = [
          {
            year: "2025",
            title: "BBDITM",
            subtitle: "REDESIGN COLLEGE WEBSITE",
            points: [
              "Redesigning the official BBDITM website to improve user experience, navigation, and visual appeal.",
              "Conducting research on student and faculty needs to create a more accessible and modern interface.",
              "Building responsive layouts and interactive prototypes in Figma."
            ]
          },
          {
            year: "2024-2025",
            title: "GDSC",
            subtitle: "Creative Design Lead",
            desc: "Serving as Technical Lead (UI/UX) at the Google Developer Student Club (GDSC), guiding junior designers, organizing design sprints, and contributing to collaborative tech projects."
          },
          {
            year: "Sep 2024",
            title: "UDEMY",
            subtitle: "User Experience Certifications",
            desc: "Essentials User Experience Design, Adobe XD UI UX Design. Instructors: Marcus Menti, Zechariah Tech."
          },
          {
            year: "2024-2025",
            title: "Freelance / Self-Initiated Work",
            subtitle: "Brand & Logo Identity",
            points: [
              "Designed a logo for Sarkar Café, focusing on a modern and minimal brand identity.",
              "Created an Ethereum-inspired logo as a personal concept project exploring crypto aesthetics."
            ]
          }
        ];

        return (
          <div className="max-w-4xl mx-auto py-8 p-4 sm:p-6 md:p-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-12 sm:mb-16">
               <div className="relative">
                 <h2 className="text-4xl sm:text-5xl font-black uppercase">WORK</h2>
                 <Doodle type="circle" className="scale-x-150 -translate-y-2" />
               </div>
               <span className="text-2xl sm:text-3xl italic font-serif" style={{ fontFamily: "'Dancing Script', cursive" }}>Experience</span>
            </div>

            <div className="relative border-l-2 border-green-500 ml-3 sm:ml-4 md:ml-12 pl-6 sm:pl-8 space-y-12 sm:space-y-16">
              {experiences.map((exp, index) => (
                <div key={index} className="relative">
                  <div className="absolute left-[-31px] sm:left-[-33px] md:left-[-41px] top-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-4 border-white shadow-sm"></div>

                  <span className="text-green-600 font-bold text-sm tracking-widest uppercase mb-1 block">
                    {exp.year}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black uppercase leading-none mb-1 text-gray-800">
                    {exp.title}
                  </h3>
                  <p className="text-base sm:text-lg font-bold text-gray-600 mb-4">{exp.subtitle}</p>

                  {exp.desc && (
                    <p className="text-sm text-gray-500 leading-relaxed max-w-2xl italic">
                      "{exp.desc}"
                    </p>
                  )}

                  {exp.points && (
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 max-w-2xl marker:text-green-500">
                      {exp.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        const projects = [
          { id: '01', title: 'School Bus Tracking System (For Parents)', category: 'Mobile Design', desc: 'Real-time school bus tracking system helping parents monitor children’s safe transportation.', link: 'https://tinyurl.com/6xpwb34r' },
          { id: '02', title: 'YOGURT', category: 'Web Design', desc: 'A clean, modern yogurt website design showcasing flavors, nutrition, offers, and easy ordering with engaging visuals and user-friendly navigation.', link: 'https://tinyurl.com/yt3x57dv' },
          { id: '03', title: 'Clothy.Shop', category: 'Mobile Design', desc: 'Clothy.shop mobile UI/UX design focused on seamless shopping, clean interface, and smooth user experience.', link: 'https://tinyurl.com/45zwd7s5' },
          { id: '04', title: 'Movie Ticket Booking', category: 'Mobile Design', desc: 'Mobile UI/UX design for seamless movie ticket booking with intuitive navigation and quick checkout.', link: 'https://tinyurl.com/5ybb44xn' }
        ];

        return (
          <div className="max-w-4xl mx-auto py-8 p-4 sm:p-6 md:p-16">
             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-10 sm:mb-12">
               <div className="relative">
                 <h2 className="text-4xl sm:text-5xl font-black uppercase">CONTENTS</h2>
                 <Doodle type="circle" className="scale-x-150 -translate-y-2" />
               </div>
               <span className="text-2xl sm:text-3xl italic font-serif" style={{ fontFamily: "'Dancing Script', cursive" }}>Projects</span>
             </div>

             <div className="grid md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-8 sm:gap-y-12">
               {projects.map((proj) => (
                 <a
                   key={proj.id}
                   href={proj.link}
                   target="_blank"
                   rel="noreferrer"
                   className="group cursor-pointer block"
                 >
                   <div className="flex items-start gap-4 sm:gap-6 border-b border-black/10 pb-4 group-hover:border-black transition-colors">
                     <span className="text-3xl sm:text-4xl font-black opacity-20 group-hover:opacity-100 transition-opacity">{proj.id}</span>
                     <div>
                       <h4 className="text-lg sm:text-xl font-bold uppercase tracking-tight">{proj.title}</h4>
                       <p className="text-sm italic text-gray-500 mb-2">{proj.category}</p>
                       <p className="text-sm text-gray-600 line-clamp-2">{proj.desc}</p>
                     </div>
                   </div>
                 </a>
               ))}
             </div>
          </div>
        );

      case 'skills':
        return (
          <div className="max-w-4xl mx-auto py-8 p-4 sm:p-6 md:p-16">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl font-black uppercase mb-2">PERSONAL</h2>
              <div className="relative inline-block">
                <Doodle type="circle" className="scale-125" />
                <span className="text-3xl sm:text-4xl italic font-serif relative z-10" style={{ fontFamily: "'Dancing Script', cursive" }}>Skills</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 sm:gap-y-16 mb-16 sm:mb-20">
              <SkillArc percentage={95} label="Figma" isActive={activePage === 'skills'} />
              <SkillArc percentage={85} label="UX Research" isActive={activePage === 'skills'} />
              <SkillArc percentage={80} label="Adobe XD" isActive={activePage === 'skills'} />
              <SkillArc percentage={90} label="Prototyping" isActive={activePage === 'skills'} />
              <SkillArc percentage={85} label="Canva" isActive={activePage === 'skills'} />
              <SkillArc percentage={85} label="Illustrator" isActive={activePage === 'skills'} />
              <SkillArc percentage={70} label="Adobe Photoshop" isActive={activePage === 'skills'} />
              <SkillArc percentage={90} label="Visual Design" isActive={activePage === 'skills'} />
            </div>

            <div className="relative mt-16 sm:mt-24">
              <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 rotate-180 opacity-20">
                <Doodle type="arrow" className="rotate-90" />
              </div>

              <div className="bg-[#fcfcfc] border-2 border-black/5 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-16 text-center text-black relative overflow-hidden group">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#e1e1e1 1px, transparent 1px)', backgroundSize: '100% 2.5rem' }}></div>
                <div className="absolute left-10 md:left-14 top-0 bottom-0 w-[1px] bg-red-300 opacity-20"></div>

                <div className="relative z-10">
                  <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 rounded-full border-2 border-green-500 flex items-center justify-center relative bg-white">
                      <div className="absolute inset-0 border-t-2 border-green-500 rounded-full animate-spin duration-[3s]"></div>
                      <span className="text-5xl font-black text-green-500">S</span>
                    </div>
                  </div>

                  <div className="max-w-2xl mx-auto space-y-6">
                    <p className="text-base sm:text-lg md:text-2xl font-light leading-relaxed">
                      Hi, I'm <span className="font-bold">Shriyansh Tiwari</span>, a passionate <span className="text-green-600 font-bold">UI/UX Designer</span>. I create user-friendly digital experiences that blend creativity and functionality.
                    </p>

                    <div className="pt-8">
                      <a
                        href="https://drive.google.com/file/d/1XNPJBlyOgQRyru3Xatw-M65AiY2d1meP/view?usp=sharing"
                        className="inline-flex items-center gap-3 border-2 border-green-500 bg-white px-5 sm:px-8 py-3 sm:py-4 text-[11px] sm:text-sm font-black uppercase tracking-[0.12em] sm:tracking-[0.2em] hover:bg-green-500 hover:text-white transition-all duration-300 rounded-sm group shadow-lg"
                      >
                        DOWNLOAD RESUME <FileDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="max-w-5xl mx-auto py-8">
            <div className="flex flex-col md:flex-row gap-10 sm:gap-12 md:gap-20 items-start">
              {/* Info Column */}
              <div className="w-full md:w-5/12 space-y-8 sm:space-y-12">
                <div className="relative inline-block">
                  <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight relative z-10">CONTACT</h2>
                  <Doodle type="circle" className="scale-150 -translate-y-2 opacity-30" />
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif italic mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
                      Let's Connect
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm max-w-sm">
                      I'm always open to new opportunities, collaborations, or creative discussions.
                      Feel free to reach out if you'd like to work together or just say hello!
                    </p>
                  </div>

                  <div className="space-y-4 font-mono">
                    <div className="flex flex-col">
                      <span className="text-base uppercase font-bold text-amber-600">Gmail</span>
                      <a href="mailto:shriyanshtiwari78@gmail.com" className="text-base hover:text-amber-600 transition-colors border-b border-black/10 pb-1 inline-block w-fit break-all">
                        shriyanshtiwari78@gmail.com
                      </a>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base uppercase font-bold text-amber-600">Telephone</span>
                      <a href="tel:7379401609" className="text-base hover:text-amber-600 transition-colors border-b border-black/10 pb-1 inline-block w-fit">
                        +91 7379401609
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <a href="https://www.behance.net/shriyanshtiwari1" className="p-3 bg-black text-white rounded-xl hover:bg-amber-500 transition-all shadow-md hover:-translate-y-1">
                    <BehanceIcon className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/shriyansh-tiwari-a5976424a/" className="p-3 bg-black text-white rounded-xl hover:bg-amber-500 transition-all shadow-md hover:-translate-y-1">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/shriyanshtiwari78/?hl=en" className="p-3 bg-black text-white rounded-xl hover:bg-amber-500 transition-all shadow-md hover:-translate-y-1">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Form Column with Black Border & Padding */}
              <div className="w-full md:w-7/12 relative">
                <div className="absolute top-[-30px] right-[-10px] hidden md:block">
                  <Doodle type="spiral" className="opacity-20 scale-75 rotate-45" />
                </div>

                {/* Border Wrap */}
                <div className="border-2 border-black p-5 sm:p-6 md:p-10 rounded-2xl bg-white/30 backdrop-blur-[2px] shadow-lg">
                  <form className="space-y-6" onSubmit={handleContactSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 pl-1">First name *</label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={contactForm.firstName}
                          onChange={handleContactFieldChange}
                          className="w-full bg-transparent border-b-2 border-black/10 focus:border-black px-4 py-3 outline-none transition-all font-mono text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 pl-1">Last name *</label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={contactForm.lastName}
                          onChange={handleContactFieldChange}
                          className="w-full bg-transparent border-b-2 border-black/10 focus:border-black px-4 py-3 outline-none transition-all font-mono text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 pl-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={contactForm.email}
                        onChange={handleContactFieldChange}
                        className="w-full bg-transparent border-b-2 border-black/10 focus:border-black px-4 py-3 outline-none transition-all font-mono text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 pl-1">Phone</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={contactForm.phone}
                          onChange={handleContactFieldChange}
                          className="w-full bg-transparent border-b-2 border-black/10 focus:border-black pl-10 pr-4 py-3 outline-none transition-all font-mono text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 pl-1">Message</label>
                      <textarea
                        rows="4"
                        name="message"
                        value={contactForm.message}
                        onChange={handleContactFieldChange}
                        className="w-full bg-transparent border-b-2 border-black/10 focus:border-black px-4 py-3 outline-none transition-all font-mono text-sm resize-none"
                      ></textarea>
                    </div>

                    <button type="submit" className="w-full bg-[#00E676] hover:bg-[#00C853] text-black font-black uppercase tracking-[0.14em] sm:tracking-[0.2em] py-4 sm:py-5 shadow-xl hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3">
                      SEND MESSAGE <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-black font-sans overflow-x-hidden selection:bg-amber-200">
      <div className="fixed inset-0 pointer-events-none opacity-10 contrast-125" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cardboard.png")' }}></div>
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/crumpled-paper.png")' }}></div>

      <div className="fixed top-0 left-0 w-24 md:w-48 h-screen bg-[#bcaaa4] opacity-30 z-0" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 10%, 95% 20%, 75% 30%, 90% 40%, 80% 50%, 95% 60%, 85% 70%, 100% 80%, 90% 90%, 100% 100%, 0 100%)' }}></div>
      <div className="fixed bottom-0 right-0 w-32 md:w-64 h-screen bg-[#333] opacity-50 z-0" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%, 15% 90%, 5% 80%, 20% 70%, 10% 60%, 25% 50%, 15% 40%, 30% 30%, 20% 20%, 35% 10%)' }}></div>

      <nav className="relative z-50 px-4 sm:px-6 py-5 sm:py-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-black text-white tracking-tighter cursor-pointer flex items-center gap-1" onClick={() => handlePageChange('home')}>
          S<span className="text-amber-500">T</span><span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2"></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`text-xs font-bold uppercase tracking-widest transition-all ${
                  activePage === item.id ? 'text-amber-400 border-b-2 border-amber-400 pb-1' : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="md:hidden text-white cursor-pointer hover:text-amber-500 transition-colors"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl p-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-between ${
                  activePage === item.id ? 'bg-amber-500 text-black' : 'text-gray-200 hover:bg-white/10'
                }`}
              >
                {item.label}
                <ChevronRight className="w-4 h-4" />
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="relative z-10 px-3 sm:px-4 pb-16 sm:pb-20 pt-2 sm:pt-4 max-w-6xl mx-auto">
        {activePage !== 'about' ? (
          <TornPaper className="min-h-[70vh]">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              {renderContent()}
            </div>
          </TornPaper>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
             {renderContent()}
          </div>
        )}
      </main>

      <footer className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-10 sm:pb-12 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
        <div className="flex gap-5 sm:gap-6">
          <a href="https://www.behance.net/shriyanshtiwari1" className="text-gray-500 hover:text-white transition-colors"><BehanceIcon className="w-5 h-5" /></a>
          <a href="https://www.linkedin.com/in/shriyansh-tiwari-a5976424a/" className="text-gray-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
          <a href="mailto:shriyanshtiwari78@gmail.com" className="text-gray-500 hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
        </div>
        <p className="text-gray-500 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.14em] sm:tracking-[0.2em] text-center">
          UI/UX ARCHIVE // Shriyansh Tiwari // 2026
        </p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Bebas+Neue&family=Inter:wght@300;400;700;900&display=swap');
      ` }} />
    </div>
  );
}
