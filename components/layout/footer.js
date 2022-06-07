import React from "react";
import GenericContent from "../genericContent";

const Footer = () => {
	return (<div className="mt-10 bg-gray-800 p-10">
		<nav className="max-w-7xl mx-auto w-full px-2 py-8 box-border flex justify-between">
			<GenericContent>
				<b>Holaplex</b>
				<br />
				©️ {new Date().getFullYear()}
			</GenericContent>
		</nav>
	</div>);
};

export default Footer;