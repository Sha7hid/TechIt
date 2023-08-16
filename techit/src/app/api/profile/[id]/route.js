import { NextResponse } from 'next/server';
import { getUserByEmail } from '../../db';

export async function GET(request)  {
  const email = request.url.split('/').pop();

  if (!email) {
    return NextResponse.json({ error: 'Email parameter is required.' }, { status: 400 });
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'An error occurred while fetching user data.' }, { status: 500 });
  }
}


