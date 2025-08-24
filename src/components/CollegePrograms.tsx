import { useState } from 'react';
import { Clock, MapPin, Calendar, Users, BookOpen, Search, Download } from 'lucide-react';

interface ClassSession {
  id: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  time: string;
  days: string[];
  room: string;
  building: string;
  capacity: number;
  enrolled: number;
  credits: number;
  section: string;
  semester: string;
  level: 'Undergraduate' | 'Graduate';
  department: string;
  yearLevel: '4th Year BSIT' | '3rd Year BSIT' | '2nd Year BSIT' | '1st Year BSIT';
  batch: 'Batch 1' | 'Batch 2';
}

const classSchedules: ClassSession[] = [
  {
    id: "CS101-01",
    courseCode: "CS 101",
    courseName: "Introduction to Programming",
    instructor: "Prof. David Kim",
    time: "9:00 AM - 10:30 AM",
    days: ["Monday", "Wednesday", "Friday"],
    room: "101",
    building: "Tech Building",
    capacity: 40,
    enrolled: 38,
    credits: 3,
    section: "01",
    semester: "Spring 2025",
    level: "Undergraduate",
    department: "Computer Science",
    yearLevel: '1st Year BSIT',
    batch: 'Batch 1',
  },
  {
    id: "CS201-01",
    courseCode: "CS 201",
    courseName: "Data Structures and Algorithms",
    instructor: "Dr. Sarah Chen",
    time: "11:00 AM - 12:30 PM",
    days: ["Tuesday", "Thursday"],
    room: "205",
    building: "Tech Building",
    capacity: 35,
    enrolled: 35,
    credits: 4,
    section: "01",
    semester: "Spring 2025",
    level: "Undergraduate",
    department: "Computer Science",
    yearLevel: '2nd Year BSIT',
    batch: 'Batch 2',
  },
  {
    id: "IS301-01",
    courseCode: "IS 301",
    courseName: "Database Management Systems",
    instructor: "Prof. Michael Rodriguez",
    time: "2:00 PM - 3:30 PM",
    days: ["Monday", "Wednesday", "Friday"],
    room: "150",
    building: "Information Center",
    capacity: 30,
    enrolled: 28,
    credits: 3,
    section: "01",
    semester: "Spring 2025",
    level: "Undergraduate",
    department: "Information Systems",
    yearLevel: '3rd Year BSIT',
    batch: 'Batch 1',
  },
  {
    id: "CY301-01",
    courseCode: "CY 301",
    courseName: "Network Security",
    instructor: "Dr. Emily Johnson",
    time: "1:00 PM - 2:30 PM",
    days: ["Tuesday", "Thursday"],
    room: "101",
    building: "Security Lab",
    capacity: 25,
    enrolled: 24,
    credits: 3,
    section: "01",
    semester: "Spring 2025",
    level: "Undergraduate",
    department: "Cybersecurity",
    yearLevel: '4th Year BSIT',
    batch: 'Batch 2',
  },
  {
    id: "DS401-01",
    courseCode: "DS 401",
    courseName: "Machine Learning Fundamentals",
    instructor: "Dr. Lisa Thompson",
    time: "3:00 PM - 4:30 PM",
    days: ["Monday", "Wednesday"],
    room: "220",
    building: "Analytics Lab",
    capacity: 20,
    enrolled: 19,
    credits: 3,
    section: "01",
    semester: "Spring 2025",
    level: "Undergraduate",
    department: "Data Science",
    yearLevel: '1st Year BSIT',
    batch: 'Batch 1',
  },
  {
    id: "CS501-01",
    courseCode: "CS 501",
    courseName: "Advanced Machine Learning",
    instructor: "Dr. Sarah Chen",
    time: "6:00 PM - 8:30 PM",
    days: ["Wednesday"],
    room: "301",
    building: "Graduate Center",
    capacity: 15,
    enrolled: 12,
    credits: 3,
    section: "01",
    semester: "Spring 2025",
    level: "Graduate",
    department: "Computer Science",
    yearLevel: '4th Year BSIT',
    batch: 'Batch 2',
  },
  {
    id: "NET201-01",
    courseCode: "NET 201",
    courseName: "Network Administration",
    instructor: "Prof. James Wilson",
    time: "10:00 AM - 11:30 AM",
    days: ["Tuesday", "Thursday"],
    room: "180",
    building: "Network Center",
    capacity: 25,
    enrolled: 23,
    credits: 3,
    section: "01",
    semester: "Spring 2025",
    level: "Undergraduate",
    department: "Network Administration",
    yearLevel: '2nd Year BSIT',
    batch: 'Batch 1',
  },
  {
    id: "SE301-01",
    courseCode: "SE 301",
    courseName: "Software Engineering Principles",
    instructor: "Prof. David Kim",
    time: "4:00 PM - 5:30 PM",
    days: ["Monday", "Wednesday"],
    room: "150",
    building: "Dev Center",
    capacity: 30,
    enrolled: 27,
    credits: 3,
    section: "01",
    semester: "Spring 2025",
    level: "Undergraduate",
    department: "Software Engineering",
    yearLevel: '3rd Year BSIT',
    batch: 'Batch 2',
  }
];

export default function ClassSchedules() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('Subject');
  const [selectedYearLevel, setSelectedYearLevel] = useState('Year Level');
  const [selectedBatch, setSelectedBatch] = useState('Batch');
  const [selectedDay, setSelectedDay] = useState('Day');
  const [studentId, setStudentId] = useState('');
  const [showStudentSchedule, setShowStudentSchedule] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeError, setCodeError] = useState('');

  const departments = ['Subject', ...Array.from(new Set(classSchedules.map(c => c.department)))];
  const yearLevels = ['Year Level', '4th Year BSIT', '3rd Year BSIT', '2nd Year BSIT', '1st Year BSIT'];
  const batches = ['Batch', 'Batch 1', 'Batch 2'];
  const days = ['Day', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Only these IDs are valid for showing a schedule
  const allowedStudentIds = ["1220295", "1220899", "1220094", "1220024"];
  // Map of student ID to phone number for SMS verification (demo: only 1220295)
  const studentPhoneMap: Record<string, string> = {
    "1220295": "09984888084",
    // Add more mappings if needed
  };

  // Helper: Determine batch by student ID (demo logic)
  // Example student IDs for demo: 1220295, 1220899, 1220094, 1220024
  // You can update getBatchByStudentId logic if you want to map specific IDs to batches.
  function getBatchByStudentId(id: string): 'Batch 1' | 'Batch 2' | null {
    // Only allow if ID is in the allowed list
    if (!allowedStudentIds.includes(id.trim())) return null;
    const lastDigit = id.trim().slice(-1);
    if (!/^\d$/.test(lastDigit)) return null;
    return parseInt(lastDigit) % 2 === 0 ? 'Batch 2' : 'Batch 1';
  }

  // Only show schedules if studentId is entered, phone is verified, and "View My Schedule" is clicked
  let filteredSchedules: ClassSession[] = [];
  if (showStudentSchedule && studentId && isPhoneVerified) {
    const batch = getBatchByStudentId(studentId);
    if (batch) {
      filteredSchedules = classSchedules.filter(s => s.batch === batch);
    }
  }

  // Simulate sending SMS code (in real app, integrate with SMS API)
  async function sendVerificationCode() {
    try {
      // Only for demo: use the mapped phone number for the student
      const phone = studentPhoneMap["1220295"];
      // Generate a 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);
      setVerificationSent(true);
      setCodeError('');
      // Call your backend API to send the SMS using Twilio
      await fetch('/api/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code }),
      });
      alert('Verification code sent to your mobile number.');
    } catch (err) {
      setVerificationSent(false);
      setCodeError('Failed to send SMS. Please try again.');
      alert('Failed to send SMS. Please try again.');
    }
  }

  // Reset phone verification if studentId changes
  function handleStudentIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStudentId(e.target.value);
    setIsPhoneVerified(false);
    setPhoneInput('');
    setShowStudentSchedule(false);
    setVerificationSent(false);
    setCodeInput('');
    setGeneratedCode('');
    setCodeError('');
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with background image and overlay */}
        <div className="relative mb-12 rounded-xl overflow-hidden shadow-lg">
          <img
            src="/Hero1.jpg"
            alt="College Programs"
            className="w-full h-64 object-cover opacity-20"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow">
              Class Schedules
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Find your class schedules, room locations, and important course information for the current semester.
            </p>
          </div>
        </div>

        {/* Student ID Input */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter your Student ID"
            value={studentId}
            onChange={handleStudentIdChange}
            className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white focus:ring-2 focus:ring-maroon-700 focus:border-transparent"
          />
          {/* Only show phone input if ID is 1220295 and not yet verified */}
          {studentId === "1220295" && !isPhoneVerified && (
            <>
              <input
                type="text"
                placeholder="Enter your mobile number"
                value={phoneInput}
                onChange={e => setPhoneInput(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white focus:ring-2 focus:ring-maroon-700 focus:border-transparent"
                disabled={verificationSent}
              />
              {!verificationSent ? (
                <button
                  className="px-4 py-2 bg-maroon-700 text-white rounded-lg hover:bg-maroon-800 transition-colors border border-maroon-900"
                  onClick={() => {
                    if (phoneInput === studentPhoneMap["1220295"]) {
                      sendVerificationCode();
                    } else {
                      alert("Invalid phone number for this student ID.");
                    }
                  }}
                  disabled={!phoneInput}
                >
                  Send Code
                </button>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Enter verification code"
                    value={codeInput}
                    onChange={e => setCodeInput(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white focus:ring-2 focus:ring-maroon-700 focus:border-transparent"
                  />
                  <button
                    className="px-4 py-2 bg-maroon-700 text-white rounded-lg hover:bg-maroon-800 transition-colors border border-maroon-900"
                    onClick={() => {
                      if (codeInput === generatedCode) {
                        setIsPhoneVerified(true);
                        setShowStudentSchedule(true);
                        setCodeError('');
                      } else {
                        setCodeError('Invalid code. Please try again.');
                      }
                    }}
                    disabled={!codeInput}
                  >
                    Verify Code
                  </button>
                  {codeError && (
                    <span className="text-red-400 text-xs ml-2">{codeError}</span>
                  )}
                </>
              )}
            </>
          )}
          {/* For other allowed IDs, no phone verification */}
          {studentId !== "1220295" && (
            <button
              className="px-4 py-2 bg-maroon-700 text-white rounded-lg hover:bg-maroon-800 transition-colors border border-maroon-900"
              onClick={() => {
                if (allowedStudentIds.includes(studentId.trim())) {
                  setIsPhoneVerified(true);
                  setShowStudentSchedule(true);
                } else {
                  setIsPhoneVerified(false);
                  setShowStudentSchedule(false);
                  alert("Student ID not registered.");
                }
              }}
              disabled={!studentId}
            >
              View My Schedule
            </button>
          )}
          {showStudentSchedule && (
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors ml-2"
              onClick={() => {
                setShowStudentSchedule(false);
                setStudentId('');
                setIsPhoneVerified(false);
                setPhoneInput('');
                setVerificationSent(false);
                setCodeInput('');
                setGeneratedCode('');
                setCodeError('');
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Hide filters and schedule grid if not viewing student schedule */}
        {showStudentSchedule && studentId && isPhoneVerified && (
          <>
            {/* Schedule Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredSchedules.map((schedule) => (
                <div key={schedule.id} className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-700">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{schedule.courseName}</h3>
                      <p className="text-white font-medium">{schedule.courseCode} - Section {schedule.section}</p>
                      <p className="text-gray-300">{schedule.department}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        schedule.level === 'Graduate' ? 'bg-maroon-900 text-white' : 'bg-white text-maroon-600'
                      }`}>
                        {schedule.level}
                      </span>
                      <p className="text-sm text-gray-300 mt-1">{schedule.credits} Credits</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-300">
                        <Clock className="h-4 w-4 mr-2 text-white" />
                        {schedule.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <Calendar className="h-4 w-4 mr-2 text-white" />
                        {schedule.days.join(', ')}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <MapPin className="h-4 w-4 mr-2 text-white" />
                        {schedule.building}, Room {schedule.room}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-300">
                        <BookOpen className="h-4 w-4 mr-2 text-white" />
                        {schedule.instructor}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <Users className="h-4 w-4 mr-2 text-white" />
                        {schedule.enrolled}/{schedule.capacity} Students
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-full bg-gray-700 rounded-full h-2 mr-2">
                          <div 
                            className="bg-maroon-600 h-2 rounded-full" 
                            style={{ width: `${(schedule.enrolled / schedule.capacity) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-300">
                          {Math.round((schedule.enrolled / schedule.capacity) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                    <p className="text-sm text-gray-300">
                      <strong>Semester:</strong> {schedule.semester}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {filteredSchedules.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Calendar className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No classes found</h3>
                <p className="text-gray-400">Your ID is not registered or you have no assigned schedule.</p>
              </div>
            )}
          </>
        )}

        {/* Important Notes */}
        <div className="mt-12 bg-maroon-900 border border-maroon-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Important Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-maroon-200 mb-2">Schedule Changes</h3>
              <ul className="text-maroon-100 text-sm space-y-1">
                <li>• Check your student portal regularly for updates</li>
                <li>• Room changes will be posted 24 hours in advance</li>
                <li>• Emergency cancellations sent via email and SMS</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-maroon-200 mb-2">Attendance Policy</h3>
              <ul className="text-maroon-100 text-sm space-y-1">
                <li>• Arrive 5 minutes before class starts</li>
                <li>• Notify instructor of planned absences</li>
                <li>• Make-up sessions available for excused absences</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}