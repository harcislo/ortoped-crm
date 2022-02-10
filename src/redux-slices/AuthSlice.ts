import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';
import api from '../api';
import { User, FieldError, LoginRequestBodyOptions } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  token: string | null;
  error: FieldError;
}
const initialState: AuthState = {
  user: null,
  loading: false,
  token: null,
  error: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      if (Object.keys(state.error).length !== 0) {
        state.error = {};
      }
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.token = action.payload.authKey;
    },
    loginFailure: (state, action: PayloadAction<FieldError>) => {
      state.loading = true;
      state.error = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, setToken } = authSlice.actions;

export const getLoginLoading = (state: RootState) => state.auth.loading;

export const getUserData = (state: RootState) => state.auth.user;

export const getIsAuthenticated = (state: RootState) => Boolean(state.auth.token);

// Thunk actions
export const login = (login: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(loginStart());

    try {
      const response = await api.post<LoginRequestBodyOptions>('users/security/login', {
        'login-form': {
          login,
          password,
        },
      });
      if (response.data.status !== 'ok') {
        throw response.data.errors;
      }
      dispatch(loginSuccess(response.data.user!));
      localStorage.setItem('token', response.data.user!.authKey);
      //showLoginSuccessMessage();
    } catch (error: any) {
      dispatch(loginFailure(error as FieldError));
      // TODO условие ? Код ошибки ?
      //showLoginErrorMessage();
    }
  };
};

export const logout = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setToken(null));
    localStorage.removeItem('token');
  };
};

export default authSlice.reducer;
