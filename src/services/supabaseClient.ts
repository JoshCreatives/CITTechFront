import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fulpmhqjbyvtgbpmskha.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1bHBtaHFqYnl2dGdicG1za2hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NzU3MjQsImV4cCI6MjA1OTI1MTcyNH0.PctT72qVHXfsSY47O3hImWEQsr6weg8rq2n4bnhTmyY';

const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabaseClient;