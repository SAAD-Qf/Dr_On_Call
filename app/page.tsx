'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { MessageSquare, Users, Shield, Clock } from 'lucide-react';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo(
        '.hero-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: 'power3.out' }
      );

      // Features animation
      gsap.fromTo(
        '.feature-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.6,
          ease: 'power3.out',
        }
      );
    }, [heroRef, featuresRef]);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: MessageSquare,
      title: 'AI Chat Diagnosis',
      description:
        'Describe your symptoms and get instant AI-powered medical guidance',
    },
    {
      icon: Users,
      title: 'Expert Doctors',
      description: 'Connect with verified healthcare professionals in your area',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your medical data is encrypted and completely confidential',
    },
    {
      icon: Clock,
      title: '24/7 Available',
      description: 'Get medical assistance anytime, anywhere, day or night',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-40 px-4 sm:px-6 lg:px-8  bg-cover bg-center rounded-lg"
        style={{
          backgroundImage:"url('https://medadvancefinancial.com/wp-content/uploads/2020/08/rural-doctor-in-field.jpg')",
        }}
      >
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Dr
            </span>{' '}
            <span className="text-white">On Call</span> –{' '}
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              AI Powered Telemedicine
            </span>
          </h1>

          <p className="hero-subtitle text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Get instant medical consultation with our AI-powered diagnosis
            system and book appointments with qualified doctors near you.
          </p>

          <Link
            href="/chat"
            className="hero-cta inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Start Consultation
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose Dr On Call?
            </h2>
            <p className="text-gray-300 text-lg">
              Advanced technology meets compassionate healthcare
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card bg-gray-800/70 rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center bg-gray-800/80 rounded-2xl p-12 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Take the first step towards better health with AI-powered medical
            consultation
          </p>
          <Link
            href="/chat"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Start Your Consultation Now
          </Link>
        </div>
      </section>
    </div>
  );
}
