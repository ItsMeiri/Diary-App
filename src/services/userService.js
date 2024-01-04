import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import serverUrl from './serverUrl';

const tokenKey = 'tokenKey';

export function logout() {
	localStorage.removeItem(tokenKey);
}

export function getJwt() {
	return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
	try {
		const jwt = localStorage.getItem(tokenKey);
		return jwtDecode(jwt);
	} catch (error) {
		return null;
	}
}

export async function getFavoritesList() {
	try {
		let { data } = await Axios.get(
			`${serverUrl}/api/users/favorites/list`,
			{
				headers: {
					'Content-Type': 'application/json',
					'x-auth-token': this.getJwt(),
					'access-control-allow-origin': '*',
				},
			}
		);
		return data;
	} catch (err) {
		console.log(err);
	}
	// debugger;
}

export async function login(email, password) {
	const { data } = await Axios.post(
		`${serverUrl}/auth`,
		{
			email,
			password,
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'access-control-allow-origin': '*',
			},
		}
	);
	localStorage.setItem(tokenKey, data.token);
}

export default {
	login,
	getCurrentUser,
	logout,
	getJwt,
	getFavoritesList,
};
