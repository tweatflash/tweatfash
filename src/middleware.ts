import { NextRequest, NextResponse } from "next/server";
export  async function middleware(req: NextRequest) {
  let protectedRoutes= ["/home","/explore","/explore/:path*","/notifications","/bookmarks","/communites"]
  let protcttedRoutesIfLoggedIn=["/","/sign-in","/sign-up"]
  const refreshToken=req.cookies.getAll("RFTFL")
  const accessToken=req.cookies.getAll("ACTFL")
  if (!refreshToken.length && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/sign-up", req.url));
  }
  if (refreshToken.length && protcttedRoutesIfLoggedIn.includes(req.nextUrl.pathname)){
    return NextResponse.redirect(new URL("/home", req.url));
  }
  

}
