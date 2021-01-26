import * as actionTypes from "../Constants/userConstants"
import Constants from '../../Constants/globalConstants'
import axios from 'axios'
import { handleError } from '../../helpers/handleError'
import { history } from '../../helpers/history'

export const loginRequest = (user) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.USER_LOGIN_REQUEST });

    const { data } = await axios.post('/api/user/login', user)

    if (data.message === Constants.Success) {
      // API returns : message, token, user
      localStorage.setItem('token', `Bearer ${data.token}`)

      dispatch({
        type: actionTypes.USER_LOGIN_SUCCESS,
        payload: data.user
      });
      setTimeout(() => {
        history.push('/')
      }, 1000)

    } else {
      // API returns : error message
      dispatch({
        type: actionTypes.USER_LOGIN_FAIL,
        payload: data.message
      })
    }
  } catch (err) {
    dispatch({
      type: actionTypes.USER_LOGIN_FAIL,
      payload: handleError(err)
    })
  }
}

export const registerRequest = (user) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.USER_REGISTER_REQUEST });

    const { data } = await axios.post('/api/user/register', user)

    if (data.message === Constants.Success) {
      dispatch({ type: actionTypes.USER_REGISTER_SUCCESS });
      setTimeout(() => {
        history.push('/login')
      }, 1500)

    } else {
      // API returns : error message
      dispatch({
        type: actionTypes.USER_REGISTER_FAIL,
        payload: data.message
      })
    }
  } catch (err) {
    dispatch({
      type: actionTypes.USER_REGISTER_FAIL,
      payload: handleError(err)
    })
  }
}

export const updateRequest = (user) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_USER_REQUEST });

    const { data } = await axios.put('/api/user/update', user)

    if (data.message === Constants.Success) {
      dispatch({
        type: actionTypes.UPDATE_USER_SUCCESS,
        payload: data.user
      })
      setTimeout(() => {
        history.push('/');
      }, 1500)
    } else {
      dispatch({
        type: actionTypes.UPDATE_USER_FAIL,
        payload: data.message
      })
    }
  } catch (err) {
    dispatch({
      type: actionTypes.UPDATE_USER_FAIL,
      payload: handleError(err)
    })
  }

}

export const logOut = () => (dispatch) => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  dispatch({ type: actionTypes.USER_LOGOUT });
  history.push('/');
}

export const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_USER_REQUEST });

    const { data } = await axios.get('/api/user')

    if (data.message === Constants.Success) {
      // API returns : message, user
      dispatch({
        type: actionTypes.GET_USER_SUCCESS,
        payload: data.user
      });
    } else {
      // API returns : error message
      dispatch({
        type: actionTypes.GET_USER_FAIL,
        payload: data.message
      })
    }
  } catch (err) {
    dispatch({
      type: actionTypes.GET_USER_FAIL,
      payload: handleError(err)
    })
  }
}