import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Toaster } from './components/ui/sonner'
import { DarkModeProvider } from './components/DarkModeContext'
import Homepage from './components/Homepage'
import ArtistProfile from './components/ArtistProfile'
import VenueProfile from './components/VenueProfile'
import GigListing from './components/GigListing'
import MessagingBooking from './components/MessagingBooking'
import SignupLogin from './components/SignupLogin'

type Page = 'home' | 'artist' | 'venue' | 'gigs' | 'messages' | 'signup'

interface NavigationContextType {
  currentPage: Page
  navigateTo: (page: Page) => void
}

export const navigationContext = {
  currentPage: 'home' as Page,
  navigateTo: (page: Page) => {}
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const navigateTo = (page: Page) => {
    if (page === currentPage) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPage(page)
      setIsTransitioning(false)
    }, 200)
  }

  navigationContext.currentPage = currentPage
  navigationContext.navigateTo = navigateTo

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage />
      case 'artist':
        return <ArtistProfile />
      case 'venue':
        return <VenueProfile />
      case 'gigs':
        return <GigListing />
      case 'messages':
        return <MessagingBooking />
      case 'signup':
        return <SignupLogin />
      default:
        return <Homepage />
    }
  }

  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-background">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`min-h-screen ${isTransitioning ? 'pointer-events-none' : ''}`}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
        <Toaster />
      </div>
    </DarkModeProvider>
  )
}