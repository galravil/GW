import React, { Fragment, useState } from 'react'
import axios from 'axios'


const Register = () => {
  const [user, setUser] = useState({
    fafLogin: '',
    fafPassword: '',
    comName: '',
    valid: false
  });

  const { fafLogin, fafPassword, comName, valid } = user;

  const onChange = e => setUser({...user, [e.target.name]: e.target.value})
  
  const randomName = async e => {
    e.preventDefault()
    // setUser({...user, comName: "Warior of Darkness"})

    const faction = 'AEON'

    const res = await axios.get(`http://localhost:5000/api/registration/name?faction=${faction}`)
    const name = res.data.name
    
    console.log(name)
    setUser({...user, comName: name})
  }

  const onSubmit = e => {
    e.preventDefault()
    console.log('onSubmit')
  }

  return (
    <Fragment>
    <div className='bg'>
    <div className='row' >

      <div className='title'>
        <p style={{ background: 'rgba(0, 0, 0, 0.5)' }}>BATTLES ARE WAITING FOR YOU</p>
      </div>

      <form className='col s12' onSubmit={onSubmit}>
        <div className='row'
          style={{
            marginTop: '20vh',
            background: 'rgba(0, 0, 0, 0.5)', 
            paddingBottom: '20px',
            paddingTop: '10px',
        }}
        > 

        <div className='input-field col offset-s8 s3'>
          <input
            id='fafLogin' type='text' className='validate' 
            value={fafLogin}
            name='fafLogin'
            onChange={onChange}
          />
          <label htmlFor='fafLogin'>FAF Login</label>
        </div>
        
        <div className='input-field col offset-s8 s3'>
          <input 
            id='fafPassword' type='password' className='validate' 
            value={fafPassword}
            name='fafPassword'
            onChange={onChange}
          />
          <label htmlFor='fafPassword'>FAF Password</label>
        </div>

        <div className='input-field col offset-s8 s3'>
          <input 
          // disabled
          id='comName' type='text' className='validate' 
            value={comName}
            readOnly
          />
          <label htmlFor='comName' style={{color: '#fff'}}>
            { comName === '' ? 'Commander name' : ''  }
          </label>
        </div>

        <div className='col offset-s8 s4'>
          <button onClick={randomName} className='btn pulse waves-effect waves-light'>Random
            <i className='material-icons right'>cached</i>
          </button>
        </div>

        </div>

          <div className='next'>
            <a  href="../welcome">
              <i className="large material-icons" style={{float:'left'}}>first_page</i>
            </a>

            <a onClick={onSubmit} 
              className={valid === false ? '' : 'modal-trigger'} 
              href="#modal1"
              // style={{visibility: valid ? 'visible': 'hidden'}}
            >
              <i className="large material-icons">last_page</i>
            </a>       
          
          </div>

      </form>


      <div id="modal1" className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>Modal Header</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          <br/>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </p>
        </div>
        
        <div className="modal-footer">
          <a href="/" className="modal-close waves-effect waves-green btn-flat">Back</a>
          <a href="/" className="modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div>




      </div>
    </div>



 
    </Fragment>
  )
}


export default Register
