import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/config";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

export async function POST(req: NextRequest){
    try{

        const body = await req.json()
        const {userId, password} = body;
    
        const user =  await User.findOne({userId})
        
        if(!user){ 
            return NextResponse.json({
                error: "Credentials Invalid",
            },
        {status: 400})
        }

        const validPass = bcryptjs.compare(password, user.password)
        
        if (!validPass){
           return  NextResponse.json({
                error: "Credentials Invalid",
            },
        {status: 400})
            
        }

        const tokenData = {
            id : user._id, 
            username: user.username, 
        }

        const token = await jwt.sign(tokenData, process.env.JWT_secret!, {expiresIn:'5h'})
        
        const responsePayload = {
            message: "Login Success",
            success: true,
            cart: user.cart, 
            username: user.username,
        };

        // Create the NextResponse
        const response = NextResponse.json(responsePayload);
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        
        return response
    }

    catch(error: any){
        console.log(error.message)
        return NextResponse.json({
            error: error.message,
        },
    {status: 500})
    }
}