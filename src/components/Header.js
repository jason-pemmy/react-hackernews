import React, { Component } from 'react';
import logo from '../img/main-header-logo.png';

import '../css/header.min.css';

class Header  extends Component {
	constructor(props) {
		super(props);

		this.state = { menuOpen: false };
		this.toggleMenuBtn = this.toggleMenuBtn.bind(this);
	} 

	toggleMenuBtn() {
		const state = this.state.menuOpen ? false : true;
		this.setState({ menuOpen: state });
		this.props.handleMenuBtnToggle(state);
	}

	render() {
		const css = this.state.menuOpen ? "menu-btn-container menu-open" : "menu-btn-container";

		return(
			<div className="header-container">
				<div className="logo-container">
					<img src={logo} alt="logo"/>
					<h4>5 Years of Curiosity</h4>
				</div>
				<div 
					className={css}
					onClick={this.toggleMenuBtn}
				>
					<span className="hamburger-bar"></span>
					<span className="hamburger-bar"></span>
					<span className="hamburger-bar"></span>
					<span className="hamburger-bar"></span>
					<span className="hamburger-bar"></span>
					<span className="hamburger-bar"></span>
				</div>
			</div>
		)
	}
}

export default Header;