import React, {useState, useEffect} from 'react'

import './Inputs.css'

// Router
import {Link} from 'react-router-dom'

// UI
import Button from '../UI/Button'

// Redux Functions
import {connect} from 'react-redux'
import {setAlert} from '../../redux/actions/alert'
import {loginUser} from '../../redux/actions/inputs'

const Login = ({setAlert, loginUser}) => {

const [formData, setFormData] = useState({
  email: '',
  password: ''
});

const [validData, setValidData] = useState(false);

const {email, password} = formData;

useEffect(() => {
  const performingCheck = setTimeout(() => {
    if (password.trim().length >= 8 && email.includes('@')) {
      checkValidity();
    }
  }, [500])

  console.log('Testing useEffect')
}, [password, email]);

const checkValidity = () => {
  setValidData(true)
}

const onChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
}

const onSubmit = (event) => {
  loginUser({email, password});
  event.preventDefault();
};


  return (
    <div className='input-box'>
        <form>
        <div
        className={`${'inputs-within'} ${
            validData === false ? 'invalid' : ''
          }`}
        >
        <div className='titles'>
          <h1>Log in</h1>
          <p>and collaborate!</p>
        </div>
        <label className="lead">Email </label>
          <input
          type='text'
          name='email'
          placeholder='&#xf0e0; Write your email'
          onChange={(e) => onChange(e)}
          value={formData.email}
          />

        <label className="lead">Password</label>
            <input
            type='password'
            name='password'
            placeholder='&#xF084; Write your password'
            onChange={(e) => onChange(e)}
            value={formData.password}
            />

          <Button
          type='submit'
          onClick={onSubmit}
          disabled={!validData}
          className="button m-1"
          >
            Log In
          </Button>

          <small>Don't have an account? <Link to='/register'>Sign up then!</Link></small>
        </div>
      </form>
    </div>
  )
}

export default connect(null, {setAlert, loginUser})(Login);
