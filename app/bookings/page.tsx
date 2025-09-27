'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { Calendar, Clock, User, MapPin } from 'lucide-react';

export default function BookingsPage() {
  useEffect(() => {
    // Page animation
    gsap.fromTo(
      '.bookings-container',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const mockBookings = [
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'General Medicine',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'Confirmed',
      location: 'Video Consultation'
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Internal Medicine',
      date: '2024-01-20',
      time: '2:30 PM',
      status: 'Pending',
      location: 'Clinic Visit'
    }
  ];

  return (
    <div className="bookings-container min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            My Bookings
          </h1>
          <p className="text-gray-300">
            Manage your upcoming appointments
          </p>
        </div>

        <div className="space-y-6">
          {mockBookings.map((booking) => (
            <div key={booking.id} className="glass-dark rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {booking.doctorName}
                  </h3>
                  <p className="text-blue-400 mb-4">{booking.specialty}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <MapPin className="w-4 h-4" />
                      <span>{booking.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-6">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    booking.status === 'Confirmed' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {mockBookings.length === 0 && (
          <div className="text-center py-16">
            <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No bookings found</p>
            <p className="text-gray-500">Start by booking your first consultation</p>
          </div>
        )}
      </div>
    </div>
  );
}