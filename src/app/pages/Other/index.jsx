import React from 'react';

import { Link } from 'react-router-dom';

import './style.scss';


class Other extends React.Component {
  render() {
    return (
      <div>
        <h1 styleName="blue">Other</h1>
        <Link to="/">go to home</Link>
      </div>
    )
  }
}


export default Other;
