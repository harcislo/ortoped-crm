import { createStore, applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducer from './redux-slices/reducer';

const store = configureStore({
  reducer,
  devTools: true,
  middleware: [thunk],
});

//@ts-ignore
window.store = store

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
