import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Star, MapPin, Calendar, MessageSquare, Clock, Play, X, ChevronLeft, ChevronRight, Award, Music, Users } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'
import Navigation from './Navigation'
import { navigationContext } from '../App'

const performerData = {
  name: "Sarah Chen",
  title: "Professional Jazz Vocalist & Pianist",
  location: "New York City, NY",
  rating: 4.9,
  reviewCount: 127,
  hourlyRate: "$150-300",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
  coverImage: "https://images.unsplash.com/photo-1524201862652-0d3d485d6d07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHBlcmZvcm1lciUyMGNvbmNlcnQlMjBzdGFnZXxlbnwxfHx8fDE3NTcwNjQyODd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  bio: "With over 10 years of professional experience, I specialize in jazz standards, contemporary pieces, and can adapt to various musical styles. I've performed at renowned venues across NYC and have extensive experience in wedding ceremonies, corporate events, and intimate jazz clubs.",
  skills: ["Jazz Vocals", "Piano", "Songwriting", "Music Direction", "Wedding Ceremonies", "Corporate Events"],
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
      url: "https://images.unsplash.com/photo-1519749331243-664b4b5b7a83?w=600", 
      title: "Recording Session"
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
      url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600",
      title: "Studio Portrait"
    }
  ],
  reviews: [
    {
      name: "Emily Rodriguez",
      role: "Wedding Planner", 
      rating: 5,
      comment: "Sarah was absolutely phenomenal at our wedding. Her voice is pure magic and she really made the ceremony special.",
      date: "2 weeks ago"
    },
    {
      name: "The Gatsby Lounge",
      role: "Venue Owner",
      rating: 5, 
      comment: "Professional, punctual, and incredibly talented. Sarah's performances always draw a crowd.",
      date: "1 month ago"
    },
    {
      name: "Michael Thompson",
      role: "Event Coordinator",
      rating: 4,
      comment: "Great communication and excellent performance. Would definitely book again for future corporate events.",
      date: "2 months ago"
    }
  ]
}

export default function PerformerProfile() {
  const [activeTab, setActiveTab] = useState("bio")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [showBookingPanel, setShowBookingPanel] = useState(false)
  const [showMessageDialog, setShowMessageDialog] = useState(false)

  const openLightbox = (index: number) => {
    setCurrentMediaIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % performerData.portfolio.length)
  }

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + performerData.portfolio.length) % performerData.portfolio.length)
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <ImageWithFallback
          src={performerData.coverImage}
          alt="Performer cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <ImageWithFallback
                  src={performerData.avatar}
                  alt={performerData.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white" />
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex-1 text-white"
              >
                <h1 className="text-4xl font-bold mb-2">{performerData.name}</h1>
                <p className="text-xl text-gray-200 mb-3">{performerData.title}</p>
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{performerData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-[#D4AF37]" />
                    <span>{performerData.rating}</span>
                    <span className="text-gray-300">({performerData.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{performerData.hourlyRate}/hour</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="bg-gradient-to-r from-[#FFC72C] to-[#FCAE1E] hover:from-[#FCAE1E] hover:to-[#FFC72C] text-[#2C3539] border-0 font-semibold"
                    onClick={() => setShowMessageDialog(true)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message Performer
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-[#2C3539] bg-white/10 backdrop-blur-sm font-semibold"
                    onClick={() => setShowBookingPanel(true)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Request Booking
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8 bg-white rounded-xl shadow-sm">
              <TabsTrigger value="bio" className="data-[state=active]:bg-[#FFC72C] data-[state=active]:text-[#2C3539] font-medium">
                Bio
              </TabsTrigger>
              <TabsTrigger value="skills" className="data-[state=active]:bg-[#2C3539] data-[state=active]:text-white font-medium">
                Skills
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#2C3539] font-medium">
                Portfolio
              </TabsTrigger>
              <TabsTrigger value="rates" className="data-[state=active]:bg-[#FFC72C] data-[state=active]:text-[#2C3539] font-medium">
                Rates
              </TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-[#2C3539] data-[state=active]:text-white font-medium">
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bio">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-4">About Sarah</h2>
                <p className="text-gray-700 leading-relaxed text-lg">{performerData.bio}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center p-4">
                    <Award className="h-8 w-8 text-[#D4AF37] mx-auto mb-2" />
                    <h3 className="font-semibold">10+ Years</h3>
                    <p className="text-gray-600">Professional Experience</p>
                  </div>
                  <div className="text-center p-4">
                    <Music className="h-8 w-8 text-[#2C3539] mx-auto mb-2" />
                    <h3 className="font-semibold">200+ Shows</h3>
                    <p className="text-gray-600">Performances Completed</p>
                  </div>
                  <div className="text-center p-4">
                    <Users className="h-8 w-8 text-[#FFC72C] mx-auto mb-2" />
                    <h3 className="font-semibold">50+ Venues</h3>
                    <p className="text-gray-600">Locations Performed</p>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="skills">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-6">Skills & Expertise</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {performerData.skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="w-full text-center py-3 px-4 text-sm font-medium bg-gradient-to-r from-[#FFC72C]/10 to-[#2C3539]/10 hover:from-[#FFC72C]/20 hover:to-[#2C3539]/20 border-0"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="portfolio">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-6">Portfolio</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {performerData.portfolio.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                      onClick={() => openLightbox(index)}
                    >
                      <ImageWithFallback
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        {item.type === 'video' ? (
                          <Play className="h-12 w-12 text-white" />
                        ) : (
                          <div className="text-white text-center">
                            <h3 className="font-semibold">{item.title}</h3>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="rates">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-6">Rates & Packages</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-2 border-[#FFC72C]/20 hover:border-[#FFC72C] transition-colors">
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-bold text-[#FFC72C] mb-2">Solo Performance</h3>
                      <p className="text-3xl font-bold mb-4">$150<span className="text-lg text-gray-500">/hour</span></p>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Vocals & Piano</li>
                        <li>• 1-2 hour sets</li>
                        <li>• Perfect for intimate venues</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-[#2C3539] bg-gradient-to-b from-[#2C3539]/5 to-white">
                    <CardContent className="p-6 text-center">
                      <Badge className="bg-[#2C3539] text-white mb-4">Most Popular</Badge>
                      <h3 className="text-xl font-bold text-[#2C3539] mb-2">Wedding Package</h3>
                      <p className="text-3xl font-bold mb-4">$250<span className="text-lg text-gray-500">/hour</span></p>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Ceremony & Reception</li>
                        <li>• Custom song arrangements</li>
                        <li>• Sound equipment included</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-[#D4AF37]/20 hover:border-[#D4AF37] transition-colors">
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-bold text-[#D4AF37] mb-2">Corporate Events</h3>
                      <p className="text-3xl font-bold mb-4">$300<span className="text-lg text-gray-500">/hour</span></p>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Professional presentation</li>
                        <li>• Flexible repertoire</li>
                        <li>• Travel included (NYC area)</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="reviews">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Reviews ({performerData.reviewCount})</h2>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-current text-[#D4AF37]" />
                    <span className="text-xl font-bold">{performerData.rating}</span>
                    <span className="text-gray-500">average</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {performerData.reviews.map((review, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b pb-6 last:border-b-0"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#FFC72C] to-[#2C3539] rounded-full flex items-center justify-center text-white font-bold">
                          {review.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{review.name}</h4>
                              <p className="text-sm text-gray-600">{review.role}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-current text-[#D4AF37]" />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <ImageWithFallback
                  src={performerData.portfolio[currentMediaIndex].url}
                  alt={performerData.portfolio[currentMediaIndex].title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                
                {/* Navigation */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={prevMedia}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={nextMedia}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
                
                {/* Close button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
                  onClick={closeLightbox}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold">{performerData.portfolio[currentMediaIndex].title}</h3>
                <p className="text-gray-600">
                  {currentMediaIndex + 1} of {performerData.portfolio.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Panel */}
      <AnimatePresence>
        {showBookingPanel && (
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
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Request Booking</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBookingPanel(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Event Date</label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC72C] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Event Type</label>
                  <select className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC72C] focus:border-transparent">
                    <option>Wedding</option>
                    <option>Corporate Event</option>
                    <option>Private Party</option>
                    <option>Concert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration (hours)</label>
                  <input
                    type="number"
                    placeholder="2"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC72C] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Budget Range</label>
                  <select className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC72C] focus:border-transparent">
                    <option>$150-300 (Solo)</option>
                    <option>$250-500 (Wedding)</option>
                    <option>$300-600 (Corporate)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    placeholder="Tell Sarah about your event..."
                    rows={3}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC72C] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowBookingPanel(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-[#FFC72C] to-[#D4AF37] text-[#2C3539] border-0 font-semibold"
                  onClick={() => {
                    setShowBookingPanel(false)
                    navigationContext.navigateTo('messages')
                  }}
                >
                  Send Request
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Dialog */}
      <AnimatePresence>
        {showMessageDialog && (
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
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Send Message</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowMessageDialog(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="Interested in booking for..."
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC72C] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    placeholder="Hi Sarah, I'd love to discuss..."
                    rows={4}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC72C] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowMessageDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-[#FFC72C] to-[#D4AF37] text-[#2C3539] border-0 font-semibold"
                  onClick={() => {
                    setShowMessageDialog(false)
                    navigationContext.navigateTo('messages')
                  }}
                >
                  Send Message
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}