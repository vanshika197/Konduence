import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, Search, User, MessageSquare } from 'lucide-react'
import { Button } from './ui/button'
import { navigationContext } from '../App'
import DarkModeToggle from './DarkModeToggle'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', page: 'home' as const },
    { name: 'Find Opportunities', page: 'gigs' as const },
    { name: 'Find Venues & Clients', page: 'venue' as const },
    { name: 'Messages', page: 'messages' as const },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center cursor-pointer"
            onClick={() => navigationContext.navigateTo('home')}
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-[#FFC72C] via-[#D4AF37] to-[#B89630] bg-clip-text text-transparent">
              Konduence
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                onClick={() => navigationContext.navigateTo(item.page)}
                className={`relative px-3 py-2 text-sm font-bold transition-colors ${
                  navigationContext.currentPage === item.page
                    ? 'text-[#FFD700]'
                    : isScrolled 
                      ? 'text-[#242222] hover:text-[#FFD700]' 
                      : 'text-[#C0C0C0] hover:text-[#FFD700]'
                }`}
              >
                {item.name}
                {navigationContext.currentPage === item.page && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD700]"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`font-bold transition-colors ${
                isScrolled 
                  ? 'text-[#242222] hover:text-[#FFD700] hover:bg-[#FFD700]/10' 
                  : 'text-[#C0C0C0] hover:text-[#FFD700] hover:bg-[#FFD700]/10'
              }`}
            >
              <Search className="h-4 w-4" />
            </Button>
            <DarkModeToggle />
            <Button
              variant="outline"
              size="sm"
              className="border-[#C0C0C0] text-[#C0C0C0] hover:border-[#FFD700] hover:text-[#FFD700] hover:bg-[#FFD700]/10 font-bold transition-all duration-200 rounded-lg"
              onClick={() => navigationContext.navigateTo('artist')}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button
              size="sm"
              className="bg-[#FFD700] text-[#121212] hover:bg-[#FFC72C] border-0 font-semibold transition-colors rounded-lg"
              onClick={() => navigationContext.navigateTo('signup')}
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <DarkModeToggle />
            <button
              className={`p-2 rounded-md transition-colors font-bold ${
                isScrolled 
                  ? 'text-[#242222] hover:text-[#FFD700] hover:bg-[#FFD700]/10'
                  : 'text-[#C0C0C0] hover:text-[#FFD700] hover:bg-[#FFD700]/10'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border transition-colors duration-300"
          >
            <div className="px-4 py-2 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigationContext.navigateTo(item.page)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm font-bold transition-colors ${
                    navigationContext.currentPage === item.page
                      ? 'text-[#FFD700] bg-[#FFD700]/10'
                      : 'text-foreground hover:text-[#FFD700] hover:bg-[#FFD700]/10'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="flex space-x-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 border-[#C0C0C0] text-[#C0C0C0] hover:border-[#FFD700] hover:text-[#FFD700] hover:bg-[#FFD700]/10 font-bold transition-all duration-200 rounded-lg"
                  onClick={() => navigationContext.navigateTo('artist')}
                >
                  Profile
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-[#FFD700] text-[#121212] hover:bg-[#FFC72C] border-0 font-semibold transition-colors"
                  onClick={() => {
                    navigationContext.navigateTo('signup')
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}