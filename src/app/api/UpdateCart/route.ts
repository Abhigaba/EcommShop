import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbconfig/config';
import User from '@/models/userModel';

connect();

export async function POST(req: NextRequest) {
    try {

        const body = await req.json()
        const {userId} = body

        // Find the user and populate the cart
        const user = await User.findOne({ userId });
        console.log(user)
        if (!user) {
            return NextResponse.json({ cart: []});
        }
        // Return the user's cart
        return NextResponse.json({ cart: user.cart });
    } catch (error: any) {
        console.error('Error fetching cart:', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
