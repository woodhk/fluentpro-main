"use client"

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { KeyRound, Mail, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

const ForgotPassword = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Email is required')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email')
      return
    }
    
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1000)
  }

  const handleResendEmail = useCallback(() => {
    setIsLoading(true)
    
    setTimeout(() => {
      setIsLoading(false)
      
      toast(
        <div className="flex items-center gap-2 min-w-[200px]">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium">Email has been resent</span>
        </div>,
        {
          style: {
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            padding: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            borderRadius: '8px',
          },
          duration: 3000,
        }
      )
    }, 1000)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <img src="/icons/logo.svg" alt="FluentPro Logo" className="h-10" />
        </div>
        
        <Card className="shadow-lg border-0">
          <CardContent className="pt-8 pb-8 px-6">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="rounded-full bg-blue-50 p-4">
                    <Mail className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-semibold mb-3">Check your inbox</h2>
                
                <p className="text-gray-600 mb-8">
                  We have sent the instructions for resetting your password to{' '}
                  <span className="font-medium text-gray-900">{email}</span>
                </p>

                <div className="bg-blue-50 rounded-lg p-4 mb-8">
                  <p className="text-sm text-gray-600">
                    Didn't receive the email? Check your spam folder or
                  </p>
                </div>

                <div className="space-y-4">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    onClick={handleResendEmail}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      'Resend email'
                    )}
                  </Button>
                  
                  <button
                    onClick={() => router.push('/sign-in')}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors mx-auto"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to login
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-6">
                    <div className="rounded-full bg-blue-50 p-4">
                      <KeyRound className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-semibold mb-3">
                    Forgot password?
                  </h2>
                  
                  <p className="text-gray-600 mb-8">
                    No worries! Enter your email and we'll send you instructions to reset your password.
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      Email address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setError('')
                      }}
                      className={`transition-colors ${
                        error 
                          ? 'border-red-300 bg-red-50'
                          : email && validateEmail(email)
                          ? 'border-green-300 bg-green-50'
                          : ''
                      }`}
                      disabled={isLoading}
                    />
                    <AnimatePresence mode="wait">
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-red-500 text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    disabled={!email || isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending link...</span>
                      </div>
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>

                  <Button
                    type="button"
                    onClick={() => router.push('/sign-in')}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors mx-auto"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to login
                  </Button>
                </form>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ForgotPassword