import React, { Component } from 'react';
import Preloader from './Preloader';

import '../css/image-tile.min.css';

class ImageTile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			imgLoading: false
		}

		this.handleImageLoaded.bind(this);
	}

	componentDidMount() {
		this.setState({imgLoading: true});
	}

	handleImageLoaded() {
		this.setState({imgLoading: false});
	}

	render() {
		const { imgSrc, camera, dateTaken } = this.props;
		const { imgLoading } = this.state;
		const loaderType = "ImageLoader";

 		return(
			<div className="img-container">
				<Preloader 
					imgLoading={imgLoading} 
					loaderType={loaderType}
				/>
				<img 
					src={imgSrc} 
					alt="mars"
					className="rover-image"
					onLoad={() => this.handleImageLoaded()}
				/>
				<div className="img-detail-overlay">
					<span><strong>Camera:</strong> {camera}</span>
					<span><strong>Earth date:</strong> {dateTaken}</span>
				</div>
			</div>
		)
	}
}

export default ImageTile;