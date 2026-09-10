"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

export default function PremiumPortfolio() {
  const [typedText, setTypedText] = useState("");
  const fullText = "MUHAMMAD WAJAHAT HAIDER";

  const [philosophyText, setPhilosophyText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    " scalable backend infrastructures.",
    " deep learning models.",
    " Machine learning models.",
    " Full Stack Web Applications.",
    " Full stack mobile Applications.",
    " immersive cross-platform interfaces."
  ];

  // Add this new useEffect right below your existing useEffect
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && philosophyText === currentPhrase) {
      typingSpeed = 1500; // Pause at the end before backspacing
      setTimeout(() => setIsDeleting(true), typingSpeed);
      return;
    } else if (isDeleting && philosophyText === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      typingSpeed = 500; // Pause before typing the next phrase
      return;
    }

    const timeout = setTimeout(() => {
      setPhilosophyText((prev) =>
        isDeleting
          ? currentPhrase.substring(0, prev.length - 1)
          : currentPhrase.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [philosophyText, isDeleting, phraseIndex]);

  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const lenis = useLenis();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close mobile menu when a link is clicked
    if (lenis) {
      lenis.scrollTo(`#${targetId}`, { offset: 0, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus("Thank you. Your message has been sent successfully.");
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus("Oops! There was a problem submitting your form.");
      }
    } catch (error) {
      setFormStatus("Oops! There was a problem submitting your form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      {/* Mobile footer height is 50vh, desktop is 60vh. Margin matches to reveal it properly */}
      <main className="relative z-10 w-full mb-[50vh] md:mb-[60vh] shadow-[0_40px_80px_rgba(0,0,0,0.5)] bg-[#F4F0EA]">
        
        {/* 1. Premium Navbar */}
        <header className="fixed top-0 left-0 w-full px-6 md:px-8 py-6 z-[60] mix-blend-difference flex justify-between items-center text-[10px] md:text-[11px] uppercase tracking-widest font-medium text-[#F4F0EA] pointer-events-none">
          <div className="pointer-events-auto link-underline cursor-pointer">
            <a href="#home" onClick={(e) => handleScroll(e, "home")}>Muhammad Wajahat Haider<sup className="ml-1 text-[8px]">©</sup></a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-10 pointer-events-auto items-center">
            <a href="#about" onClick={(e) => handleScroll(e, "about")} className="link-underline">About</a>
            <a href="#experience" onClick={(e) => handleScroll(e, "experience")} className="link-underline">Experience</a>
            <a href="#skills" onClick={(e) => handleScroll(e, "skills")} className="link-underline">Skills</a>
            
            {/* Works Dropdown Group */}
            <div className="relative group py-4 -my-4">
              <a href="#projects" onClick={(e) => handleScroll(e, "projects")} className="link-underline">Works</a>
              
              {/* Hover Menu */}
              <div className="absolute top-full left-0 pt-2 flex flex-col gap-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-500 ease-out">
                <a href="#project-oasis" onClick={(e) => handleScroll(e, "project-oasis")} className="text-[9px] whitespace-nowrap hover:opacity-50 transition-opacity">Oasis Thrive Track</a>
                <a href="#project-pkpl" onClick={(e) => handleScroll(e, "project-pkpl")} className="text-[9px] whitespace-nowrap hover:opacity-50 transition-opacity">Prime Kingdom Management System</a>
                <a href="#project-tenant" onClick={(e) => handleScroll(e, "project-tenant")} className="text-[9px] whitespace-nowrap hover:opacity-50 transition-opacity">Tenant Protection Hub</a>
                <a href="#project-assessment" onClick={(e) => handleScroll(e, "project-assessment")} className="text-[9px] whitespace-nowrap hover:opacity-50 transition-opacity">Assessment Portal</a>
              </div>
            </div>

            <a href="#contact-section" onClick={(e) => handleScroll(e, "contact-section")} className="link-underline">Contact</a>
          </nav>
          
          <div className="pointer-events-auto flex items-center gap-6">
            <a href="#contact-section" onClick={(e) => handleScroll(e, "contact-section")} className="link-underline hidden md:block">Get in Touch</a>
            <span className="hidden md:block opacity-40">Lahore, PK</span>
            
            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden text-white hover:opacity-70 transition-opacity p-2 -mr-2"
            >
              {isMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </header>

        {/* Premium Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: "-10%" }}
              animate={{ opacity: 1, y: "0%" }}
              exit={{ opacity: 0, y: "-10%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 bg-[#121212] flex flex-col items-center justify-center pointer-events-auto md:hidden"
            >
              <nav className="flex flex-col items-center gap-8 text-[#F4F0EA]">
                <a href="#about" onClick={(e) => handleScroll(e, "about")} className="font-cormorant text-4xl tracking-tight">About</a>
                <a href="#experience" onClick={(e) => handleScroll(e, "experience")} className="font-cormorant text-4xl tracking-tight">Experience</a>
                <a href="#skills" onClick={(e) => handleScroll(e, "skills")} className="font-cormorant text-4xl tracking-tight">Skills</a>
                <a href="#projects" onClick={(e) => handleScroll(e, "projects")} className="font-cormorant text-4xl tracking-tight">Works</a>
                <a href="#contact-section" onClick={(e) => handleScroll(e, "contact-section")} className="font-cormorant text-4xl tracking-tight">Contact</a>
              </nav>
              <div className="absolute bottom-12 text-[#F4F0EA]/40 text-[10px] uppercase tracking-widest text-center">
                <p>Lahore, Pakistan</p>
                <p className="mt-2">office@example.com</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Hero Section */}
        <section id="home" className="relative h-screen w-full bg-[#121212] overflow-hidden flex items-center justify-center">
          
          <motion.img 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            src="/profile-cutout.png" 
            alt="Muhammad Wajahat Haider"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[65vh] md:h-[85vh] w-auto object-cover z-10 pointer-events-none grayscale contrast-125 brightness-90"
          />

          <div className="absolute top-[22%] md:top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-20 pointer-events-none px-4 overflow-hidden mix-blend-difference">
            <h1 className="font-cormorant text-[5.5vw] md:text-[5.8vw] leading-[0.8] tracking-tighter text-white whitespace-nowrap">
              {typedText}
              <span className="blinking-cursor"></span>
            </h1>
          </div>

          <div className="absolute bottom-8 md:bottom-12 left-6 md:left-12 z-20 text-[#F4F0EA]">
            <h2 className="text-[9px] md:text-xs uppercase tracking-[0.3em] font-bold mb-1 md:mb-2">Software Developer</h2>
            <p className="text-[8px] md:text-[10px] font-light tracking-[0.2em] opacity-70">AI Systems & Full-Stack Architecture</p>
          </div>
          
          <div className="absolute bottom-12 right-12 z-20 text-[#F4F0EA] text-right hidden md:block">
            <p className="text-[9px] uppercase tracking-[0.2em] font-light opacity-70 mb-1">Scroll to Explore</p>
            <div className="w-[1px] h-12 bg-[#F4F0EA]/50 mx-auto mr-4" />
          </div>
        </section>

        <section id="about" className="relative w-full bg-[#F4F0EA] py-20 md:py-32 px-6 md:px-20 border-b border-black/10">
          <div className="max-w-4xl mx-auto flex flex-col gap-8 md:gap-12">
            
            {/* Dynamic Typewriter Philosophy */}
            <div>
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-6 md:mb-8">01. Philosophy</h2>
              <p className="font-cormorant text-2xl md:text-5xl leading-[1.3] md:leading-[1.2] text-[#121212] font-light min-h-[130px] md:min-h-[120px]">
                I believe in deliberate design and robust architecture. <br className="hidden md:block" />
                <span className="font-medium text-black/70 italic">Developing {philosophyText}</span>
                <span className="blinking-cursor text-black"></span>
              </p>
            </div>

            {/* Professional Background Integration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-xs md:text-sm text-[#121212]/80 leading-relaxed font-light mt-4 md:mt-8 pt-8 md:pt-12 border-t border-black/10">
              <p>
                I am a Full-Stack Software Developer currently working at Prime Kingdom Pvt Ltd, with previous experience as a Python Full-Stack Developer Intern at NetSol Technologies. My core expertise includes Python, FastAPI, Django, Flutter, React.js, and database management using PostgreSQL, MySQL, and MongoDB.
              </p>
              <p>
                Throughout my career, I have developed several full-stack projects, including a specialized school management platform for Oasis School For Autism (Oasis Thrive Track) and an AI-powered agricultural mobile application (AgriScan). Additionally, I have trained deep learning and computer vision classifiers using TensorFlow, Keras, and OpenCV, integrated automated text summarization using the Google Gemini API, and configured multi-container application environments using Docker and Docker Compose.
              </p>
            </div>

          </div>
        </section>

        {/* 4. Experience & Education */}
        <section id="experience" className="relative w-full bg-[#EAE8E3] py-20 md:py-32 px-6 md:px-20 border-b border-black/10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
            <div>
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-8 md:mb-12">02. Experience</h2>
              
              <div className="mb-10 md:mb-12 border-l border-black/20 pl-6 relative group cursor-default hover:border-black transition-colors duration-500">
                <div className="absolute w-2 h-2 bg-[#121212] rounded-full -left-[4.5px] top-1.5 group-hover:scale-150 transition-transform duration-500" />
                <h3 className="text-xl md:text-2xl font-cormorant font-semibold text-[#121212]">Software Developer</h3>
                <p className="text-[10px] uppercase tracking-widest text-black/50 mt-1 mb-4">Prime Kingdom Pvt Ltd • Present</p>
                <p className="text-sm text-[#121212]/80 leading-relaxed font-light">
                  Architecting full-stack solutions, optimizing database queries, and integrating third-party APIs for scalable enterprise applications.
                </p>
              </div>

              <div className="border-l border-black/20 pl-6 relative group cursor-default hover:border-black transition-colors duration-500">
                <div className="absolute w-2 h-2 bg-transparent border border-[#121212] rounded-full -left-[4.5px] top-1.5 group-hover:bg-[#121212] transition-colors duration-500" />
                <h3 className="text-xl md:text-2xl font-cormorant font-semibold text-[#121212]">Python Full-Stack Developer Intern</h3>
                <p className="text-[10px] uppercase tracking-widest text-black/50 mt-1 mb-4">NetSol Technologies • Jun – Aug 2025</p>
                <p className="text-sm text-[#121212]/80 leading-relaxed font-light">
                  Developed backend architectures and automated processes within the Unity team, focusing on Python frameworks and system integration.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-8 md:mb-12">03. Education</h2>
              <div className="border-l border-black/20 pl-6 relative group cursor-default hover:border-black transition-colors duration-500">
                <div className="absolute w-2 h-2 bg-[#121212] rounded-full -left-[4.5px] top-1.5 group-hover:scale-150 transition-transform duration-500" />
                <h3 className="text-xl md:text-2xl font-cormorant font-semibold text-[#121212]">BS in Computer Science</h3>
                <p className="text-[10px] uppercase tracking-widest text-black/50 mt-1 mb-4">Bahria University Lahore • 2022 – 2026</p>
                <p className="text-sm text-[#121212]/80 leading-relaxed font-light">
                  Specialized in software engineering, artificial intelligence, and web development. Final Year Project focused on full-stack Cross platform Mobile Application and Web based Admin Dashboard, Specifically Designed for Oasis School for Autism. <br/><br/>
                  <span className="font-medium text-[#121212]">CGPA: 3.3 / 4.0</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Skills Section */}
        <section id="skills" className="relative w-full bg-[#F4F0EA] py-20 md:py-32 px-6 md:px-20 border-b border-black/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-10 md:mb-16">04. Technical Expertise</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-black/10 pt-10 md:pt-12">
              <div>
                <h3 className="text-[10px] md:text-xs uppercase tracking-widest font-semibold mb-4 md:mb-6 text-black">Languages</h3>
                <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-black/70 font-light">
                  <li>Python</li>
                  <li>C++</li>
                  <li>Dart</li>
                  <li>SQL</li>
                  <li>HTML / CSS</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-[10px] md:text-xs uppercase tracking-widest font-semibold mb-4 md:mb-6 text-black">Frontend & Mobile</h3>
                <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-black/70 font-light">
                  <li>Flutter</li>
                  <li>React / Next.js</li>
                  <li>Vite</li>
                  <li>Tailwind CSS</li>
                  <li>Framer Motion</li>
                </ul>
              </div>

              <div>
                <h3 className="text-[10px] md:text-xs uppercase tracking-widest font-semibold mb-4 md:mb-6 text-black">Backend & Cloud</h3>
                <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-black/70 font-light">
                  <li>FastAPI</li>
                  <li>Django / DRF</li>
                  <li>PostgreSQL</li>
                  <li>AWS</li>
                  <li>Supabase</li>
                  <li>Docker</li>
                </ul>
              </div>

              <div>
                <h3 className="text-[10px] md:text-xs uppercase tracking-widest font-semibold mb-4 md:mb-6 text-black">Machine Learning</h3>
                <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-black/70 font-light">
                  <li>TensorFlow / Keras</li>
                  <li>OpenCV</li>
                  <li>NumPy / Pandas</li>
                  <li>CNN Architectures</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Centered Sticky Project Showcase */}
        {/* 6. Centered Sticky Project Showcase */}
        <div id="projects" className="bg-[#F4F0EA]">
          
          {/* Project 1 */}
          <section id="project-oasis" className="relative w-full border-b border-black/10">
            <div className="sticky top-0 h-screen w-full pointer-events-none z-0 flex flex-col justify-center items-center p-6 mix-blend-difference text-white">
              <h3 className="font-cormorant text-5xl md:text-[8vw] font-bold tracking-tighter uppercase leading-none text-center">
                Oasis Thrive Track
              </h3>
              <p className="mt-4 md:mt-6 text-[9px] md:text-xs uppercase tracking-[0.2em] text-white/80">
                React • Flutter • FastAPI • Supabase
              </p>
            </div>
            
            {/* Applied z-20 and pt-[60vh] md:pt-[70vh] to start images below the title */}
            <div className="relative z-20 w-full -mt-[100vh] pt-[60vh] md:pt-[70vh] pb-[30vh]">
              <div className="flex flex-col gap-16 md:gap-40 px-4 md:px-12 max-w-7xl mx-auto">
                
                <figure className="relative w-[75%] md:w-[55%] aspect-video bg-[#EAE8E3] mr-auto md:ml-12 overflow-hidden group shadow-2xl">
                  <img src="oasis-thrive-track.png" alt="Web Dashboard" className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" />
                  <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-[#F4F0EA] uppercase tracking-widest text-[8px] md:text-[10px] bg-[#121212]/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 pointer-events-none">Web Dashboard</div>
                </figure>

                <figure className="relative w-[85%] md:w-[35%] aspect-[9/16] bg-[#EAE8E3] ml-auto md:mr-24 overflow-hidden group shadow-2xl">
                  <img src="appointment-page.png" alt="Mobile App" className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" />
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-[#F4F0EA] uppercase tracking-widest text-[8px] md:text-[10px] bg-[#121212]/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 pointer-events-none">Appointment Booking</div>
                </figure>

                <figure className="relative w-[85%] md:w-[35%] aspect-[9/16] bg-[#EAE8E3] mr-auto md:mr-24 overflow-hidden group shadow-2xl">
                  <img src="login-page.png" alt="Mobile App" className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" />
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-[#F4F0EA] uppercase tracking-widest text-[8px] md:text-[10px] bg-[#121212]/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 pointer-events-none">Secure Login System</div>
                </figure>

                <figure className="relative w-[85%] md:w-[35%] aspect-[9/16] bg-[#EAE8E3] ml-auto md:mr-24 overflow-hidden group shadow-2xl">
                  <img src="report-summarizer.png" alt="Mobile App" className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" />
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-[#F4F0EA] uppercase tracking-widest text-[8px] md:text-[10px] bg-[#121212]/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 pointer-events-none">AI Report Summarizer</div>
                </figure>

                <figure className="relative w-[85%] md:w-[35%] aspect-[9/16] bg-[#EAE8E3] mr-auto md:mr-24 overflow-hidden group shadow-2xl">
                  <img src="report-summarizer2.png" alt="Mobile App" className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" />
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-[#F4F0EA] uppercase tracking-widest text-[8px] md:text-[10px] bg-[#121212]/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 pointer-events-none">AI Report Summarizer</div>
                </figure>

                <figure className="relative w-[85%] md:w-[35%] aspect-[9/16] bg-[#EAE8E3] ml-auto md:mr-24 overflow-hidden group shadow-2xl">
                  <img src="digitized-diary.png" alt="Mobile App" className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" />
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-[#F4F0EA] uppercase tracking-widest text-[8px] md:text-[10px] bg-[#121212]/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 pointer-events-none">Digitized Diary</div>
                </figure>

                <figure className="relative w-[85%] md:w-[35%] aspect-[9/16] bg-[#EAE8E3] mr-auto md:mr-24 overflow-hidden group shadow-2xl">
                  <img src="digitized-diary2.png" alt="Mobile App" className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" />
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-[#F4F0EA] uppercase tracking-widest text-[8px] md:text-[10px] bg-[#121212]/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 pointer-events-none">Digitized Diary</div>
                </figure>

              </div>
            </div>
          </section>

          {/* Project 2 */}
          <section id="project-pkpl" className="relative w-full border-b border-black/10">
            <div className="sticky top-0 h-screen w-full pointer-events-none z-0 flex flex-col justify-center items-center p-6 mix-blend-difference text-white">
              <h6 className="font-cormorant text-5xl md:text-[8vw] font-bold tracking-tighter uppercase leading-none text-center">
                Prime Kingdom Management Portal
              </h6>
              <p className="mt-4 md:mt-6 text-[9px] md:text-xs uppercase tracking-[0.2em] text-white/80">
                React • FastAPI • Supabase
              </p>
            </div>
            
            {/* Applied z-20 and pt-[60vh] md:pt-[70vh] */}
            <div className="relative z-20 w-full -mt-[100vh] pt-[60vh] md:pt-[70vh] pb-[30vh]">
              <div className="flex flex-col gap-16 md:gap-40 px-4 md:px-12 max-w-7xl mx-auto">
                <figure className="relative w-[95%] md:w-[50vw] aspect-[21/9] bg-[#EAE8E3] ml-auto md:mr-24 overflow-hidden group shadow-2xl">
                  <img src="pkpl-dashboard.png" alt="Mobile App Processing" className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" />
                  <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-[#F4F0EA] uppercase tracking-widest text-[8px] md:text-[10px] bg-[#121212]/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 pointer-events-none">Web Dashboard</div>
                </figure>
                <figure className="relative w-[50%] md:w-[30%] aspect-[2/2] bg-[#EAE8E3] mr-auto md:ml-24 overflow-hidden group shadow-2xl">
                  <img src="role-base-login.png" alt="Mobile App Processing" className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" />
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-[#F4F0EA] uppercase tracking-widest text-[8px] md:text-[10px] bg-[#121212]/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 pointer-events-none">Role Based Login System</div>
                </figure>

                <figure className="relative w-[95%] md:w-[50vw] aspect-[21/9] bg-[#EAE8E3] ml-auto md:mr-24 overflow-hidden group shadow-2xl">
                  <img src="attendance.png" alt="Mobile App Processing" className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" />
                  <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-[#F4F0EA] uppercase tracking-widest text-[8px] md:text-[10px] bg-[#121212]/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 pointer-events-none">Attendance Management</div>
                </figure>
              </div>
            </div>
          </section>

          {/* Project 3 */}
          <section id="project-tenant" className="relative w-full border-b border-black/10">
            <div className="sticky top-0 h-screen w-full pointer-events-none z-0 flex flex-col justify-center items-center p-6 mix-blend-difference text-white">
              <h3 className="font-cormorant text-5xl md:text-[8vw] font-bold tracking-tighter uppercase leading-none text-center">
                Tenant Protection
              </h3>
              <p className="mt-4 md:mt-6 text-[9px] md:text-xs uppercase tracking-[0.2em] text-white/80">
                React • Vite • Tailwind • Framer Motion
              </p>
            </div>
            
            {/* Applied z-20 and pt-[60vh] md:pt-[70vh] */}
            <div className="relative z-20 w-full -mt-[100vh] pt-[60vh] md:pt-[70vh] pb-[30vh]">
              <div className="flex flex-col gap-16 md:gap-40 px-4 md:px-12 max-w-7xl mx-auto">
                <figure className="relative w-[95%] md:w-[55vw] aspect-[16/10] bg-[#EAE8E3] mr-auto md:ml-auto overflow-hidden group shadow-2xl">
                  <img src="tenant-protection-hub.png" alt="Tenant Protection Hub UI" className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" />
                  <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-[#F4F0EA] uppercase tracking-widest text-[8px] md:text-[10px] bg-[#121212]/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 pointer-events-none">SPA Interface</div>
                </figure>
              </div>
            </div>
          </section>

          <section id="project-assessment" className="relative w-full border-b border-black/10">
            <div className="sticky top-0 h-screen w-full pointer-events-none z-0 flex flex-col justify-center items-center p-6 mix-blend-difference text-white">
              <h6 className="font-cormorant text-5xl md:text-[8vw] font-bold tracking-tighter uppercase leading-none text-center">
                Assessment Portal
              </h6>
              <p className="mt-4 md:mt-6 text-[9px] md:text-xs uppercase tracking-[0.2em] text-white/80">
                React • FastAPI • Supabase
              </p>
            </div>
            
            {/* Applied z-20 and pt-[60vh] md:pt-[70vh] */}
            <div className="relative z-20 w-full -mt-[100vh] pt-[60vh] md:pt-[70vh] pb-[30vh]">
              <div className="flex flex-col gap-16 md:gap-40 px-4 md:px-12 max-w-7xl mx-auto">
                <figure className="relative w-[95%] md:w-[50vw] aspect-[21/9] bg-[#EAE8E3] ml-auto md:mr-24 overflow-hidden group shadow-2xl">
                  <img src="assessment-portal.png" alt="Mobile App Processing" className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" />
                  <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-[#F4F0EA] uppercase tracking-widest text-[8px] md:text-[10px] bg-[#121212]/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 pointer-events-none">Assessment Dashboard</div>
                </figure>

                <figure className="relative w-[95%] md:w-[50vw] aspect-[21/9] bg-[#EAE8E3] mr-auto md:ml-24 overflow-hidden group shadow-2xl">
                  <img src="test-result.png" alt="Mobile App Processing" className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" />
                  <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-[#F4F0EA] uppercase tracking-widest text-[8px] md:text-[10px] bg-[#121212]/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 pointer-events-none">Assessment Results</div>
                </figure>
              </div>
            </div>
          </section>


        </div>

        {/* 7. Fully Functional Contact Form Section */}
        <section id="contact-section" className="relative w-full bg-[#121212] text-[#F4F0EA] py-20 md:py-32 px-6 md:px-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mb-4">05. Direct Inquiry</h2>
            <h3 className="font-cormorant text-3xl md:text-6xl font-light mb-8 md:mb-12">Start a conversation.</h3>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="flex flex-col">
                  <label className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/60 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="Full Name" 
                    className="bg-transparent border-b border-white/20 py-2 md:py-3 text-xs md:text-sm text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/60 mb-2">Your Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="your-email@example.com" 
                    className="bg-transparent border-b border-white/20 py-2 md:py-3 text-xs md:text-sm text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/60 mb-2">Message</label>
                <textarea 
                  name="message" 
                  rows={4} 
                  required 
                  placeholder="Tell me about your project or inquiry..." 
                  className="bg-transparent border-b border-white/20 py-2 md:py-3 text-xs md:text-sm text-white focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-6 md:px-8 py-3 md:py-4 bg-white text-black text-[10px] md:text-xs uppercase tracking-widest font-semibold hover:bg-white/80 transition-colors cursor-pointer disabled:opacity-50 w-full sm:w-auto"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {formStatus && (
                  <p className="text-[10px] md:text-xs uppercase tracking-widest text-white/70">{formStatus}</p>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* 8. Classic Premium Footer */}
      <footer id="contact" className="fixed bottom-0 left-0 w-full h-[50vh] md:h-[60vh] bg-[#121212] z-0 flex flex-col justify-between pt-12 md:pt-16 pb-6 overflow-hidden text-[#F4F0EA]">
        
        <div className="flex flex-col md:flex-row justify-between items-start w-full px-6 md:px-12 z-10 gap-8 md:gap-0">
          <div className="max-w-md">
            <h2 className="font-cormorant text-2xl md:text-5xl leading-[1.1] md:leading-[0.9] font-light mb-3 md:mb-4 text-[#F4F0EA]">Let's create <br/><span className="italic text-[#F4F0EA]/70">something exceptional.</span></h2>
            <a href="mailto:office@example.com" className="inline-block uppercase tracking-widest text-[10px] md:text-xs font-semibold border-b border-[#F4F0EA]/50 pb-1 hover:text-white hover:border-white transition-colors">
              mwajahath81@gmail.com
            </a>
          </div>
          
          <div className="flex gap-12 md:gap-16 text-[9px] md:text-[10px] uppercase tracking-widest font-medium">
            <div className="flex flex-col gap-2 md:gap-3">
              <span className="text-white/40 mb-1">Connect</span>
              <a href="https://www.linkedin.com/in/mwajahathaider" className="link-underline hover:text-white/80 transition-colors w-fit">LinkedIn</a>
              <a href="https://github.com/wajahat81" className="link-underline hover:text-white/80 transition-colors w-fit">GitHub</a>
            </div>
            <div className="flex flex-col gap-2 md:gap-3">
              <span className="text-white/40 mb-1">Legal</span>
              <a href="#" className="link-underline hover:text-white/80 transition-colors w-fit">Privacy Policy</a>
              <a href="#" className="link-underline hover:text-white/80 transition-colors w-fit">Terms of Service</a>
            </div>
          </div>
        </div>

        {/* Marquee Footer */}
        <div className="w-full relative mt-auto pt-4 border-t border-[#F4F0EA]/10">
          <a href="mailto:office@example.com" className="block w-full overflow-hidden hover:opacity-70 transition-opacity">
            <motion.div 
              className="flex whitespace-nowrap text-[18vw] md:text-[13vw] font-bold tracking-tighter leading-none uppercase text-[#F4F0EA]"
              animate={{ x: [0, -1500] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
            >
              <span className="pr-8 md:pr-12">GET IN TOUCH</span>
              <span className="pr-8 md:pr-12">GET IN TOUCH</span>
              <span className="pr-8 md:pr-12">GET IN TOUCH</span>
            </motion.div>
          </a>
        </div>
      </footer>
    </ReactLenis>
  );
}