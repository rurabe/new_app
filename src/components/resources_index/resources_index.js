import React from 'react';
import {Link} from 'react-router-dom';

class ResourcesIndex extends React.PureComponent {
  render(){
    return (
      <div>
        <h1>Resources#Index</h1>
        <Link to="/resources/1">
          <button>Show</button>
        </Link>
      </div>
    );
  }
}

export default ResourcesIndex;