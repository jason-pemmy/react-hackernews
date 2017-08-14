import React from 'react';

import '../css/hero.min.css';

const Hero = () => {
	return(
		<div className="hero-container" >
			<div className="container">
				<div className="row">
					<div className="col-sm-12">
						<div className="text-box">
							<h1>A life on Mars.</h1>
							<p>On August 6, 2012, NASA landed its Curiosity rover on the surface of Mars. In the last 5 years, Curiosity has captured our hearts with its selfies and first-hand accounts of Mars' Gale Crater.</p><p>Using the slider below, you can navigate through over 200 000 images organized by Sol, taken over the last five years on the red planet.</p> 
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Hero;