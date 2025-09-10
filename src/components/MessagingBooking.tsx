import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, Send, Paperclip, MoreHorizontal, Phone, Video, Calendar, Check, X, Clock, Bell } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { ImageWithFallback } from './figma/ImageWithFallback'
import Navigation from './Navigation'

interface Message {
  id: number
  text: string
  sender: 'me' | 'them'
  timestamp: string
  type?: 'text' | 'booking' | 'system'
  bookingData?: {
    eventName: string
    date: string
    budget: string
    status: 'pending' | 'accepted' | 'declined'
  }
}

interface Conversation {
  id: number
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
  status: 'online' | 'offline' | 'away'
  type: 'performer' | 'venue'
}

const conversations: Conversation[] = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
    lastMessage: "Thanks for the booking request! I'd love to record this track for your campaign.",
    timestamp: "2m ago",
    unread: 2,
    status: "online",
    type: "performer"
  },
  {
    id: 2,
    name: "Apex Recording Studios",
    avatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
    lastMessage: "We have a hip-hop track recording session next Friday if you're available.",
    timestamp: "15m ago", 
    unread: 0,
    status: "online",
    type: "venue"
  },
  {
    id: 3,
    name: "MC Supreme",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    lastMessage: "Perfect! Let's discuss the track for the commercial campaign.",
    timestamp: "1h ago",
    unread: 1,
    status: "away",
    type: "performer"
  },
  {
    id: 4,
    name: "Jazz Corner Cafe",
    avatar: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=400",
    lastMessage: "Your application looks great. Can we schedule a call?",
    timestamp: "2h ago",
    unread: 0,
    status: "offline", 
    type: "venue"
  }
]

const mockMessages: { [key: number]: Message[] } = {
  1: [
    {
      id: 1,
      text: "Hi Sarah! I saw your profile and I'm interested in booking you for our wedding reception on December 22nd.",
      sender: "me",
      timestamp: "2:30 PM"
    },
    {
      id: 2, 
      text: "Hello! Thank you for reaching out. I'd be delighted to perform at your wedding. Could you tell me more about the event?",
      sender: "them",
      timestamp: "2:32 PM"
    },
    {
      id: 3,
      text: "It's an evening reception from 6-10 PM at The Grand Ballroom on the Upper East Side. We're expecting about 150 guests.",
      sender: "me", 
      timestamp: "2:35 PM"
    },
    {
      id: 4,
      text: "That sounds wonderful! I'm familiar with The Grand Ballroom - beautiful venue with excellent acoustics.",
      sender: "them",
      timestamp: "2:37 PM"
    },
    {
      id: 5,
      text: "",
      sender: "them",
      timestamp: "2:38 PM",
      type: "booking",
      bookingData: {
        eventName: "Hip-Hop Commercial Track Recording",
        date: "December 22, 2024 • 2:00 PM - 8:00 PM",
        budget: "$600-800",
        status: "pending"
      }
    },
    {
      id: 6,
      text: "Thanks for the booking request! I'd love to record this track for your campaign.",
      sender: "them", 
      timestamp: "2:40 PM"
    }
  ],
  2: [
    {
      id: 1,
      text: "Hi! I applied for your hip-hop track recording session.",
      sender: "me",
      timestamp: "Yesterday 8:45 PM"
    },
    {
      id: 2,
      text: "Hello! We received your application and were very impressed with your rap portfolio.",
      sender: "them",
      timestamp: "Today 9:15 AM"
    },
    {
      id: 3,
      text: "We have a recording session for next Friday if you're available.",
      sender: "them",
      timestamp: "Today 2:45 PM"
    }
  ]
}

export default function MessagingBooking() {
  const [selectedConversation, setSelectedConversation] = useState<number>(1)
  const [messageText, setMessageText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showBookingPanel, setShowBookingPanel] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Sarah accepted your booking request!", type: "success", time: "5m ago" },
    { id: 2, text: "New gig posted at The Blue Note", type: "info", time: "1h ago" }
  ])

  const currentMessages = mockMessages[selectedConversation] || []
  const currentConversation = conversations.find(c => c.id === selectedConversation)

  useEffect(() => {
    if (messageText) {
      setIsTyping(true)
      const timeout = setTimeout(() => setIsTyping(false), 1000)
      return () => clearTimeout(timeout)
    }
  }, [messageText])

  const sendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', messageText)
      setMessageText('')
    }
  }

  const handleBookingAction = (action: 'accept' | 'decline') => {
    // In a real app, this would update the booking status
    console.log(`Booking ${action}ed`)
    setShowBookingPanel(false)
  }

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navigation />
      
      <div className="flex h-screen bg-background pt-16 transition-colors duration-300">
        
        {/* Sidebar - Conversations List */}
        <div className="w-80 bg-card border-r border-border flex flex-col transition-colors duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-card-foreground">Messages</h1>
              <div className="relative">
                <Button variant="ghost" size="icon" className="relative text-card-foreground hover:text-[#FFD700]">
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-[#e74c3c] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {notifications.length}
                    </motion.div>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                className="pl-10 bg-input-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Notifications Panel */}
          <AnimatePresence>
            {notifications.length > 0 && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="border-b border-border bg-muted/30 overflow-hidden"
              >
                <div className="p-4 space-y-2">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center justify-between bg-card rounded-lg p-3 shadow-sm border border-border"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-card-foreground">{notification.text}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dismissNotification(notification.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation, index) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b border-border cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedConversation === conversation.id ? 'bg-[#FFD700]/10 border-l-4 border-l-[#FFD700]' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <ImageWithFallback
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                      conversation.status === 'online' ? 'bg-green-500' :
                      conversation.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm truncate text-card-foreground">{conversation.name}</h3>
                      <div className="flex items-center gap-2">
                        {conversation.unread > 0 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-[#FFD700] text-[#121212] text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
                          >
                            {conversation.unread}
                          </motion.div>
                        )}
                        <Badge
                          variant={conversation.type === 'performer' ? 'default' : 'secondary'}
                          className={`text-xs ${
                            conversation.type === 'performer' 
                              ? 'bg-muted text-muted-foreground' 
                              : 'bg-[#FFD700]/10 text-[#FFD700]'
                          }`}
                        >
                          {conversation.type}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                    <p className="text-xs text-muted-foreground mt-1">{conversation.timestamp}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          
          {/* Chat Header */}
          {currentConversation && (
            <div className="bg-card border-b border-border p-4 flex items-center justify-between transition-colors duration-300">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ImageWithFallback
                    src={currentConversation.avatar}
                    alt={currentConversation.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                    currentConversation.status === 'online' ? 'bg-green-500' :
                    currentConversation.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div>
                  <h2 className="font-semibold text-card-foreground">{currentConversation.name}</h2>
                  <p className="text-sm text-muted-foreground capitalize">
                    {currentConversation.status} • {currentConversation.type}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-card-foreground hover:text-[#FFD700]">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-card-foreground hover:text-[#FFD700]">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-card-foreground hover:text-[#FFD700]">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted/20">
            {currentMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full"
              >
                {message.type === 'booking' ? (
                  <Card className="w-full border-2 border-[#FFD700]/20 bg-[#FFD700]/5 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-[#FFD700]/10 rounded-full">
                          <Calendar className="h-5 w-5 text-[#FFD700]" />
                        </div>
                        <div>
                          <span className="font-semibold text-[#FFD700] text-lg">Booking Request</span>
                          <p className="text-sm text-muted-foreground">{message.timestamp}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <h4 className="font-semibold text-lg text-card-foreground">{message.bookingData?.eventName}</h4>
                        <p className="text-muted-foreground">{message.bookingData?.date}</p>
                        <p className="text-lg font-semibold text-[#FFD700]">{message.bookingData?.budget}</p>
                      </div>
                      
                      <div className="flex gap-3">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleBookingAction('accept')}
                          className="flex-1 bg-gradient-to-r from-[#27ae60] to-[#2ecc71] text-white py-3 px-4 rounded-lg font-medium hover:from-[#229f56] hover:to-[#27ae60] transition-all shadow-md"
                        >
                          <Check className="h-4 w-4 inline mr-2" />
                          Accept Request
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleBookingAction('decline')}
                          className="flex-1 bg-gradient-to-r from-[#e74c3c] to-[#c0392b] text-white py-3 px-4 rounded-lg font-medium hover:from-[#d62c1a] hover:to-[#a93226] transition-all shadow-md"
                        >
                          <X className="h-4 w-4 inline mr-2" />
                          Decline Request
                        </motion.button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className={`w-full shadow-sm border transition-colors duration-300 ${
                    message.sender === 'me' 
                      ? 'bg-[#FFD700]/5 border-[#FFD700]/20' 
                      : 'bg-card border-border'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 p-2 rounded-full ${
                          message.sender === 'me' 
                            ? 'bg-[#FFD700] text-[#121212]' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {message.sender === 'me' ? (
                            <span className="w-6 h-6 flex items-center justify-center font-semibold text-sm">You</span>
                          ) : (
                            <ImageWithFallback
                              src={currentConversation?.avatar || ''}
                              alt="User"
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          )}
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <span className={`font-semibold ${
                              message.sender === 'me' ? 'text-[#FFD700]' : 'text-card-foreground'
                            }`}>
                              {message.sender === 'me' ? 'You' : currentConversation?.name}
                            </span>
                            <span className="text-sm text-muted-foreground">{message.timestamp}</span>
                          </div>
                          
                          <div className={`p-4 rounded-lg ${
                            message.sender === 'me' 
                              ? 'bg-card/80 border border-[#FFD700]/20' 
                              : 'bg-muted/50 border border-border'
                          }`}>
                            <p className="text-card-foreground leading-relaxed">{message.text}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            ))}
            
            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="w-full"
                >
                  <Card className="w-full bg-card border-border shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 p-2 rounded-full bg-muted text-muted-foreground">
                          <ImageWithFallback
                            src={currentConversation?.avatar || ''}
                            alt="User"
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-card-foreground">{currentConversation?.name}</span>
                            <span className="text-sm text-muted-foreground">typing...</span>
                          </div>
                          
                          <div className="p-4 rounded-lg bg-muted/50 border border-border">
                            <div className="flex space-x-2">
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                className="w-2 h-2 bg-[#FFD700] rounded-full"
                              />
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                className="w-2 h-2 bg-[#FFD700] rounded-full"
                              />
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                className="w-2 h-2 bg-[#FFD700] rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Message Input */}
          <div className="bg-card border-t border-border p-6 transition-colors duration-300">
            <Card className="border-2 border-border shadow-sm bg-card">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#FFD700] rounded-full">
                      <span className="w-6 h-6 flex items-center justify-center text-[#121212] font-semibold text-sm">You</span>
                    </div>
                    <span className="font-semibold text-[#FFD700]">Compose Message</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-[#FFD700]">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    
                    <div className="flex-1">
                      <Input
                        placeholder="Type your message here..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="border-2 border-border focus:border-[#FFD700] rounded-xl h-12 px-4 bg-input-background text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={sendMessage}
                        disabled={!messageText.trim()}
                        className="bg-[#FFD700] hover:bg-[#FFC72C] text-[#121212] border-0 rounded-xl px-8 h-12 font-semibold"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Booking Panel Sidebar */}
        <AnimatePresence>
          {showBookingPanel && (
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              className="w-80 bg-card border-l border-border p-6 transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-card-foreground">Booking Details</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBookingPanel(false)}
                  className="text-card-foreground hover:text-[#FFD700]"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-[#FFD700]/5 rounded-xl border border-[#FFD700]/20">
                  <h4 className="font-semibold mb-2 text-card-foreground">Wedding Reception</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Dec 22, 2024 • 6:00-10:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>4 hours</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-[#27ae60] to-[#2ecc71] hover:from-[#229f56] hover:to-[#27ae60] text-white border-0">
                    <Check className="h-4 w-4 mr-2" />
                    Accept Booking
                  </Button>
                  <Button variant="outline" className="w-full border-[#e74c3c] text-[#e74c3c] hover:bg-[#e74c3c] hover:text-white">
                    <X className="h-4 w-4 mr-2" />
                    Decline Booking
                  </Button>
                  <Button variant="ghost" className="w-full text-card-foreground hover:text-[#FFD700]">
                    Request More Info
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}