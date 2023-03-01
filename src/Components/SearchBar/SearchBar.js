import { Component } from "react";
import "./SearchBar.css";

export class SearchBar extends Component{
    render(){
        return(
          <div className="SearchBar">
            <input placeholder="Enter a song, Album or Artist" />
            <button className="SearchButton"> SEARCH </button>
          </div>  
        );
    }

}