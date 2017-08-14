import React, {Component} from 'react';
import Slider from 'react-rangeslider';
import Preloader from './Preloader';
import scrollToComponent from 'react-scroll-to-component';

import '../css/controls.min.css';

class Controls extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSol: 1,
            clearGallery: false,
			showPreloader: false,
        };

        this.clearGallery = this.clearGallery.bind(this);
        this.incrementSol = this.incrementSol.bind(this);
        this.decrementSol = this.decrementSol.bind(this);
    }

    handleChangeStart = () => {
		console.log('Change event started');
	};

	handleChange = sol => {
		this.setState({
			currentSol: sol
		})
	};

	handleChangeComplete = () => {
		console.log('Change event completed')
	};

    clearGallery() {
		this.setState({
			clearGallery: true,
			showPreloader: true,
		});
	}

    incrementSol() {
        let thisSol = this.state.currentSol;
        const nextSol= thisSol += 1
        this.setState({currentSol: nextSol});
    }

    decrementSol() {
        let thisSol = this.state.currentSol;
        const prevSol = thisSol -= 1;
        this.setState({currentSol: prevSol});
    }

    render(){
        const {maxSols, showPreloader} = this.props;
        const {currentSol} = this.state;
        const loaderType = "MainLoader";

        return(
            <div className="container slider-container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="nav-btn-container">
                            <div 
                                className="left-button"
                                onClick={this.decrementSol}
                            >
                                <span className="icon-circle-left"></span>
                            </div>
                            <div className="sol-selected-btn">Sol selected: {currentSol}</div>
                            <div 
                                className="right-button"
                                onClick={this.incrementSol}
                            >
                                <span className="icon-circle-right"></span>
                            </div>
                        </div>

                        <Slider
                            min={1}
                            max={maxSols}
                            value={currentSol}
                            onChangeStart={this.handleChangeStart}
                            onChange={this.handleChange}
                            onChangeComplete={this.handleChangeComplete}
                        />
                        <button 
                            className="go-btn" 
                            onClick={(event) => { 
                                this.clearGallery(); 
                                scrollToComponent( this.GalleryAnchor, { offset: -200, align: 'top', duration: 1500});
                                this.props.handleGetImagesRequest(this.state.currentSol)}}
                        >View images</button>												
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="main-preloader">
                            <Preloader 
                                imgLoading={showPreloader} 
                                loaderType={loaderType}
                            />
                        </div>
                    </div>
                </div>
                <section ref={(section) => { this.GalleryAnchor = section; }}></section>
            </div>
            
        );
    }

}

export default Controls;