import {SET_ALERT, REMOVE_ALERT} from './types'
import {v4 as uuid} from 'uuid'

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid();

  dispatch({
    type: SET_ALERT,
    payload: {msg, alertType, id}
  })
}

export const removeAlert = () => dispatch => {
  dispatch({
    type: REMOVE_ALERT,
    payload: null
    })
}
