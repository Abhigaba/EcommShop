import { NextRequest, NextResponse } from "next/server"
import axios from "axios";
import path from 'path'
export async function GET() {

    try{ 
    const jsonData = await axios.get('https://ecomm-shopease.vercel.app/util/data.json');
    return NextResponse.json(jsonData.data)
    }
    catch(error: any) { 
        console.log(error.message)
        return NextResponse.json({error : error.message}, {status : 500})
    }

} 