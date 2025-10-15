import Link from 'next/link'
import { ArrowRight, Shield, Zap, Users } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium">
              <Shield className="h-4 w-4" />
              <span>Trusted by 10,000+ developers</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Your Code,{' '}
            <span className="text-primary-600 dark:text-primary-400">
              Verified
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Detect AI-generated code and text across any programming language. 
            Get instant confidence scores with detailed analysis using advanced AI detection APIs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              href="/auth/signup" 
              className="btn-primary text-lg px-8 py-3 flex items-center space-x-2"
            >
              <span>Start Free Analysis</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/demo" 
              className="btn-secondary text-lg px-8 py-3"
            >
              View Demo
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-success-100 dark:bg-success-900/30 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-success-600 dark:text-success-400" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white">Instant Results</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Analysis in seconds</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white">99.2% Accuracy</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Multi-API detection</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-2 rounded-lg">
                <Users className="h-6 w-6 text-warning-600 dark:text-warning-400" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white">Team Ready</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Collaboration tools</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-800/20 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 dark:bg-blue-800/20 rounded-full blur-3xl opacity-20"></div>
      </div>
    </section>
  )
}