import React from 'react';

import { Link } from 'react-router-dom';


class Other extends React.Component {
  render() {
    return (
      <h1>Other <Link to="/">go to home</Link></h1>
    )
  }
}


export default Other;
