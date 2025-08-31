import { NextResponse, NextRequest } from 'next/server';
import supabaseClient from "../../../../services/supabaseClient";

export async function POST(request: NextRequest) {
  try {
    const req = await request.json()
    const { email, code } = req;

    // Validate code exists and isn't expired
    const { data: validCode, error: codeError } = await supabaseClient
      .from('verification_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (codeError || !validCode) {
      return NextResponse.json({ message: 'Invalid or Expired code' }, { status: 400 });
    }

    // Mark code as used
    await supabaseClient
      .from('verification_codes')
      .update({ used: true })
      .eq('id', validCode.id);

    // Get student data
    const { data: student } = await supabaseClient
      .from('students')
      .select('student_id, batch')
      .eq('email', email)
      .single();


    return new Response(JSON.stringify({
      success: true,
      batch: student?.batch,
      studentId: student?.student_id
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
}