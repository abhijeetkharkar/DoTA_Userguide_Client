import React, { Component } from 'react';
import '../css/bootstrap.min.css';
import '../css/common-components.css';
import '../css/hero-details.css'
import $ from 'jquery';
import jQuery from 'jquery';
import { parse } from 'querystring';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';



class HomeContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: [],
            radientTeams: [],
            direTeams: []
        }
    }

    render() {
		//console.log(this.state.matchTeams)
		const radients = this.state.radientTeams;
        const listRadient = radients.map( (radient) => {
            var imgSrc = radient[1]
            if (imgSrc == null) {
                imgSrc = "images\no_image.png"
            }
            return  <li className="list-group-item">{radient[0]}
                        <div>
                            <img id={imgSrc} src={imgSrc} width="50" height="50"/>
                        </div>
                    </li>
		});
		const dires = this.state.direTeams
		const listDire = dires.map( (dire) => {
            var imgSrc = dire[1]
            if (imgSrc == null) {
                imgSrc = "images\no_image.png"
            }
            return  <li className="list-group-item">{dire[0]}
                        <div>
                            <img id={imgSrc} src={imgSrc} width="50" height="50"/>
                        </div>
                    </li>
		});
        return (
            <div className="container-fluid">
                <div className="hero-details-header page-header">
                    <h1>Recent Pro Matches</h1>
                </div>
                <div className="row">
                    
                    <div className="col-sm">
                        <ul id="radient-teams">
                            {listRadient}
                        </ul>
                    </div>
                    <div className="col-sm">
                        <ul id="radient-teams">
                            {listDire}
                        </ul>
                    </div>
                    
                </div>
            </div>
        )
    }

    componentWillMount() {
        this.getRecentProMatches()
    }

    getRecentProMatches() {
        var self = this;

            var matchTeams = []
            var rTeams = []
            var dTeams = []
            jQuery.ajax({
                url: "https://api.opendota.com/api/proMatches",
                type: "GET",
                contentType: 'application/json',
                success: function(data) {
                    var proMatchJSON = JSON.stringify(data)
                    //console.log(proMatchJSON);
                    var parsedProMatchJSON = $.parseJSON(proMatchJSON)
                    var i = 0
                    var count = 0
                    while (count < 5 ) {
                        if(parsedProMatchJSON[i].radiant_team_id != null && parsedProMatchJSON[i].dire_team_id != null) {
                            var radient = (parsedProMatchJSON[i].radiant_team_id).toString()
                            var dire = (parsedProMatchJSON[i].dire_team_id).toString()
                            var radientWin = (parsedProMatchJSON[i].radiant_win)
                            var match = [radient, dire, radientWin]
                            matchTeams.push(match);
                            self.setState({matchTeams: matchTeams}) 
                            count = count + 1;
                        }                       
                        i = i + 1;
                        console.log("i = ", i);
                    }
                },
                error: function(jqXHR, status, errorThrown) {},
                timout: 120000,
            }).then(
                function() {
                    //console.log("here")
                    //console.log(matchTeams)
                    for (var i = 0; i < matchTeams.length; i++) {
                        (function() {
                            // RADIENT
                            jQuery.ajax({
                                url: "https://api.opendota.com/api/teams/" + (matchTeams[i][0]).toString(),
                                async: false,
                                type: "GET",
                                contentType: 'application/json',
                                success: function(data) {
                                    var teamJSON = JSON.stringify(data);
                                    var parsedTeamJSON = $.parseJSON(teamJSON);
                                    //console.log(parsedTeamJSON)
                                    var rTeamInfo = [parsedTeamJSON.name, parsedTeamJSON.logo_url]
                                    rTeams.push(rTeamInfo)
                                    //console.log(rTeamInfo)
                                    self.setState({radientTeams: rTeams})

                                },
                                error: function(jqXHR, status, errorThrown) {},
                                timout: 120000,
                            })
                            // DIRE
                            jQuery.ajax({
                                url: "https://api.opendota.com/api/teams/" + (matchTeams[i][1]).toString(),
                                async: false,
                                type: "GET",
                                contentType: 'application/json',
                                success: function(data) {
                                    var teamJSON = JSON.stringify(data);
                                    var parsedTeamJSON = $.parseJSON(teamJSON);
                                    //console.log(parsedTeamJSON)
                                    var dTeamInfo = [parsedTeamJSON.name, parsedTeamJSON.logo_url]
                                    dTeams.push(dTeamInfo)
                                    //console.log(dTeamInfo)
                                    self.setState({direTeams: dTeams})

                                },
                                error: function(jqXHR, status, errorThrown) {},
                                timout: 120000,
                            })
                        })()
                    }
                }
            )
    }
}

export default HomeContent;
