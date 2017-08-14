import React from 'react';
import logo from '../img/main-header-logo.png';

import '../css/header.min.css';

const Header = () => {
	return(
		<div className="header-container">
			<img src={logo} alt="logo"/>
			<h4>5 Years of Curiosity</h4>
		</div>
	)
}

export default Header;