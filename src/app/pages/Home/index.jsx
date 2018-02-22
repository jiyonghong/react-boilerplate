import React from 'react';

import { Link } from 'react-router-dom';


class Home extends React.Component {
  render() {
    return (
      <h1>Home <Link to="/other">go to other</Link></h1>
    )
  }
}


export default Home;
