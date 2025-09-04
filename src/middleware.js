import { NextResponse } from 'next/server';

export default async function middleware(request) {
    
    const {pathname} = request.nextUrl;

    if (pathname.includes('/velkommen')) {
        return;
    }

    if (!request.cookies.has('landrupdans_session_token')) {

        const nextResponse = NextResponse.redirect(new URL('/velkommen', request.url), {
            status: 302
        });

        nextResponse.cookies.set('landrupdans_session_token', true);

        return nextResponse;
    }

    return;
}

export const config = {
    matcher: ['/kalender/:path*', '/', '/log-ind', '/opret-bruger', '/soeg', '/aktivitet/:path*' ]
};