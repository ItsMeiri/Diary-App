import Axios from "axios";
import jwtDecode from "jwt-decode";

const tokenKey = "tokenKey";

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
		let { data } = await Axios.get(`http://localhost:4000/api/users/favorites/list`, { headers: { "Content-Type": "application/json", "x-auth-token": this.getJwt() } });
		return data;
	} catch (err) {
		console.log(err);
	}
	// debugger;
}

export async function login(email, password) {
	const { data } = await Axios.post(`http://localhost:4000/auth`, { email, password });
	localStorage.setItem(tokenKey, data.token);
}

export default { login, getCurrentUser, logout, getJwt, getFavoritesList };
