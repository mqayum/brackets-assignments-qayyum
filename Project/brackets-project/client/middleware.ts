import {NextRequest, NextResponse} from "next/server";

export const middleware = (req : NextRequest) => {
        const protectedRoutes = [
            "/dashboard",
            "/register/designer",
            "/register/vendor",
        ]
        const isProtected = (url:string) => {
            return protectedRoutes.some(route=>url.includes(route))
        }
        const token = req.cookies.get("token")

        if (isProtected(req.url) && !token) {
            return NextResponse.redirect("http://localhost:3000/login")
        }

        if(token && req.url.includes("/login")){
            return NextResponse.redirect("http://localhost:3000")
        }
}