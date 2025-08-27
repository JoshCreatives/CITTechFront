import React, { useEffect, useState } from "react";

export default function ClassSchedulesPanel({
  supabaseClient,
  loading,
  setLoading
}: any) {
  const [classSchedules, setClassSchedules] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddStudentToSchedule, setShowAddStudentToSchedule] = useState(false);
  const [newStudent, setNewStudent] = useState({ studentNumber: "", name: "", email: "" });
  const [newSchedule, setNewSchedule] = useState({
    studentId: "",
    courseCode: "",
    courseName: "",
    instructor: "",
    section: "",
    time: "",
    days: [] as string[],
    building: "",
    room: "",
    credits: "",
    yearLevel: "",
    batch: ""
  });
  const [selectedScheduleId, setSelectedScheduleId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");

  useEffect(() => {
    fetchClassSchedules();
    fetchStudents();
    // eslint-disable-next-line
  }, []);

  async function fetchClassSchedules() {
    const { data, error } = await supabaseClient
      .from("class_schedules")
      .select("*");
    if (!error) setClassSchedules(data || []);
  }

  async function fetchStudents() {
    const { data, error } = await supabaseClient
      .from("students")
      .select("id, student_number, name, email")
      .order("student_number", { ascending: true });
    if (!error) setStudents(data || []);
  }

  // Add Student
  async function addStudent() {
    if (!newStudent.studentNumber || !newStudent.name || !newStudent.email) {
      alert("Please fill in all student fields.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabaseClient
        .from("students")
        .insert([{ student_number: newStudent.studentNumber, name: newStudent.name, email: newStudent.email }]);
      if (error) throw error;
      setNewStudent({ studentNumber: "", name: "", email: "" });
      setShowAddStudent(false);
      fetchStudents();
    } catch (e: any) {
      alert("Failed to add student: " + (e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  // Add Schedule
  async function addClassSchedule() {
    if (!newSchedule.studentId || !newSchedule.courseCode || !newSchedule.courseName) {
      alert("Please fill in all required schedule fields.");
      return;
    }
    setLoading(true);
    try {
      const student = students.find((s: any) => s.id === newSchedule.studentId);
      if (!student) throw new Error("Student not found");
      const { error } = await supabaseClient
        .from("class_schedules")
        .insert([{
          student_id: newSchedule.studentId,
          student_number: student.student_number,
          course_code: newSchedule.courseCode,
          course_name: newSchedule.courseName,
          instructor: newSchedule.instructor,
          section: newSchedule.section,
          time: newSchedule.time,
          days: newSchedule.days,
          building: newSchedule.building,
          room: newSchedule.room,
          credits: newSchedule.credits,
          year_level: newSchedule.yearLevel,
          batch: newSchedule.batch,
          enrolledStudents: [student.student_number]
        }]);
      if (error) throw error;
      setShowAddSchedule(false);
      setNewSchedule({
        studentId: "",
        courseCode: "",
        courseName: "",
        instructor: "",
        section: "",
        time: "",
        days: [],
        building: "",
        room: "",
        credits: "",
        yearLevel: "",
        batch: ""
      });
      fetchClassSchedules();
    } catch (e: any) {
      alert("Failed to add schedule: " + (e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  // Add Student to Schedule
  async function addStudentToSchedule(scheduleId: string, studentNumber: string) {
    setLoading(true);
    try {
      const { data: schedule, error: scheduleError } = await supabaseClient
        .from("class_schedules")
        .select("enrolledStudents")
        .eq("id", scheduleId)
        .single();
      if (scheduleError) throw scheduleError;
      const currentEnrolled = schedule.enrolledStudents || [];
      if (currentEnrolled.includes(studentNumber)) {
        alert("Student already enrolled in this schedule.");
        setLoading(false);
        return;
      }
      const updatedEnrolled = [...currentEnrolled, studentNumber];
      const { error } = await supabaseClient
        .from("class_schedules")
        .update({ enrolledStudents: updatedEnrolled })
        .eq("id", scheduleId);
      if (error) throw error;
      fetchClassSchedules();
    } catch (e: any) {
      alert("Failed to add student to schedule: " + (e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  // Remove Student from Schedule
  async function removeStudentFromSchedule(scheduleId: string, studentNumber: string) {
    setLoading(true);
    try {
      const { data: schedule, error: scheduleError } = await supabaseClient
        .from("class_schedules")
        .select("enrolledStudents")
        .eq("id", scheduleId)
        .single();
      if (scheduleError) throw scheduleError;
      const currentEnrolled = schedule.enrolledStudents || [];
      const updatedEnrolled = currentEnrolled.filter((id: string) => id !== studentNumber);
      const { error } = await supabaseClient
        .from("class_schedules")
        .update({ enrolledStudents: updatedEnrolled })
        .eq("id", scheduleId);
      if (error) throw error;
      fetchClassSchedules();
    } catch (e: any) {
      alert("Failed to remove student from schedule: " + (e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  // Delete Schedule
  async function deleteClassSchedule(scheduleId: string) {
    if (!window.confirm("Are you sure you want to delete this schedule?")) return;
    setLoading(true);
    try {
      const { error } = await supabaseClient
        .from("class_schedules")
        .delete()
        .eq("id", scheduleId);
      if (error) throw error;
      fetchClassSchedules();
    } catch (e: any) {
      alert("Failed to delete schedule: " + (e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  // Initialize newSchedule with all required fields
  const initializeNewSchedule = () => {
    setNewSchedule({
      studentId: "",
      courseCode: "",
      courseName: "",
      instructor: "",
      section: "",
      time: "",
      days: [],
      building: "",
      room: "",
      credits: "",
      yearLevel: "",
      batch: ""
    });
    setShowAddSchedule(true);
  };

  // Initialize newStudent with all required fields
  const initializeNewStudent = () => {
    setNewStudent({
      studentNumber: "",
      name: "",
      email: ""
    });
    setShowAddStudent(true);
  };

  // Handle day toggling for the schedule form
  const handleDayToggleLocal = (day: string) => {
    const updatedDays = newSchedule.days.includes(day)
      ? newSchedule.days.filter((d: string) => d !== day)
      : [...newSchedule.days, day];
    
    setNewSchedule({ ...newSchedule, days: updatedDays });
  };

  return (
    <div className="space-y-6">
      {/* Header with buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">Student Class Schedules</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={initializeNewStudent}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Add Student
          </button>
          <button
            onClick={initializeNewSchedule}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Schedule
          </button>
          <button
            onClick={() => setShowAddStudentToSchedule(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Add Student to Schedule
          </button>
        </div>
      </div>

      {/* Add Student to Schedule Form */}
      {showAddStudentToSchedule && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h4 className="text-lg font-semibold text-white mb-4">Add Student to Class Schedule</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Select Schedule</label>
              <select
                value={selectedScheduleId}
                onChange={e => setSelectedScheduleId(e.target.value)}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
              >
                <option value="">Select Schedule</option>
                {classSchedules.map((schedule: any) => (
                  <option key={schedule.id} value={schedule.id}>
                    {schedule.course_code} - {schedule.course_name} ({schedule.section})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Enter Student ID</label>
              <input
                type="text"
                value={selectedStudentId}
                onChange={e => setSelectedStudentId(e.target.value)}
                placeholder="e.g., 1220295"
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowAddStudentToSchedule(false);
                setSelectedScheduleId("");
                setSelectedStudentId("");
              }}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedScheduleId && selectedStudentId) {
                  addStudentToSchedule(selectedScheduleId, selectedStudentId);
                  setShowAddStudentToSchedule(false);
                  setSelectedScheduleId("");
                  setSelectedStudentId("");
                }
              }}
              disabled={loading || !selectedScheduleId || !selectedStudentId}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Student"}
            </button>
          </div>
        </div>
      )}

      {/* Add Schedule Form */}
      {showAddSchedule && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h4 className="text-lg font-semibold text-white mb-4">Add New Class Schedule</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Student Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Student</label>
              <select
                value={newSchedule.studentId}
                onChange={e => setNewSchedule({ ...newSchedule, studentId: e.target.value })}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
              >
                <option value="">Select Student</option>
                {students.map((student: any) => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.studentNumber})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Course Code</label>
              <input
                type="text"
                value={newSchedule.courseCode}
                onChange={e => setNewSchedule({ ...newSchedule, courseCode: e.target.value })}
                placeholder="e.g., CS 101"
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Course Name</label>
              <input
                type="text"
                value={newSchedule.courseName}
                onChange={e => setNewSchedule({ ...newSchedule, courseName: e.target.value })}
                placeholder="e.g., Introduction to Programming"
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Instructor</label>
              <input
                type="text"
                value={newSchedule.instructor}
                onChange={e => setNewSchedule({ ...newSchedule, instructor: e.target.value })}
                placeholder="Instructor name"
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Section</label>
              <input
                type="text"
                value={newSchedule.section}
                onChange={e => setNewSchedule({ ...newSchedule, section: e.target.value })}
                placeholder="e.g., A"
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
              <input
                type="text"
                value={newSchedule.time}
                onChange={e => setNewSchedule({ ...newSchedule, time: e.target.value })}
                placeholder="e.g., 9:00 AM - 10:30 AM"
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Days</label>
              <div className="flex flex-wrap gap-2">
                {['M', 'T', 'W', 'Th', 'F', 'S'].map(day => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDayToggleLocal(day)}
                    className={`px-3 py-1 rounded ${
                      newSchedule.days.includes(day)
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Building</label>
              <input
                type="text"
                value={newSchedule.building}
                onChange={e => setNewSchedule({ ...newSchedule, building: e.target.value })}
                placeholder="Building name"
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Room</label>
              <input
                type="text"
                value={newSchedule.room}
                onChange={e => setNewSchedule({ ...newSchedule, room: e.target.value })}
                placeholder="Room number"
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Credits</label>
              <input
                type="number"
                value={newSchedule.credits}
                onChange={e => setNewSchedule({ ...newSchedule, credits: e.target.value })}
                placeholder="e.g., 3"
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Year Level</label>
              <input
                type="text"
                value={newSchedule.yearLevel}
                onChange={e => setNewSchedule({ ...newSchedule, yearLevel: e.target.value })}
                placeholder="e.g., 1st Year"
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Batch</label>
              <input
                type="text"
                value={newSchedule.batch}
                onChange={e => setNewSchedule({ ...newSchedule, batch: e.target.value })}
                placeholder="e.g., 2023"
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowAddSchedule(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={addClassSchedule}
              disabled={loading}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Schedule"}
            </button>
          </div>
        </div>
      )}

      {/* Add Student Form */}
      {showAddStudent && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h4 className="text-lg font-semibold text-white mb-4">Add New Student</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Student ID</label>
              <input
                value={newStudent.studentNumber}
                onChange={e => setNewStudent({ ...newStudent, studentNumber: e.target.value })}
                placeholder="e.g., 1220295"
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                value={newStudent.name}
                onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
                placeholder="Full name"
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Gmail</label>
              <input
                type="email"
                value={newStudent.email}
                onChange={e => setNewStudent({ ...newStudent, email: e.target.value })}
                placeholder="example@gmail.com"
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setShowAddStudent(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={addStudent}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Student"}
            </button>
          </div>
        </div>
      )}

      {/* Existing Schedules with enrolled students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {classSchedules.map((schedule: any) => (
          <div key={schedule.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {schedule.course_code} - {schedule.course_name}
                </h3>
                <p className="text-gray-400 text-sm">{schedule.instructor}</p>
              </div>
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                {schedule.section}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-300 mb-4">
              <div>⏰ {schedule.time}</div>
              <div>📅 {schedule.days?.join(', ') || 'TBD'}</div>
              <div>📍 {schedule.building} - Room {schedule.room}</div>
              <div>📚 {schedule.credits} credits</div>
              <div>🏫 {schedule.year_level}</div>
              <div>👥 {schedule.batch}</div>
            </div>
            
            {/* Enrolled Students Section */}
            <div className="mb-4">
              <h4 className="text-md font-medium text-white mb-2">Enrolled Students:</h4>
              {schedule.enrolledStudents && schedule.enrolledStudents.length > 0 ? (
                <ul className="bg-gray-700 rounded p-2 max-h-32 overflow-y-auto">
                  {schedule.enrolledStudents.map((studentNumber: string) => {
                    const student = students.find((s: any) => s.student_number === studentNumber);
                    return student ? (
                      <li key={studentNumber} className="text-gray-300 text-sm py-1 px-2 flex justify-between items-center">
                        <span>{student.name} ({student.student_number})</span>
                        <button 
                          onClick={() => removeStudentFromSchedule(schedule.id, studentNumber)}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          Remove
                        </button>
                      </li>
                    ) : (
                      <li key={studentNumber} className="text-gray-300 text-sm py-1 px-2 flex justify-between items-center">
                        <span>Student ID: {studentNumber}</span>
                        <button 
                          onClick={() => removeStudentFromSchedule(schedule.id, studentNumber)}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          Remove
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No students enrolled yet.</p>
              )}
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedScheduleId(schedule.id);
                  setShowAddStudentToSchedule(true);
                }}
                className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white transition text-sm"
              >
                Add Student
              </button>
              <button
                onClick={() => deleteClassSchedule(schedule.id)}
                disabled={loading}
                className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white transition text-sm disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {classSchedules.length === 0 && (
        <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-gray-400">No class schedules found. Add one to get started!</p>
        </div>
      )}
    </div>
  );
}