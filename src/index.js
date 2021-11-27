import React from "react";
import ReactDOM from 'react-dom';
import SeansonDisplay from "./SeansonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {

    constructor(props) {
       super(props);
       this.state = {
           lat: null,
           errorMessage: ''
       }
       window.navigator.geolocation.getCurrentPosition(
        (position) => {
            this.setState({lat: position.coords.latitude});
        },
        (err) => {
            this.setState({errorMessage: err.message})
        }
        );
    }
    
    renderContent() {
        if (this.state.errorMessage) {
            return (
                <div>Error: {this.state.errorMessage}</div>
            )
        }
        else if (this.state.lat) {
            return (
                <SeansonDisplay lat={this.state.lat} />
            )
        }
        else {
            return(
                <div><Spinner message="Please accept the location request!"/></div>
            )
        }
    }

    render() {
        return (
            <div className="border-red">{this.renderContent()}</div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById("root"));