import NextAuth from 'next-auth';

import authConfig from './auth.config';
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, apiRoutePrefix, authRoutes, publicRoutes } from '@/routes';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;

	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);
	const isApiRoute = nextUrl.pathname.startsWith(apiRoutePrefix);

	if (isApiRoute) {
		if (!isLoggedIn) {
			return NextResponse.json(
				{
					error: 'Unauthorized!',
				},
				{ status: 401 }
			);
		}
		return;
	}

	if (isApiAuthRoute) return;

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
		}
		return;
	}

	if (!isLoggedIn && !isPublicRoute) {
		return Response.redirect(new URL(`/auth`, nextUrl));
	}

	return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
