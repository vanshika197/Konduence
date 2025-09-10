import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, Filter, MapPin, Calendar, Clock, DollarSign, Users, Star, ChevronDown, X, Music, Heart, Share2 } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { ImageWithFallback } from './figma/ImageWithFallback'
import Navigation from './Navigation'
import { navigationContext } from '../App'

const heroImages = [
  "https://images.unsplash.com/photo-1606819813301-c47338f20940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2lhbnMlMjBwZXJmb3JtaW5nJTIwc3RhZ2UlMjBjb25jZXJ0fGVufDF8fHx8MTc1NzMzNDA2MHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1617469859390-a3a579d11041?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyZWNvcmRpbmclMjBzdHVkaW8lMjBtdXNpY2lhbnMlMjBhcnRpc3RzfGVufDF8fHx8MTc1NzMzNDA2NHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1751512696922-e9d6aa9a7840?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmb3JtZXJzJTIwYXJ0aXN0cyUyMGRpdmVyc2UlMjBjcmVhdGl2ZXxlbnwxfHx8fDE3NTczMzQwNjd8MA&ixlib=rb-4.1.0&q=80&w=1080"
]

const gigListings = [
  {
    id: 1,
    title: "Jazz Night at The Blue Note",
    venue: "The Blue Note NYC",
    venueImage: "https://images.unsplash.com/photo-1613651613954-519ca9c8a650?w=400",
    date: "2024-12-20",
    time: "8:00 PM - 11:00 PM",
    location: "Greenwich Village, NYC",
    budget: "$300-500",
    genre: "Jazz",
    performerType: "Solo/Duo",
    skillLevel: "Professional",
    description: "Looking for a talented jazz vocalist or instrumentalist for our weekly jazz night. Intimate setting with great acoustics.",
    requirements: ["Own instruments (except piano)", "2+ hour set", "Jazz standards repertoire"],
    rating: 4.8,
    isUrgent: false,
    isFeatured: true
  },
  {
    id: 2,
    title: "Wedding Reception Performance", 
    venue: "The Grand Ballroom",
    venueImage: "https://images.unsplash.com/photo-1636928837218-f2b56d5a7861?w=400",
    date: "2024-12-22",
    time: "6:00 PM - 10:00 PM",
    location: "Upper East Side, NYC",
    budget: "$800-1200",
    genre: "Mixed/Cover Songs",
    performerType: "Band (3-5)",
    skillLevel: "Professional",
    description: "Seeking an elegant band for wedding reception. Mix of classic hits, romantic ballads, and danceable tunes.",
    requirements: ["Sound equipment provided", "Formal attire", "Take requests"],
    rating: 4.9,
    isUrgent: true,
    isFeatured: false
  },
  {
    id: 3,
    title: "Electronic Music Night",
    venue: "Warehouse 23",
    venueImage: "https://images.unsplash.com/photo-1601673732434-223451f7346e?w=400", 
    date: "2024-12-18",
    time: "10:00 PM - 3:00 AM",
    location: "Brooklyn, NYC",
    budget: "$400-600",
    genre: "Electronic/Techno",
    performerType: "DJ",
    skillLevel: "Intermediate",
    description: "Underground electronic music event. Looking for DJs who can bring the energy and keep the dance floor moving.",
    requirements: ["Bring own equipment", "5+ hour set capability", "Experience with electronic genres"],
    rating: 4.6,
    isUrgent: false,
    isFeatured: false
  },
  {
    id: 4,
    title: "Hip-Hop Track Recording",
    venue: "Apex Recording Studios", 
    venueImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
    date: "2024-12-19",
    time: "2:00 PM - 8:00 PM",
    location: "Brooklyn, NYC",
    budget: "$400-600",
    genre: "Hip-Hop/Rap",
    performerType: "Rapper/Vocalist",
    skillLevel: "Professional",
    description: "Major brand needs talented rapper for commercial jingle and social media campaign. Professional studio environment with top-tier equipment.",
    requirements: ["Professional rap experience", "Own lyrics/freestyle ability", "Commercial-friendly content"],
    rating: 4.8,
    isUrgent: true,
    isFeatured: true
  },
  {
    id: 5,
    title: "Acoustic Open Mic Night",
    venue: "Coffee & Notes Cafe",
    venueImage: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=400",
    date: "2024-12-16",
    time: "7:00 PM - 10:00 PM", 
    location: "Lower East Side, NYC",
    budget: "$150-250",
    genre: "Folk/Acoustic",
    performerType: "Solo",
    skillLevel: "Beginner Welcome",
    description: "Cozy cafe hosting weekly open mic. Perfect for singer-songwriters and acoustic performers to showcase original music.",
    requirements: ["Acoustic instruments only", "Original songs preferred", "15-20 min slots"],
    rating: 4.4,
    isUrgent: false,
    isFeatured: false
  },
  {
    id: 6,
    title: "Video Game Soundtrack",
    venue: "Digital Dreams Studios",
    venueImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400",
    date: "2024-12-21", 
    time: "10:00 AM - 6:00 PM",
    location: "Manhattan, NYC",
    budget: "$800-1200",
    genre: "Electronic/Ambient",
    performerType: "Composer/Producer",
    skillLevel: "Professional",
    description: "Gaming company seeks talented artist to create background music and sound effects for upcoming mobile game. Creative freedom encouraged.",
    requirements: ["Digital audio workstation proficiency", "Portfolio of previous work", "Ability to create atmospheric music"],
    rating: 4.6,
    isUrgent: false,
    isFeatured: false
  },
  {
    id: 7,
    title: "Rooftop Summer Series",
    venue: "Sky Deck Lounge",
    venueImage: "https://images.unsplash.com/photo-1559329007-40df8ee4405a?w=400",
    date: "2024-12-21", 
    time: "5:00 PM - 8:00 PM",
    location: "Williamsburg, Brooklyn",
    budget: "$500-700",
    genre: "Indie/Alternative",
    performerType: "Band (3-5)",
    skillLevel: "Professional",
    description: "Outdoor rooftop venue with stunning city views. Looking for indie bands to complement the urban atmosphere.",
    requirements: ["Weather contingency plan", "Outdoor equipment setup", "Crowd interaction skills"],
    rating: 4.8,
    isUrgent: false,
    isFeatured: true
  }
]

const suggestedGigs = [
  {
    id: 7,
    title: "Jazz Brunch Series",
    venue: "The Garden Restaurant",
    budget: "$200-350",
    date: "2024-12-23",
    image: "https://images.unsplash.com/photo-1519749331243-664b4b5b7a83?w=300"
  },
  {
    id: 8,
    title: "New Year's Eve Celebration", 
    venue: "Metropolitan Club",
    budget: "$1000-1500",
    date: "2024-12-31",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300"
  },
  {
    id: 9,
    title: "Art Gallery Opening",
    venue: "Modern Art Space",
    budget: "$300-450", 
    date: "2024-12-17",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300"
  }
]

export default function GigListing() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedGig, setSelectedGig] = useState<typeof gigListings[0] | null>(null)
  const [currentSuggestion, setCurrentSuggestion] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [filters, setFilters] = useState({
    genre: 'all',
    location: 'all', 
    budget: 'all',
    performerType: 'all',
    date: 'all'
  })

  // Auto-rotate slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const filteredGigs = gigListings.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.genre.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesGenre = filters.genre === 'all' || gig.genre.toLowerCase().includes(filters.genre.toLowerCase())
    const matchesPerformerType = filters.performerType === 'all' || gig.performerType.toLowerCase().includes(filters.performerType.toLowerCase())
    
    return matchesSearch && matchesGenre && matchesPerformerType
  })

  const nextSuggestion = () => {
    setCurrentSuggestion((prev) => (prev + 1) % suggestedGigs.length)
  }

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
                alt={`Performance slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-background" />
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
                Find Your
                <span className="bg-gradient-to-r from-[#FFD700] to-[#FFC72C] bg-clip-text text-transparent">
                  {' '}Next Gig
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-[#AAAAAA] mb-8"
              >
                Discover amazing performance opportunities, recording sessions, and creative collaborations in your area
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="bg-[#FFD700] text-[#121212] hover:bg-[#FFC72C] px-8 py-3 text-lg font-semibold transition-colors"
                  onClick={() => navigationContext.navigateTo('artist')}
                >
                  Create Artist Profile
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-foreground hover:bg-white hover:text-[#121212] px-8 py-3 text-lg font-semibold transition-colors"
                >
                  Browse All Opportunities
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="absolute bottom-8 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="bg-card/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-border"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Search gigs, venues, or genres..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 bg-input-background border-2 border-border focus:border-[#FFD700] rounded-xl text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                
                <Button
                  variant={filtersOpen ? "default" : "outline"}
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className={`h-12 px-6 rounded-xl transition-colors ${
                    filtersOpen 
                      ? 'bg-[#FFD700] text-[#121212] hover:bg-[#FFC72C]' 
                      : 'border-2 border-border text-foreground hover:bg-muted'
                  }`}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
                </Button>

                <Button
                  size="lg"
                  className="h-12 px-8 bg-[#333333] hover:bg-[#444444] text-white rounded-xl font-semibold transition-colors"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              {/* Advanced Filters */}
              <AnimatePresence>
                {filtersOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 border-t border-border mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Select value={filters.genre} onValueChange={(value) => setFilters({...filters, genre: value})}>
                        <SelectTrigger className="bg-input-background border-border text-foreground">
                          <SelectValue placeholder="Genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Genres</SelectItem>
                          <SelectItem value="jazz">Jazz</SelectItem>
                          <SelectItem value="rock">Rock</SelectItem>
                          <SelectItem value="electronic">Electronic</SelectItem>
                          <SelectItem value="folk">Folk/Acoustic</SelectItem>
                          <SelectItem value="pop">Pop</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={filters.performerType} onValueChange={(value) => setFilters({...filters, performerType: value})}>
                        <SelectTrigger className="bg-input-background border-border text-foreground">
                          <SelectValue placeholder="Performer Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="solo">Solo</SelectItem>
                          <SelectItem value="duo">Duo</SelectItem>
                          <SelectItem value="band">Band</SelectItem>
                          <SelectItem value="dj">DJ</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={filters.budget} onValueChange={(value) => setFilters({...filters, budget: value})}>
                        <SelectTrigger className="bg-input-background border-border text-foreground">
                          <SelectValue placeholder="Budget Range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Budgets</SelectItem>
                          <SelectItem value="low">Under $300</SelectItem>
                          <SelectItem value="mid">$300-600</SelectItem>
                          <SelectItem value="high">$600+</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={filters.location} onValueChange={(value) => setFilters({...filters, location: value})}>
                        <SelectTrigger className="bg-input-background border-border text-foreground">
                          <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All NYC</SelectItem>
                          <SelectItem value="manhattan">Manhattan</SelectItem>
                          <SelectItem value="brooklyn">Brooklyn</SelectItem>
                          <SelectItem value="queens">Queens</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 bg-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Main Content - Gig Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  {filteredGigs.length} Gigs Available
                </h2>
                <Select>
                  <SelectTrigger className="w-48 bg-input-background border-border text-foreground">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="budget-high">Highest Budget</SelectItem>
                    <SelectItem value="budget-low">Lowest Budget</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="rating">Venue Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredGigs.map((gig, index) => (
                  <motion.div
                    key={gig.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="overflow-hidden border-border shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-card rounded-2xl">
                      <div className="relative">
                        <ImageWithFallback
                          src={gig.venueImage}
                          alt={gig.venue}
                          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          {gig.isFeatured && (
                            <Badge className="bg-gradient-to-r from-[#FFD700] to-[#FFC72C] text-[#121212] border-0 font-semibold">
                              Featured
                            </Badge>
                          )}
                          {gig.isUrgent && (
                            <Badge className="bg-gradient-to-r from-[#e74c3c] to-[#c0392b] text-white border-0">
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white text-gray-600">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white text-gray-600">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-bold line-clamp-1 group-hover:text-[#FFD700] transition-colors text-card-foreground">
                            {gig.title}
                          </h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="h-4 w-4 fill-current text-[#FFD700]" />
                            <span>{gig.rating}</span>
                          </div>
                        </div>
                        
                        <p className="text-card-foreground font-medium mb-3">{gig.venue}</p>
                        
                        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4 text-[#FFD700]" />
                            <span>{new Date(gig.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 text-[#FFD700]" />
                            <span>{gig.time.split(' - ')[0]}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 text-[#FFD700]" />
                            <span>{gig.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <DollarSign className="h-4 w-4 text-[#FFD700]" />
                            <span>{gig.budget}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant="secondary" className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/20">
                            {gig.genre}
                          </Badge>
                          <Badge variant="secondary" className="bg-muted text-muted-foreground border-border">
                            {gig.performerType}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                          {gig.description}
                        </p>
                        
                        <Button
                          className="w-full bg-[#FFD700] hover:bg-[#FFC72C] text-[#121212] border-0 font-semibold transition-colors"
                          onClick={() => setSelectedGig(gig)}
                        >
                          View Details & Apply
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar - Suggested Gigs */}
            <div className="lg:w-80">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl p-6 shadow-lg sticky top-8 border border-border"
              >
                <h3 className="text-xl font-bold mb-6 text-card-foreground">Suggested for You</h3>
                
                <div className="space-y-4">
                  {suggestedGigs.map((gig, index) => (
                    <motion.div
                      key={gig.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ 
                        opacity: index === currentSuggestion ? 1 : 0.5,
                        scale: index === currentSuggestion ? 1 : 0.9
                      }}
                      transition={{ duration: 0.3 }}
                      className={`relative rounded-xl overflow-hidden cursor-pointer transition-all ${
                        index === currentSuggestion ? 'ring-2 ring-[#FFD700]' : ''
                      }`}
                      onClick={nextSuggestion}
                    >
                      <ImageWithFallback
                        src={gig.image}
                        alt={gig.venue}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h4 className="font-semibold text-sm line-clamp-1">{gig.title}</h4>
                        <p className="text-xs text-gray-300">{gig.venue}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs">{new Date(gig.date).toLocaleDateString()}</span>
                          <span className="text-xs font-medium">{gig.budget}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-border text-foreground hover:bg-muted"
                  onClick={nextSuggestion}
                >
                  See More Suggestions
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Gig Details Modal */}
      <AnimatePresence>
        {selectedGig && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setSelectedGig(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <ImageWithFallback
                  src={selectedGig.venueImage}
                  alt={selectedGig.venue}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-600"
                  onClick={() => setSelectedGig(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
                <div className="absolute bottom-4 left-6 text-white">
                  <h1 className="text-3xl font-bold mb-2">{selectedGig.title}</h1>
                  <p className="text-xl">{selectedGig.venue}</p>
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-4 text-card-foreground">Event Details</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">{selectedGig.description}</p>
                    
                    <h3 className="text-xl font-semibold mb-3 text-card-foreground">Requirements</h3>
                    <ul className="space-y-2 mb-6">
                      {selectedGig.requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#FFD700]" />
                          <span className="text-muted-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-[#FFD700]/5 rounded-xl border border-[#FFD700]/20">
                        <Music className="h-8 w-8 text-[#FFD700] mb-2" />
                        <h4 className="font-semibold text-card-foreground">Genre</h4>
                        <p className="text-sm text-muted-foreground">{selectedGig.genre}</p>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-xl border border-border">
                        <Users className="h-8 w-8 text-foreground mb-2" />
                        <h4 className="font-semibold text-card-foreground">Performer Type</h4>
                        <p className="text-sm text-muted-foreground">{selectedGig.performerType}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <Card className="border-2 border-[#FFD700]/20 bg-[#FFD700]/5">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-[#FFD700] mb-4">Gig Info</h3>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-card-foreground">{new Date(selectedGig.date).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}</p>
                              <p className="text-sm text-muted-foreground">{selectedGig.time}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-card-foreground">{selectedGig.venue}</p>
                              <p className="text-sm text-muted-foreground">{selectedGig.location}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <DollarSign className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-card-foreground">{selectedGig.budget}</p>
                              <p className="text-sm text-muted-foreground">Budget range</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Star className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-card-foreground">{selectedGig.rating}/5.0</p>
                              <p className="text-sm text-muted-foreground">Venue rating</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="space-y-3">
                      <Button className="w-full bg-[#FFD700] hover:bg-[#FFC72C] text-[#121212] font-semibold">
                        Apply for This Gig
                      </Button>
                      <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted">
                        Message Venue
                      </Button>
                      <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted">
                        Save for Later
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}