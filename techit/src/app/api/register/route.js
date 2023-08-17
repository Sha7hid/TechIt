import { NextResponse } from 'next/server';
import { createUser } from '../db';

export async function POST(request, response) {
  const { username, email, password } = await request.json();

  if (!username || !email || !password) {
    return NextResponse.json({ error: 'Name, email, and password are required.' }, { status: 400 });
  }
  
  const user = {
    username: username,
    email: email,
    password: password,
  };

  try {
    // Assuming you have a function createUser in your db module to handle user registration
    const newUser = await createUser(user);

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'An error occurred while registering user.' }, { status: 500 });
  }
}

