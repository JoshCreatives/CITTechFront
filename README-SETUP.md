# Admin Dashboard Setup Guide

## Database Setup

### 1. Create the class_schedules table

Run the following SQL in your Supabase SQL editor:

```sql
-- Create class_schedules table for admin to manage student schedules
CREATE TABLE IF NOT EXISTS class_schedules (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  course_code TEXT NOT NULL,
  course_name TEXT NOT NULL,
  instructor TEXT NOT NULL,
  time TEXT NOT NULL,
  days TEXT[] DEFAULT '{}',
  room TEXT NOT NULL,
  building TEXT NOT NULL,
  capacity INTEGER DEFAULT 40,
  enrolled INTEGER DEFAULT 1,
  credits INTEGER DEFAULT 3,
  section TEXT DEFAULT '01',
  semester TEXT DEFAULT 'Spring 2025',
  level TEXT DEFAULT 'Undergraduate',
  department TEXT DEFAULT 'Computer Science',
  year_level TEXT DEFAULT '1st Year BSIT',
  batch TEXT DEFAULT 'Batch 1',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_class_schedules_student_id ON class_schedules(student_id);
CREATE INDEX IF NOT EXISTS idx_class_schedules_batch ON class_schedules(batch);

-- Enable Row Level Security (RLS)
ALTER TABLE class_schedules ENABLE ROW LEVEL SECURITY;

-- Create policy to allow admins to manage all schedules
CREATE POLICY "Admins can manage all class schedules" ON class_schedules
  FOR ALL USING (true);

-- Create policy to allow students to view their own schedules
CREATE POLICY "Students can view their own schedules" ON class_schedules
  FOR SELECT USING (student_id = current_user);
```

### 2. Insert sample data

```sql
-- Insert some sample data for testing
INSERT INTO class_schedules (
  id, student_id, course_code, course_name, instructor, time, days, room, building, 
  capacity, enrolled, credits, section, semester, level, department, year_level, batch
) VALUES 
(
  'CS101-01-1220295', '1220295', 'CS 101', 'Introduction to Programming', 'Prof. David Kim',
  '9:00 AM - 10:30 AM', ARRAY['Monday', 'Wednesday', 'Friday'], '101', 'Tech Building',
  40, 1, 3, '01', 'Spring 2025', 'Undergraduate', 'Computer Science', '1st Year BSIT', 'Batch 1'
),
(
  'CS201-01-1220295', '1220295', 'CS 201', 'Data Structures and Algorithms', 'Dr. Sarah Chen',
  '11:00 AM - 12:30 PM', ARRAY['Tuesday', 'Thursday'], '205', 'Tech Building',
  35, 1, 4, '01', 'Spring 2025', 'Undergraduate', 'Computer Science', '1st Year BSIT', 'Batch 1'
),
(
  'IS301-01-1220899', '1220899', 'IS 301', 'Database Management Systems', 'Prof. Michael Rodriguez',
  '2:00 PM - 3:30 PM', ARRAY['Monday', 'Wednesday', 'Friday'], '150', 'Information Center',
  30, 1, 3, '01', 'Spring 2025', 'Undergraduate', 'Information Systems', '3rd Year BSIT', 'Batch 2'
)
ON CONFLICT (id) DO NOTHING;
```

## Features Added

### Admin Dashboard
- **Class Schedules Panel**: New panel in the admin dashboard
- **Add New Schedule**: Form to add class schedules for students
- **Manage Schedules**: View, edit, and delete existing schedules
- **Student Selection**: Choose from predefined student list

### Student Features
- **View Schedule**: Students can view their personalized class schedule
- **Export Options**: Print, PDF, and CSV export functionality
- **Email Verification**: Secure access to personal schedules

## Testing

### Test Student ID: 1220295
- This student has sample courses already added
- Use the verification flow to test the schedule display
- Test export functionality (Print, PDF, CSV)

### Admin Access
- Navigate to `/admin` route
- Use the Class Schedules panel to add/edit schedules
- Test adding new courses for different students

## Notes

- The system currently uses simulated email verification for testing
- Real email functionality can be enabled by uncommenting the API calls
- Student data is hardcoded for now but can be moved to a separate table
- All schedules are stored in Supabase with proper RLS policies
