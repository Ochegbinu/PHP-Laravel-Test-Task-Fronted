import { useDispatch, useSelector } from 'react-redux';
import {
  authenticateUser,
  logUserOut,
  loadToken,
  selectIsAuthenticated,
  selectAuthLoading,
  selectLoginError,
  selectUser,
  selectToken
} from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const loginError = useSelector(selectLoginError);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const login = async (email, password) => {
    return await dispatch(authenticateUser(email, password));
  };

  const logout = () => {
    dispatch(logUserOut());
  };

  const initializeAuth = () => {
    dispatch(loadToken());
  };

  return {
    isAuthenticated,
    loading,
    loginError,
    user,
    token,
    login,
    logout,
    initializeAuth
  };
};
