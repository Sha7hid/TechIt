import { NextResponse } from 'next/server';
import { createCartItem } from '../db';

export async function POST(request, response) {
  const { productId, userId, quantity } = await request.json();

  if (!productId || !userId || !quantity) {
    return NextResponse.json({ error: 'userId, productId, and quantity are required.' }, { status: 400 });
  }
  
  const cart = {
    userId: userId,
    productId: productId,
    quantity: quantity,
  };
console.log(cart)
  try {
    // Assuming you have a function createUser in your db module to handle user registration
    const newCartItem = await createCartItem(cart);

    return NextResponse.json({ success: true, user:newCartItem }, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'An error occurred while registering user.' }, { status: 500 });
  }
}
