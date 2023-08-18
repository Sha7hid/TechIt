import { NextResponse } from 'next/server';
import {  getProduct} from '../../db';

export async function GET(request)  {
  const id = request.url.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'id parameter is required.' }, { status: 400 });
  }

  try {
    const product = await getProduct(id);

    if (!product) {
      return NextResponse.json({ error: 'product not found.' }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Error fetching product data:', error);
    return NextResponse.json({ error: 'An error occurred while fetching product data.' }, { status: 500 });
  }
}
