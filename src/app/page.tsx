"use client";

import { useState } from "react";

// Header Component
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
            </svg>
          </div>
          <span className="text-xl font-bold">FlexFlow</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
          <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Sign In</button>
          <button className="btn-primary text-sm py-3 px-6">Get Started</button>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <nav className="flex flex-col gap-4 px-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">How it Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</a>
            <button className="btn-primary mt-4">Get Started</button>
          </nav>
        </div>
      )}
    </header>
  );
}

// Hero Section
function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Trusted by 10,000+ fitness enthusiasts
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Your Body,{" "}
            <span className="gradient-text">Transform Your Life</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Personalized training programs, smart nutrition guidance, and continuous support from expert coaches. Start your fitness journey today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <div className="flex items-center bg-gray-50 rounded-full p-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-4 py-3 outline-none min-w-[240px]"
              />
              <button className="btn-primary whitespace-nowrap">Start Free Trial</button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              14-day free trial
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Cancel anytime
            </div>
          </div>
        </div>

        {/* App Preview */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-100/30 to-transparent rounded-3xl" />
          <div className="relative bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Phone Mockup 1 */}
              <div className="bg-white rounded-3xl shadow-2xl p-4 transform hover:scale-105 transition-transform">
                <div className="bg-gray-900 rounded-2xl aspect-[9/16] flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="text-white text-center">
                    <p className="text-2xl font-bold">Today&apos;s Goal</p>
                    <p className="text-gray-400 mt-2">3/5 workouts completed</p>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                      <div className="gradient-bg h-2 rounded-full" style={{ width: '60%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Mockup 2 - Center */}
              <div className="bg-white rounded-3xl shadow-2xl p-4 transform scale-105 md:scale-110 z-10">
                <div className="bg-gray-900 rounded-2xl aspect-[9/16] flex flex-col p-6">
                  <div className="text-white">
                    <p className="text-sm text-gray-400">HIIT Workout</p>
                    <p className="text-xl font-bold mt-1">Full Body Burn</p>
                  </div>
                  <div className="flex-1 flex flex-col justify-center items-center">
                    <div className="w-32 h-32 rounded-full border-4 border-pink-500 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-white">12:45</p>
                        <p className="text-gray-400 text-sm">remaining</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4">
                    <button className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      </svg>
                    </button>
                    <button className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                    <button className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Phone Mockup 3 */}
              <div className="bg-white rounded-3xl shadow-2xl p-4 transform hover:scale-105 transition-transform">
                <div className="bg-gray-900 rounded-2xl aspect-[9/16] flex flex-col p-6">
                  <div className="text-white mb-4">
                    <p className="text-sm text-gray-400">Nutrition Plan</p>
                    <p className="text-xl font-bold mt-1">Daily Macros</p>
                  </div>
                  <div className="space-y-4 flex-1">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Protein</span>
                        <span className="text-white">120g / 150g</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-pink-500 h-2 rounded-full" style={{ width: '80%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Carbs</span>
                        <span className="text-white">180g / 200g</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-400 h-2 rounded-full" style={{ width: '90%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Fats</span>
                        <span className="text-white">45g / 60g</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full" style={{ width: '75%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Calories</span>
                        <span className="text-white">1,850 / 2,200</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-400 h-2 rounded-full" style={{ width: '84%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Logos/Brands Section
function Brands() {
  const brands = ["Forbes", "TechCrunch", "Business Insider", "Men's Health", "Women's Health", "Shape"];

  return (
    <section className="py-16 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-gray-400 text-sm mb-8">TRUSTED BY LEADING BRANDS</p>
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
          {brands.map((brand) => (
            <span key={brand} className="text-xl font-bold text-gray-400">{brand}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// Features Section
function Features() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      title: "Personalized Training",
      description: "Custom workout programs built around your goals, schedule, and fitness level. Progress that feels natural and sustainable."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05l-5 2V19c0 2.2-1.8 4-4 4-1.45 0-2.72-.78-3.42-1.94l7.48-3.49v5.42zM1 18c0 2.2 1.8 4 4 4 1.45 0 2.72-.78 3.42-1.94L1 16.5V18zm10-8.5l-5 2V15l5-2V9.5zm0-6L6 5.5v4L11 7.5V3.5zM11.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L16 5.05l-5 2V19c0 2.2-1.8 4-4 4 1.45 0 2.72-.78 3.42-1.94l.64 1.93z"/>
        </svg>
      ),
      title: "Smart Nutrition",
      description: "Flexible, balanced nutrition guidance that fits into your lifestyle. Meal plans and macro tracking made simple."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
        </svg>
      ),
      title: "24/7 Expert Support",
      description: "Our certified coaches and community support you every step of the way, keeping you motivated and on track."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
      ),
      title: "Progress Tracking",
      description: "Visual analytics and insights to see your transformation. Celebrate milestones and stay motivated."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      ),
      title: "Wellness Integration",
      description: "Holistic approach including sleep tracking, stress management, and recovery optimization."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      ),
      title: "Community",
      description: "Join thousands of like-minded individuals. Share achievements, find workout partners, and stay inspired."
    }
  ];

  return (
    <section id="features" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">Features</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Everything you need for your{" "}
            <span className="gradient-text">fitness journey</span>
          </h2>
          <p className="text-gray-600 text-lg">
            A complete platform designed to help you achieve your health and fitness goals with personalized guidance and support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card group">
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Tell us about your fitness goals, current level, and preferences. Our AI analyzes your needs to create the perfect plan."
    },
    {
      number: "02",
      title: "Get Your Custom Plan",
      description: "Receive a personalized workout and nutrition plan tailored specifically to you. Adjust anytime as your goals evolve."
    },
    {
      number: "03",
      title: "Track & Improve",
      description: "Log your workouts, meals, and progress. Watch your transformation unfold with detailed analytics and insights."
    },
    {
      number: "04",
      title: "Achieve Your Goals",
      description: "Celebrate your milestones with our supportive community. Keep pushing forward with continuous guidance."
    }
  ];

  return (
    <section id="how-it-works" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Your path to a{" "}
            <span className="gradient-text">healthier you</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Getting started is easy. Follow these simple steps to begin your transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-7xl font-bold text-gray-100 mb-4">{step.number}</div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 right-0 w-1/2 h-0.5 bg-gradient-to-r from-pink-200 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Lost 30 lbs in 4 months",
      image: "SJ",
      content: "FlexFlow completely changed my relationship with fitness. The personalized workouts and nutrition plans made it so easy to stay consistent. I've never felt better!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Marathon Runner",
      image: "MC",
      content: "As a runner, I needed a program that could complement my training. FlexFlow's smart algorithms adjusted my plan based on my runs and recovery needs. Incredible!",
      rating: 5
    },
    {
      name: "Emma Williams",
      role: "Busy Mom of 3",
      image: "EW",
      content: "Finding time to workout as a mom seemed impossible. FlexFlow's quick, effective workouts fit perfectly into my schedule. Down 20 lbs and feeling amazing!",
      rating: 5
    },
    {
      name: "David Rodriguez",
      role: "Gained 15 lbs of muscle",
      image: "DR",
      content: "I've tried countless apps and trainers. FlexFlow's attention to detail in both workouts and nutrition helped me finally achieve my muscle-building goals.",
      rating: 5
    },
    {
      name: "Lisa Thompson",
      role: "Yoga Enthusiast",
      image: "LT",
      content: "The wellness integration features are incredible. Sleep tracking, stress management, and recovery tips have made my overall health journey holistic and sustainable.",
      rating: 5
    },
    {
      name: "James Wilson",
      role: "Former Athlete",
      image: "JW",
      content: "Getting back in shape after years off was daunting. FlexFlow's gradual progression and expert support made my comeback safe and effective. Highly recommend!",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Loved by thousands of{" "}
            <span className="gradient-text">fitness enthusiasts</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Don&apos;t just take our word for it. Here&apos;s what our community has to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6">&ldquo;{testimonial.content}&rdquo;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
                  {testimonial.image}
                </div>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing Section
function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "19",
      period: "month",
      description: "Perfect for beginners starting their fitness journey",
      features: [
        "Personalized workout plans",
        "Basic nutrition guidance",
        "Progress tracking",
        "Community access",
        "Mobile app access"
      ],
      highlighted: false
    },
    {
      name: "Pro",
      price: "49",
      period: "month",
      description: "For dedicated fitness enthusiasts seeking more",
      features: [
        "Everything in Starter",
        "Advanced workout programs",
        "Custom meal plans",
        "1-on-1 coach check-ins",
        "Priority support",
        "Wellness integration"
      ],
      highlighted: true
    },
    {
      name: "Elite",
      price: "99",
      period: "month",
      description: "The ultimate personalized fitness experience",
      features: [
        "Everything in Pro",
        "Dedicated personal coach",
        "Weekly video calls",
        "Custom supplement guidance",
        "Recovery optimization",
        "VIP community access"
      ],
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Simple, transparent{" "}
            <span className="gradient-text">pricing</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Choose the plan that fits your goals. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-3xl p-8 ${
                plan.highlighted
                  ? 'gradient-bg text-white transform scale-105 shadow-2xl'
                  : 'bg-white border-2 border-gray-100'
              }`}
            >
              {plan.highlighted && (
                <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.highlighted ? 'text-white/80' : 'text-gray-500'}`}>
                {plan.description}
              </p>
              <div className="mb-6">
                <span className="text-5xl font-bold">${plan.price}</span>
                <span className={plan.highlighted ? 'text-white/80' : 'text-gray-500'}>/{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg className={`w-5 h-5 ${plan.highlighted ? 'text-white' : 'text-pink-500'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-4 rounded-full font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-white text-pink-500 hover:bg-gray-100'
                    : 'btn-primary'
                }`}
              >
                Start Free Trial
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQ() {
  const faqs = [
    {
      question: "How does the 14-day free trial work?",
      answer: "Start your free trial with full access to all features. No credit card required. You'll only be charged if you decide to continue after the trial period."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Absolutely! You can cancel your subscription at any time with no questions asked. Your access will continue until the end of your billing period."
    },
    {
      question: "Are the workout plans suitable for beginners?",
      answer: "Yes! Our AI creates personalized plans based on your current fitness level. Whether you're a complete beginner or an experienced athlete, we've got you covered."
    },
    {
      question: "Do I need any equipment?",
      answer: "Not necessarily. We offer both equipment-free bodyweight workouts and gym-based programs. You choose what works best for your situation."
    },
    {
      question: "How do the nutrition plans work?",
      answer: "Our nutrition plans are customized based on your goals, dietary preferences, and restrictions. You'll receive meal suggestions, recipes, and macro tracking tools."
    },
    {
      question: "Can I switch plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. The price difference will be prorated for the remainder of your billing cycle."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Frequently asked{" "}
            <span className="gradient-text">questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden"
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <svg
                  className={`w-6 h-6 text-pink-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTA() {
  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="gradient-bg rounded-3xl p-12 md:p-16 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to transform your life?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join thousands of people who have already started their fitness journey with FlexFlow. Your transformation begins today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center bg-white/10 backdrop-blur rounded-full p-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-4 py-3 outline-none min-w-[240px] text-white placeholder-white/60"
              />
              <button className="bg-white text-pink-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                Get Started Free
              </button>
            </div>
          </div>
          <p className="mt-6 text-white/60 text-sm">
            No credit card required. 14-day free trial.
          </p>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
                </svg>
              </div>
              <span className="text-xl font-bold">FlexFlow</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Transform your body and mind with personalized training, smart nutrition, and expert coaching support.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            &copy; 2024 FlexFlow. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Brands />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
