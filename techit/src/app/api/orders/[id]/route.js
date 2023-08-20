import { NextResponse } from 'next/server';
import { getOrdersForUser} from '../../db';

export async function GET(request)  {
  const id = request.url.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'user_id parameter is required.' }, { status: 400 });
  }

  try {
    const order = await getOrdersForUser(id);

    if (!order) {
      return NextResponse.json({ error: 'orders not found.' }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error fetching product data:', error);
    return NextResponse.json({ error: 'An error occurred while fetching product data.' }, { status: 500 });
  }
}