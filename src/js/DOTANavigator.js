import React, { Component } from 'react';
import '../css/bootstrap.min.css';
import '../css/common-components.css';

class DOTANavigator extends Component {
    render() {

        return (
            <div>
                <h1 className = "website-name">DOTA User Guide</h1>
                <div>
                    <button className = "my-nav-tabs" onClick={(e) => this.props.updateContent("home","","","")}>Home</button>
                    <button className = "my-nav-tabs" onClick={(e) => this.props.updateContent("heroes","","","")}>Heroes</button>
                    <button className = "my-nav-tabs" onClick={(e) => this.props.updateContent("items","","","")}>Items</button>
                    <button className = "my-nav-tabs" onClick={(e) => this.props.updateContent("help","","","")}>Help</button>
                </div>
            </div>
        );
    }
 } 

export default DOTANavigator;