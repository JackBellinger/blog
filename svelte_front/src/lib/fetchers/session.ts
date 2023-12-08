import { type Session } from '@lib/utils/types';

export async function fetchSession(): Promise<Session> {
	const response = await fetch('/session');

	if (response.status === 200) {
		const session = await response.json(); //.then(data=> {console.log("res", data); return data})
		// Parse the username from the response data
		const username = session.username.replace(/"/g, ''); // Assuming the username is in the data object
		// Set logged_in to true
		return { logged_in: true, username };
	} else if (response.status === 401) {
		return { logged_in: false, username: null };
	} else {
		throw new Error(`Unexpected response status code: ${response.status}`);
	}
}
