import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/config";
import User from "@/models/userModel";

connect();

export async function POST(req: NextRequest) { 

    try{
    const body = await req.json()
    const {userId,  productId, quantity} = body;

    const user = await User.findOne({userId})
    const cartitem = user?.cart.findIndex(item => item.id === productId);

    console.log(userId)   
    if (!user) { 
            return NextResponse.json({ error: 'User not found' })
    }

        user.cart[cartitem].quantity = quantity;

    await user.save();
    console.log('user saved successfully')
    return NextResponse.json({ message: 'Cart updated successfully', cart: user.cart })}

    catch(error: any) { 
        console.log(error.message)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
;}