import React from 'react';

import { Link } from 'react-router-dom';

import './style.scss';


class Home extends React.Component {
  render() {
    return (
      <div>
        <h1 styleName="red">Home</h1>
        <Link to="/other">go to other</Link>
      </div>
    )
  }
}


export default Home;
