import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req:NextRequest) {
        const cookieStore = cookies();
        
        

        console.log(cookieStore.getAll())
    return NextResponse.json({"nae":"davsis "})
}