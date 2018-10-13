import React, { Component } from 'react';

//import '../css/all-items.css';
import '../css/bootstrap.min.css';
import windowSize from 'react-window-size';
import '../css/all-items.css'
import '../css/all-heroes.css'

class AllItems extends Component {

    constructor(props) {
        console.log("Allitems, Constructor");
        super(props);
        this.state = {
          choice: "recipe",
          itemsRecipeList: [],
          itemsOthersList: []
        }
    }

    componentWillMount() {
        console.log("Allitems, componentWillMount");
        if(this.state.choice === "recipe") {

        }
        this.getitems();
    }

    getitems() {
      const self = this;

        fetch('api/dota?q=items_recipe').then(function (response) {
            return response.json();
        }).then(function (itemStats) {
          self.setState({
            itemsRecipeList: itemStats
          })
            console.log(itemStats);

        }).catch(function(error) {
            console.log('Request failed due to ', error)
        });


        fetch('api/dota?q=items_others').then(function (response) {
            return response.json();
        }).then(function (itemStats) {
          self.setState({
            itemsOthersList: itemStats
          })
            console.log(itemStats);

        }).catch(function(error) {
            console.log('Request failed due to ', error)
        });

        fetch('api/dota?q=items_others').then(function (response) {
            return response.json();
        }).then(function (itemStats) {
          self.setState({
            itemsOthersList: itemStats
          })
            console.log(itemStats);

        }).catch(function(error) {
            console.log('Request failed due to ', error)

    })}


    render() {

      const zeroCostStyle = {
         color: 'green',
         fontSize: '16px'
      };
      const hasCostStyle = {
        color: 'red',
        fontSize: '16px'
      };
        console.log("Allitems, render");
        const listRecipeItems = this.state.itemsRecipeList.map((item) =>
        //  console.log("Item Recipe = ", item.recipe)

              <div key={item.id.toString()} className="col-xs-6 col-md-6 col-lg-3 container">
              <div>
                <div className ="card p-3 itemDiv align-items-stretch clearfix visible-sm">
                  <div className ="card-body">
                    <img className="card-img-top" src={"http://cdn.dota2.com/apps/dota2/images/items/"+item.name.substring(5)+"_lg.png"} style={{ width: "33%" ,borderRadius:"60%"}} alt="Dota Item" onError={(e)=>{e.target.src="http://icons.iconarchive.com/icons/bokehlicia/pacifica/256/steam-2-icon.png"}}/>
                    {item.cost === 0?

                      <h1 className ="card-title cardFont" style={zeroCostStyle}> {item.localized_name} </h1>
                      :(
                       <h1 className ="card-title cardFont" style={hasCostStyle}> {item.localized_name}</h1>
                     )}

                      {item.side_shop === 1?

                      <p className = "card-text cardFont"> Cost: {item.cost}. <b>In Side Shop. </b></p>
                      : (<p className ="card-text cardFont"> Cost: {item.cost} </p>)}


                  </div>
                </div>
                </div>
              </div>

        );

        const listOtherItems = this.state.itemsOthersList.map((item) =>
        //  console.log("Item Recipe = ", item.recipe)

              <div key={item.id.toString()} className="col-xs-6 col-md-6 col-lg-3">
              <div>
                <div className ="card itemDiv p-3">
                  <div className ="card-body">
                    <img className="card-img-top" src={"http://cdn.dota2.com/apps/dota2/images/items/"+item.name.substring(5)+"_lg.png"} style={{width: "33%", borderRadius:"50%"}} alt="Dota Item" onError={(e)=>{e.target.src="http://icons.iconarchive.com/icons/bokehlicia/pacifica/256/steam-2-icon.png"}}/>

                      <h5 className ="card-title cardFont"> {item.localized_name} </h5>
                      {item.side_shop === 1?

                      <p className = "card-text cardFont"> Cost: {item.cost}. <p className="cardSideShop"> In Side Shop. </p></p>
                      : (<p className ="card-text cardFont"> Cost: {item.cost} </p>)}

                  </div>
                </div>
                </div>
              </div>

        );

        return (
              <div className="container-fluid">
                  <div className="hero-details-header page-header">
                    <h1>Items</h1>
                  </div>
                  <div className = "row force-height" style = {{marginLeft:"auto", marginRight:"auto"}}>{listOtherItems}</div>
                  <br/>
                  <div className="hero-details-header page-header">
                    <h1>Recipes</h1>
                  </div>
                  <div className = "row force-height" style = {{marginLeft:"auto", marginRight:"auto"}}>{listRecipeItems}</div>

              </div>);
    }
}

export default AllItems;
