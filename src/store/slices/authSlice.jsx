import { createSlice } from '@reduxjs/toolkit';
import CONSTANT from '../../utils/constant';

const initialState = {
  authenticated: false,
  loading: false,
  token: null,
  user: {
    name: null,
    email: null
  },
  loginError: ""
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuth: (state, action) => {
      state.authenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload;
    },
    clearAuth: (state) => {
      state.authenticated = false;
      state.token = null;
      state.user = {
        name: null,
        email: null
      };
      state.loginError = "";
    }
  }
});

export const { setLoading, setAuth, setLoginError, clearAuth } = authSlice.actions;

// Async thunk actions
export const authenticateUser = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const baseUrl = CONSTANT.APP_ENV === 'PROD' ? CONSTANT.BASE_URL_PROD : CONSTANT.BASE_URL_DEV;
    const response = await fetch(`${baseUrl}api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      const authData = {
        token: data.token,
        user: data.user
      };

      // Store token and user data in localStorage
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', JSON.stringify(authData.user));

      dispatch(setAuth(authData));
      return { success: true };
    } else {
      dispatch(setLoginError(data.message || 'Login failed'));
      return { success: false, error: data.message };
    }
  } catch (error) {
    dispatch(setLoginError(error.message));
    return { success: false, error: error.message };
  } finally {
    dispatch(setLoading(false));
  }
};

export const logUserOut = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch(clearAuth());
};

export const loadToken = () => (dispatch) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');

  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      dispatch(setAuth({
        token,
        user
      }));
    } catch (error) {
      console.error('Error parsing user data:', error);
      dispatch(logUserOut());
    }
  }
};

// Selectors
export const selectIsAuthenticated = (state) => state.auth.authenticated && state.auth.token;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectLoginError = (state) => state.auth.loginError;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
