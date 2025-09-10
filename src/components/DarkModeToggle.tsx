import { Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'
import { useDarkMode } from './DarkModeContext'
import { useState, useEffect } from 'react'

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleDarkMode}
      className={`font-bold transition-all duration-200 p-2 relative ${
        isDarkMode 
          ? 'text-[#FFD700] bg-[#FFD700]/10 hover:bg-[#FFD700]/20' 
          : isScrolled 
            ? 'text-[#242222] hover:text-[#FFD700] hover:bg-[#FFD700]/10'
            : 'text-[#C0C0C0] hover:text-[#FFD700] hover:bg-[#FFD700]/10'
      }`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      {isDarkMode && (
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FFD700] rounded-full animate-pulse" />
      )}
    </Button>
  )
}