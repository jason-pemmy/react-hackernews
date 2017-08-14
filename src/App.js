import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import Header from './components/Header';
import Hero from './components/Hero';
import Controls from './components/Controls';
import Gallery from './components/Gallery';

import './css/vendors/bootstrap.min.css';
import './css/icons.min.css';
import 'react-rangeslider/lib/index.css';
import './css/app.min.css';

const apiKey = "PHztMNJt62UjeW1bzc0Apm4BbZ7GdTFWMLDwgUbT"; 

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			solSelected: 1,
			currentSol: 1, 
			maxSols: null,
			selectedSolData: null,
			pageNumber: 1,
			results:[],
			clearGallery: false,
			showScrollToTop: false,
			showPreloader: false,
		};

		this.parseDataBySol = this.parseDataBySol.bind(this);
		this.parseDataByPage = this.parseDataByPage.bind(this);
		this.handleScrollToTop = this.handleScrollToTop.bind(this);
		this.throttle = this.throttle.bind(this);
		this.solSelectedFromControl = this.solSelectedFromControl.bind(this);
		this.handleRequestBtnClicked = this.handleRequestBtnClicked.bind(this);
	}

	componentDidMount() {
		this.fetchDataFromNASA(1);
		window.addEventListener('scroll', this.throttle(this.handleScrollToTop, 500));
	}

	componentWillUnmount(){
         window.removeEventListener('scroll',this.hideBar);
    }

	fetchDataFromNASA(sol) {		
		fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol="+sol+"&api_key="+apiKey)		
		.then(response => response.json())
		.then(result => this.parseDataBySol(result))
	}

	fetchDataFromNASAByPage(page) {
		fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol="+this.state.currentSol+"&page="+page+"&api_key="+apiKey)		
		.then(response => response.json())
		.then(result => this.parseDataByPage(result,page))
	}

	parseDataBySol(data) {
		const totalPhotos = data.photos.length;
		const totalPages = Math.ceil(totalPhotos / 25); 
		const photosViewed = data.photos.slice(0, 25);
		const results = {
			[this.state.currentSol] : {
				totalPhotos: totalPhotos,
				totalPages: totalPages,
				pagesViewed: 1,
				photosViewed: photosViewed
			}
		};

		if(!this.state.maxSols) {
			this.setState({ 
				maxSols: data.photos[0].rover.max_sol,
				results: this.state.results.concat(results),
				solSelected: this.state.currentSol,
				selectedSolData: data,
				clearGallery: false,
				showPreloader: false, 
			})
		} else {
			this.setState({ 				
				results: this.state.results.concat(results),
				solSelected: this.state.currentSol,
				selectedSolData: data,
				clearGallery: false,
				showPreloader: false, 
			})
		}
	}

	parseDataByPage(data, page) {
		const results = [...this.state.results];
		const photosViewed = [...this.state.results[this.state.results.length - 1][this.state.solSelected].photosViewed];
		const newPhotoBatch = [...data.photos];
		const updatedPhotosViewed = [...photosViewed, ...newPhotoBatch];
		results[this.state.results.length - 1][this.state.solSelected].pagesViewed = page;
		results[this.state.results.length - 1][this.state.solSelected].photosViewed = updatedPhotosViewed; 

		this.setState({ 
			results: results,
			showPreloader: false,
		});
	}

	solSelectedFromControl(sol) {
		this.setState({clearGallery: true, showPreloader: true, currentSol: sol});
		this.fetchDataFromNASA(sol);
	}

	handleScrollToTop() {
		var ypos = window.scrollY;
		var target = 1025;
		ypos > target ? this.setState({showScrollToTop: true}) : this.setState({showScrollToTop: false})
	}

	throttle(fn, wait) {
		var time = Date.now();
		return function() {
			if ((time + wait - Date.now()) < 0) {
				fn();
				time = Date.now();
			}
		}
	}

	handleRequestBtnClicked() {
		const currentPage = this.state.results[this.state.results.length - 1 ][this.state.solSelected].pagesViewed;
		const nextPage = currentPage + 1;
        this.fetchDataFromNASAByPage(nextPage);
	}

	render() {
		const { solSelected, currentSol, maxSols, selectedSolData, results, clearGallery, showScrollToTop, showPreloader } = this.state;
		var totalPages;
		var pagesViewed;
		var photosToRender;
		const toggleScrollToTopClass = showScrollToTop ? "back-to-top" : "back-to-top hidden";		
		
		if( results.length >= 1 && currentSol && solSelected === currentSol) {
			totalPages = results[results.length - 1][solSelected].totalPages;
			pagesViewed = results[results.length - 1][solSelected].pagesViewed; 
			photosToRender = results[results.length - 1][solSelected].photosViewed;
		} else {
			totalPages = 1;	
			photosToRender = [];		
		}

		return (
			<div className="app-container">
				<Header />
				<Hero />
				<Controls
					maxSols={maxSols}
					showPreloader={showPreloader}
					handleGetImagesRequest={this.solSelectedFromControl}
				/>
				 <section ref={(section) => { this.GalleryAnchor = section; }}></section>
				
				<div className="container-fluid">
					<Gallery 
						selectedSolData={selectedSolData}
						totalPages={totalPages}
						pagesViewed={pagesViewed}
						photosToRender={photosToRender}
						handleRequestBtnClicked={ this.handleRequestBtnClicked }
						doClearGallery={clearGallery}
					/>
				</div>

				<div 
					className={toggleScrollToTopClass}
					onClick={(event) => { scrollToComponent( this.GalleryAnchor, { offset: -200, align: 'top', duration: 1500})}}
				>
					<span className="icon-circle-up"></span>
				</div>
			</div>	
		)
	}
}

export default App; 
  