import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/config";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest){
    try{

        const body = await req.json()
        const {user, userId, password} = body;
        
        const newUser =  await User.findOne({userId})
        
        if(newUser){ 
            return NextResponse.json({
                error: "User already existed",
            },
        {status: 400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPass = await bcryptjs.hash(password,salt)
      
        const userNew = new User({
            username: user,
            userId: userId , password: hashedPass
        })
       
        const save = await userNew.save()
        const tokenData = {
            id : user._id, 
            username: user.userId, 
        }

        const token = await jwt.sign(tokenData, process.env.JWT_secret!, {expiresIn:'5h'})
        
        return NextResponse.json({
            message: "User Created",
            succes: true,
            cart: user.cart
        })
    }
    catch(error: any){
        console.log(error.message)
        return NextResponse.json({
            error: error.message,
        },
    {status: 500})
    }
}