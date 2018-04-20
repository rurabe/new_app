import React from 'react';
import {Link} from 'react-router-dom';

class ResourcesShow extends React.PureComponent {
  render(){
    return (
      <div>
        <h1>Resources#Show</h1>
        <Link to="/">
          <button>Index</button>
        </Link>
      </div>
    );
  }
}

export default ResourcesShow;