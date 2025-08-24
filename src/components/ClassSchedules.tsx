import { useState, useEffect } from 'react';
import { Clock, MapPin, Calendar, Users, BookOpen, Search, Download, X, Printer, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import supabaseClient from '../services/supabaseClient';

interface ClassSession {
  id: string;
  student_id: string;
  course_code: string;
  course_name: string;
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
  year_level: '4th Year BSIT' | '3rd Year BSIT' | '2nd Year BSIT' | '1st Year BSIT';
  batch: 'Batch 1' | 'Batch 2';
}

export default function ClassSchedules() {
  const [studentId, setStudentId] = useState('');
  const [showStudentSchedule, setShowStudentSchedule] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [codeError, setCodeError] = useState('');
  const [filteredSchedules, setFilteredSchedules] = useState<ClassSession[]>([]);
  const [classSchedules, setClassSchedules] = useState<ClassSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { theme } = useTheme();
  const [studentEmail, setStudentEmail] = useState<string>("");
  const [studentName, setStudentName] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Fetch class schedules from Supabase
  useEffect(() => {
    fetchClassSchedules();
  }, []);

  const fetchClassSchedules = async () => {
    try {
      const { data, error } = await supabaseClient
        .from('class_schedules')
        .select('*');
      
      if (error) {
        console.error('Error fetching class schedules:', error);
        return;
      }
      
      setClassSchedules(data || []);
    } catch (error) {
      console.error('Error fetching class schedules:', error);
    }
  };

  // Test API connection
  const testAPIConnection = async () => {
    try {
      console.log('Testing API connection...');
      const response = await fetch('/api/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com' }),
      });
      console.log('API test response status:', response.status);
      const data = await response.json();
      console.log('API test response data:', data);
    } catch (error) {
      console.error('API test error:', error);
    }
  };

  // Export schedule as PDF
  const exportScheduleAsPDF = async () => {
    try {
      setIsExporting(true);
      // Dynamic import to avoid SSR issues
      const jsPDF = (await import('jspdf')).default;
      const html2canvas = (await import('html2canvas')).default;
      
      const scheduleElement = document.getElementById('schedule-content');
      if (!scheduleElement) return;

      const canvas = await html2canvas(scheduleElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`class-schedule-${studentId}.pdf`);
    } catch (error) {
      console.error('PDF export error:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Print schedule
  const printSchedule = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const scheduleHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Class Schedule - ${studentId}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #800000; padding-bottom: 20px; }
            .schedule-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
            .schedule-card { border: 1px solid #ddd; padding: 20px; border-radius: 8px; page-break-inside: avoid; }
            .course-title { font-size: 18px; font-weight: bold; color: #800000; margin-bottom: 10px; }
            .course-info { margin: 5px 0; }
            .section-badge { background: #800000; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px; }
            @media print {
              body { margin: 0; }
              .schedule-card { break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Class Schedule</h1>
            <h2>Student ID: ${studentId}</h2>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
          </div>
          <div class="schedule-grid">
            ${filteredSchedules.map(schedule => `
              <div class="schedule-card">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                  <div>
                    <div class="course-title">${schedule.course_code} - ${schedule.course_name}</div>
                    <div class="course-info">Instructor: ${schedule.instructor}</div>
                  </div>
                  <span class="section-badge">Section ${schedule.section}</span>
                </div>
                <div class="info-grid">
                  <div class="course-info">⏰ Time: ${schedule.time}</div>
                  <div class="course-info">📅 Days: ${schedule.days.join(', ')}</div>
                  <div class="course-info">📍 Location: ${schedule.building} - Room ${schedule.room}</div>
                  <div class="course-info">👥 Students: ${schedule.enrolled}/${schedule.capacity}</div>
                  <div class="course-info">📚 Credits: ${schedule.credits}</div>
                  <div class="course-info">🏫 Department: ${schedule.department}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(scheduleHTML);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  // Export schedule as CSV
  const exportScheduleAsCSV = () => {
    const csvContent = [
      ['Course Code', 'Course Name', 'Instructor', 'Time', 'Days', 'Building', 'Room', 'Students', 'Capacity', 'Credits', 'Section', 'Department'],
      ...filteredSchedules.map(schedule => [
        schedule.course_code,
        schedule.course_name,
        schedule.instructor,
        schedule.time,
        schedule.days.join(', '),
        schedule.building,
        schedule.room,
        schedule.enrolled.toString(),
        schedule.capacity.toString(),
        schedule.credits.toString(),
        schedule.section,
        schedule.department
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `class-schedule-${studentId}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchStudentById = async (id: string) => {
    if (!id) return null;
    try {
      const { data, error } = await supabaseClient
        .from('students')
        .select('id, student_number, name, email')
        .eq('student_number', id)
        .maybeSingle();
      if (error) {
        console.error('Supabase students fetch error:', error.message);
        return null;
      }
      return data;
    } catch (e) {
      console.error('Unexpected students fetch error:', e);
      return null;
    }
  };

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(e.target.value);
    resetVerificationState();
  };

  const resetVerificationState = () => {
    setIsEmailVerified(false);
    setShowStudentSchedule(false);
    setVerificationSent(false);
    setCodeInput('');
    setCodeError('');
    setFilteredSchedules([]);
    setShowSuccessModal(false);
    setStudentEmail("");
    setStudentName("");
  };

  const sendVerificationCode = async () => {
    try {
      setIsLoading(true);
      setCodeError('');
      // Lookup student in Supabase
      const student = await fetchStudentById(studentId);
      if (!student) throw new Error('Student not found. Please contact the registrar.');
      if (!student.email) throw new Error('Student email not found.');
      setStudentEmail(student.email);
      setStudentName(student.name || '');

      console.log('Sending verification code to:', student.email);
      console.log('Current state - showSuccessModal:', showSuccessModal);

      // For now, simulate the API call to test the modal
      console.log('Simulating API call...');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      
      console.log('API call completed, setting states...');
      
      setVerificationSent(true);
      setSuccessMessage('Verification code sent successfully! Check your email for the 6-digit code.');
      
      console.log('Setting showSuccessModal to true');
      setShowSuccessModal(true);
      
      console.log('State after setting - showSuccessModal:', showSuccessModal);
      console.log('State after setting - successMessage:', successMessage);
      
      // TODO: Replace with real API call when backend is working
      // const response = await fetch('/api/send-verification', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: student.email }),
      // });
      
    } catch (err) {
      console.error('Verification error:', err);
      setCodeError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async () => {
    try {
      setIsLoading(true);
      setCodeError('');
      console.log('Verifying code for:', studentEmail, 'Code:', codeInput);

      // For now, simulate the verification to test the flow
      console.log('Simulating code verification...');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      
      // Simulate successful verification
      const data = { studentId: studentId }; // Mock data
      
      console.log('Verification success data:', data);
      
      setIsEmailVerified(true);
      setShowStudentSchedule(true);
      setFilteredSchedules(classSchedules.filter(s => s.student_id === studentId));
      setSuccessMessage('Verification successful! Welcome to your class schedule.');
      setShowSuccessModal(true);
      
      // TODO: Replace with real API call when backend is working
      // const response = await fetch('/api/verify-code', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: studentEmail, code: codeInput }),
      // });
      
    } catch (err) {
      console.error('Code verification error:', err);
      setCodeError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 relative transition-colors duration-300">
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full relative shadow-2xl"
            >
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  console.log('Closing modal');
                  setShowSuccessModal(false);
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
              >
                <X size={20} />
              </motion.button>
              <div className="text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", damping: 15, stiffness: 300 }}
                  className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <motion.h3 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg font-medium text-gray-900 dark:text-white mb-2"
                >
                  {verificationSent && !isEmailVerified ? 'Code Sent!' : 'Success!'}
                </motion.h3>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 dark:text-gray-300"
                >
                  {successMessage}
                </motion.p>
                {verificationSent && !isEmailVerified && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                  >
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                       Check your email inbox (and spam folder) for the 6-digit verification code.
                    </p>
                  </motion.div>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    console.log('Continue button clicked');
                    setShowSuccessModal(false);
                  }}
                  className="mt-4 px-4 py-2 bg-maroon-600 text-white rounded-lg hover:bg-maroon-700 transition-colors"
                >
                  Continue
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mb-12 rounded-xl overflow-hidden shadow-lg"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-maroon-800 via-maroon-700 to-maroon-600 dark:from-maroon-900 dark:via-maroon-800 dark:to-maroon-700 opacity-90"></div>
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative flex flex-col items-center justify-center text-center px-4 py-16"
          >
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Class Schedules
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto"
            >
              View your personalized class schedule for the semester
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Verification Flow */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="mb-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              🔐 Student Verification Required
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your Student ID to receive a verification code via email
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={handleStudentIdChange}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-white focus:border-transparent flex-grow transition-colors"
              disabled={isLoading}
            />

            {studentId && !verificationSent && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendVerificationCode}
                disabled={isLoading}
                className="px-4 py-2 bg-maroon-600 text-white rounded-lg hover:bg-maroon-700 transition-colors whitespace-nowrap disabled:opacity-50 shadow-md flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                     Send verification Code
                  </>
                )}
              </motion.button>
            )}
          </div>

          {verificationSent && !isEmailVerified && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <div className="flex flex-col md:flex-row items-center gap-4">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  placeholder="Enter 6-digit verification code"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  maxLength={6}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-colors text-center text-lg tracking-widest"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={verifyCode}
                  disabled={!codeInput || isLoading || codeInput.length !== 6}
                  className="px-4 py-2 bg-maroon-500 text-white rounded-lg hover:bg-maroon-700 transition-colors disabled:opacity-50 whitespace-nowrap shadow-md flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                       Verify Code
                    </>
                  )}
                </motion.button>
              </div>
              {codeError && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 dark:text-red-400 text-sm mt-2 flex items-center gap-2"
                >
                  ❌ {codeError}
                </motion.p>
              )}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
              >
                <p className="text-sm text-blue-700 dark:text-blue-300">
                   Check your email inbox (and spam folder) for the 6-digit verification code.
                </p>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Class Schedule Display */}
        {showStudentSchedule && isEmailVerified && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              Your Class Schedule
            </motion.h2>

            {/* Export Options */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 justify-center mb-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={printSchedule}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                <Printer className="h-4 w-4" />
                Print Schedule
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportScheduleAsPDF}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Exporting...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4" />
                    Export PDF
                  </>
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportScheduleAsCSV}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </motion.button>
            </motion.div>

            {filteredSchedules.length > 0 ? (
              <div id="schedule-content" className="grid lg:grid-cols-2 gap-6">
                {filteredSchedules.map((schedule, index) => (
                  <motion.div 
                    key={schedule.id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: 0.1 * index, 
                      duration: 0.5,
                      ease: "backOut"
                    }}
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/50 p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{schedule.course_code} - {schedule.course_name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{schedule.instructor}</p>
                      </div>
                      <span className="bg-maroon-600 text-white text-xs px-2 py-1 rounded">
                        {schedule.section}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <motion.div 
                        whileHover={{ x: 3 }}
                        className="flex items-center text-gray-600 dark:text-gray-300"
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        <span>{schedule.time}</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ x: 3 }}
                        className="flex items-center text-gray-600 dark:text-gray-300"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{schedule.days.join(', ')}</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ x: 3 }}
                        className="flex items-center text-gray-600 dark:text-gray-300"
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{schedule.building} - Room {schedule.room}</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ x: 3 }}
                        className="flex items-center text-gray-600 dark:text-gray-300"
                      >
                        <Users className="mr-2 h-4 w-4" />
                        <span>{schedule.enrolled}/{schedule.capacity} students</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ x: 3 }}
                        className="flex items-center text-gray-600 dark:text-gray-300"
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        <span>{schedule.credits} credits</span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <p className="text-gray-500 dark:text-gray-400">No classes found for your batch.</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}