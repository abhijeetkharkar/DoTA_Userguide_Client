import React, { Component } from 'react';
import '../css/hero-details.css';
import '../css/all-heroes.css';
import '../css/common-components.css';
import '../css/bootstrap.min.css';
import abilities from '../data/abilities.json'

class HeroDetails extends Component {

    constructor(props) {
        console.log("HeroDetails, Constructor");
        super(props);    
        this.state = {
          id: props.id,
          name: props.name,
          localizedName: props.localizedName,
          abilities: [],
          matches: [],
          players: [],
          player: null,
          team: null,
          match: null,
          matchDetails: {},
          playerDetails: {},
          playerDetails1: {}
        }
    }

    componentWillMount() {
        console.log("HeroDetails, componentWillMount");
        this.getAbilities();
        this.getMatchStats();
        this.getPlayerStats();
    }

    getAbilities() {
        const self = this;
        const abilitiesAll = abilities.abilities;
        const abilitiesHero = abilitiesAll.filter(function(x) { return x.name.includes(self.state.name.replace("npc_dota_hero_", "")+"_"); });
        self.setState({abilities: abilitiesHero})
    }

    getMatchStats() {
        const self = this;
        console.log("HeroDetails, getMatchStats");
        const heroMatchesURL = 'https://api.opendota.com/api/heroes/'+self.state.id+'/matches';
        fetch(heroMatchesURL).then(function (response) {
            return response.json();
        }).then(function (heroMatches) {
            //console.log("HeroDetails, getMatchStats(), Hero Matches = ", heroMatches.slice(0, 10));
            self.setState({
                matches: heroMatches.slice(0, 10)
            });
            return heroMatches.slice(0, 10);
        }).then(function(heroMatches) {
            heroMatches.map(match => {
                self.getMatch(match.match_id, function(matchDetail){
                    const newMatchDetails = { ...self.state.matchDetails}
                    newMatchDetails[matchDetail.match_id] = matchDetail;
                    self.setState({matchDetails: newMatchDetails})
                });
            });
            return heroMatches;
        }).then(function(heroMatches) {
            heroMatches.map(match => {
                self.getPlayer(match.account_id, function(playerDetail){
                    const newPlayerDetails = { ...self.state.playerDetails}
                    newPlayerDetails[playerDetail.profile.account_id] = playerDetail;
                    self.setState({playerDetails: newPlayerDetails})
                });
            });
        }).catch(function(error) {  
            console.log('Request failed due to ', error)  
        });
    }

    getPlayerStats() {
        const self = this;
        console.log("HeroDetails, getPlayerStats");
        const heroPlayersURL = 'https://api.opendota.com/api/heroes/'+self.state.id+'/players';
        fetch(heroPlayersURL).then(function (response) {
            return response.json();
        }).then(function (heroPlayers) {
            console.log("HeroDetails, getPlayerStats(), Hero Players = ", heroPlayers.slice(0, 10));
            self.setState({
                players: heroPlayers.slice(0, 10)
            });
            return heroPlayers.slice(0, 10);
        }).then(function(heroPlayers) {
            heroPlayers.map(player => {
                self.getPlayer(player.account_id, function(playerDetail){
                    const newPlayerDetails = { ...self.state.playerDetails1}
                    newPlayerDetails[playerDetail.profile.account_id] = playerDetail;
                    self.setState({playerDetails1: newPlayerDetails})
                });
            });
        }).catch(function(error) {  
            console.log('Request failed due to ', error)  
        });
    }

    getTeam(id) {
        const teamURL = 'https://api.opendota.com/api/teams/'+id;
        const self = this;
        fetch(teamURL).then(function (response) {
            return response.json();
        }).then(function (team) {
            //console.log("HeroDetails, getTeam(id), Team = ",team);
            self.setState({
                team: team
            });
        }).catch(function(error) {  
            console.log('Request failed due to ', error)  
        });
    }

    getPlayer(id, callback) {
        const playerURL = 'https://dota_userguide_server.herokuapp.com/api/dota?q=player_from_playerID&id='+id;
        fetch(playerURL).then(function (response) {
            return response.json();
        }).then(function (player) {
            //console.log("HeroDetails, getPlayer(id), Player = ", player);
            callback(player)
        }).catch(function(error) {  
            console.log('Request failed due to ', error)  
        });
    }

    getMatch(id, callback) {
        const matchURL = 'https://dota_userguide_server.herokuapp.com/api/dota?q=match_from_matchID&id='+id;
        //console.log("Match ID = ", id)
        fetch(matchURL).then(function (response) {
            return response.json();
        }).then(function (match) {
            //console.log("HeroDetails, getMatch(id), Match = ",match);
            callback(match)
        }).catch(function(error) {  
            console.log('Request failed due to ', error)  
        });
    }

    render() {
        const self = this;

        const abilitiesList = self.state.abilities.map((ability) =>
            <div key={ability.name} className="col-sm-3 col-md-1 col-xl-3">
                <div className="thumbnail">
                    <img src = {"http://cdn.dota2.com/apps/dota2/images/abilities/" + ability.name + "_lg.png"} style={{marginTop:"0.5%"}} alt={ability.name}/>
                    <div className="caption">
                        <p>{ability.name.replace(self.state.name.replace("npc_dota_hero_", ""), "").replace(/_/g, " ").trim().toUpperCase()}</p>
                    </div>
                </div>
            </div>
        );

        //console.log("HeroDetails, render(), matchDetails = ", Object.keys(self.state.matchDetails).length)
        //console.log("HeroDetails, render(), playerDetails = ", Object.keys(self.state.playerDetails).length)

        const matchRows = self.state.matches.map((match) => 
            Object.keys(self.state.matchDetails).length >= 9 && Object.keys(self.state.playerDetails).length >= 9 ? 
                (<tr key={match.match_id}>
                    <td className="td-left td-left-heroes-details">{match.league_name}</td>
                    <td className = "team-logo team-logo-hover" style={{background: "url("+self.state.matchDetails[match.match_id].radiant_team.logo_url+")"}}><a className="tooltiptext">{self.state.matchDetails[match.match_id].radiant_team.name}</a></td>
                    <td className = "team-logo team-logo-hover" style={{background: "url("+self.state.matchDetails[match.match_id].dire_team.logo_url+")"}}><a className="tooltiptext">{self.state.matchDetails[match.match_id].dire_team.name}</a></td>
                    <td>{match.radiant_win?"Radiant":"Dire"}</td>
                    <td className = "team-logo team-logo-hover" style={{background: "url("+self.state.playerDetails[match.account_id].profile.avatar+")"}}><a className="tooltiptext">{self.state.playerDetails[match.account_id].profile.name}</a></td>
                    <td>{match.kills}</td>
                    <td>{match.deaths}</td>
                    <td>{match.assists}</td>
                </tr>) : null
        );

        //console.log("HeroDetails, render(), Match Rows = ", matchRows);

        console.log("HeroDetails, render(), length of playerDetails1 = ", Object.keys(self.state.playerDetails1).length)
        console.log("HeroDetails, render(), playerDetails1 = ", self.state.playerDetails1)
        console.log("HeroDetails, render(), players = ", self.state.players)

        const playerRows = self.state.players.map((player) => 
            Object.keys(self.state.playerDetails1).length === 10 ? 
                (<tr key={player.account_id}>
                    <td className = "td-left team-logo team-logo-hover" style={{background: "url("+self.state.playerDetails1[player.account_id].profile.avatar+")"}}><a className="tooltiptext" href={self.state.playerDetails1[player.account_id].profile.profileurl} target="_blank">{self.state.playerDetails1[player.account_id].profile.name}</a></td>
                    <td>{player.games_played}</td>
                    <td>{player.wins}</td>
                    <td>{self.state.playerDetails1[player.account_id].leaderboard_rank}</td>
                    <td>{self.state.playerDetails1[player.account_id].mmr_estimate.estimate}</td>
                </tr>) : null
        );

        console.log("HeroDetails, render(), Player Rows = ", playerRows);

    return (
                <div className="container-fluid">
                    <div className="hero-details-header page-header">
                        <h1>{self.state.localizedName}</h1>
                    </div>
                    <div className="container-fluid">
                        <div className="hero-details-section-header page-header"><h3>Abilities</h3></div>
                        <div className = "abilities-row row">{abilitiesList}</div>
                    </div>
                    <div className="container-fluid">
                        <div className="hero-details-section-header page-header"><h3>Match Details</h3></div>
                        <div className = "matches-row row">
                            <table className = "my-table table table-hover">
                                <thead>
                                    <tr>
                                        <th className = "th-left">League Name</th>
                                        <th>Radiant</th>
                                        <th>Dire</th>
                                        <th>Winner</th>
                                        <th>Player</th>
                                        <th>Kills</th>
                                        <th>Deaths</th>
                                        <th>Assists</th>
                                    </tr>
                                </thead>
                                <tbody style = {{textAlign:"left"}}>
                                    {matchRows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="hero-details-section-header page-header"><h3>Player Details</h3></div>
                        <div className = "matches-row row">
                            <table className = "my-table table table-hover">
                                <thead>
                                    <tr>
                                        <th className = "th-left">Player</th>
                                        <th>Games Played</th>
                                        <th>Wins</th>
                                        <th>Leaderboard Rank</th>
                                        <th>MMR</th>
                                    </tr>
                                </thead>
                                <tbody style = {{textAlign:"left"}}>
                                    {playerRows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
    }
}

export default HeroDetails;