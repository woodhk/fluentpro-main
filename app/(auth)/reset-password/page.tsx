"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { KeyRound, EyeIcon, EyeOffIcon, CheckCircle, AlertCircle, LockKeyhole } from 'lucide-react'
import { toast } from 'sonner'

const ResetPassword = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: ''
  })

  // Password strength criteria
  const checkPasswordStrength = (password: string) => {
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    setPasswordStrength(score)
  }
  
  const validateForm = () => {
    let isValid = true
    const newErrors = {
      password: '',
      confirmPassword: ''
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
      isValid = false
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
      isValid = false
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
      isValid = false
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setIsSuccess(true)
        toast.success('Password has been reset successfully!')
      }, 1000)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (name === 'password') {
      checkPasswordStrength(value)
    }
    
    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const getStrengthColor = (strength: number) => {
    if (strength === 0) return 'bg-gray-200'
    if (strength === 1) return 'bg-red-500'
    if (strength === 2) return 'bg-yellow-500'
    if (strength === 3) return 'bg-blue-500'
    return 'bg-green-500'
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <img src="/icons/logo.svg" alt="FluentPro Logo" className="h-10" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg border-0">
              <CardContent className="pt-8 pb-8 px-6 text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
                  className="flex justify-center mb-6"
                >
                  <div className="rounded-full bg-blue-50 p-4">
                    <div className="relative">
                      <KeyRound className="h-8 w-8 text-blue-600" />
                      <CheckCircle className="h-5 w-5 text-green-500 absolute -bottom-1 -right-1" />
                    </div>
                  </div>
                </motion.div>
                
                <h2 className="text-2xl font-semibold mb-3">Password reset complete</h2>
                
                <p className="text-gray-600 mb-8">
                  Your password has been reset successfully. You can now log in with your new password.
                </p>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
                  onClick={() => router.push('/sign-in')}
                >
                  Continue to Login
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <img src="/icons/logo.svg" alt="FluentPro Logo" className="h-10" />
        </div>
        
        <Card className="shadow-lg border-0">
          <CardContent className="pt-8 pb-8 px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-blue-50 p-4">
                  <LockKeyhole className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold mb-3">
                Reset your password
              </h2>
              
              <p className="text-gray-600 mb-8">
                Create a strong password for your account
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-gray-500" />
                  New password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`transition-colors ${
                      errors.password 
                        ? 'border-red-300 bg-red-50'
                        : formData.password && passwordStrength >= 3
                        ? 'border-green-300 bg-green-50'
                        : ''
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Password strength indicator */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            level <= passwordStrength
                              ? getStrengthColor(passwordStrength)
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600">
                      Password strength: {
                        passwordStrength === 0 ? 'Too weak' :
                        passwordStrength === 1 ? 'Weak' :
                        passwordStrength === 2 ? 'Fair' :
                        passwordStrength === 3 ? 'Good' :
                        'Strong'
                      }
                    </p>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-500 text-sm flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-gray-500" />
                  Confirm new password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`transition-colors ${
                      errors.confirmPassword 
                        ? 'border-red-300 bg-red-50'
                        : formData.confirmPassword && formData.password === formData.confirmPassword
                        ? 'border-green-300 bg-green-50'
                        : ''
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
                
                <AnimatePresence mode="wait">
                  {errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-500 text-sm flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <Button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Resetting password...</span>
                  </div>
                ) : (
                  'Reset password'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ResetPassword