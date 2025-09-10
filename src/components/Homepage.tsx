import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Search, Star, ArrowRight, MapPin, Calendar, Users, Award, Play } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Card, CardContent } from './ui/card'
import { ImageWithFallback } from './figma/ImageWithFallback'
import Navigation from './Navigation'
import { navigationContext } from '../App'

const heroImages = [
  "https://images.unsplash.com/photo-1524201862652-0d3d485d6d07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHBlcmZvcm1lciUyMGNvbmNlcnQlMjBzdGFnZXxlbnwxfHx8fDE3NTcwNjQyODd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1080",
  "https://images.unsplash.com/photo-1553756800-839189076c9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2lhbiUyMGd1aXRhciUyMHBlcmZvcm1lcnxlbnwxfHx8fDE3NTcwNjQyOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Jazz Vocalist",
    content: "Konduence connected me with amazing venues. I've booked 15+ gigs this year!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400"
  },
  {
    name: "Apex Studios",
    role: "Recording Studio",
    content: "Finding talented rappers and artists for our soundtrack projects has never been easier. Great platform!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
  },
  {
    name: "MC Supreme",
    role: "Hip-Hop Artist",
    content: "The booking process is so smooth. I've landed recording deals and live shows through Konduence!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
  }
]

const features = [
  {
    icon: Users,
    title: "Connect Instantly",
    description: "Direct messaging between artists and clients",
    color: "#FFC72C"
  },
  {
    icon: Calendar,
    title: "Smart Booking",
    description: "Integrated calendar and availability management",
    color: "#2C3539"
  },
  {
    icon: Award,
    title: "Verified Profiles",
    description: "All performers and venues are verified for quality",
    color: "#D4AF37"
  },
  {
    icon: MapPin,
    title: "Location-Based",
    description: "Find opportunities in your area or anywhere",
    color: "#FFC72C"
  }
]

export default function Homepage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [searchFiltersOpen, setSearchFiltersOpen] = useState(false)

  useEffect(() => {
    const heroInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    
    return () => {
      clearInterval(heroInterval)
      clearInterval(testimonialInterval)
    }
  }, [])





  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Carousel */}
      <section className="relative h-screen overflow-hidden">
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
                alt={`Hero slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
            </motion.div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold text-white mb-6"
              >
                Connect
                <span className="bg-gradient-to-r from-[#FFC72C] to-[#D4AF37] bg-clip-text text-transparent">
                  {' '}Artists
                </span>
                <br />
                with
                <span className="bg-gradient-to-r from-[#2C3539] to-[#FFC72C] bg-clip-text text-transparent">
                  {' '}Opportunities
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-[#AAAAAA] mb-8"
              >
                The premier marketplace for creative professionals. Musicians, rappers, models, and artists connecting with venues, recording studios, agencies, and clients worldwide.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#FFC72C] to-[#FCAE1E] hover:from-[#FCAE1E] hover:to-[#FFC72C] text-[#2C3539] border-0 px-8 py-3 text-lg font-semibold"
                  onClick={() => navigationContext.navigateTo('artist')}
                >
                  For Artists
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#2C3539] text-[#2C3539] hover:bg-[#2C3539] hover:text-white px-8 py-3 text-lg bg-white/10 backdrop-blur-sm font-semibold"
                  onClick={() => navigationContext.navigateTo('venue')}
                >
                  For Clients
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>


      </section>

      {/* Search Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Find Your Perfect Match</h2>
            <p className="text-xl text-muted-foreground">Search for artists, rappers, models, musicians or find recording studios and clients in your area</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl shadow-xl p-6 transition-colors duration-300"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search for artists, rappers, models, musicians, venues, studios, or skills..."
                  className="pl-10 h-12 bg-input-background border-2 border-border focus:border-[#FFC72C] rounded-xl text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48 h-12 bg-input-background border-2 border-border rounded-xl text-foreground">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="nyc">New York City</SelectItem>
                  <SelectItem value="la">Los Angeles</SelectItem>
                  <SelectItem value="chicago">Chicago</SelectItem>
                  <SelectItem value="austin">Austin</SelectItem>
                </SelectContent>
              </Select>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setSearchFiltersOpen(!searchFiltersOpen)}
                  className="h-12 px-6 bg-[#FFD700] hover:bg-[#FFC72C] text-[#121212] border-0 rounded-xl font-semibold transition-colors"
                >
                  Advanced
                </Button>
              </motion.div>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="h-12 px-8 bg-[#333333] hover:bg-[#444444] text-white border-0 rounded-xl font-semibold transition-colors"
                  onClick={() => navigationContext.navigateTo('gigs')}
                >
                  Search
                </Button>
              </motion.div>
            </div>

            {/* Advanced Filters */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: searchFiltersOpen ? 'auto' : 0,
                opacity: searchFiltersOpen ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-6 border-t border-border mt-6 flex flex-wrap gap-4">
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="hiphop">Hip-Hop/Rap</SelectItem>
                    <SelectItem value="modeling">Modeling</SelectItem>
                    <SelectItem value="dance">Dance</SelectItem>
                    <SelectItem value="acting">Acting</SelectItem>
                    <SelectItem value="voice">Voice/Vocal</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Skill Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concert">Concert</SelectItem>
                    <SelectItem value="recording">Recording Session</SelectItem>
                    <SelectItem value="soundtrack">Soundtrack/Jingle</SelectItem>
                    <SelectItem value="photoshoot">Photo Shoot</SelectItem>
                    <SelectItem value="fashion">Fashion Show</SelectItem>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="corporate">Corporate Event</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">Why Choose Konduence?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make it easy to connect, collaborate, and create unforgettable experiences - from live performances to studio recordings
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full border-border bg-card shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                      style={{ backgroundColor: `${feature.color}20` }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon 
                        className="h-8 w-8 text-[#FFD700]" 
                      />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 text-card-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">Join thousands of satisfied performers and venues</p>
          </motion.div>

          <div className="relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="bg-card rounded-3xl shadow-2xl p-8 md:p-12 transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <ImageWithFallback
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-[#FFC72C]/20"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-[#D4AF37] fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-xl md:text-2xl text-muted-foreground mb-4 italic">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>
                  <div>
                    <cite className="text-lg font-semibold text-card-foreground">
                      {testimonials[currentTestimonial].name}
                    </cite>
                    <p className="text-muted-foreground font-medium">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>


          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FFC72C] via-[#D4AF37] to-[#B89630]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#2C3539] mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-[#2C3539]/90 mb-8">
              Join the leading marketplace for live entertainment today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-[#2C3539] hover:bg-[#F7F5F2] px-8 py-3 text-lg font-semibold shadow-lg"
                onClick={() => navigationContext.navigateTo('performer')}
              >
                Get Started as Performer
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#2C3539] text-[#2C3539] hover:bg-[#2C3539] hover:text-white px-8 py-3 text-lg font-semibold"
                onClick={() => navigationContext.navigateTo('venue')}
              >
                Post Your Venue
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C3539] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-[#FFC72C] to-[#D4AF37] bg-clip-text text-transparent mb-4">
                Qsician
              </div>
              <p className="text-gray-400">
                Connecting performers and venues for unforgettable live experiences.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Performers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#FFC72C] transition-colors">Find Gigs</a></li>
                <li><a href="#" className="hover:text-[#FFC72C] transition-colors">Build Profile</a></li>
                <li><a href="#" className="hover:text-[#FFC72C] transition-colors">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Venues</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#FFC72C] transition-colors">Find Talent</a></li>
                <li><a href="#" className="hover:text-[#FFC72C] transition-colors">Post Events</a></li>
                <li><a href="#" className="hover:text-[#FFC72C] transition-colors">Venue Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#FFC72C] transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-[#FFC72C] transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-[#FFC72C] transition-colors">Terms & Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Qsician. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}