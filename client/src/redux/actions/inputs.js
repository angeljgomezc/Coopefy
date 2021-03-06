import {
  LOGIN,
  // GOOGLELOGIN,
  // GOOGLELOGOUT,
  LOGOUT,
  REG_SUCCESS,
  REG_FAILED,
  LOADED,
  NOT_LOADED,
  PROFILE_ERROR} from './types'

import {setAlert} from './alert'
import authToken from '../utilities/authToken'
import api from '../utilities/api'

//Registering a New User
export const registerUser = (history, username, email, password) => async dispatch => {

  const body = JSON.stringify({username, email, password});

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {

    const res = await api.post('/users', body, config);

    dispatch({
      type: REG_SUCCESS,
      payload: res.data
     })

     dispatch (
       setAlert('Registered Successfully', 'success'),
       history.push('/dashboard')
     );


  } catch(err) {
    console.error(err.message)

    const errors = err.response.data.errors;

    if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({ type: REG_FAILED })
    }
  }

//Login User In
export const loginUser = (history, {username, email, password}) => async dispatch => {

  const body = JSON.stringify({username, email, password});

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await api.post('/auth', body, config);
    dispatch({
      type: LOGIN,
      payload: res.data
     })

     dispatch (
       setAlert('Logged In', 'success'),
       history.push('/dashboard')
     );

     dispatch(loadUser())

  } catch(err) {
    console.error(err.message)
    const errors = err.response.data.errors;

    if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({ type: LOGOUT })
    }
  }

  // //Login Via Google
  // export const googleLogin = (res) => async dispatch => {
  //
  //   const body = JSON.stringify(res.tokenId);
  //
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }
  //
  //   try {
  //     const res = await api.post('/google', body, config)
  //     const data = await res.json()
  //
  //     dispatch({
  //       type: GOOGLELOGIN,
  //       payload: res.data
  //     })
  //
  //     dispatch(
  //       setAlert('Logged In', 'success'),
  //       console.log(res)
  //     )
  //
  //     dispatch(loadUser())
  //
  //   } catch (err) {
  //     console.error(err.message)
  //     const errors = err.response.data.errors;
  //
  //     if (errors) {
  //         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
  //     }
  //
  //     dispatch({ type: GOOGLELOGOUT })
  //
  //   }
  // }
  //
  // //Logout Via Google
  // export const googleLogout = () => async dispatch => {
  //   dispatch({
  //     type: GOOGLELOGOUT
  //    })
  //
  //    dispatch (
  //      setAlert('Google Logout', 'danger')
  //    );
  // }

  // Log User Out
  export const logUserOut = () => async dispatch => {

      dispatch({
        type: LOGOUT
     })

     dispatch({
       type: PROFILE_ERROR
    })

       dispatch (
         setAlert('Logged Out', 'danger')
       );

       dispatch(loadUser())
  }

  //Load User
  export const loadUser = () => async dispatch => {

    if (localStorage.token) {
      authToken(localStorage.token);
    }

    try {

      const res = await api.get('/auth');

      dispatch({
        type: LOADED,
        payload: res.data
      })

    } catch (err) {

      console.error(err.message)

      dispatch({
        type: NOT_LOADED
      })
    }
  }
