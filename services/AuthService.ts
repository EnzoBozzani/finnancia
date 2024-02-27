interface RegisterBody {
	name: string | undefined;
	email: string | undefined;
	password: string | undefined;
}

export class AuthService {
	static async register(body: RegisterBody) {
		const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/register`, {
			method: 'POST',
			headers: {
				// prettier-ignore
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		return res.json();
	}
}
