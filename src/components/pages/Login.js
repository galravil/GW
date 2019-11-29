import React, { Fragment, useState } from 'react'
import axios from 'axios'


const Login = () => {

  const [user, setUser] = useState({
    fafLogin: '',
    fafPassword: '',
    valid: false
  });

  const { fafLogin, fafPassword, valid } = user   // eslint-disable-line

  const onChange = e => setUser({...user, [e.target.name]: e.target.value})

  const onSubmit = async e => {
    e.preventDefault()
    console.log('onSubmit')

    const res = await axios.post(`http://localhost:5000/api/auth`, {
      'fafLogin': fafLogin,
      'fafPassword': fafPassword
    })

    console.log(res)
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


          <button class="btn right waves-effect waves-light" 
            type="submit" name="action"
            style={{marginRight: '10vw'}}
            onSubmit={onSubmit}
          >
            Login
            <i class="material-icons right">send</i>
         </button>
        </div>

      </form>

    </div>
    </div>
    </Fragment>
  )
}

export default Login
