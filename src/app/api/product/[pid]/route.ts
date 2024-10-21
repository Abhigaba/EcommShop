import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { pid: string } }) {
  try {
    const res = await fetch('https://ecomm-shopease.vercel.app/util/data.json');
    const prod = await res.json();
    const products = prod.products 
    
    // Find the product with the matching pid
    const product = products.find((x: any) => x.id.toString() === params.pid);

    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
