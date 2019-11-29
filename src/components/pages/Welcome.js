import React, { useState } from 'react'

const Welcome = () => {

  const [backgSize, setBackSize] = useState({
    cybran: {backgroundSize: 'contain'},
    uef: {backgroundSize: 'contain'},
    aeon: {backgroundSize: 'contain'},
    seraphim: {backgroundSize: 'contain'},

    selected_faction: null,
    
  });

  const { cybran, uef, aeon, seraphim, selected_faction } = backgSize

  return (
    <div className='welcome'>
    <div className='container'>
    <div className="row">

        <div className="col s3">
          <div className='cybran'
            onClick={() => setBackSize({
              ...backgSize, 
              cybran: {backgroundSize: 'auto'},
              uef: {backgroundSize: 'contain', filter: 'grayscale(100%)'},
              aeon: {backgroundSize: 'contain', filter: 'grayscale(100%)'},
              seraphim: {backgroundSize: 'contain', filter: 'grayscale(100%)'},
              selected_faction: 'CYBRAN'
            })}
            style={{minHeight: '80vh', ...cybran}}
          ></div>
        </div>

        <div className="col s3">
          <div className='uef'
            onClick={() => setBackSize({
              ...backgSize, 
              cybran: {backgroundSize: 'contain', filter: 'grayscale(100%)'},
              uef: {backgroundSize: 'auto'},
              aeon: {backgroundSize: 'contain', filter: 'grayscale(100%)'},
              seraphim: {backgroundSize: 'contain', filter: 'grayscale(100%)'},
              selected_faction: 'UEF'
            })}

            style={{minHeight: '80vh', ...uef}}
          ></div>
        </div>

        <div className="col s3">
          <div className='aeon' 
            onClick={() => setBackSize({
              ...backgSize, 
              cybran: {backgroundSize: 'contain', filter: 'grayscale(100%)'},
              uef: {backgroundSize: 'contain', filter: 'grayscale(100%)'},
              aeon: {backgroundSize: 'auto'},
              seraphim: {backgroundSize: 'contain', filter: 'grayscale(100%)'},
              selected_faction: 'AEON'
            })}
            
            style={{minHeight: '80vh', ...aeon}}
          ></div>
        </div>

        <div className="col s3">
          <div className='seraphim'
            onClick={() => setBackSize({
              ...backgSize, 
              cybran: {backgroundSize: 'contain', filter: 'grayscale(100%)'},
              uef: {backgroundSize: 'contain', filter: 'grayscale(100%)'},
              aeon: {backgroundSize: 'contain', filter: 'grayscale(100%)'},
              seraphim: {backgroundSize: 'auto'},
              selected_faction: 'SERAPHIM'
            })}
            
            style={{minHeight: '80vh', ...seraphim}}>
          </div>
        </div>


        <div style={{
          color: '#fff',
          fontSize: '50px',
          paddingTop:' 5vh',
          textAlign: 'center',
        }}>
          <p style={{marginBlockEnd: '0em'}}>CHOOSE YOUR SIDE</p>
        </div>

        <div style={{textAlign: 'right', visibility: !selected_faction ? 'hidden': 'visible'}}>
            <a href="../register" style={{ color: '#fff'}}>
              <i className="large material-icons">last_page</i>
            </a>
        </div>

    </div>
    </div>
    </div>
  )
}

export default Welcome
