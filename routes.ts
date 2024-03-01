/**
 * An array of routes that is accessible to the public.
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/', '/terms-of-service', '/privacy-policy'];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ['/auth'];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API
 * authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

export const apiRoutePrefix = '/api';

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard';
