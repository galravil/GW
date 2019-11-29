import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from '../../components/navbar/Navbar'
import Map from '../../components/map/Map'
import Chat from '../../components/chat/Chat'
// import PlayerList from './components/chat/PlayerList'
import Faction from '../../components/pages/Faction'


const Home = () => {


  return (
    
    <Router>
    <Fragment>

      <div className="grey" style={{overflow: 'hidden'}}>

        <Navbar />
        <div className="row">

          <div className="col s8" style={{minHeight: 'calc(100vh - 84px)'}}>
            
            <Route exact path="/" component={Map} />
            <Route exact path="/faction" component={Faction} />

          </div>

            <div className="col s4" style={{padding: '0'}}>
              <Chat />
            </div>

        </div>
        
      </div>

    </Fragment>
    </ Router>

    

    
  );
}

export default Home;
