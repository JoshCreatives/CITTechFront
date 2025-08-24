// filepath: c:\Users\joshu\OneDrive\Desktop\SIIT WEBPAGE CAPSTONE\project\src\components\AdminDashboard.tsx
import { useEffect, useState } from "react";
import supabaseClient from "../../src/services/supabaseClient";

// Simple hash function for demo only (do NOT use in production)
function hashPassword(password: string) {
  // In production, use bcrypt or argon2 on the server!
  return btoa(password); // base64 encode as a placeholder
}

export default function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerMode, setRegisterMode] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<string | null>(null);

  // Registration state
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regPass2, setRegPass2] = useState("");
  const [regError, setRegError] = useState("");

  // Panel state
  const [panel, setPanel] = useState<"blog" | "citlounge" | "citlife" | "alumni" | "schedules">("blog");
  const [citLounge, setCitLounge] = useState<any[]>([]);
  const [citLife, setCitLife] = useState<any[]>([]);
  const [alumniStories, setAlumniStories] = useState<any[]>([]);
  const [editLoungeId, setEditLoungeId] = useState<string | null>(null);
  const [editLoungeTitle, setEditLoungeTitle] = useState("");
  const [editLoungeContent, setEditLoungeContent] = useState("");
  const [editLifeId, setEditLifeId] = useState<string | null>(null);
  const [editLifeTitle, setEditLifeTitle] = useState("");
  const [editLifeContent, setEditLifeContent] = useState("");
  const [editAlumniId, setEditAlumniId] = useState<string | null>(null);
  const [editAlumniTitle, setEditAlumniTitle] = useState("");
  const [editAlumniContent, setEditAlumniContent] = useState("");

  // Class Schedules state
  const [classSchedules, setClassSchedules] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({ studentNumber: "", name: "", email: "" });
  const [newSchedule, setNewSchedule] = useState({
    studentId: "",
    courseCode: "",
    courseName: "",
    instructor: "",
    time: "",
    days: [] as string[],
    room: "",
    building: "",
    capacity: 40,
    enrolled: 1,
    credits: 3,
    section: "01",
    semester: "Spring 2025",
    level: "Undergraduate",
    department: "Computer Science",
    yearLevel: "1st Year BSIT",
    batch: "Batch 1"
  });

  // Logout confirmation state
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Check if any admin exists in Supabase
  useEffect(() => {
    async function checkAdmin() {
      const { data } = await supabaseClient
        .from("admins")
        .select("username")
        .limit(1);
      if (data && data.length > 0) {
        setRegisteredUser(data[0].username);
      }
    }
    checkAdmin();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      fetchBlogs();
      fetchCitLounge();
      fetchCitLife();
      fetchAlumniStories();
      fetchClassSchedules();
      fetchStudents();
    }
  }, [loggedIn]);

  async function fetchBlogs() {
    const res = await supabaseClient.from("blogs").select();
    setBlogs(res.data || []);
  }
  async function fetchCitLounge() {
    const res = await supabaseClient.from("cit_lounge").select();
    setCitLounge(res.data || []);
  }
  async function fetchCitLife() {
    const res = await supabaseClient.from("cit_life").select();
    setCitLife(res.data || []);
  }
  async function fetchAlumniStories() {
    const res = await supabaseClient.from("alumni_stories").select();
    setAlumniStories(res.data || []);
  }

  async function fetchClassSchedules() {
    const res = await supabaseClient.from("class_schedules").select();
    setClassSchedules(res.data || []);
  }

  async function fetchStudents() {
    const { data, error } = await supabaseClient
      .from("students")
      .select("id, student_number, name, email")
      .order("student_number", { ascending: true });
    if (error) {
      console.error("Failed to fetch students:", error.message);
      setStudents([]);
      return;
    }
    setStudents(data || []);
  }

  async function addStudent() {
    const missing: string[] = [];
    if (!newStudent.studentNumber) missing.push("Student ID");
    if (!newStudent.name) missing.push("Name");
    if (!newStudent.email) missing.push("Gmail");
    const emailOk = /.+@.+\..+/.test(newStudent.email);
    if (newStudent.email && !emailOk) missing.push("Valid Email");

    if (missing.length > 0) {
      alert(`Please fill in: \n- ${missing.join("\n- ")}`);
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
      console.error("Failed to add student:", e?.message || e);
      alert(`Failed to add student${e?.message ? ": " + e.message : ""}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!regUser || !regPass) {
      setRegError("Username and password required.");
      return;
    }
    if (regPass !== regPass2) {
      setRegError("Passwords do not match.");
      return;
    }
    // Check if username already exists (case-insensitive)
    const { data: exists, error: existsError } = await supabaseClient
      .from("admins")
      .select("id")
      .ilike("username", regUser)
      .maybeSingle();
    if (existsError) {
      setRegError("Error checking username.");
      return;
    }
    if (exists) {
      setRegError("Username already exists.");
      return;
    }
    // Insert new admin with hashed password
    const { error } = await supabaseClient
      .from("admins")
      .insert([{ username: regUser, password_hash: hashPassword(regPass) }]);
    if (error) {
      setRegError("Registration failed.");
      return;
    }
    setRegisteredUser(regUser);
    setRegisterMode(false);
    setRegUser("");
    setRegPass("");
    setRegPass2("");
    setRegError("");
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // Check credentials in Supabase (case-insensitive username)
    const { data, error } = await supabaseClient
      .from("admins")
      .select("*")
      .ilike("username", loginUser)
      .maybeSingle();
    if (data && !error && data.password_hash === hashPassword(loginPass)) {
      setLoggedIn(true);
      setRegisteredUser(data.username);
      return;
    }
    alert("Invalid admin credentials.");
  }

  // Blog edit handlers
  function startEdit(post: any) {
    setEditId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content || post.excerpt || "");
  }
  async function saveEdit() {
    setLoading(true);
    await supabaseClient
      .from("blogs")
      .update({ title: editTitle, content: editContent })
      .eq("id", editId);
    setEditId(null);
    setEditTitle("");
    setEditContent("");
    setLoading(false);
    fetchBlogs();
  }

  // CIT Lounge edit handlers
  function startEditLounge(item: any) {
    setEditLoungeId(item.id);
    setEditLoungeTitle(item.title);
    setEditLoungeContent(item.content || "");
  }
  async function saveEditLounge() {
    setLoading(true);
    await supabaseClient
      .from("cit_lounge")
      .update({ title: editLoungeTitle, content: editLoungeContent })
      .eq("id", editLoungeId);
    setEditLoungeId(null);
    setEditLoungeTitle("");
    setEditLoungeContent("");
    setLoading(false);
    fetchCitLounge();
  }

  // CIT Life edit handlers
  function startEditLife(item: any) {
    setEditLifeId(item.id);
    setEditLifeTitle(item.title);
    setEditLifeContent(item.content || "");
  }
  async function saveEditLife() {
    setLoading(true);
    await supabaseClient
      .from("cit_life")
      .update({ title: editLifeTitle, content: editLifeContent })
      .eq("id", editLifeId);
    setEditLifeId(null);
    setEditLifeTitle("");
    setEditLifeContent("");
    setLoading(false);
    fetchCitLife();
  }

  // Alumni Stories edit handlers
  function startEditAlumni(item: any) {
    setEditAlumniId(item.id);
    setEditAlumniTitle(item.title);
    setEditAlumniContent(item.content || "");
  }
  async function saveEditAlumni() {
    setLoading(true);
    await supabaseClient
      .from("alumni_stories")
      .update({ title: editAlumniTitle, content: editAlumniContent })
      .eq("id", editAlumniId);
    setEditAlumniId(null);
    setEditAlumniTitle("");
    setEditAlumniContent("");
    setLoading(false);
    fetchAlumniStories();
  }

  // Class Schedules handlers
  function handleDayToggle(day: string) {
    setNewSchedule(prev => ({
      ...prev,
      days: prev.days.includes(day) 
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  }

  async function addClassSchedule() {
    const missing: string[] = [];
    if (!newSchedule.studentId) missing.push("Student");
    if (!newSchedule.courseCode) missing.push("Course Code");
    if (!newSchedule.courseName) missing.push("Course Name");
    if (!newSchedule.instructor) missing.push("Instructor");
    if (!newSchedule.time) missing.push("Time");
    if (!newSchedule.days || newSchedule.days.length === 0) missing.push("Days");
    if (!newSchedule.room) missing.push("Room");
    if (!newSchedule.building) missing.push("Building");
    if (!newSchedule.section) missing.push("Section");
    if (!newSchedule.semester) missing.push("Semester");
    if (!newSchedule.level) missing.push("Level");
    if (!newSchedule.department) missing.push("Department");
    if (!newSchedule.yearLevel) missing.push("Year Level");
    if (!newSchedule.batch) missing.push("Batch");
    if (!newSchedule.credits || newSchedule.credits <= 0) missing.push("Credits");
    if (!newSchedule.capacity || newSchedule.capacity <= 0) missing.push("Capacity");

    if (missing.length > 0) {
      alert(`Please fill in the following required fields: \n- ${missing.join("\n- ")}`);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabaseClient
        .from("class_schedules")
        .insert([{
          student_id: newSchedule.studentId,
          course_code: newSchedule.courseCode,
          course_name: newSchedule.courseName,
          instructor: newSchedule.instructor,
          time: newSchedule.time,
          days: newSchedule.days,
          room: newSchedule.room,
          building: newSchedule.building,
          capacity: newSchedule.capacity,
          enrolled: newSchedule.enrolled,
          credits: newSchedule.credits,
          section: newSchedule.section,
          semester: newSchedule.semester,
          level: newSchedule.level,
          department: newSchedule.department,
          year_level: newSchedule.yearLevel,
          batch: newSchedule.batch
        }]);

      if (error) throw error;

      setNewSchedule({
        studentId: "",
        courseCode: "",
        courseName: "",
        instructor: "",
        time: "",
        days: [],
        room: "",
        building: "",
        capacity: 40,
        enrolled: 1,
        credits: 3,
        section: "01",
        semester: "Spring 2025",
        level: "Undergraduate",
        department: "Computer Science",
        yearLevel: "1st Year BSIT",
        batch: "Batch 1"
      });
      setShowAddSchedule(false);
      fetchClassSchedules();
    } catch (error: any) {
      console.error("Error adding schedule:", error);
      alert("Failed to add class schedule" + (error?.message ? `: ${error.message}` : ""));
    } finally {
      setLoading(false);
    }
  }

  async function deleteClassSchedule(scheduleId: string) {
    if (!confirm("Are you sure you want to delete this class schedule?")) return;
    
    setLoading(true);
    try {
      const { error } = await supabaseClient
        .from("class_schedules")
        .delete()
        .eq("id", scheduleId);

      if (error) throw error;
      fetchClassSchedules();
    } catch (error) {
      console.error("Error deleting schedule:", error);
      alert("Failed to delete class schedule");
    } finally {
      setLoading(false);
    }
  }

  // Persist login state in localStorage
  useEffect(() => {
    // On mount, check localStorage for login
    const storedLogin = localStorage.getItem("admin_logged_in");
    const storedUser = localStorage.getItem("admin_username");
    if (storedLogin === "true" && storedUser) {
      setLoggedIn(true);
      setRegisteredUser(storedUser);
    }
  }, []);

  useEffect(() => {
    // Store login state on change
    if (loggedIn && registeredUser) {
      localStorage.setItem("admin_logged_in", "true");
      localStorage.setItem("admin_username", registeredUser);
    } else {
      localStorage.removeItem("admin_logged_in");
      localStorage.removeItem("admin_username");
    }
  }, [loggedIn, registeredUser]);

  if (!loggedIn) {
    if (registerMode) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
          <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-white mb-2">Admin Registration</h1>
                <p className="text-gray-400">Create your admin account</p>
              </div>
              
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                  <input
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                    placeholder="Username"
                    value={regUser}
                    onChange={e => setRegUser(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                  <input
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                    placeholder="Password"
                    type="password"
                    value={regPass}
                    onChange={e => setRegPass(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                  <input
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                    placeholder="Confirm Password"
                    type="password"
                    value={regPass2}
                    onChange={e => setRegPass2(e.target.value)}
                  />
                </div>
                
                {regError && (
                  <div className="text-red-400 text-sm p-2 bg-red-900/30 rounded">
                    {regError}
                  </div>
                )}
                
                <button
                  className="w-full py-3 px-4 bg-red-700 hover:bg-red-600 text-white font-medium rounded-lg transition"
                  type="submit"
                >
                  Register
                </button>
                
                <div className="text-center pt-2">
                  <button
                    type="button"
                    className="text-red-400 hover:text-red-300 text-sm"
                    onClick={() => setRegisterMode(false)}
                  >
                    Back to login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
        <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
              <p className="text-gray-400">Enter your credentials to continue</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-maroon-600 focus:ring-1 focus:ring-maroon-600 outline-none transition"
                  placeholder="Username"
                  value={loginUser}
                  onChange={e => setLoginUser(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                  placeholder="Password"
                  type="password"
                  value={loginPass}
                  onChange={e => setLoginPass(e.target.value)}
                />
              </div>
              <button
                className="w-full py-3 px-4 bg-red-700 hover:bg-maroon-600 text-white font-medium rounded-lg transition"
                type="submit"
              >
                Login
              </button>
            </form>
            {/* Show register button only if no admin is registered */}
            {!registeredUser && (
              <div className="text-center pt-4">
                <button
                  type="button"
                  className="text-red-400 hover:text-red-300 text-sm underline"
                  onClick={() => setRegisterMode(true)}
                >
                  Register as new admin
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      {/* Header with Logout */}
      <header className="bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="flex items-center px-4 py-2 rounded-lg bg-red-700 hover:bg-red-600 text-white transition"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold text-white mb-4">Are you sure you want to log out?</h2>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded-lg bg-red-700 hover:bg-red-600 text-white font-medium transition"
                onClick={() => {
                  setLoggedIn(false);
                  setShowLogoutConfirm(false);
                }}
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="bg-gray-800 w-64 flex-shrink-0 border-r border-gray-700">
          <div className="p-4">
            <p className="text-sm text-gray-400 mb-6">Welcome, {registeredUser}</p>
            
            <nav className="space-y-1">
              <button
                onClick={() => setPanel("blog")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${panel === "blog" ? "bg-red-900 text-white" : "text-gray-300 hover:bg-gray-700"}`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Blog Posts
              </button>
              
              <button
                onClick={() => setPanel("citlounge")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${panel === "citlounge" ? "bg-red-900 text-white" : "text-gray-300 hover:bg-gray-700"}`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                CIT Lounge
              </button>
              
              <button
                onClick={() => setPanel("citlife")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${panel === "citlife" ? "bg-red-900 text-white" : "text-gray-300 hover:bg-gray-700"}`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                CIT Life
              </button>
              
              <button
                onClick={() => setPanel("alumni")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${panel === "alumni" ? "bg-red-900 text-white" : "text-gray-300 hover:bg-gray-700"}`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Alumni Stories
              </button>

              <button
                onClick={() => setPanel("schedules")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${panel === "schedules" ? "bg-red-900 text-white" : "text-gray-300 hover:bg-gray-700"}`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Class Schedules
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-auto">
          <div className="max-w-full pl-4">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white capitalize">
                {panel === "blog" && "Blog Posts"}
                {panel === "citlounge" && "CIT Lounge"}
                {panel === "citlife" && "CIT Life"}
                {panel === "alumni" && "Alumni Stories"}
                {panel === "schedules" && "Class Schedules"}
              </h2>
              <p className="text-gray-400 text-sm">
                Manage and edit content for this section
              </p>
            </div>

            {/* Blog Panel */}
            {panel === "blog" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogs.map(post =>
                  editId === post.id ? (
                    <div key={post.id} className="bg-gray-800 rounded-lg p-4 h-auto relative">
                      {/* Cancel button top right */}
                      <button
                        onClick={() => setEditId(null)}
                        className="absolute top-2 right-2 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white transition text-sm"
                      >
                        Cancel
                      </button>
                      {/* ...existing edit form code... */}
                      <input
                        className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition text-sm"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        placeholder="Post title"
                      />
                      <textarea
                        className="w-full min-h-[200px] mb-3 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition text-sm"
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        placeholder="Post content"
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={saveEdit}
                          disabled={loading}
                          className="px-3 py-1 rounded bg-red-700 hover:bg-red-600 text-white transition text-sm"
                        >
                          {loading ? "Saving..." : "Save"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div key={post.id} className="bg-gray-800 rounded-lg p-4 h-48 overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between relative">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-semibold text-white line-clamp-2">{post.title}</h3>
                        <button
                          onClick={() => startEdit(post)}
                          className="px-3 py-1 rounded bg-maroon-700 hover:bg-maroon-800 text-white font-semibold transition text-sm border border-maroon-900 z-10"
                          style={{ visibility: "visible" }}
                        >
                          Edit
                        </button>
                      </div>
                      <div className="h-24 overflow-y-auto">
                        <p className="text-gray-300 text-sm whitespace-pre-line">
                          {post.content || post.excerpt}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {/* CIT Lounge Panel */}
            {panel === "citlounge" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {citLounge.map(item =>
                  editLoungeId === item.id ? (
                    <div key={item.id} className="bg-gray-800 rounded-lg p-4 aspect-[4/3] flex flex-col relative">
                      {/* Cancel button top right */}
                      <button
                        onClick={() => setEditLoungeId(null)}
                        className="absolute top-2 right-2 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white transition text-sm"
                      >
                        Cancel
                      </button>
                      {/* ...existing edit form code... */}
                      <input
                        className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition text-sm"
                        value={editLoungeTitle}
                        onChange={e => setEditLoungeTitle(e.target.value)}
                        placeholder="Title"
                      />
                      <textarea
                        className="w-full flex-1 mb-3 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition text-sm"
                        value={editLoungeContent}
                        onChange={e => setEditLoungeContent(e.target.value)}
                        placeholder="Content"
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={saveEditLounge}
                          disabled={loading}
                          className="px-3 py-1 rounded bg-red-700 hover:bg-red-600 text-white transition text-sm"
                        >
                          {loading ? "Saving..." : "Save"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div key={item.id} className="bg-gray-800 rounded-lg p-4 aspect-[4/3] flex flex-col justify-between relative">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-semibold text-white line-clamp-2">{item.title}</h3>
                        <button
                          onClick={() => startEditLounge(item)}
                          className="px-3 py-1 rounded bg-maroon-700 hover:bg-maroon-800 text-white font-semibold transition text-sm border border-maroon-900 z-10"
                          style={{ visibility: "visible" }}
                        >
                          Edit
                        </button>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-gray-300 text-sm line-clamp-4 whitespace-pre-line">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {/* CIT Life Panel */}
            {panel === "citlife" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {citLife.map(item =>
                  editLifeId === item.id ? (
                    <div key={item.id} className="bg-gray-800 rounded-lg p-4 aspect-[4/3] flex flex-col">
                      <input
                        className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition text-sm"
                        value={editLifeTitle}
                        onChange={e => setEditLifeTitle(e.target.value)}
                        placeholder="Title"
                      />
                      <textarea
                        className="w-full flex-1 mb-3 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition text-sm"
                        value={editLifeContent}
                        onChange={e => setEditLifeContent(e.target.value)}
                        placeholder="Content"
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setEditLifeId(null)}
                          className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white transition text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={saveEditLife}
                          disabled={loading}
                          className="px-3 py-1 rounded bg-red-700 hover:bg-red-600 text-white transition text-sm"
                        >
                          {loading ? "Saving..." : "Save"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div key={item.id} className="bg-gray-800 rounded-lg p-4 aspect-[4/3] flex flex-col justify-between">
                      <div className="flex-1 overflow-hidden">
                        <h3 className="text-base font-semibold text-white mb-2 line-clamp-2">{item.title}</h3>
                        <p className="text-gray-300 text-sm line-clamp-4 whitespace-pre-line">
                          {item.content}
                        </p>
                      </div>
                      <button
                        onClick={() => startEditLife(item)}
                        className="mt-2 px-3 py-1 rounded bg-maroon-700 hover:bg-maroon-800 text-white font-semibold transition self-end text-sm border border-maroon-900"
                        style={{ visibility: "visible" }}
                      >
                        Edit
                      </button>
                    </div>
                  )
                )}
              </div>
            )}

            {/* Alumni Stories Panel */}
            {panel === "alumni" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {alumniStories.map(item =>
                  editAlumniId === item.id ? (
                    <div key={item.id} className="bg-gray-800 rounded-lg p-4 aspect-[4/3] flex flex-col">
                      <input
                        className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition text-sm"
                        value={editAlumniTitle}
                        onChange={e => setEditAlumniTitle(e.target.value)}
                        placeholder="Title"
                      />
                      <textarea
                        className="w-full flex-1 mb-3 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition text-sm"
                        value={editAlumniContent}
                        onChange={e => setEditAlumniContent(e.target.value)}
                        placeholder="Content"
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setEditAlumniId(null)}
                          className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white transition text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={saveEditAlumni}
                          disabled={loading}
                          className="px-3 py-1 rounded bg-red-700 hover:bg-red-600 text-white transition text-sm"
                        >
                          {loading ? "Saving..." : "Save"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div key={item.id} className="bg-gray-800 rounded-lg p-4 aspect-[4/3] flex flex-col justify-between">
                      <div className="flex-1 overflow-hidden">
                        <h3 className="text-base font-semibold text-white mb-2 line-clamp-2">{item.title}</h3>
                        <p className="text-gray-300 text-sm line-clamp-4 whitespace-pre-line">
                          {item.content}
                        </p>
                      </div>
                      <button
                        onClick={() => startEditAlumni(item)}
                        className="mt-2 px-3 py-1 rounded bg-maroon-700 hover:bg-maroon-800 text-white font-semibold transition self-end text-sm border border-maroon-900"
                        style={{ visibility: "visible" }}
                      >
                        Edit
                      </button>
                    </div>
                  )
                )}
              </div>
            )}

            {/* Class Schedules Panel */}
            {panel === "schedules" && (
              <div className="space-y-6">
                {/* Add New Schedule Button */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">Student Class Schedules</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowAddStudent(true)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Add Student
                    </button>
                    <button
                      onClick={() => setShowAddSchedule(true)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add New Schedule
                    </button>
                  </div>
                </div>

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
                          onChange={(e) => setNewSchedule(prev => ({ ...prev, studentId: e.target.value }))}
                          className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                        >
                          <option value="">Select Student</option>
                          {students.map(student => (
                            <option key={student.id} value={student.id}>
                              {student.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Course Code */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Course Code</label>
                        <input
                          type="text"
                          value={newSchedule.courseCode}
                          onChange={(e) => setNewSchedule(prev => ({ ...prev, courseCode: e.target.value }))}
                          placeholder="e.g., CS 101"
                          className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                        />
                      </div>

                      {/* Course Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Course Name</label>
                        <input
                          type="text"
                          value={newSchedule.courseName}
                          onChange={(e) => setNewSchedule(prev => ({ ...prev, courseName: e.target.value }))}
                          placeholder="e.g., Introduction to Programming"
                          className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                        />
                      </div>

                      {/* Instructor */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Instructor</label>
                        <input
                          type="text"
                          value={newSchedule.instructor}
                          onChange={(e) => setNewSchedule(prev => ({ ...prev, instructor: e.target.value }))}
                          placeholder="e.g., Prof. David Kim"
                          className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                        />
                      </div>

                      {/* Time */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                        <input
                          type="text"
                          value={newSchedule.time}
                          onChange={(e) => setNewSchedule(prev => ({ ...prev, time: e.target.value }))}
                          placeholder="e.g., 9:00 AM - 10:30 AM"
                          className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                        />
                      </div>

                      {/* Days */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Days</label>
                        <div className="flex flex-wrap gap-2">
                          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day => (
                            <button
                              key={day}
                              type="button"
                              onClick={() => handleDayToggle(day)}
                              className={`px-3 py-1 rounded text-sm transition-colors ${
                                newSchedule.days.includes(day)
                                  ? "bg-red-600 text-white"
                                  : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                              }`}
                            >
                              {day.slice(0, 3)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Building */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Building</label>
                        <input
                          type="text"
                          value={newSchedule.building}
                          onChange={(e) => setNewSchedule(prev => ({ ...prev, building: e.target.value }))}
                          placeholder="e.g., Tech Building"
                          className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                        />
                      </div>

                      {/* Room */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Room</label>
                        <input
                          type="text"
                          value={newSchedule.room}
                          onChange={(e) => setNewSchedule(prev => ({ ...prev, room: e.target.value }))}
                          placeholder="e.g., 101"
                          className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                        />
                      </div>

                      {/* Credits */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Credits</label>
                        <input
                          type="number"
                          value={newSchedule.credits}
                          onChange={(e) => setNewSchedule(prev => ({ ...prev, credits: parseInt(e.target.value) || 0 }))}
                          min="1"
                          max="6"
                          className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                        />
                      </div>

                      {/* Section */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Section</label>
                        <input
                          type="text"
                          value={newSchedule.section}
                          onChange={(e) => setNewSchedule(prev => ({ ...prev, section: e.target.value }))}
                          placeholder="e.g., 01"
                          className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                        />
                      </div>

                      {/* Year Level */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Year Level</label>
                        <select
                          value={newSchedule.yearLevel}
                          onChange={(e) => setNewSchedule(prev => ({ ...prev, yearLevel: e.target.value }))}
                          className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                        >
                          <option value="1st Year BSIT">1st Year BSIT</option>
                          <option value="2nd Year BSIT">2nd Year BSIT</option>
                          <option value="3rd Year BSIT">3rd Year BSIT</option>
                          <option value="4th Year BSIT">4th Year BSIT</option>
                        </select>
                      </div>

                      {/* Batch */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Batch</label>
                        <select
                          value={newSchedule.batch}
                          onChange={(e) => setNewSchedule(prev => ({ ...prev, batch: e.target.value }))}
                          className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                        >
                          <option value="Batch 1">Batch 1</option>
                          <option value="Batch 2">Batch 2</option>
                        </select>
                      </div>
                    </div>

                    {/* Form Actions */}
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
                          onChange={(e) => setNewStudent(prev => ({ ...prev, studentNumber: e.target.value }))}
                          placeholder="e.g., 1220295"
                          className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                        <input
                          value={newStudent.name}
                          onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Full name"
                          className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Gmail</label>
                        <input
                          type="email"
                          value={newStudent.email}
                          onChange={(e) => setNewStudent(prev => ({ ...prev, email: e.target.value }))}
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

                {/* Existing Schedules */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {classSchedules.map((schedule) => (
                    <div key={schedule.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {schedule.course_code} - {schedule.course_name}
                          </h3>
                          {/* Student ID hidden as requested */}
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

                      <div className="flex justify-end">
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
            )}
          </div>
        </main>
      </div>
    </div>
  );
}