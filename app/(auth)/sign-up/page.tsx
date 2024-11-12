"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { EyeIcon, EyeOffIcon, CheckCircle2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

const SignUp = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    password: '',
    confirmPassword: ''
  })
  
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    password: '',
    confirmPassword: ''
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

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
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      password: '',
      confirmPassword: ''
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
      isValid = false
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
      isValid = false
    }

    if (!formData.companyName) {
      newErrors.companyName = 'Company name is required'
      isValid = false
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsLoading(true)
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        localStorage.setItem('user', JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          companyName: formData.companyName
        }))
        
        toast.success('Account created successfully!')
        router.push('/onboarding-screen')
      } catch (error) {
        toast.error('Something went wrong. Please try again.')
      } finally {
        setIsLoading(false)
      }
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
  }

  const getStrengthColor = (strength: number) => {
    if (strength === 0) return 'bg-gray-200'
    if (strength === 1) return 'bg-red-500'
    if (strength === 2) return 'bg-yellow-500'
    if (strength === 3) return 'bg-blue-500'
    return 'bg-green-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-8 justify-center"
        >
          <img src="/icons/logo.svg" alt="FluentPro Logo" className="h-10" />
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-lg border-0">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Create your account
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Get started with FluentPro today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* First Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`transition-all duration-200 ${
                        errors.firstName 
                          ? 'border-red-300 bg-red-50'
                          : formData.firstName
                          ? 'border-green-300 bg-green-50'
                          : ''
                      }`}
                      disabled={isLoading}
                    />
                    {errors.firstName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.firstName}
                      </motion.p>
                    )}
                  </div>

                  {/* Last Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`transition-all duration-200 ${
                        errors.lastName 
                          ? 'border-red-300 bg-red-50'
                          : formData.lastName
                          ? 'border-green-300 bg-green-50'
                          : ''
                      }`}
                      disabled={isLoading}
                    />
                    {errors.lastName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.lastName}
                      </motion.p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`transition-all duration-200 ${
                        errors.email 
                          ? 'border-red-300 bg-red-50'
                          : formData.email && !errors.email
                          ? 'border-green-300 bg-green-50'
                          : ''
                      }`}
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Company Name Field */}
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="companyName" className="text-sm font-medium">
                      Company name
                    </Label>
                    <Select 
                      value={formData.companyName}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, companyName: value }))}
                      disabled={isLoading}
                    >
                      <SelectTrigger 
                        className={`transition-all duration-200 ${
                          errors.companyName 
                            ? 'border-red-300 bg-red-50'
                            : formData.companyName
                            ? 'border-green-300 bg-green-50'
                            : ''
                        }`}
                      >
                        <SelectValue placeholder="Select company" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="company1">Company One</SelectItem>
                        <SelectItem value="company2">Company Two</SelectItem>
                        <SelectItem value="company3">Company Three</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.companyName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.companyName}
                      </motion.p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`pr-10 transition-all duration-200 ${
                          errors.password 
                            ? 'border-red-300 bg-red-50'
                            : passwordStrength >= 3
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
                    
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.password}
                      </motion.p>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`pr-10 transition-all duration-200 ${
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
                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-green-500 text-sm flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Passwords match
                      </motion.p>
                    )}
                    {errors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.confirmPassword}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full col-span-2 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      'Create account'
                    )}
                  </Button>

                  {/* Sign In Link */}
                  <div className="col-span-2 flex flex-col items-center gap-4">
                    <p className="text-center text-sm text-gray-600">
                      Already have an account?{' '}
                      <a 
                        href="/sign-in" 
                        className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                      >
                        Sign in
                      </a>
                    </p>

                    {/* Optional: Terms and Privacy Policy */}
                    <p className="text-center text-xs text-gray-500">
                      By creating an account, you agree to our{' '}
                      <a 
                        href="/terms" 
                        className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                      >
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a 
                        href="/privacy" 
                        className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                      >
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default SignUp