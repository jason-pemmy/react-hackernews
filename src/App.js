import React, { Component } from 'react';
import './App.css';

const list = [{
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
}];

const isSearched = (searchTerm) => (item) => 
	!searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase()); 
	// function returns a function that checks to see if the list title is included in the user search query
	//includes() https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/includes?v=control

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			list,
			searchTerm: ''
		};

		this.onDismiss = this.onDismiss.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
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
				<span>
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


export default App;
