// Test script to verify Supabase connection
// Run this with: node test-supabase-connection.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables:');
  console.error('SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.error('SUPABASE_SERVICE_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n');
  
  try {
    // Test 1: Basic connection
    console.log('1️⃣ Testing basic connection...');
    const { data, error } = await supabase.from('class_schedules').select('count').limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      return;
    }
    console.log('✅ Connection successful!\n');
    
    // Test 2: Check table structure
    console.log('2️⃣ Checking table structure...');
    const { data: columns, error: columnsError } = await supabase
      .from('class_schedules')
      .select('*')
      .limit(1);
    
    if (columnsError) {
      console.error('❌ Table access failed:', columnsError.message);
      return;
    }
    
    if (columns && columns.length > 0) {
      console.log('✅ Table accessible!');
      console.log('📋 Available fields:', Object.keys(columns[0]));
    } else {
      console.log('⚠️  Table is empty (no records found)');
    }
    console.log('');
    
    // Test 3: Check if student_id field exists
    console.log('3️⃣ Checking for student_id field...');
    if (columns && columns.length > 0 && columns[0].hasOwnProperty('student_id')) {
      console.log('✅ student_id field exists');
    } else {
      console.log('❌ student_id field missing - table needs to be updated');
    }
    console.log('');
    
    // Test 4: Count total records
    console.log('4️⃣ Counting total records...');
    const { count, error: countError } = await supabase
      .from('class_schedules')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('❌ Count failed:', countError.message);
    } else {
      console.log(`✅ Total records: ${count || 0}`);
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

testConnection();
