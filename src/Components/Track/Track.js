import "./Track.css";
import {Component}  from "react";


export class Track extends Component {

    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
    }

    addTrack(){
        
        this.props.onAdd(this.props.track);
    }
    
    renderAction = (isRemoval) => {
        if(isRemoval){
            return  (<button    className="Track-action"
                                onClick={this.addTrack} >
                        +
                    </button>);
        
        }else{
            return (<button className="Track-action"> - </button>);
        }
    }

    render(){

    
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album} </p>
                </div>
                {this.renderAction(true)}
            </div>
        )
    }

    
}