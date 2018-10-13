import React, { Component } from 'react';
import '../css/all-heroes.css';
import '../css/bootstrap.min.css';

class AllHeroes extends Component {

    constructor(props) {
        console.log("AllHeroes, Constructor");
        super(props);
        this.state = {
          heroesList: []
        }
    }

    componentWillMount() {
        console.log("AllHeroes, componentWillMount");
        this.getHeroes();
    }

    getHeroes() {
        const self = this;
        console.log("AllHeroes, getHeroes");
        const heroesOpenDota = `https://api.opendota.com/api/heroStats`;
        fetch(heroesOpenDota).then(function (response) {
            return response.json();
        }).then(function (heroStats) {
            console.log(heroStats);
            self.setState({
                heroesList: heroStats
            });
        }).catch(function(error) {
            console.log('Request failed due to ', error)
        });

        fetch('api/dota?q=items').then(function (response) {
            return response.json();
        }).then(function (heroStats) {
            console.log(heroStats);
        }).catch(function(error) {
            console.log('Request failed due to ', error)
        });

    }

    render() {
        console.log("AllHeroes, render");
        console.log("AllHeroes, render(), HeroList = ", this.state.heroesList)
        const heroesList = this.state.heroesList.map((hero) =>
    
            <div key={hero.id.toString()} className="heroDiv col-sm-6 col-md-3 col-xl-5">
            <div className="heroName">
                {hero.primary_attr === 'str'?
                    <p style={{color:'red', fontSize:'40px', textShadow:'1px 1px brown'}}>{hero.localized_name}</p>
                :(hero.primary_attr === 'agi'?
                    <p style={{color:'green', fontSize:'40px', textShadow:'1px 1px darkgreen'}}>{hero.localized_name}</p>
                    :<p style={{color:'blue', fontSize:'40px', textShadow:'1px 1px darkblue'}}>{hero.localized_name}</p>
                )}
            </div>
            <div className="heroImage">
                <img src = {"https://api.opendota.com" + hero.img} style={{marginTop:"0.5%"}} alt={hero.localized_name}  onClick={(e) => this.props.updateContent("hero_details",hero.id,hero.name,hero.localized_name)}/>
            </div>
            <div className="heroStats">
                <table className="table heroStatsTable">

                <tbody>

                    <tr>
                        <td className="stats">Primary Attribute</td>
                        <td className="value">{hero.primary_attr === 'str'?'Strength':(hero.primary_attr === 'agi'?'Agility':'Intelligence')}</td>
                        <td className="stats">Attack Type</td>
                        <td className="value">{hero.attack_type}</td>
                    </tr>

                    <tr>
                        <td className="stats">Health</td>
                        <td className="value">{hero.base_health}</td>
                        <td className="stats">Health Regen</td>
                        <td className="value">{hero.base_health_regen}</td>
                    </tr>

                    <tr>
                        <td className="stats">Mana</td>
                        <td className="value">{hero.base_mana}</td>
                        <td className="stats">Mana Regen</td>
                        <td className="value">{hero.base_mana_regen}</td>
                    </tr>

                    <tr>
                        <td className="stats">Armor</td>
                        <td className="value">{hero.base_armor}</td>
                        <td className="stats">Magic Resistance</td>
                        <td className="value">{hero.base_mr}</td>
                    </tr>

                    <tr>
                        <td className="stats">Attack Min</td>
                        <td className="value">{hero.base_attack_min}</td>
                        <td className="stats">Attack Max</td>
                        <td className="value">{hero.base_attack_max}</td>
                    </tr>

                    <tr>
                        <td className="stats">Strength</td>
                        <td className="value">{hero.base_str}</td>
                        <td className="stats">Strength Gain</td>
                        <td className="value">{hero.str_gain}</td>
                    </tr>

                    <tr>
                        <td className="stats">Agility</td>
                        <td className="value">{hero.base_agi}</td>
                        <td className="stats">Agility Gain</td>
                        <td className="value">{hero.agi_gain}</td>
                    </tr>

                    <tr>
                        <td className="stats">Intelligence</td>
                        <td className="value">{hero.base_int}</td>
                        <td className="stats">Intelligence Gain</td>
                        <td className="value">{hero.int_gain}</td>
                    </tr>

                    <tr>
                        <td className="stats">Attack Range</td>
                        <td className="value">{hero.attack_range}</td>
                        <td className="stats">Attack Rate</td>
                        <td className="value">{hero.attack_rate}</td>
                    </tr>

                    <tr>
                        <td className="stats">Projectile Speed</td>
                        <td className="value">{hero.projectile_speed}</td>
                        <td className="stats">Move Speed</td>
                        <td className="value">{hero.move_speed}</td>
                    </tr>

                </tbody>

                </table>
            </div>
            </div>
        );
        //return <div><h1>DOTA Heroes</h1><div className = "row">{listItems}</div></div>;
    return (
            <div className="container-fluid">
                <div className="hero-details-header page-header">
                    <h1>All Heroes</h1>
                </div>
                <div className = "row heroes-data">
                    {heroesList}
                </div>
            </div>);
    }
}

export default AllHeroes;
