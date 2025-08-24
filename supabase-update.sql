-- Update the existing class_schedules table to include student_id
ALTER TABLE class_schedules 
ADD COLUMN IF NOT EXISTS student_id text;

-- Make student_id required after adding it
ALTER TABLE class_schedules 
ALTER COLUMN student_id SET NOT NULL;

-- Create index for faster queries on student_id
CREATE INDEX IF NOT EXISTS idx_class_schedules_student_id ON class_schedules(student_id);

-- Insert sample data for testing with your student IDs
INSERT INTO class_schedules (
  student_id, course_code, course_name, instructor, time, days, room, building, 
  capacity, enrolled, credits, section, semester, level, department, year_level, batch
) VALUES 
(
  '1220295', 'CS 101', 'Introduction to Programming', 'Prof. David Kim',
  '9:00 AM - 10:30 AM', ARRAY['Monday', 'Wednesday', 'Friday'], '101', 'Tech Building',
  40, 1, 3, '01', 'Spring 2025', 'Undergraduate', 'Computer Science', '1st Year BSIT', 'Batch 1'
),
(
  '1220295', 'CS 201', 'Data Structures and Algorithms', 'Dr. Sarah Chen',
  '11:00 AM - 12:30 PM', ARRAY['Tuesday', 'Thursday'], '205', 'Tech Building',
  35, 1, 4, '01', 'Spring 2025', 'Undergraduate', 'Computer Science', '1st Year BSIT', 'Batch 1'
),
(
  '1220899', 'IS 301', 'Database Management Systems', 'Prof. Michael Rodriguez',
  '2:00 PM - 3:30 PM', ARRAY['Monday', 'Wednesday', 'Friday'], '150', 'Information Center',
  30, 1, 3, '01', 'Spring 2025', 'Undergraduate', 'Information Systems', '3rd Year BSIT', 'Batch 2'
)
ON CONFLICT (id) DO NOTHING;
