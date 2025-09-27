'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Star, Clock, DollarSign, MapPin } from 'lucide-react';
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

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockDoctors: Doctor[] = [
         {
    id: '0',
    name: 'Dr. Sarah Johnson',
    specialty: 'General Medicine',
    rating: 4.8,
    availableTime: 'Available Now',
    fee: '$50',
    location: '2.5 km away',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg'
  },
  {
     id: '1',
    name: 'Dr Urusa Baloch',
    specialty: 'Dermatoligst',
    rating: 4.8,
    availableTime: '24/7',
    fee: '$50',
    location: '2.5 km away',
    image: 'https://th.bing.com/th?id=OIF.QgO20%2bxDzuVNnY6iR2ahpQ&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Internal Medicine',
    rating: 4.9,
    availableTime: 'Next: 2:30 PM',
    fee: '$65',
    location: '1.8 km away',
    image: 'https://images.pexels.com/photos/6205509/pexels-photo-6205509.jpeg'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Family Medicine',
    rating: 4.7,
    availableTime: 'Next: 4:00 PM',
    fee: '$45',
    location: '3.2 km away',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg'
  },
  {
    id: '4',
    name: 'Dr. David Kumar',
    specialty: 'Cardiology',
    rating: 4.9,
    availableTime: 'Tomorrow 9:00 AM',
    fee: '$80',
    location: '4.1 km away',
    image: 'https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg'
  },
  {
    id: '5',
    name: 'Dr. Ayesha Malik',
    specialty: 'Dermatology',
    rating: 4.6,
    availableTime: 'Today 6:00 PM',
    fee: '$55',
    location: '2.0 km away',
    image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg'
  },
  {
    id: '6',
    name: 'Dr. John Williams',
    specialty: 'Orthopedics',
    rating: 4.8,
    availableTime: 'Tomorrow 11:30 AM',
    fee: '$70',
    location: '5.3 km away',
    image: 'https://images.pexels.com/photos/6303557/pexels-photo-6303557.jpeg'
  },
  {
    id: '7',
    name: 'Dr. Priya Sharma',
    specialty: 'Gynecology',
    rating: 4.7,
    availableTime: 'Available Now',
    fee: '$60',
    location: '3.7 km away',
    image: 'https://images.pexels.com/photos/1181685/pexels-photo-1181685.jpeg'
  },
  {
    id: '8',
    name: 'Dr. Carlos Mendes',
    specialty: 'Neurology',
    rating: 4.9,
    availableTime: 'Next: 5:00 PM',
    fee: '$90',
    location: '6.2 km away',
    image: 'https://images.pexels.com/photos/8460093/pexels-photo-8460093.jpeg'
  },
  {
    id: '9',
    name: 'Dr. Fatima Noor',
    specialty: 'Pediatrics',
    rating: 4.8,
    availableTime: 'Tomorrow 10:00 AM',
    fee: '$50',
    location: '1.9 km away',
    image: 'https://images.pexels.com/photos/5327899/pexels-photo-5327899.jpeg'
  },
  {
    id: '10',
    name: 'Dr. Robert King',
    specialty: 'Oncology',
    rating: 4.7,
    availableTime: 'Today 7:30 PM',
    fee: '$120',
    location: '7.1 km away',
    image: 'https://images.pexels.com/photos/7088527/pexels-photo-7088527.jpeg'
  },
  {
    id: '11',
    name: 'Dr. Amna Javed',
    specialty: 'ENT Specialist',
    rating: 4.6,
    availableTime: 'Next: 1:30 PM',
    fee: '$40',
    location: '3.4 km away',
    image: 'https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg'
  },
  {
    id: '12',
    name: 'Dr. Mark Allen',
    specialty: 'Psychiatry',
    rating: 4.8,
    availableTime: 'Tomorrow 3:00 PM',
    fee: '$85',
    location: '4.9 km away',
    image: 'https://images.pexels.com/photos/5327581/pexels-photo-5327581.jpeg'
  },
  {
    id: '13',
    name: 'Dr. Sana Qureshi',
    specialty: 'Endocrinology',
    rating: 4.7,
    availableTime: 'Today 8:00 PM',
    fee: '$75',
    location: '2.7 km away',
    image: 'https://images.pexels.com/photos/8460100/pexels-photo-8460100.jpeg'
  },
  {
    id: '14',
    name: 'Dr. James Lee',
    specialty: 'Urology',
    rating: 4.8,
    availableTime: 'Available Now',
    fee: '$95',
    location: '5.8 km away',
    image: 'https://images.pexels.com/photos/6303554/pexels-photo-6303554.jpeg'
  },
  {
    id: '15',
    name: 'Dr. Maria Santos',
    specialty: 'Gastroenterology',
    rating: 4.6,
    availableTime: 'Tomorrow 12:00 PM',
    fee: '$85',
    location: '4.2 km away',
    image: 'https://images.pexels.com/photos/8460044/pexels-photo-8460044.jpeg'
  },
  {
    id: '16',
    name: 'Dr. Bilal Hussain',
    specialty: 'Pulmonology',
    rating: 4.9,
    availableTime: 'Next: 6:30 PM',
    fee: '$70',
    location: '6.0 km away',
    image: 'https://images.pexels.com/photos/5215026/pexels-photo-5215026.jpeg'
  },
  {
    id: '17',
    name: 'Dr. Hannah Green',
    specialty: 'Ophthalmology',
    rating: 4.8,
    availableTime: 'Today 5:15 PM',
    fee: '$60',
    location: '3.3 km away',
    image: 'https://images.pexels.com/photos/6234596/pexels-photo-6234596.jpeg'
  },
  {
    id: '18',
    name: 'Dr. Zeeshan Rauf',
    specialty: 'Nephrology',
    rating: 4.7,
    availableTime: 'Tomorrow 2:00 PM',
    fee: '$110',
    location: '7.5 km away',
    image: 'https://images.pexels.com/photos/6749771/pexels-photo-6749771.jpeg'
  },
  {
    id: '19',
    name: 'Dr. Laura Bennett',
    specialty: 'Rheumatology',
    rating: 4.6,
    availableTime: 'Next: 4:30 PM',
    fee: '$95',
    location: '6.7 km away',
    image: 'https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg'
  },
  {
    id: '20',
    name: 'Dr. Adnan Malik',
    specialty: 'Plastic Surgery',
    rating: 4.9,
    availableTime: 'Today 9:00 PM',
    fee: '$200',
    location: '8.0 km away',
    image: 'https://images.pexels.com/photos/6749774/pexels-photo-6749774.jpeg'
  },
  {
    id: '21',
    name: 'Dr. Kate Wilson',
    specialty: 'Allergy & Immunology',
    rating: 4.7,
    availableTime: 'Tomorrow 11:00 AM',
    fee: '$70',
    location: '5.4 km away',
    image: 'https://images.pexels.com/photos/5327600/pexels-photo-5327600.jpeg'
  },
  {
    id: '22',
    name: 'Dr. Usman Tariq',
    specialty: 'Infectious Disease',
    rating: 4.8,
    availableTime: 'Next: 7:45 PM',
    fee: '$90',
    location: '6.1 km away',
    image: 'https://images.pexels.com/photos/5215029/pexels-photo-5215029.jpeg'
  },
  {
    id: '23',
    name: 'Dr. Olivia Brown',
    specialty: 'Sports Medicine',
    rating: 4.6,
    availableTime: 'Today 4:45 PM',
    fee: '$65',
    location: '3.9 km away',
    image: 'https://images.pexels.com/photos/6749775/pexels-photo-6749775.jpeg'
  },
  {
    id: '24',
    name: 'Dr. Kamran Ahmed',
    specialty: 'Hematology',
    rating: 4.8,
    availableTime: 'Tomorrow 1:00 PM',
    fee: '$100',
    location: '6.9 km away',
    image: 'https://images.pexels.com/photos/5327582/pexels-photo-5327582.jpeg'
  },
  {
    id: '25',
    name: 'Dr. Sophia Martinez',
    specialty: 'Obstetrics',
    rating: 4.7,
    availableTime: 'Today 8:30 PM',
    fee: '$85',
    location: '2.8 km away',
    image: 'https://images.pexels.com/photos/8460101/pexels-photo-8460101.jpeg'
  }
      ];
      setDoctors(mockDoctors);
      setLoading(false);

      // Animate cards after loading
      setTimeout(() => {
        gsap.fromTo(
          '.doctor-card',
          { y: 50, opacity: 0, scale: 0.9 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)'
          }
        );
      }, 100);
    }, 1500);

    // Initial page animation
    gsap.fromTo(
      '.doctors-header',
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const handleBookDoctor = (doctor: Doctor) => {
    // Store selected doctor in localStorage for booking page
    localStorage.setItem('selectedDoctor', JSON.stringify(doctor));
    router.push('/booking');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="doctors-header text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Available Doctors
          </h1>
          <p className="text-gray-300">
            Choose from our verified healthcare professionals
          </p>
        </div>

        {loading ? (
          /* Loading State */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="glass-dark rounded-2xl p-6 animate-pulse">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gray-600 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-600 rounded mb-2"></div>
                    <div className="h-3 bg-gray-600 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-600 rounded"></div>
                  <div className="h-3 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-10 bg-gray-600 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Doctors Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="doctor-card glass-dark rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer group"
                onClick={() => handleBookDoctor(doctor)}
              >
                {/* Doctor Info */}
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-red-400"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-red-400 transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-red-400 text-sm">{doctor.specialty}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex space-x-1">
                    {renderStars(doctor.rating)}
                  </div>
                  <span className="text-white text-sm font-medium">
                    {doctor.rating}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Clock className="w-4 h-4 text-green-400" />
                    <span className="text-sm">{doctor.availableTime}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-300">
                    <DollarSign className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">Consultation Fee: {doctor.fee}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-300">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span className="text-sm">{doctor.location}</span>
                  </div>
                </div>

                {/* Book Button */}
                <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transform group-hover:scale-105 transition-all duration-300">
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}