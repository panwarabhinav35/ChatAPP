import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // default storage engine for web

import userReducer from './userSlice'

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
})

// Configure persist settings
const persistConfig = {
  key: 'chatApp',
  storage,
  whitelist: ['user'], // only persist these reducers
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create the store with the persisted reducer and add necessary middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Create the persistor
export const persistor = persistStore(store)
