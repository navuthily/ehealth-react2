import InfoSearch from 'components/info-search';
import 'devextreme-react/text-area';
import Tasks from 'pages/tasks/tasks';
import React from 'react';
import './home.scss'
import KeepAlive from 'react-activation';

const Home = () => {

  return (
    <KeepAlive>
      <React.Fragment>
        <div className="form-container">
          <InfoSearch />
          <Tasks />
        </div>
      </React.Fragment>
    </KeepAlive>
  );
}

export default Home;
