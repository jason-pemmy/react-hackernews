import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const Search = ({value, onChange, onSubmit, children}) =>	//deconstruct the props here
	<form onSubmit={onSubmit}>
		{children}
		<input 
			type="text"
			value={value} //control the input. (make the value = to the state) let the state remain the single source of truth
			onChange={onChange}
		/>
		<button type="submit">{children}</button>	
	</form>

const Table = ({ list, onDismiss }) =>	//deconstruct the props here	
	<div className="table">
		
		{ list.map( item =>					
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
			results: null,
			searchKey: '',
			searchTerm: DEFAULT_QUERY,
		};		

		this.needsToSearchTopstories = this.needsToSearchTopstories.bind(this);
		this.setSearchTopstories = this.setSearchTopstories.bind(this);
		this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);		
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.onDismiss = this.onDismiss.bind(this);
	}

	needsToSearchTopstories(searchTerm) {
		return !this.state.results[searchTerm];
	}

	onSearchSubmit(event) {
		const { searchTerm } = this.state;
		this.setState({ searchKey: searchTerm });
		if (this.needsToSearchTopstories(searchTerm)) {
			this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
		}
		event.preventDefault();
	}

	setSearchTopstories(result) {
		//console.log("result: " + result);
		const { hits, page } = result;
		const { searchKey, results } = this.state;
		const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
		const updatedHits = [ ...oldHits, ...hits ];
		//console.log("hits: " + hits + "page: "+ page);
		this.setState({ results: { ...results, [searchKey]: { hits: updatedHits, page }} });
	}

	fetchSearchTopstories(searchTerm, page) {
		fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
		.then(response => response.json())
		.then(result => this.setSearchTopstories(result));
	}

	componentDidMount() {
		const { searchTerm } = this.state;
		this.setState({ searchKey: searchTerm });
		this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
	}

	onDismiss(id) {	
		const { searchKey, results } = this.state;
    	const { hits, page } = results[searchKey];	
		const isNotId = item => item.objectID !== id;
		const updatedHits = hits.filter(isNotId);
		this.setState({
			results: { ...results, [searchKey]: {hits: updatedHits, page }}	
		});	
	}

	onSearchChange(event) {
		this.setState({searchTerm: event.target.value});
	}

	render() {
		const { searchTerm, results, searchKey } = this.state; //destructuring
		const page = (results && results[searchKey] && results[searchKey].page) || 0;
		const list = (results && results[searchKey] && results[searchKey].hits) || [];
		console.log("result: "+ results + " - " + searchTerm );

		return (
			<div className="page">
				<div className="interactions">
					<Search 
						value={searchTerm}
						onChange={this.onSearchChange}
						onSubmit={this.onSearchSubmit}
					>
						Search  
					</Search> 
					<Table 
						list={ list }
						onDismiss={this.onDismiss}
					/>
					<div className="interactions">
						<Button onClick={ () => this.fetchSearchTopstories( searchTerm, page + 1 ) }>
							More
						</Button>	
					</div>					
				</div>
			</div>
		);
	}
}

export default App;
