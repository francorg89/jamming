import { Component } from "react";
import { Track } from "./../Track/Track";
import "./TrackList.css";


export class TrackList extends Component{

    

    render(){

        let test = this.props.tracks.map(
            (obj, i) => <Track key={i} track={obj} onAdd={this.props.onAdd}/>
          );

        return (
            <div className="TrackList" >
               
                
               
            {test}
              
            </div>
        );
    }
}

//<Track track={this.props.tracks[0]}/>
  //            <Track track={this.props.tracks[1]}/>