'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Calendar, Clock, DollarSign, User, CircleCheck as CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  availableTime: string;
  fee: string;
  location: string;
  image: string;
}

interface BookingData {
  doctor: Doctor;
  date: string;
  time: string;
  patientName: string;
  patientEmail: string;
  symptoms: string;
}

export default function BookingPage() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    patientName: '',
    patientEmail: '',
    symptoms: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Get selected doctor from localStorage
    const selectedDoctor = localStorage.getItem('selectedDoctor');
    if (selectedDoctor) {
      const doctorData = JSON.parse(selectedDoctor);
      setDoctor(doctorData);
      setBookingData(prev => ({ ...prev, doctor: doctorData }));
    } else {
      router.push('/doctors');
      return;
    }

    // Initial page animation with zoom-in effect
    gsap.fromTo(
      '.booking-container',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
    );
  }, [router]);

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleBooking = async () => {
    if (!bookingData.patientName || !bookingData.patientEmail) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      const data = await response.json();
      
      if (data.success) {
        setPaymentUrl(data.payment_url || '#payment-placeholder');
        setIsConfirmed(true);
        
        // Animate confirmation
        setTimeout(() => {
          gsap.fromTo(
            '.confirmation-content',
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
          );
        }, 100);
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    }

    setIsLoading(false);
  };

  const handlePayment = () => {
    if (paymentUrl && paymentUrl !== '#payment-placeholder') {
      window.location.href = paymentUrl;
    } else {
      // Demo payment flow
      alert('Redirecting to payment gateway...');
    }
  };

  if (!doctor) {
    return null;
  }

  return (
    <div className="min-h-screen p-4">
      <div className="booking-container max-w-2xl mx-auto">
        {!isConfirmed ? (
          /* Booking Form */
          <div className="glass-dark rounded-2xl p-8">
            <h1 className="text-3xl font-bold text-white text-center mb-8">
              Book Appointment
            </h1>

            {/* Doctor Info Card */}
            <div className="glass rounded-xl p-6 mb-8">
              <div className="flex items-center space-x-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-red-400"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {doctor.name}
                  </h3>
                  <p className="text-red-400">{doctor.specialty}</p>
                  <p className="text-gray-300 text-sm">{doctor.location}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-2xl font-bold text-green-400">{doctor.fee}</p>
                  <p className="text-gray-400 text-sm">Consultation</p>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Preferred Time
                  </label>
                  <select
                    value={bookingData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={bookingData.patientName}
                  onChange={(e) => handleInputChange('patientName', e.target.value)}
                  className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={bookingData.patientEmail}
                  onChange={(e) => handleInputChange('patientEmail', e.target.value)}
                  className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Symptoms/Reason for Visit
                </label>
                <textarea
                  value={bookingData.symptoms}
                  onChange={(e) => handleInputChange('symptoms', e.target.value)}
                  className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={4}
                  placeholder="Briefly describe your symptoms or reason for consultation"
                />
              </div>

              <button
                type="button"
                onClick={handleBooking}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {isLoading ? 'Booking...' : 'Confirm Booking'}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="glass-dark rounded-2xl p-8 text-center">
            <div className="confirmation-content">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-3xl font-bold text-white mb-4">
                Booking Confirmed!
              </h1>
              
              <p className="text-gray-300 mb-8">
                Your appointment has been successfully booked with {doctor.name}
              </p>

              {/* Appointment Details */}
              <div className="glass rounded-xl p-6 mb-8 text-left">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Appointment Details
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Doctor:</span>
                    <span className="text-white">{doctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Date:</span>
                    <span className="text-white">{bookingData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Time:</span>
                    <span className="text-white">{bookingData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Fee:</span>
                    <span className="text-white font-semibold">{doctor.fee}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-4 rounded-xl hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg mb-4"
              >
                <DollarSign className="w-5 h-5 inline mr-2" />
                Pay Now
              </button>

              <p className="text-gray-400 text-sm">
                You will receive a confirmation email shortly with meeting details
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}