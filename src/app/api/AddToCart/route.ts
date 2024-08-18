import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/config";
import User from "@/models/userModel";

connect();

export async function POST(req: NextRequest) { 

    try{
    const body = await req.json()
    const {userId,  productId, price, name , image} = body
        console.log({productId, price, name , image})

    const user = await User.findOne({userId})
    let cartitem = -1
    if (user && user.cart){
        cartitem = user.cart.findIndex(item => item.id === productId)
    }

    console.log(userId)   
    if (!user) { 
            return NextResponse.json({ error: 'User not found' })
    }
    if (cartitem === -1) { 
        user.cart.push({  id:productId , productId: new mongoose.Types.ObjectId(), name, image, price, quantity:1});    
    }
    else{
        user.cart[cartitem].quantity += 1;
    }

    await user.save();
    console.log('user saved successfully')
    return NextResponse.json({ message: 'Cart updated successfully', cart: user.cart })}

    catch(error: any) { 
        console.log(error.message)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
;}