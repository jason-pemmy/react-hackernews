import React from 'react';
import '../css/menu.min.css';

const Menu = ({toggleMenu}) => {   
    console.log("toggleMenu: "+ toggleMenu);
    const menuClass = !toggleMenu ? "menu-container" : "menu-container open";
    return(
        <div className={menuClass}>
            <div className="navigation-container">
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>Nasa</li>
                    <li>Mars info</li>
                </ul>
            </div>
            <div className="image-tiles-container">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
    
}

export default Menu;