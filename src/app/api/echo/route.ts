import { NextResponse } from "next/server";
import axios from "../axios/axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const obj=Object.fromEntries(searchParams.entries());
  return NextResponse.json(obj)
}
