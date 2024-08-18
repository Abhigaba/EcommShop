import axios from 'axios'
import { NextRequest, NextResponse } from "next/server"

export async function GET() {

    try{ 
    const res = await axios.get(process.env.NEXT_PUBLIC_API_URL!);
    return NextResponse.json(res.data)
    }
    catch(error: any) { 
        console.log(error.message)
        return NextResponse.json({error : error.message}, {status : 500})
    }

} 