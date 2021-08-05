import {
  ADD_IMAGE,
  WRONG_IMAGE,
  GET_IMAGE,
  DELETE_IMAGE,
  GET_PROFILE,
  UPDATE_PROFILE,
  UPDATE_FAILED,
  PROFILE_ERROR
} from './types'

import {setAlert} from './alert'
// import authToken from '../utilities/authToken'
import api from '../utilities/api'

//Get Profile
export const getProfile = () => async dispatch => {

  try{
    //Sends the request to the profile/me using the API
    const res = await api.get('/profile/me');

    //If the token is there, do this
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });


  }catch (err) {

    //If the token is not there, do this
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}

    });

  }

};

//Send Profile Data
export const profileData = (formData) => async dispatch => {

    try {

    const res = await api.post('/profile', formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(
      setAlert("Profile Updated", 'success')
    );

    }catch(err) {

      dispatch({
        type: UPDATE_FAILED,
        payload: { msg: err.response.statusText, status: err.response.status}
      });

      dispatch(
        setAlert("Could Not Update Profile", 'danger')
      );

    console.log(err);

    const errors = err.response.data.errors;

    if (errors) {
    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

  }
};

//Send Profile Lins
export const profileLinks = (formData) => async dispatch => {

    try {

    const res = await api.post('/profile/links', formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(
      setAlert("Links Updated", 'success')
    );

    }catch(err) {

      dispatch({
        type: UPDATE_FAILED,
        payload: { msg: err.response.statusText, status: err.response.status}
      });

      dispatch(
        setAlert("Could Not Update Links", 'danger')
      );

    console.log(err);

    const errors = err.response.data.errors;

    if (errors) {
    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

  }
};

//Send Profile Image
export const profileImage = (formData) => async dispatch => {

    try {

    const res = await api.post('/profile/image', formData);

    dispatch({
      type: ADD_IMAGE,
      payload: res.data
    });

    dispatch(
      setAlert("Profile Image Updated", 'success')
    );

    }catch(err) {

      dispatch({
        type: WRONG_IMAGE,
        payload: { msg: err.response.statusText, status: err.response.status}
      });

      dispatch(
        setAlert("Wrong Image", 'danger')
      );

    console.log(err);

    const errors = err.response.data.errors;

    if (errors) {
    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

  }
};

// Get Profile Image
export const getProfileImage = (id) => async dispatch => {
  try{

     const res = await api.get(`/profile/image/`);

    dispatch({
      type: GET_IMAGE,
      payload: res.data
    });


  }catch (err) {

    dispatch({
      type: WRONG_IMAGE
    });
  }
};

// Delete profile image
export const deleteImage = () => async dispatch => {

    await api.delete('/profile/image/');

    dispatch({
      type: DELETE_IMAGE,
    });

    dispatch(setAlert('Image Removed', 'danger'));

};
