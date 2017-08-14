import React from 'react';
import Masonry from 'react-masonry-component';
import ImageTile from './ImageTile';

import '../css/gallery.min.css';

const ShowMoreButton = ({ doShowMoreBtn, onClick }) => {
	if(doShowMoreBtn) {
		return(
			<div className="show-more-btn-container">
				<button
					className="show-more-btn" 
					onClick={ onClick }
				>Show More</button>
			</div>
		)
	} else {
		return(null)
	}
}

const Gallery = ({selectedSolData, totalPages, pagesViewed, requestBtnClicked, photosToRender, handleRequestBtnClicked, doClearGallery}) => {	
	let childElements = null;


	this.requestBtnClicked = function() {
		handleRequestBtnClicked();
	}

	this.handleImagesLoaded = function() {	
	}

	if( selectedSolData ) {
		var doShowMoreBtn = false;

		if(totalPages > 1 && pagesViewed < totalPages) {
			doShowMoreBtn = true;
		}

		let photosAry = null;

		if (photosToRender.length >= 1) {
			photosAry = [...photosToRender];
		} else {
			photosAry = [...selectedSolData.photos.slice(0, 25)];
		}

		if(selectedSolData.photos.length === 0) {
			childElements = <div className="no-results"><h4>No photos taken on Mars that day. Try another.</h4></div>;	
		}else {
			childElements = (!doClearGallery) ? 
			photosAry.map( ( photos, i ) =>
				<ImageTile
					imgSrc={photos.img_src}
					key={i}
				/>
			) : 
			null;
		}

		return (
			<div className="gallery">
				<div className="row">
					<div className="col-sm-12">
						<div className="gallery-container">
							<Masonry 
								onImagesLoaded={this.handleImagesLoaded}
							>
								{childElements}
							</Masonry>
						</div>
					</div>
				</div>
				<div className="row">
					<ShowMoreButton
						doShowMoreBtn = {doShowMoreBtn}
						onClick = {this.requestBtnClicked}
					/>
				</div>
			</div>
		)	
	}else {
		return(null);
	}
}

export default Gallery;