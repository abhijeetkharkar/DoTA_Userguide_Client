import React, { Component } from 'react';
import './App.css';
import './css/bootstrap.min.css';
import DOTANavigator from './js/DOTANavigator'
import DOTASearchBox from './js/DOTASearchBox';
import DOTARightLane from './js/DOTARightLane';
import HomeContent from './js/HomeContent';
import AllHeroes from './js/AllHeroes';
import AllItems from './js/AllItems';

import HeroDetails from './js/HeroDetails';


class App extends Component {

  constructor() {
    super();
    this.state = {
        choice: "home",
        optional1: "",
        optional2: "",
        optional3: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (choice, optional1, optional2, optional3) => {this.setState({ choice }); this.setState({ optional1 }); this.setState({ optional2 }); this.setState({ optional3 })}

  render() {
    console.log("AFTER BUTTON PRESS = ", this.state.choice)
    const choice = this.state.choice
    const optional1 = this.state.optional1
    const optional2 = this.state.optional2
    const optional3 = this.state.optional3
    return (
      <div className="App container-fluid">
        <DOTANavigator updateContent = {this.handleClick}/>
        <DOTASearchBox/>
        <DOTARightLane/>
        <div className="container my-content">
          { choice === "heroes" && <AllHeroes updateContent = {this.handleClick}/> }
          { choice === "home" && <HomeContent/> }
          { choice === "items" && <AllItems/> }
          { choice === "help" && <h1>Help</h1> }
          { choice === "hero_details" && <HeroDetails id={optional1} name={optional2} localizedName={optional3}/>}
        </div>

        </div>



    );
  }
}

export default App;
