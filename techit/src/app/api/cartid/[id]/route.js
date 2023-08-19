import { NextResponse } from 'next/server';
import { getCartItem} from '../../db';

export async function GET(request)  {
  const id = request.url.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'cart_id parameter is required.' }, { status: 400 });
  }

  try {
    const cart = await getCartItem(id);

    if (!cart) {
      return NextResponse.json({ error: 'cart item not found.' }, { status: 404 });
    }

    return NextResponse.json({ cart });
  } catch (error) {
    console.error('Error fetching product data:', error);
    return NextResponse.json({ error: 'An error occurred while fetching product data.' }, { status: 500 });
  }
}