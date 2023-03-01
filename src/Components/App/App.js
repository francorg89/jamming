//import logo from './logo.svg';
//import { render } from '@testing-library/react';
import './App.css';
import { Component } from 'react';
import { SearchBar } from "./../SearchBar/SearchBar"
import { SearchResults } from './../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';


class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      searchResults: 
        [ {name:"Ace of spades",artist:"Motorhead",album:"Ace of sapdes",id:"1"},
          {name:"Life eternal",artist:"Ghost",album:"Praquelle",id:"12"},
          {name:"Frijolero",artist:"Molotov",album:"Dance and dense dense",id:"7"},
          {name:"Tanto amor me marea", artist:"La tremenda corte", album:"Frecuencia rebelde",id:"2"}],
      playlistName: "The very best playlist",
      playlistTracks:
        [ {name:"Have you ever",artist:"The offspring",album:"Americana",id:"12"},
          {name:"Be quick or be dead",artist:"Iron Maiden",album:"Fear of the dark",id:"5"},
          {name:"Forever free",artist:"Saxon",album:"Forever free",id:"7"},
          {name:"La dosis prefecta", artist:"Panteon rococo", album:"Compañeros musicales",id:"3"}]
    };

    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }else{ 
      this.state.playlistTracks.push(track);
      this.setState({playlistTracks : this.state.playlistTracks});
    }
  }

  render(){ 
    return (
    <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar/>
          <div className="App-playlist">
            <SearchResults  searchResults={this.state.searchResults}
                            onAdd ={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
    </div>
    );
  }
  
}

export default App;
