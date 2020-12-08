import { useEffect } from "react";
import { logout } from "../services/userService";

const Signout = () => {
	useEffect(() => {
		logout();
		window.location = "/";
	}, []);

	return null;
};

export default Signout;
