import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Award, Briefcase } from 'lucide-react';

const Alumni = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const alumni = [
    {
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80",
      name: "James Rodriguez",
      batch: "2018",
      role: "Senior Software Engineer",
      company: "Google",
      quote: "SIIT provided me with the foundation I needed to succeed in tech."
    },
    {
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80",
      name: "Maria Santos",
      batch: "2019",
      role: "Marketing Director",
      company: "Microsoft",
      quote: "The practical experience at SIIT was invaluable for my career growth."
    },
    {
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      name: "David Chen",
      batch: "2020",
      role: "Data Scientist",
      company: "Amazon",
      quote: "SIIT's industry connections helped me land my dream job."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % alumni.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + alumni.length) % alumni.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Alumni Success Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our graduates are making waves across industries, leading innovation and driving change in top companies worldwide.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {alumni.map((alum, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-50 rounded-lg p-8 flex flex-col md:flex-row items-center gap-8">
                      <div className="w-64 h-64 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={alum.image}
                          alt={alum.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                          <Award className="h-6 w-6 text-blue-600" />
                          <span className="text-blue-600 font-semibold">Class of {alum.batch}</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{alum.name}</h3>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mb-4">
                          <Briefcase className="h-5 w-5" />
                          <span>{alum.role} at {alum.company}</span>
                        </div>
                        <p className="text-lg text-gray-700 italic">"{alum.quote}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {alumni.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? 'bg-blue-600 w-4' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alumni;