import React from 'react';
import { Clock, MapPin, Calendar, Phone, Mail, User } from 'lucide-react';

interface OfficeHour {
  facultyName: string;
  title: string;
  department: string;
  office: string;
  email: string;
  phone: string;
  schedule: {
    day: string;
    time: string;
    type: string;
  }[];
  notes: string;
  image: string;
}

const officeHours: OfficeHour[] = [
  {
    facultyName: "Dr. Sarah Chen",
    title: "Dean & Professor",
    department: "Computer Science",
    office: "Admin Building, Room 301",
    email: "s.chen@cit.edu",
    phone: "(555) 123-4501",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300",
    schedule: [
      { day: "Monday", time: "2:00 PM - 4:00 PM", type: "In-Person" },
      { day: "Wednesday", time: "10:00 AM - 12:00 PM", type: "In-Person" },
      { day: "Friday", time: "1:00 PM - 2:00 PM", type: "Virtual" }
    ],
    notes: "Please email in advance for virtual meetings. Available for urgent matters by appointment."
  },
  {
    facultyName: "Prof. Michael Rodriguez",
    title: "Associate Professor",
    department: "Information Systems",
    office: "Tech Building, Room 205",
    email: "m.rodriguez@cit.edu",
    phone: "(555) 123-4502",
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300",
    schedule: [
      { day: "Tuesday", time: "9:00 AM - 11:00 AM", type: "In-Person" },
      { day: "Thursday", time: "2:00 PM - 4:00 PM", type: "In-Person" },
      { day: "Friday", time: "3:00 PM - 4:00 PM", type: "Virtual" }
    ],
    notes: "Drop-in welcome during scheduled hours. For project consultations, please schedule in advance."
  },
  {
    facultyName: "Dr. Emily Johnson",
    title: "Professor",
    department: "Cybersecurity",
    office: "Security Lab, Room 101",
    email: "e.johnson@cit.edu",
    phone: "(555) 123-4503",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300",
    schedule: [
      { day: "Monday", time: "1:00 PM - 3:00 PM", type: "In-Person" },
      { day: "Wednesday", time: "11:00 AM - 1:00 PM", type: "In-Person" },
      { day: "Thursday", time: "4:00 PM - 5:00 PM", type: "Virtual" }
    ],
    notes: "Security lab access available during office hours. Virtual sessions via secure video conference."
  },
  {
    facultyName: "Prof. David Kim",
    title: "Assistant Professor",
    department: "Software Engineering",
    office: "Dev Center, Room 150",
    email: "d.kim@cit.edu",
    phone: "(555) 123-4504",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300",
    schedule: [
      { day: "Monday", time: "10:00 AM - 12:00 PM", type: "In-Person" },
      { day: "Tuesday", time: "3:00 PM - 5:00 PM", type: "In-Person" },
      { day: "Wednesday", time: "2:00 PM - 3:00 PM", type: "Virtual" }
    ],
    notes: "Code review sessions available. Bring your laptop for hands-on debugging assistance."
  },
  {
    facultyName: "Dr. Lisa Thompson",
    title: "Associate Professor",
    department: "Data Science",
    office: "Analytics Lab, Room 220",
    email: "l.thompson@cit.edu",
    phone: "(555) 123-4505",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=300",
    schedule: [
      { day: "Tuesday", time: "1:00 PM - 3:00 PM", type: "In-Person" },
      { day: "Thursday", time: "10:00 AM - 12:00 PM", type: "In-Person" },
      { day: "Friday", time: "2:00 PM - 3:00 PM", type: "Virtual" }
    ],
    notes: "Statistical software assistance available. Data analysis consultations by appointment."
  },
  {
    facultyName: "Prof. James Wilson",
    title: "Professor",
    department: "Network Administration",
    office: "Network Center, Room 180",
    email: "j.wilson@cit.edu",
    phone: "(555) 123-4506",
    image: "https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=300",
    schedule: [
      { day: "Monday", time: "11:00 AM - 1:00 PM", type: "In-Person" },
      { day: "Wednesday", time: "3:00 PM - 5:00 PM", type: "In-Person" },
      { day: "Thursday", time: "1:00 PM - 2:00 PM", type: "Virtual" }
    ],
    notes: "Network troubleshooting help available. Lab access for hands-on network configuration."
  }
];

export default function OfficeHours() {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Faculty Office Hours</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connect with our faculty members during their scheduled office hours for academic guidance, 
            project consultation, and personalized support.
          </p>
        </div>

        <div className="bg-maroon-950 border border-maroon-700 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-2">Important Notes</h2>
          <ul className="text-white space-y-1">
            <li>• Office hours are subject to change during exam periods and holidays</li>
            <li>• Virtual meetings require advance scheduling via email</li>
            <li>• For urgent matters outside office hours, contact faculty via email</li>
            <li>• Group consultations are welcome but please notify in advance</li>
          </ul>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {officeHours.map((faculty, index) => (
            <div key={index} className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start mb-6">
                <img
                  src={faculty.image}
                  alt={faculty.facultyName}
                  className="w-16 h-16 rounded-full object-cover mr-4 flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-maroon-100">{faculty.facultyName}</h3>
                  <p className="text-white font-medium">{faculty.title}</p>
                  <p className="text-gray-300">{faculty.department}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-300">
                    <MapPin className="h-4 w-4 mr-2 text-white" />
                    {faculty.office}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Mail className="h-4 w-4 mr-2 text-white" />
                    <a href={`mailto:${faculty.email}`} className="hover:text-maroon-300 transition-colors">
                      {faculty.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Phone className="h-4 w-4 mr-2 text-white" />
                    {faculty.phone}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-maroon-100 mb-3 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-maroon-400" />
                  Office Hours Schedule
                </h4>
                <div className="space-y-2">
                  {faculty.schedule.map((slot, slotIndex) => (
                    <div key={slotIndex} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-white" />
                        <span className="font-medium text-maroon-100">{slot.day}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-maroon-100">{slot.time}</div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          slot.type === 'Virtual' 
                            ? 'bg-green-900 text-green-300' 
                            : 'bg-maroon-900 text-white'
                        }`}>
                          {slot.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-maroon-800 border border-maroon-500 rounded-lg p-4">
                <h5 className="font-medium text-white mb-1">Additional Notes</h5>
                <p className="text-white text-sm">{faculty.notes}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">How to Make the Most of Office Hours</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Before Your Visit</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Review course materials and attempt the problem first</li>
                <li>• Prepare specific questions rather than general topics</li>
                <li>• Bring relevant materials (textbooks, assignments, code)</li>
                <li>• Check if the professor prefers email scheduling</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-maroon-100 mb-4">During Your Visit</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Be punctual and respectful of time limits</li>
                <li>• Take notes during the discussion</li>
                <li>• Ask for clarification if you don't understand</li>
                <li>• Discuss your academic and career goals</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}