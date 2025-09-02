import { NextResponse } from 'next/server';

export default async function middleware(request) {
    
    const {pathname} = request.nextUrl;

    if (pathname.includes('/velkommen') || pathname.includes('/log-ind') /* || pathname === '/' || pathname.includes('/aktivitet') */) {
        return;
    }

    if (!request.cookies.has('landrupDans_session_token')) {

        const nextResponse = NextResponse.redirect(new URL('/velkommen', request.url), {
            status: 302
        });

        nextResponse.cookies.set('landrupDans_session_token', true);

        return nextResponse;
    }

    return;
}

export const config = {
    matcher: ['/kalender']
};