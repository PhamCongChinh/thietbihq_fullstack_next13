import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {

    const token = request.cookies.get('token')?.value
    console.log(token)
    const loginURL = new URL('/login', request.url)
    if (token !== undefined) {
        
    }else{
        return NextResponse.redirect(loginURL)
    }

    
    
    
}

export const config = {
    matcher: [
        '/dashboard',
        '/dashboard/:path*'
    ],
}