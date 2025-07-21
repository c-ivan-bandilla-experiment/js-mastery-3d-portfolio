import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { styles } from '../styles';
import { ComputersCanvas } from './canvas';

const Hero = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      setShowScrollIndicator(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowScrollIndicator(true), 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className='relative w-full h-screen mx-auto'>
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915eff]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>
        <div>
          <h1 className={`${styles.heroHeadText}`}>
            HI , I'm <span className='text-[#915eff]'>Adrian</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2`}>
            I develop 3D visuals, user-friendly web experiences and
            interactive animations.
          </p>
        </div>
      </div>
      <ComputersCanvas />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href='#about'>
          <AnimatePresence>
            {showScrollIndicator && (
              <motion.div
                className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  animate={{ y: [0, 24, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
                  className='w-3 h-3 rounded-full bg-secondary mb-1'
                />
              </motion.div>
            )}
          </AnimatePresence>
        </a>

      </div>
    </section>
  )
}

export default Hero