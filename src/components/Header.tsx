import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Mic2, Menu, X } from 'lucide-react';
import { useScroll } from '../hooks/useScroll';

interface HeaderProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onThemeToggle }) => {
  const { scrollY, isScrollingUp } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const headerBg = scrollY > 50 
    ? theme === 'light' 
      ? 'bg-white/80 backdrop-blur-lg'
      : 'bg-black/80 backdrop-blur-lg'
    : 'bg-transparent';

  const textColor = scrollY > 50
    ? theme === 'light'
      ? 'text-gray-800'
      : 'text-white'
    : 'text-white';

  return (
    <AnimatePresence>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: isScrollingUp ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className={`fixed w-full top-0 z-50 transition-colors duration-300 ${headerBg}`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Mic2 className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                Speechify
              </span>
            </motion.div>

            <nav className="hidden md:flex items-center gap-6">
              {['Features', 'How it Works', 'About'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`${textColor} hover:text-blue-400 transition-colors relative group`}
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"
                    initial={false}
                  />
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onThemeToggle}
                className={`p-2 rounded-full ${textColor} hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </motion.button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 ${textColor} hover:text-blue-400`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4"
              >
                <nav className="flex flex-col gap-4">
                  {['Features', 'How it Works', 'About'].map((item) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`${textColor} hover:text-blue-400 py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
                      whileHover={{ x: 10 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </motion.a>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </AnimatePresence>
  );
};