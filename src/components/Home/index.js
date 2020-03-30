//
//
import React, { Component } from 'react';
import HomeSlider from './slider';
import HomeArticles from './articles';
import Subscriptions from '../utils/subscribe';

import Poll from '../utils/poll';

export default class Home extends Component {
  //
  state = {
    home: ''
  };

  render() {
    return (
      <>
        <HomeSlider />
        <Subscriptions />
        <div className="container">
          <HomeArticles />
          <Poll />
        </div>
      </>
    );
  }
}
