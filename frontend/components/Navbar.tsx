'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { Menu, X, Moon, Sun, Shield } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                AuthentiCode AI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              Pricing
            </Link>
            <Link href="/docs" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              Docs
            </Link>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="btn-primary">
                  Dashboard
                </Link>
                <button onClick={signOut} className="btn-secondary">
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/signin" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="btn-primary">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 mr-2"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link href="/features" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">
                Pricing
              </Link>
              <Link href="/docs" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">
                Docs
              </Link>
              
              {user ? (
                <>
                  <Link href="/dashboard" className="btn-primary w-full text-center">
                    Dashboard
                  </Link>
                  <button onClick={signOut} className="btn-secondary w-full">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">
                    Sign In
                  </Link>
                  <Link href="/auth/signup" className="btn-primary w-full text-center">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}