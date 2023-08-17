import { NextResponse } from 'next/server';
import { createCartItem } from '../db';

export async function POST(request, response) {
  const { product, user, quant } = await request.json();

  if (!product || !user || !quant) {
    return NextResponse.json({ error: 'userId, productId, and quantity are required.' }, { status: 400 });
  }
  
  const cart = {
    userId: user,
    productId: product,
    quantity: quant,
  };

  try {
    // Assuming you have a function createUser in your db module to handle user registration
    const newCartItem = await createCartItem(cart);

    return NextResponse.json({ success: true, user:newCartItem }, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'An error occurred while registering user.' }, { status: 500 });
  }
}
