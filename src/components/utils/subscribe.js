//
//
import React, { Component } from 'react';
import axios from 'axios';
import { URL_SUBS } from './paths';

export default class Subscriptions extends Component {
  state = {
    email: '',
    error: false,
    success: false,
    alreadyIn: false
  };

  saveSubscription = email => {
    return axios.get(`${URL_SUBS}?email=${email}`).then(response => {
      if (!response.data.length) {
        axios(URL_SUBS, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify({ email })
        }).then(response => {
          this.setState({
            email: '',
            success: true
          });
          this.clearMessages();
        });
      } else {
        this.setState({
          email: '',
          alreadyIn: true
        });
        this.clearMessages();
      }
    });
  };

  clearMessages = () => {
    setTimeout(() => {
      this.setState({
        error: false,
        success: false,
        alreadyIn: false
      });
    }, 2000);
  };

  handleSubmit = event => {
    event.preventDefault();
    let email = this.state.email;
    let regex = /\S+@\S+\.\S+/;

    if (regex.test(email)) {
      this.saveSubscription(email);
    } else {
      this.setState({ error: true });
      this.clearMessages();
    }
  };

  onChangeInput = event => {
    return this.setState({
      email: event.target.value
    });
  };

  render() {
    const state = this.state;
    return (
      <div className="subcribe_panel">
        <h3>Subscribe to us</h3>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={state.email}
              placeholder="Enter Valid Email"
              onChange={this.onChangeInput}
            />
            <div className={state.error ? 'error show' : 'error'}>
              Check your email Bozo
            </div>
            <div className={state.success ? 'success show' : 'success'}>
              Thank you Bozo
            </div>
            <div className={state.alreadyIn ? 'success show' : 'success'}>
              You are already in the DataBase
            </div>
          </form>
        </div>
        <small>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa
          accusantium et deserunt eveniet distinctio perferendis, repudiandae.
        </small>
      </div>
    );
  }
}
