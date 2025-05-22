
import { AuthContext } from "@/app/context/Authcontext";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req:NextRequest) {
    const cookieStore = cookies();
    
    

    // console.log(cookies.get("RFTFL"))
    return NextResponse.json({"nae":"davsis "})
}