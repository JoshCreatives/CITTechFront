# 🚀 Supabase Connection Setup Guide

## 📋 Prerequisites

1. **Supabase Project**: You have a Supabase project set up
2. **Environment Variables**: Your `.env` file contains the necessary credentials
3. **Table Created**: The `class_schedules` table exists in your database

## 🔧 Step 1: Update Your Table Structure

Your current table is missing the `student_id` field. Run this SQL in your Supabase SQL editor:

```sql
-- Add the missing student_id field
ALTER TABLE class_schedules 
ADD COLUMN IF NOT EXISTS student_id text;

-- Make it required
ALTER TABLE class_schedules 
ALTER COLUMN student_id SET NOT NULL;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_class_schedules_student_id ON class_schedules(student_id);
```

## 📊 Step 2: Insert Sample Data

Run this SQL to add test data for your student IDs:

```sql
-- Insert sample schedules for testing
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
```

## 🔐 Step 3: Verify Environment Variables

Ensure your `.env` file contains:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
```

## 🧪 Step 4: Test Connection

Run the test script to verify everything is working:

```bash
cd project
node test-supabase-connection.js
```

Expected output:
```
🔍 Testing Supabase connection...

1️⃣ Testing basic connection...
✅ Connection successful!

2️⃣ Checking table structure...
✅ Table accessible!
📋 Available fields: [id, student_id, course_code, course_name, ...]

3️⃣ Checking for student_id field...
✅ student_id field exists

4️⃣ Counting total records...
✅ Total records: 3
```

## 🎯 Step 5: Test the Application

### Test Student View:
1. Go to `/sched/classsched`
2. Enter Student ID: `1220295`
3. Click "Send verification Code"
4. Enter any 6-digit code (simulated for now)
5. View the schedule

### Test Admin Panel:
1. Go to `/admin`
2. Login with your admin credentials
3. Click "Class Schedules" in the sidebar
4. Try adding a new schedule for a student

## 🚨 Troubleshooting

### Issue: "Table doesn't exist"
- Run the table creation SQL in Supabase
- Check if you're in the correct database

### Issue: "student_id field missing"
- Run the ALTER TABLE commands from Step 1
- Verify the field was added

### Issue: "Connection failed"
- Check your environment variables
- Verify Supabase URL and key are correct
- Ensure your IP is allowed in Supabase

### Issue: "Permission denied"
- Check Row Level Security (RLS) policies
- Verify your service key has the right permissions

## 📱 Features Available

✅ **Student Features:**
- View personalized class schedule
- Export as PDF, CSV, or print
- Email verification (simulated)

✅ **Admin Features:**
- Add new class schedules
- Manage existing schedules
- Delete schedules
- Student selection dropdown

## 🔄 Next Steps

1. **Real Email Integration**: Uncomment the API calls in `ClassSchedules.tsx`
2. **Student Management**: Create a separate students table
3. **Authentication**: Implement proper user authentication
4. **Notifications**: Add email notifications for schedule changes

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Run the test script to verify connection
3. Check Supabase logs for database errors
4. Verify all environment variables are set correctly
