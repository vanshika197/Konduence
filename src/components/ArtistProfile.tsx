import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Star, MapPin, Calendar, MessageSquare, Clock, Play, X, ChevronLeft, ChevronRight, Award, Music, Users, Camera } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'
import Navigation from './Navigation'
import { navigationContext } from '../App'

const artistData = {
  name: "Sarah Chen",
  title: "Professional Jazz Vocalist, Hip-Hop Artist & Fashion Model",
  location: "New York City, NY",
  rating: 4.9,
  reviewCount: 127,
  hourlyRate: "$150-300",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
  coverImage: "https://images.unsplash.com/photo-1524201862652-0d3d485d6d07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHBlcmZvcm1lciUyMGNvbmNlcnQlMjBzdGFnZXxlbnwxfHx8fDE3NTcwNjQyODd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  bio: "With over 10 years of professional experience in music and modeling, I specialize in jazz standards, hip-hop vocals, contemporary pieces, and have worked with top fashion brands. I've performed at renowned venues across NYC, recorded soundtracks for major brands, and have extensive experience in wedding ceremonies, corporate events, intimate jazz clubs, recording studios, and fashion campaigns.",
  skills: ["Jazz Vocals", "Hip-Hop/Rap", "Piano", "Fashion Modeling", "Songwriting", "Music Direction", "Studio Recording", "Wedding Ceremonies", "Corporate Events", "Commercial Modeling"],
  portfolio: [
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1553756800-839189076c9e?w=600",
      title: "Live Performance at Blue Note"
    },
    {
      type: "video", 
      url: "https://images.unsplash.com/photo-1624703307604-744ec383cbf4?w=600",
      title: "Wedding Performance Highlight Reel"
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600", 
      title: "Fashion Campaign - Spring Collection"
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600",
      title: "Corporate Event Performance"
    },
    {
      type: "video",
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
      title: "Jazz Club Performance"
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1596902852634-4d55d5e8c9a9?w=600",
      title: "Editorial Photoshoot"
    }
  ],
  achievements: [
    { icon: Award, title: "NYC Jazz Awards Winner", year: "2023", color: "#D4AF37" },
    { icon: Music, title: "50+ Venue Performances", year: "2024", color: "#FFC72C" },
    { icon: Camera, title: "Fashion Week Featured Model", year: "2024", color: "#2C3539" },
    { icon: Users, title: "100+ Events Completed", year: "2024", color: "#D4AF37" }
  ],
  upcomingGigs: [
    {
      venue: "The Blue Note NYC",
      date: "Dec 20, 2024",
      time: "8:00 PM",
      type: "Jazz Performance",
      status: "confirmed"
    },
    {
      venue: "Apex Recording Studios",
      date: "Dec 21, 2024", 
      time: "2:00 PM",
      type: "Soundtrack Recording",
      status: "confirmed"
    },
    {
      venue: "Elite Fashion Studio",
      date: "Dec 22, 2024", 
      time: "10:00 AM",
      type: "Fashion Shoot",
      status: "confirmed"
    },
    {
      venue: "The Grand Ballroom",
      date: "Dec 25, 2024",
      time: "6:00 PM", 
      type: "Wedding Reception",
      status: "pending"
    }
  ],
  reviews: [
    {
      name: "Michael Thompson",
      venue: "The Blue Note",
      rating: 5,
      comment: "Sarah's performance was absolutely stunning. Her voice is incredible and she really connected with the audience.",
      date: "Nov 15, 2024"
    },
    {
      name: "Elite Modeling Agency",
      venue: "Fashion Campaign",
      rating: 5,
      comment: "Professional, punctual, and absolutely stunning. Sarah brought exactly what we needed for our spring campaign.",
      date: "Oct 28, 2024"
    },
    {
      name: "Jennifer & David",
      venue: "Wedding Reception",
      rating: 5,
      comment: "Sarah made our wedding day so special. Her music selection was perfect and she's such a talented artist.",
      date: "Oct 12, 2024"
    }
  ]
}

export default function ArtistProfile() {
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState(null)
  const [currentTab, setCurrentTab] = useState("overview")

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <ImageWithFallback
          src={artistData.coverImage}
          alt="Artist cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Artist Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-end gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <ImageWithFallback
                  src={artistData.avatar}
                  alt={artistData.name}
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white" />
              </motion.div>
              
              <div className="text-white flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{artistData.name}</h1>
                <p className="text-xl text-gray-200 mb-4">{artistData.title}</p>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{artistData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-[#D4AF37]" />
                    <span>{artistData.rating}</span>
                    <span className="text-gray-300">({artistData.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{artistData.hourlyRate}/hour</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#FFC72C] to-[#D4AF37] hover:from-[#FCAE1E] hover:to-[#B89630] text-[#2C3539] border-0 font-semibold"
                    onClick={() => navigationContext.navigateTo('messages')}
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Book Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-[#2C3539] font-semibold"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Check Availability
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Bio & Skills */}
                <div className="lg:col-span-2 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <h2 className="text-2xl font-bold mb-4">About</h2>
                    <p className="text-gray-700 leading-relaxed">{artistData.bio}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <h2 className="text-2xl font-bold mb-4">Skills & Specialties</h2>
                    <div className="flex flex-wrap gap-2">
                      {artistData.skills.map((skill, index) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Badge 
                            variant="secondary" 
                            className="bg-gradient-to-r from-[#FFC72C]/10 to-[#D4AF37]/10 text-[#2C3539] border border-[#FFC72C]/20 hover:bg-[#FFC72C]/20 transition-colors"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <h2 className="text-2xl font-bold mb-6">Achievements</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {artistData.achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100"
                        >
                          <div 
                            className="p-3 rounded-full"
                            style={{ backgroundColor: `${achievement.color}15`, color: achievement.color }}
                          >
                            <achievement.icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                            <p className="text-sm text-gray-600">{achievement.year}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Right Column - Quick Actions & Stats */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-gradient-to-r from-[#FFC72C] to-[#D4AF37] hover:from-[#FCAE1E] hover:to-[#B89630] text-[#2C3539] border-0 font-semibold"
                        onClick={() => navigationContext.navigateTo('messages')}
                      >
                        Send Message
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-[#2C3539] text-[#2C3539] hover:bg-[#2C3539] hover:text-white"
                      >
                        Add to Favorites
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full text-[#2C3539] hover:bg-[#FFC72C]/10"
                      >
                        Share Profile
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <h3 className="text-xl font-bold mb-4">Performance Stats</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Gigs</span>
                        <span className="font-semibold text-[#FFC72C]">127</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Response Rate</span>
                        <span className="font-semibold text-[#27ae60]">98%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">On-time Rate</span>
                        <span className="font-semibold text-[#27ae60]">100%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Member Since</span>
                        <span className="font-semibold">2022</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-6">Portfolio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {artistData.portfolio.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="relative cursor-pointer group"
                      onClick={() => setSelectedPortfolioItem(item)}
                    >
                      <div className="relative overflow-hidden rounded-xl">
                        <ImageWithFallback
                          src={item.url}
                          alt={item.title}
                          className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        {item.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 group-hover:bg-[#FFC72C]/80 transition-colors">
                              <Play className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        )}
                        
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <h3 className="font-semibold">{item.title}</h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-6">Upcoming Gigs</h2>
                <div className="space-y-4">
                  {artistData.upcomingGigs.map((gig, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#FFC72C]/10 rounded-full">
                          <Calendar className="h-5 w-5 text-[#FFC72C]" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{gig.venue}</h3>
                          <p className="text-sm text-gray-600">{gig.type}</p>
                          <p className="text-sm text-gray-500">{gig.date} • {gig.time}</p>
                        </div>
                      </div>
                      <Badge 
                        variant="secondary"
                        className={`${
                          gig.status === 'confirmed' 
                            ? 'bg-[#27ae60]/10 text-[#27ae60] border-[#27ae60]/20' 
                            : 'bg-[#FFC72C]/10 text-[#FFC72C] border-[#FFC72C]/20'
                        }`}
                      >
                        {gig.status}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-6">Client Reviews</h2>
                <div className="space-y-6">
                  {artistData.reviews.map((review, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{review.name}</h3>
                            <div className="flex items-center gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-current text-[#D4AF37]" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-[#2C3539] font-medium mb-2">{review.venue}</p>
                          <p className="text-gray-700 mb-3">{review.comment}</p>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Portfolio Lightbox */}
      <AnimatePresence>
        {selectedPortfolioItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedPortfolioItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-600"
                onClick={() => setSelectedPortfolioItem(null)}
              >
                <X className="h-5 w-5" />
              </Button>
              
              <ImageWithFallback
                src={selectedPortfolioItem.url}
                alt={selectedPortfolioItem.title}
                className="w-full h-96 object-cover"
              />
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{selectedPortfolioItem.title}</h3>
                <Badge variant="secondary" className="bg-[#FFC72C]/10 text-[#FFC72C] border-[#FFC72C]/20">
                  {selectedPortfolioItem.type}
                </Badge>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}