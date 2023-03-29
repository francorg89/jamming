import { Component } from "react";
import "./SearchBar.css";

export class SearchBar extends Component{

  constructor(props){
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.state = {term:""};
  }

  handleTermChange(event){
    let term = event.target.value;
    this.setState({term:term});
  }

  search(){
      this.props.onSearch(this.state.term);
    }

  render(){
    return(
      <div className="SearchBar">
        <input  placeholder="Enter a song, Album or Artist" 
                onChange={this.handleTermChange}/>
        <button className="SearchButton"
                onClick={this.search}> 
            SEARCH 
        </button>
      </div>);
    }

}