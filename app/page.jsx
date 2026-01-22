"use client"
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { NavbarDemo } from './components/navHero';
import { GridBackgroundDemo } from '@/components/ui/background-ripple-effect';
import LeaderboardSection from '@/components/ui/lamp';

export default function AnimatedRectangle() {
  const [step, setStep] = useState(0);
  const lottieRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    // Load Lottie
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
    script.async = true;
    
    

    const loadLottieFile = async () => {
      try {
        const response = await fetch('/x.json');
        const animationData = await response.json();
        
        if (window.lottie && lottieRef.current) {
          window.lottie.loadAnimation({
            container: lottieRef.current,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            animationData: animationData
          });
        }
      } catch (error) {
        console.error('Error loading Lottie file:', error);
      }
    };
    
    script.onload = loadLottieFile;
    document.body.appendChild(script);

    const timer1 = setTimeout(() => setStep(1), 500);
    const timer2 = setTimeout(() => setStep(2), 2000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
         <NavbarDemo />
     </div>
      {/* HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden bg-[#070b1a]">
      <GridBackgroundDemo/>
        {/* Animated Rectangle */}
        <motion.div
  className="absolute w-82 h-82 md:w-140 md:h-140"
  initial={{
    left: '50%',
    top: '100%',
    x: '-50%',
    y: '-100%',
    scale: 1
  }}
  animate={{
    left: step >= 2 ? (window.innerWidth >= 768 ? '75%' : '50%') : '50%',
    top: step >= 1 ? (window.innerWidth >= 768 ? '50%' : '70%') : '100%',
    y: '-50%',
    scale: step >= 1 ? 1.5 : 1
  }}
  transition={{
    duration: 1,
    ease: 'easeInOut'
  }}
>
  <div ref={lottieRef} className="w-full h-full" />
</motion.div>


        {/* Left Side Text */}
        <motion.div
          className="absolute left-19 top-1/2 -translate-y-1/2 max-w-lg text-white z-10 "
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 2 ? 1 : 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
        <div className="text-center xl:col-span-1 lg:text-left ">
              <h1 className="text-3xl mt-5 font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-5xl pixel-font">
                Start Your Coding Adventure
              </h1>
              <p className="mt-2 text-lg text-gray-600 sm:mt-6 font-inter">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.
              </p>

             

              {/* Testimonial */}
              
            </div>
        </motion.div>
      </section>

<section className="relative py-12 sm:py-16 lg:pb-40">
  <div className="absolute bottom-0 right-0 overflow-hidden">
    <img
      className="w-full h-auto origin-bottom-right transform scale-150 lg:w-auto lg:mx-auto lg:object-cover lg:scale-75"
      src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/1/background-pattern.png"
      alt="Background Pattern"
    />
  </div>

  <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-y-4 lg:items-center lg:grid-cols-2 xl:grid-cols-2">
      {/* Image */}
      <div className="xl:col-span-1 order-1 lg:order-1">
        <img
          className="w-full mx-auto"
          src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/1/illustration.png"
          alt="Illustration"
        />
      </div>

      {/* Text Content */}
      <div className="text-center xl:col-span-1 lg:text-left md:px-16 lg:px-0 xl:pl-20 order-2 lg:order-2">
        <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl font-pj">
          An editor that helps you write clean codes.
        </h1>
        <p className="mt-2 text-lg text-gray-600 sm:mt-6 font-inter">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.
        </p>
      </div>
    </div>
  </div>
</section>



<LeaderboardSection/>

      {/* COURSES SECTION */}
      <section className="py-32 bg-[#070b1a]">
        

        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            Journey through the world of programming
          </h2>

          <p className="text-center text-white/60 max-w-2xl mx-auto mb-10">
            Interactive courses designed by educators to guide you step by step.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Filter active>Popular</Filter>
            <Filter>Web Dev</Filter>
            <Filter>Data</Filter>
            <Filter>Tools</Filter>
          </div>

          {/* Course Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <CourseCard title="Python" color="from-green-400 to-blue-400" />
            <CourseCard title="HTML" color="from-orange-400 to-red-400" />
            <CourseCard title="CSS" color="from-blue-400 to-purple-400" />
            <CourseCard title="JavaScript" color="from-yellow-400 to-orange-500" />
            <CourseCard title="SQL" color="from-indigo-400 to-purple-500" />
            <CourseCard title="React" color="from-cyan-400 to-blue-500" />
          </div>
        </div>
      </section>


      {/*asdf*/}

   
    </div>
  );
}

// Course Card
function CourseCard({ title, color }) {
  return (
    <div className="bg-[#0b1024] border border-white/10 rounded-xl overflow-hidden hover:translate-y-[-4px] transition-transform duration-300 shadow-md">
      <div className={`h-36 bg-gradient-to-br ${color}`} />
      <div className="p-5">
        <p className="text-xs text-white mb-1">COURSE</p>
        <h3 className="text-xl text-white font-bold mb-2">{title}</h3>
        <p className="text-sm text-white mb-4">
          Learn core concepts through interactive challenges and projects.
        </p>
        <span className="inline-block px-3 py-1 text-xs border border-white text-white rounded-full">
          Beginner
        </span>
      </div>
    </div>
  );
}

// Filter Button
function Filter({ children, active }) {
  return (
    <button
      className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
        active
          ? "bg-blue-500 border-blue-400 text-white"
          : "border border-white/20 text-white/60 hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}








