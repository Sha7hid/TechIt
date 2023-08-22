import { NextResponse } from "next/server";
import { getProducts } from "../db";

export async function GET(request) {
  try {
    const products = await getProducts();

    if (!products) {
      return NextResponse.json(
        { error: "No products found." },
        { status: 404 }
      );
    }
    if (!Array.isArray(products)) {
      // If 'products' is not an array, return an empty array to prevent the 'map' error.
      return NextResponse.json({ products: [] });
    }
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching products." },
      { status: 500 }
    );
  }
}
