import React from 'react';

import logoFile from './../img/simpleAPILogoWhite.svg';
import DjangoCSRFToken from './DjangoCSRFToken.jsx';


export default class Header extends React.Component {

  constructor (props) {
    super(props);

    if (sessionStorage.getItem('eventbrite_code')) {
      this.state = {
        'applied': "True",
        'event_link': window.initialData.event_link,
        'eventbrite_code': sessionStorage.getItem('eventbrite_code'),
        'given_name': sessionStorage.getItem('given_name'),
      }
    }
    else {
      if (window.initialData.eventbrite_code) {
        sessionStorage.setItem('eventbrite_code', window.initialData.eventbrite_code);
        sessionStorage.setItem('given_name', window.initialData.given_name);
      }
      this.state = window.initialData;
    }
  }

  render () {
    let application = "";

    if (this.state.error) {
      application = (
        <div>
          <h5 className="yellow-text">There was an error authenticating you, please register again!</h5>
          <form action="/applications/login/process" method="post">
            <DjangoCSRFToken />
            <button className="btn" type="submit">Register Now</button>
          </form>
        </div>
      )
    }
    else if (this.state.applied === "True") {
      application = (
        <div>
          <h5 className="yellow-text">
            Thanks { this.state.given_name },
            now hurry and register <a target="_blank" href={ this.state.event_link }>here</a> using the code below:
          </h5>
          <p><b>{ this.state.eventbrite_code }</b></p>
        </div>
      )
    }
    else {
      application = (
        <div>
          <form action="/applications/login/process" method="post">
            <DjangoCSRFToken />
            <button className="btn" type="submit">Register Now</button>
          </form>
        </div>
      );
    }

    return (
      <div className="header">
        <img src={logoFile} />
        <h1>UCL API Hackathon</h1>
        <h2>7th-8th October 2017</h2>
        { application }
      </div>
    )
  }

}
