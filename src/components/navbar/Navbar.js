import React, { Fragment } from 'react'

const Navbar = () => {
    return (
        <Fragment>
            <nav className="grey darken-3">
            <div className="nav-wrapper" >
                <a href="/" className="brand-logo right">GW</a>
                <ul id="nav-mobile" className="left">
    
                    <li><a href="/faction" className="waves-effect waves-light btn red darken-4">Faction</a></li>
                    <li><a href="/history" className="waves-effect waves-light btn red darken-4">History</a></li>
                    <li><a href="/shop" className="waves-effect waves-light btn red darken-4">Shop</a></li>
                </ul>

                <ul id="nav-mobile2" className="left hide-on-med-and-down">
                    <li>
                        <a href="#!" className="btn light-green darken-4">
                            Status: <span className="red-text text-darken-2">in battle</span>
                        </a>
                    </li>
                    <li><a href="#!" className="btn light-green darken-4">Credits: 355</a></li>
                    <li><a href="#!" className="btn light-green darken-4">Income: 45/h</a></li>
                    <li>
                        <a href="#" className="btn light-green darken-4">
                            Rank #<span className="red-text text-darken-2">2</span> : ||||||||| | | | | | | | |
                        </a>
                    </li>

                </ul>

                
            </div>
            </nav>
        </Fragment>
    )
}

export default Navbar
