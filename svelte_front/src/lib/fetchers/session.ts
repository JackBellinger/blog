import { type Session } from '@lib/utils/types';
let check_backend = true;
export async function fetchSession(): Promise<Session> {
	if (!check_backend) {
		return { backend_connected: false, logged_in: false, username: null };
	}
	const response = await fetch('/api/session').then((data) => {
		// console.log('res', data);
		return data;
	});

	if (response.status === 200) {
		try {
			const session = await response.json(); //.then(data=> {console.log("res", data); return data})
			// Parse the username from the response data
			const username = session.username.replace(/"/g, ''); // Assuming the username is in the data object
			// Set logged_in to true
			return { backend_connected: true, logged_in: true, username: username };
		} catch (e) {
			console.error(e);
			return { backend_connected: false, logged_in: false, username: null };
		}
	} else if (response.status === 401) {
		return { backend_connected: true, logged_in: false, username: null };
	} else if (response.status === 404) {
		return { backend_connected: false, logged_in: false, username: null };
	} else {
		throw new Error(`Unexpected response status code: ${response.status}`);
	}
}
