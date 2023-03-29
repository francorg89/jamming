//import logo from './logo.svg';
//import { render } from '@testing-library/react';
import './App.css';
import { Component } from 'react';
import { SearchBar } from "./../SearchBar/SearchBar"
import { SearchResults } from './../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';


class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      searchResults: 
        [ {name:"Ace of spades",artist:"Motorhead",album:"Ace of sapdes",id:"1"},
          {name:"Life eternal",artist:"Ghost",album:"Praquelle",id:"100"},
          {name:"Frijolero",artist:"Molotov",album:"Dance and dense dense",id:"101"},
          {name:"Tanto amor me marea", artist:"La tremenda corte", album:"Frecuencia rebelde",id:"2"}],
      playlistName: "The very best playlist",
      playlistTracks:
        [ {name:"Have you ever",artist:"The offspring",album:"Americana",id:"12"},
          {name:"Be quick or be dead",artist:"Iron Maiden",album:"Fear of the dark",id:"5"},
          {name:"Forever free",artist:"Saxon",album:"Forever free",id:"7"},
          {name:"La dosis prefecta", artist:"Panteon rococo", album:"Compañeros musicales",id:"3"}]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePLaylist = this.savePLaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }else{ 
      this.state.playlistTracks.push(track);
      this.setState({playlistTracks : this.state.playlistTracks});
    }
  }

  removeTrack(track){
    let newList = this.state.playlistTracks.filter(
        (ele)=> ele.id !== track.id
    );
    this.setState({playlistTracks: newList});
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePLaylist(){
    let trackURIs = [];
    console.log("This is gonna see in terminl");
    Spotify.getAccesToken();
  }

  async search(term){
    console.log(term + " from the app.js");
    let newSearch = await Spotify.search(term);
    console.log("New OBJ :")
    console.log(newSearch);
    console.log("if prints this we did it")
    this.setState({searchResults: newSearch });
  }


  render(){ 
    return (
    <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults  searchResults={this.state.searchResults}
                            onAdd ={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePLaylist}/>
          </div>
        </div>
    </div>
    );
  }
  
}

export default App;
