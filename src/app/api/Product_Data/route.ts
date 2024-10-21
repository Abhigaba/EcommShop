import { NextRequest, NextResponse } from "next/server"
import path from 'path'
export async function GET() {

    try{ 
    const res = await fetch('http://localhost:3000/util/data.json');
    const jsonData = await res.json();
    return NextResponse.json(jsonData)
    }
    catch(error: any) { 
        console.log(error.message)
        return NextResponse.json({error : error.message}, {status : 500})
    }

} 