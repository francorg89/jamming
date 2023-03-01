import React from "react";
import { TrackList } from "../TrackList/Tracklist";
import "./Playlist.css"

export class Playlist extends React.Component{

    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e){
        let newName = e.target.value;
        this.props.onNameChange(newName);
        console.log(this.props.playlistName);

    }

    render(){
        return (
            <div className="Playlist">
                <input  defaultValue={this.props.playlistName}
                        onChange={this.handleNameChange}/>
                <TrackList  tracks={this.props.playlistTracks} 
                            isRemoval={true}
                            onRemove={this.props.onRemove}/>
                <button className="Playlist-save">
                    SAVE TO SPOTIFY
                </button>
            </div>
        );
    }
}