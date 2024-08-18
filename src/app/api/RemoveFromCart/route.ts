import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/config";
import User from "@/models/userModel";

connect();

export async function POST(req: NextRequest) { 

    try{
    const body = await req.json()
    const {userId,  productId} = body
 
    const user = await User.findOne({userId})
    let cartitem = -1
    if (user && user.cart){
        cartitem = user.cart.findIndex(item => item.id === productId)
    }

    if (!user) { 
            return NextResponse.json({ error: 'User not found' })
    }
    if (cartitem === -1) { 
        return NextResponse.json({ error: 'Product not found in cart' }, { status: 404 });}
    else{
        user.cart.splice(cartitem, 1);
    }

    await user.save();
    return NextResponse.json({ message: 'Cart updated successfully', cart: user.cart })}

    catch(error: any) { 
        console.log(error.message)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
;}