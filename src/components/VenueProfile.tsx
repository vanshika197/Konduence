import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MapPin, Star, Users, Calendar, Clock, ChevronLeft, ChevronRight, Plus, Camera, Wifi, Car, Music, Coffee, X } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'
import Navigation from './Navigation'
import { navigationContext } from '../App'

const heroImages = [
  "https://images.unsplash.com/photo-1590571054052-eec7ecae1f05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNvcmRpbmclMjBzdHVkaW8lMjBwcm9mZXNzaW9uYWwlMjBtdXNpY3xlbnwxfHx8fDE3NTczMzQxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1507759307406-da169254d741?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMHZlbnVlJTIwc3BhY2UlMjBjbGllbnRzfGVufDF8fHx8MTc1NzMzNDE5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1600447766334-36a93f35a21d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGFydGlzdHMlMjBjbGllbnRzfGVufDF8fHx8MTc1NzMzNDIwMHww&ixlib=rb-4.1.0&q=80&w=1080"
]

const venueData = {
  name: "Apex Recording Studios",
  type: "Professional Recording Studio & Creative Space",
  location: "145 4th Ave, Brooklyn, NY 11217",
  rating: 4.9,
  reviewCount: 156,
  capacity: "Recording sessions up to 15 people",
  description: "State-of-the-art recording facility specializing in hip-hop, rap, R&B, and contemporary music production. We offer full-service recording, mixing, mastering, and video production for artists and commercial clients.",
  amenities: [
    { icon: Music, name: "Pro Tools HD Recording", color: "#FFD700" },
    { icon: Camera, name: "Video Production Suite", color: "#FFD700" },
    { icon: Wifi, name: "High-Speed Internet", color: "#FFD700" },
    { icon: Car, name: "Private Parking", color: "#FFD700" },
    { icon: Coffee, name: "Artist Lounge", color: "#FFD700" }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1613651613954-519ca9c8a650?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB2ZW51ZSUyMGNvbmNlcnQlMjBoYWxsfGVufDF8fHx8MTc1NzA2NDI4OXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1636928837218-f2b56d5a7861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwdmVudWUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTcwNjM2ODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1601673732434-223451f7346e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXIlMjB2ZW51ZSUyMG5pZ2h0Y2x1YiUyMGludGVyaW9yfGVufDF8fHx8MTc1NzA2NDQ4OXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1574391884720-bfcb27c6d8a5?w=600",
    "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600",
    "https://images.unsplash.com/photo-1559329007-40df8ee4405a?w=600"
  ],
  availabilityDates: {
    "2024-12-15": { available: true, timeSlots: ["7:00 PM - 10:00 PM", "10:30 PM - 1:00 AM"] },
    "2024-12-16": { available: false, reason: "Private Event" },
    "2024-12-17": { available: true, timeSlots: ["8:00 PM - 11:00 PM"] },
    "2024-12-18": { available: true, timeSlots: ["7:00 PM - 10:00 PM", "10:30 PM - 1:00 AM"] },
    "2024-12-19": { available: true, timeSlots: ["6:00 PM - 9:00 PM", "9:30 PM - 12:30 AM"] },
    "2024-12-20": { available: true, timeSlots: ["7:00 PM - 10:00 PM", "10:30 PM - 1:00 AM"] },
    "2024-12-21": { available: false, reason: "Maintenance" }
  }
}

export default function VenueProfile() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [showGigForm, setShowGigForm] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 11)) // December 2024
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-rotate slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % venueData.gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + venueData.gallery.length) % venueData.gallery.length)
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      days.push({ day, dateStr })
    }
    
    return days
  }

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const days = getDaysInMonth(currentMonth)

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navigation />
      
      {/* Dynamic Hero Section with Slideshow */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Yellow to Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFD700]/20 via-background/40 to-background z-10" />
        
        {/* Slideshow Background */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: index === currentSlide ? 1 : 0,
                scale: index === currentSlide ? 1 : 1.1
              }}
              transition={{ duration: 1 }}
            >
              <ImageWithFallback
                src={image}
                alt={`Venue slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-background" />
            </motion.div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-4xl">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold text-white mb-6"
              >
                {venueData.name}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-[#AAAAAA] mb-6"
              >
                {venueData.type}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-wrap items-center gap-6 mb-8"
              >
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="h-5 w-5 text-[#FFD700]" />
                  <span>{venueData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Star className="h-5 w-5 fill-current text-[#FFD700]" />
                  <span>{venueData.rating}</span>
                  <span className="text-[#AAAAAA]">({venueData.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Users className="h-5 w-5 text-[#FFD700]" />
                  <span>{venueData.capacity}</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="bg-[#FFD700] text-[#121212] hover:bg-[#FFC72C] px-8 py-3 text-lg font-semibold transition-colors"
                  onClick={() => setShowGigForm(true)}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Post a Gig
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-foreground hover:bg-white hover:text-[#121212] px-8 py-3 text-lg font-semibold transition-colors"
                  onClick={() => navigationContext.navigateTo('messages')}
                >
                  Contact Venue
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Gallery Navigation for Hero */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-[#FFD700] w-8' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Venue Gallery Section */}
      <section className="relative py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-foreground"
          >
            Venue Gallery
          </motion.h2>
          
          {/* Gallery Carousel */}
          <div className="relative h-96 overflow-hidden rounded-2xl">
            <div className="relative h-full">
              {venueData.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${venueData.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Gallery Navigation */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 text-white hover:bg-black/70 rounded-full"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 text-white hover:bg-black/70 rounded-full"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Gallery Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {venueData.gallery.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Venue Details */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* About Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border"
              >
                <h2 className="text-2xl font-bold mb-4 text-card-foreground">About The Venue</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{venueData.description}</p>
                
                <h3 className="text-xl font-semibold mb-4 text-card-foreground">Amenities & Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {venueData.amenities.map((amenity, index) => (
                    <motion.div
                      key={amenity.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border hover:shadow-md transition-shadow"
                    >
                      <div className="p-2 rounded-lg bg-[#FFD700]/10">
                        <amenity.icon className="h-5 w-5 text-[#FFD700]" />
                      </div>
                      <span className="text-sm font-medium text-card-foreground">{amenity.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Map Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border"
              >
                <h2 className="text-2xl font-bold mb-4 text-card-foreground">Location</h2>
                <div className="bg-muted/30 rounded-xl h-64 flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-card-foreground font-medium">Interactive Map</p>
                    <p className="text-sm text-muted-foreground">{venueData.location}</p>
                    <Button 
                      variant="outline" 
                      className="mt-3 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#121212]"
                    >
                      View on Google Maps
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Calendar */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-lg sticky top-8 border border-border"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-card-foreground">Availability</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={prevMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium min-w-[120px] text-center text-card-foreground">
                      {formatMonthYear(currentMonth)}
                    </span>
                    <Button variant="ghost" size="icon" onClick={nextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-xs font-medium text-muted-foreground text-center py-2">
                      {day}
                    </div>
                  ))}
                  
                  {days.map((dayData, index) => (
                    <motion.div
                      key={index}
                      whileHover={dayData ? { scale: 1.1 } : {}}
                      whileTap={dayData ? { scale: 0.95 } : {}}
                    >
                      {dayData ? (
                        <button
                          className={`w-full aspect-square text-sm rounded-lg transition-all ${
                            venueData.availabilityDates[dayData.dateStr]?.available
                              ? selectedDate === dayData.dateStr
                                ? 'bg-[#FFD700] text-[#121212] font-semibold'
                                : 'hover:bg-[#FFD700]/10 text-card-foreground border border-[#FFD700]/30'
                              : 'bg-muted text-muted-foreground cursor-not-allowed'
                          }`}
                          onClick={() => {
                            if (venueData.availabilityDates[dayData.dateStr]?.available) {
                              setSelectedDate(dayData.dateStr === selectedDate ? null : dayData.dateStr)
                            }
                          }}
                          disabled={!venueData.availabilityDates[dayData.dateStr]?.available}
                        >
                          {dayData.day}
                        </button>
                      ) : (
                        <div className="w-full aspect-square" />
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Selected Date Info */}
                <AnimatePresence>
                  {selectedDate && venueData.availabilityDates[selectedDate] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-border pt-4"
                    >
                      <h3 className="font-semibold mb-2 text-card-foreground">
                        {new Date(selectedDate).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </h3>
                      <div className="space-y-2">
                        {venueData.availabilityDates[selectedDate].timeSlots?.map((slot, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-[#FFD700]/5 rounded-lg border border-[#FFD700]/20"
                          >
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-[#FFD700]" />
                              <span className="text-sm font-medium text-card-foreground">{slot}</span>
                            </div>
                            <Button 
                              size="sm" 
                              className="bg-[#FFD700] hover:bg-[#FFC72C] text-[#121212] text-xs font-semibold"
                              onClick={() => setShowGigForm(true)}
                            >
                              Book Slot
                            </Button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Legend */}
                <div className="flex items-center gap-4 pt-4 border-t border-border text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-[#FFD700]/30 border border-[#FFD700]" />
                    <span className="text-card-foreground">Available</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-muted" />
                    <span className="text-muted-foreground">Booked</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Gig Form Modal */}
      <AnimatePresence>
        {showGigForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-card-foreground">Post a New Gig</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowGigForm(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-card-foreground">Event Title</label>
                    <input
                      type="text"
                      placeholder="Jazz Night at The Blue Note"
                      className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent bg-input-background text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-card-foreground">Event Date</label>
                    <input
                      type="date"
                      className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent bg-input-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-card-foreground">Start Time</label>
                    <input
                      type="time"
                      className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent bg-input-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-card-foreground">Duration (hours)</label>
                    <input
                      type="number"
                      placeholder="3"
                      className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent bg-input-background text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-card-foreground">Genre</label>
                    <select className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent bg-input-background text-foreground">
                      <option>Jazz</option>
                      <option>Rock</option>
                      <option>Electronic</option>
                      <option>Folk</option>
                      <option>Classical</option>
                      <option>Pop</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-card-foreground">Budget Range</label>
                    <select className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent bg-input-background text-foreground">
                      <option>$100-250</option>
                      <option>$250-500</option>
                      <option>$500-750</option>
                      <option>$750-1000</option>
                      <option>$1000+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-card-foreground">Performer Type</label>
                    <select className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent bg-input-background text-foreground">
                      <option>Solo Artist</option>
                      <option>Duo</option>
                      <option>Band (3-5 members)</option>
                      <option>Large Ensemble (6+ members)</option>
                      <option>DJ</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-card-foreground">Skill Level Required</label>
                    <select className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent bg-input-background text-foreground">
                      <option>Beginner Welcome</option>
                      <option>Intermediate</option>
                      <option>Professional Only</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-card-foreground">Special Requirements</label>
                    <textarea
                      placeholder="Sound equipment provided, specific song requests..."
                      rows={3}
                      className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent bg-input-background text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 mt-4 text-card-foreground">Event Description</label>
                <textarea
                  placeholder="Describe the event, atmosphere, audience, and what you're looking for in a performer..."
                  rows={4}
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent bg-input-background text-foreground placeholder:text-muted-foreground"
                />
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1 border-border text-foreground hover:bg-muted"
                  onClick={() => setShowGigForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-[#FFD700] hover:bg-[#FFC72C] text-[#121212] border-0 font-semibold"
                  onClick={() => {
                    setShowGigForm(false)
                    navigationContext.navigateTo('gigs')
                  }}
                >
                  Post Gig
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}