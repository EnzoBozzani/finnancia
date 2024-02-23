import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export default {
	providers: [
		Credentials({
			async authorize(credentials, request) {
				const fields = credentials;
				return null;
			},
		}),
	],
} as NextAuthConfig;
