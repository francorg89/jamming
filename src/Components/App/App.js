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
      searchResults: [],
      playlistName: "The very best playlist",
      playlistTracks:[]
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
    let uris = this.state.playlistTracks.map(ele => ele.uri);
    Spotify.savePLaylist(this.state.playlistName, uris);
  }

  search(term){
    
    Spotify.search(term).then(array => {this.setState({searchResults: array });});
    
    
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
