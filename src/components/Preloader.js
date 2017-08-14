import React from 'react';
import loader from '../img/mars-loader.gif';
import MainLoader from '../img/new-main-loader.png';

import '../css/preloader.min.css';

const Preloader = ({imgLoading, loaderType}) => {

	let loaderToUse = null;
	if(imgLoading) {
		switch(loaderType) {
			case "MainLoader":
			loaderToUse = MainLoader
			break;

			case "ImageLoader":
			loaderToUse = loader;
			break;

			default:
			loaderToUse = null; 
			break;
		}

		return(
			<img 
				className="loader-image" 
				src={ loaderToUse } 
				alt="preloader"
			/>
		) 	
	}else {
		return(null)
	}
}

export default Preloader;