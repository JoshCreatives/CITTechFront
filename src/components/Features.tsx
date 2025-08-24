import { Shield, BookOpen, Users, Trophy } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Shield className="h-12 w-12 text-red-600" />,
      title: 'Quality Education',
      description: 'Industry-aligned curriculum designed for success',
    },
    {
      icon: <BookOpen className="h-12 w-12 text-red-600" />,
      title: 'Modern Facilities',
      description: 'State-of-the-art laboratories and learning spaces',
    },
    {
      icon: <Users className="h-12 w-12 text-red-600" />,
      title: 'Expert Faculty',
      description: 'Learn from industry professionals and experts',
    },
    {
      icon: <Trophy className="h-12 w-12 text-red-600" />,
      title: 'Career Support',
      description: 'Comprehensive career guidance and placement assistance',
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-maroon-600">
          Why Choose CIT course?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-200">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
