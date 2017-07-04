import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

/*const list = [{
	title: 'React',
	url: 'https://facebook.github.io/react/',
	author: 'Jordan Walke',
	num_comments: 3,
	points: 4,
	objectID: 0,
},{
	title: 'Redux',
	url: 'https://github.com/reactjs/redux',
	author: 'Dan Abramov, Andrew Clark',
	num_comments: 2,
	points: 5,
	objectID: 1,
}];*/


/*(function(){
	var parentObj = {
		id: 1,
		isOld: true,
		favFood: ["burger","fries"],
		printDetails: function(){
						
			console.log("parentDetails: "+ this.id + " - " + this.favFood);
		}
	}

	parentObj.printDetails();
})()*/

const isSearched = (searchTerm) => (item) => 
	!searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase()); 
	// function returns a function that checks to see if the list title is included in the user search query
	//includes() https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/includes?v=control

const Search = ({value, onChange, children}) =>	//deconstruct the props here
	<form>
		{children}
		<input 
			type="text"
			value={value} //control the input. (make the value = to the state) let the state remain the single source of truth
			onChange={onChange}
		/>
	</form>


const Table = ({list, pattern, onDismiss}) =>	//deconstruct the props here	
	<div className="table">
		{list.filter(isSearched(pattern)).map(item =>					
			<div key={item.objectID} className="table-row">
				<span style={{ width: "40%" }}>
					<a href={item.url}>{item.title}</a>
				</span>
				<span>{item.author}</span>
				<span>{item.num_comments}</span>
				<span>{item.points}</span>
				<span>
					<Button 
						onClick={() => onDismiss(item.objectID)}
						className="button-inline"
					>
					Dismiss
					</Button>
				</span>
			</div>				
		)}
	</div>

const Button = ({onClick, className = "", children}) =>	//deconstruct the props here		
	<button 
		onClick={onClick}
		className={className}
		type="button"
	>
		{children}
	</button>



class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			result: null,
			searchTerm: ''
		};		

		this.setSearchTopstories = this.setSearchTopstories.bind(this);
		this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
		this.onDismiss = this.onDismiss.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
	}

	setSearchTopstories(result) {
		this.setState({ result });
	}

	fetchSearchTopstories(searchTerm) {
		fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
		.then(response => response.json())
		.then(result => this.setSearchTopstories(result));
	}

	componentDidMount() {
		const { searchTerm } = this.state;
		this.fetchSearchTopstories(searchTerm);
	}

	onDismiss(id) {		
		const isNotId = item => item.objectID !== id;
		const updatedList = this.state.list.filter(isNotId);
		//filter() https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/filter?v=control	
		this.setState({list: updatedList});	
	}

	onSearchChange(event) {
		this.setState({searchTerm: event.target.value});
	}

	render() {
		const { list,searchTerm } = this.state; //destructuring

		(function(){
			return typeof arguments;
			
		})();

		return (
			<div className="page">
				<div className="interactions">
					<Search 
						value={searchTerm}
						onChange={this.onSearchChange}
					>
						Search 
					</Search>	
					<Table 
						list={list}
						pattern={searchTerm}
						onDismiss={this.onDismiss}
					/>
				</div>
			</div>
		);
	}
}

export default App;
