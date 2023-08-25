import { NextResponse } from 'next/server';
import { deleteOrder } from '../../db';

export async function DELETE(request) {
  const id = request.url.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'cart_id parameter is required.' }, { status: 400 });
  }

  try {
    // Delete the cart item
    await deleteOrder(id);

    return NextResponse.json({ message: 'Cart item deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    return NextResponse.json(
      { error: 'An error occurred while deleting cart item.', detail: error.message }, // Include error details
      { status: 500 }
    );
  }
}