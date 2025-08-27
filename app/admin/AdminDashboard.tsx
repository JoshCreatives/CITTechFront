import { useEffect, useState } from "react";
import supabaseClient from "../../src/services/supabaseClient";
import BlogPanel from "./BlogPanel";
import CitLoungePanel from "./CitLoungePanel";
import CitLifePanel from "./CitLifePanel";
import AlumniStoriesPanel from "./AlumniStoriesPanel";
import ClassSchedulesPanel from "./ClassSchedulesPanel";

// Simple hash function for demo only (do NOT use in production)
function hashPassword(password: string) {
  // In production, use bcrypt or argon2 on the server!
  return btoa(password); // base64 encode as a placeholder
}

export default function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
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
      // fetchBlogs();
      // fetchCitLounge();
      // fetchCitLife();
      // fetchAlumniStories();
      // fetchClassSchedules();
      // fetchStudents();
    }
  }, [loggedIn]);

  async function fetchBlogs() {
    const res = await supabaseClient.from("blogs").select();
    // setBlogs(res.data || []);
  }
  
  async function fetchCitLounge() {
    const res = await supabaseClient.from("cit_lounge").select();
    // setCitLounge(res.data || []);
  }
  
  async function fetchCitLife() {
    const res = await supabaseClient.from("cit_life").select();
    // setCitLife(res.data || []);
  }
  
  async function fetchAlumniStories() {
    const res = await supabaseClient.from("alumni_stories").select();
    // setAlumniStories(res.data || []);
  }

  async function fetchClassSchedules() {
    const { data, error } = await supabaseClient
      .from("class_schedules")
      .select(`
        *,
        students (student_number, name, email)
      `);
    
    if (error) {
      console.error("Error fetching schedules:", error);
      // setClassSchedules([]);
      return;
    }
    
    // setClassSchedules(data || []);
  }

  async function fetchStudents() {
    const { data, error } = await supabaseClient
      .from("students")
      .select("id, student_number, name, email")
      .order("student_number", { ascending: true });
    if (error) {
      console.error("Failed to fetch students:", error.message);
      // setStudents([]);
      return;
    }
    // setStudents(data || []);
  }

  async function addStudent() {
    const missing: string[] = [];
    // if (!newStudent.studentNumber) missing.push("Student ID");
    // if (!newStudent.name) missing.push("Name");
    // if (!newStudent.email) missing.push("Gmail");
    const emailOk = /.+@.+\..+/.test("");
    // if (newStudent.email && !emailOk) missing.push("Valid Email");

    if (missing.length > 0) {
      alert(`Please fill in: \n- ${missing.join("\n- ")}`);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabaseClient
        .from("students")
        .insert([{ student_number: "", name: "", email: "" }]);
      if (error) throw error;
      // setNewStudent({ studentNumber: "", name: "", email: "" });
      // setShowAddStudent(false);
      fetchStudents();
    } catch (e: any) {
      console.error("Failed to add student:", e?.message || e);
      alert(`Failed to add student${e?.message ? ": " + e.message : ""}`);
    } finally {
      setLoading(false);
    }
  }

  // Add student to schedule function
  async function addStudentToSchedule(scheduleId: string, studentNumber: string) {
    setLoading(true);
    try {
      // First get the schedule
      const { data: schedule, error: scheduleError } = await supabaseClient
        .from("class_schedules")
        .select("enrolled_students")
        .eq("id", scheduleId)
        .single();
      
      if (scheduleError) throw scheduleError;
      
      // Update enrolled students array
      const currentEnrolled = schedule.enrolled_students || [];
      const updatedEnrolled = [...currentEnrolled, studentNumber];
      
      // Update the schedule
      const { error } = await supabaseClient
        .from("class_schedules")
        .update({ 
          enrolled_students: updatedEnrolled,
          enrolled: updatedEnrolled.length
        })
        .eq("id", scheduleId);
      
      if (error) throw error;
      
      fetchClassSchedules();
    } catch (error: any) {
      console.error("Error adding student to schedule:", error);
      alert("Failed to add student to schedule" + (error?.message ? `: ${error.message}` : ""));
    } finally {
      setLoading(false);
    }
  }

  // Remove student from schedule function
  async function removeStudentFromSchedule(scheduleId: string, studentNumber: string) {
    setLoading(true);
    try {
      // First get the schedule
      const { data: schedule, error: scheduleError } = await supabaseClient
        .from("class_schedules")
        .select("enrolled_students")
        .eq("id", scheduleId)
        .single();
      
      if (scheduleError) throw scheduleError;
      
      // Remove student from enrolled array
      const currentEnrolled = schedule.enrolled_students || [];
      const updatedEnrolled = currentEnrolled.filter((id: string) => id !== studentNumber);
      
      // Update the schedule
      const { error } = await supabaseClient
        .from("class_schedules")
        .update({ 
          enrolled_students: updatedEnrolled,
          enrolled: updatedEnrolled.length
        })
        .eq("id", scheduleId);
      
      if (error) throw error;
      
      fetchClassSchedules();
    } catch (error: any) {
      console.error("Error removing student from schedule:", error);
      alert("Failed to remove student from schedule" + (error?.message ? `: ${error.message}` : ""));
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

            {/* Panel Switch */}
            {panel === "blog" && (
              <BlogPanel
                supabaseClient={supabaseClient}
                loading={loading}
                setLoading={setLoading}
              />
            )}
            {panel === "citlounge" && (
              <CitLoungePanel
                supabaseClient={supabaseClient}
                loading={loading}
                setLoading={setLoading}
              />
            )}
            {panel === "citlife" && (
              <CitLifePanel
                supabaseClient={supabaseClient}
                loading={loading}
                setLoading={setLoading}
              />
            )}
            {panel === "alumni" && (
              <AlumniStoriesPanel
                supabaseClient={supabaseClient}
                loading={loading}
                setLoading={setLoading}
              />
            )}
            {panel === "schedules" && (
              <ClassSchedulesPanel
                supabaseClient={supabaseClient}
                loading={loading}
                setLoading={setLoading}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}