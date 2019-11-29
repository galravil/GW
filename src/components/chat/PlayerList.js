import React, { Component , Fragment } from 'react'
// import M from 'materialize-css/dist/js/materialize.min.js';

class PlayerList extends Component {
  componentDidMount() {

  // var elem = document.querySelector(".button-collapse");

  // M.Sidenav.init(elem, {
  //     menuWidth: '300',
  //     edge: "right",
  //     // inDuration: 250,
  //     closeOnClick: true,
      
  // })
  };

  render() {
    return (

      <Fragment>
        <ul id="slide-out" class="sidenav">>
          <li><a href="#!">Second Link</a></li>
          <li><div className="divider"></div></li>
          <li><a className="subheader">Subheader</a></li>
          <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
        </ul>
        <a href="#" data-target="slide-out" className="sidenav-trigger button-collapse"><i className="material-icons">menu</i></a>
        
      </Fragment>
    )
  }
}

export default PlayerList
