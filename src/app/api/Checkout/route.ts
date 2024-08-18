// pages/api/checkout.ts
import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbconfig/config';
import User from '@/models/userModel';
import jwt from 'jsonwebtoken';

connect();

export async function POST(req: NextRequest) {
    try {


        const body = await req.json()
        const {userId} = body
        
        const user = await User.findOne({userId});

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Empty the cart
        user.cart = [];

        // Save the user
        await user.save();

        return NextResponse.json({ message: 'Checkout successful, cart emptied' });
    } catch (error: any) {

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
