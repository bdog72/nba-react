//
//
import React, { Component } from 'react';
import axios from 'axios';
import { URL_TEAMS } from '../utils/paths';

import MyModal from './modal';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default class Teams extends Component {
  //
  state = {
    teams: [],
    filtered: [],
    team: null,
    keyword: ''
  };

  componentDidMount() {
    axios.get(URL_TEAMS).then(response => {
      this.setState({
        teams: response.data,
        filtered: response.data
      });
    });
  }

  clearModal = () => {
    this.setState({
      team: null
    });
  };

  showModalTeam = data => {
    this.setState({
      team: data
    });
  };

  renderList = filtered => {
    return filtered.map((item, index) => (
      <CSSTransition key={index} timeout={1500} classNames="fade">
        <div className="team_item" onClick={() => this.showModalTeam(item)}>
          <img src={`/images/teams/${item.logo}`} alt={item.name} />
        </div>
      </CSSTransition>
    ));
  };

  searchTerm = event => {
    const keyword = event.target.value;
    if (keyword !== '') {
      const list = this.state.teams.filter(item => {
        return item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      });
      this.setState({
        filtered: list,
        keyword
      });
    } else {
      this.setState({
        filtered: this.state.teams,
        keyword
      });
    }
  };

  render() {
    // console.log(this.state);
    return (
      <div className="teams_component">
        <div className="teams_input">
          <input
            type="text"
            placeholder="Search for a team"
            value={this.state.keyword}
            onChange={e => this.searchTerm(e)}
          />
        </div>
        <div className="container teams_container">
          <TransitionGroup component="span">
            {this.renderList(this.state.filtered)}
          </TransitionGroup>
        </div>
        <MyModal team={this.state.team} clearModal={() => this.clearModal()} />
      </div>
    );
  }
}
