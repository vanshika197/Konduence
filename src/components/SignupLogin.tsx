import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, User, Building, Music, Mic, Camera, Palette, Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent } from './ui/card'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import Navigation from './Navigation'
import { navigationContext } from '../App'

const userTypes = [
  {
    id: 'musician',
    title: 'Musician',
    icon: Music,
    description: 'Jazz, Classical, Rock, Electronic, and more',
    color: '#FFC72C'
  },
  {
    id: 'rapper',
    title: 'Hip-Hop Artist',
    icon: Mic,
    description: 'Rap, Hip-Hop, R&B, and Urban Music',
    color: '#D4AF37'
  },
  {
    id: 'model',
    title: 'Model',
    icon: Camera,
    description: 'Fashion, Commercial, Editorial, and more',
    color: '#FFC72C'
  },
  {
    id: 'artist',
    title: 'Other Artist',
    icon: Palette,
    description: 'Dancers, Actors, Voice Artists, and more',
    color: '#D4AF37'
  },
  {
    id: 'venue',
    title: 'Venue Owner',
    icon: Building,
    description: 'Clubs, Restaurants, Event Spaces',
    color: '#2C3539'
  },
  {
    id: 'client',
    title: 'Client/Agency',
    icon: User,
    description: 'Recording Studios, Brands, Agencies',
    color: '#2C3539'
  }
]

export default function SignupLogin() {
  const [isLogin, setIsLogin] = useState(false)
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isBusinessAccount = selectedUserType === 'venue' || selectedUserType === 'client'

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F5F2] via-[#F7F5F2] to-[#EAE8E4]">
      <Navigation />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -5 }}
              onClick={() => navigationContext.navigateTo('home')}
              className="inline-flex items-center gap-2 text-[#2C3539] hover:text-[#FFC72C] mb-6 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </motion.button>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              {isLogin ? 'Welcome Back' : 'Join Konduence'}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              {isLogin 
                ? 'Sign in to your account to continue connecting with opportunities'
                : 'Connect with opportunities as an artist or find the perfect talent for your next project'
              }
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            {!selectedUserType ? (
              <motion.div
                key="userTypeSelection"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Choose Your Role</h2>
                  <p className="text-gray-600">Select the category that best describes you</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userTypes.map((type, index) => (
                    <motion.div
                      key={type.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedUserType(type.id)}
                      className="cursor-pointer"
                    >
                      <Card className="h-full border-2 border-transparent hover:border-[#FFC72C] transition-all duration-300 shadow-lg hover:shadow-xl">
                        <CardContent className="p-6 text-center h-full flex flex-col">
                          <div 
                            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{ backgroundColor: `${type.color}15` }}
                          >
                            <type.icon 
                              className="h-8 w-8" 
                              style={{ color: type.color }}
                            />
                          </div>
                          <h3 className="text-xl font-bold mb-2 text-[#2C3539]">{type.title}</h3>
                          <p className="text-gray-600 text-sm flex-1">{type.description}</p>
                          <Button
                            className="mt-4 bg-gradient-to-r from-[#FFC72C] to-[#D4AF37] hover:from-[#FCAE1E] hover:to-[#B89630] text-[#2C3539] border-0 font-semibold w-full"
                          >
                            Select
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-gray-600 mb-4">Already have an account?</p>
                  <Button
                    variant="outline"
                    className="border-[#2C3539] text-[#2C3539] hover:bg-[#2C3539] hover:text-white font-semibold"
                    onClick={() => setIsLogin(true)}
                  >
                    Sign In Instead
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="authForm"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="max-w-md mx-auto"
              >
                <Card className="shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: `${userTypes.find(t => t.id === selectedUserType)?.color}15` }}
                      >
                        {(() => {
                          const userType = userTypes.find(t => t.id === selectedUserType)
                          if (userType) {
                            const IconComponent = userType.icon
                            return (
                              <IconComponent 
                                className="h-8 w-8" 
                                style={{ color: userType.color }}
                              />
                            )
                          }
                          return null
                        })()}
                      </div>
                      <h2 className="text-2xl font-bold mb-2">
                        {isLogin ? 'Sign In' : 'Create Account'}
                      </h2>
                      <p className="text-gray-600">
                        {userTypes.find(t => t.id === selectedUserType)?.title}
                      </p>
                    </div>

                    <form className="space-y-4">
                      {!isLogin && (
                        <>
                          {isBusinessAccount ? (
                            <div>
                              <Label htmlFor="businessName">Business/Organization Name</Label>
                              <Input
                                id="businessName"
                                placeholder="Enter your business name"
                                value={formData.businessName}
                                onChange={(e) => handleInputChange('businessName', e.target.value)}
                                className="border-2 border-gray-200 focus:border-[#FFC72C] rounded-xl h-12"
                              />
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                  id="firstName"
                                  placeholder="John"
                                  value={formData.firstName}
                                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                                  className="border-2 border-gray-200 focus:border-[#FFC72C] rounded-xl h-12"
                                />
                              </div>
                              <div>
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                  id="lastName"
                                  placeholder="Doe"
                                  value={formData.lastName}
                                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                                  className="border-2 border-gray-200 focus:border-[#FFC72C] rounded-xl h-12"
                                />
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="pl-10 border-2 border-gray-200 focus:border-[#FFC72C] rounded-xl h-12"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="pl-10 pr-10 border-2 border-gray-200 focus:border-[#FFC72C] rounded-xl h-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      {!isLogin && (
                        <div>
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                              id="confirmPassword"
                              type="password"
                              placeholder="Confirm your password"
                              value={formData.confirmPassword}
                              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                              className="pl-10 border-2 border-gray-200 focus:border-[#FFC72C] rounded-xl h-12"
                            />
                          </div>
                        </div>
                      )}

                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Button
                          type="submit"
                          className="w-full h-12 bg-gradient-to-r from-[#FFC72C] to-[#D4AF37] hover:from-[#FCAE1E] hover:to-[#B89630] text-[#2C3539] border-0 font-semibold text-lg"
                        >
                          {isLogin ? 'Sign In' : 'Create Account'}
                        </Button>
                      </motion.div>

                      {isLogin && (
                        <div className="text-center">
                          <button
                            type="button"
                            className="text-sm text-[#2C3539] hover:text-[#FFC72C] transition-colors"
                          >
                            Forgot your password?
                          </button>
                        </div>
                      )}
                    </form>

                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <Separator />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">or</span>
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        <Button
                          variant="outline"
                          className="w-full h-12 border-2 border-gray-200 hover:border-[#FFC72C] hover:bg-[#FFC72C]/5"
                        >
                          Continue with Google
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full h-12 border-2 border-gray-200 hover:border-[#FFC72C] hover:bg-[#FFC72C]/5"
                        >
                          Continue with Facebook
                        </Button>
                      </div>
                    </div>

                    <div className="mt-6 text-center space-y-4">
                      <p className="text-sm text-gray-600">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                          type="button"
                          onClick={() => setIsLogin(!isLogin)}
                          className="ml-1 text-[#FFC72C] hover:text-[#D4AF37] font-semibold transition-colors"
                        >
                          {isLogin ? 'Sign up' : 'Sign in'}
                        </button>
                      </p>

                      <button
                        type="button"
                        onClick={() => setSelectedUserType(null)}
                        className="text-sm text-gray-500 hover:text-[#2C3539] transition-colors"
                      >
                        Change user type
                      </button>
                    </div>

                    {!isLogin && (
                      <div className="mt-6 text-xs text-gray-500 text-center">
                        By creating an account, you agree to our{' '}
                        <button className="text-[#FFC72C] hover:text-[#D4AF37] transition-colors">
                          Terms of Service
                        </button>{' '}
                        and{' '}
                        <button className="text-[#FFC72C] hover:text-[#D4AF37] transition-colors">
                          Privacy Policy
                        </button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}