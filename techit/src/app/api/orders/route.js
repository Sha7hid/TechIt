import { NextResponse } from 'next/server';
import { createOrder } from '../db'; // Assuming you have a function createOrder in your db module

export async function POST(request, response) {
  const { user_id,product_id,  order_status } = await request.json();
  if (!user_id || !product_id ||  !order_status) {
    return NextResponse.json({ error: 'userId, productId and order_status are required.' }, { status: 400 });
  }

  const order = {
    userId: user_id,
    productId: product_id,
    order_status: order_status, // Include order_status in the order object
  };
console.log(order)
  try {
    const newOrder = await createOrder(order);

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'An error occurred while creating the order.' }, { status: 500 });
  }
}
