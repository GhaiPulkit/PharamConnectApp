import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session'
import { appSlice } from './modules/appSlice';

const persistConfig = {
    key: "root",
    storageSession,
};


/* Auth/User slice */
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        authenticated: false,
    },
    reducers: {
        login(state, action) {
            state.user = action.payload.user || null;
            state.token = action.payload.token || null;
            state.authenticated = true;
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.authenticated = false;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
    },
});


export const authActions = authSlice.actions;

const rootReducer = combineReducers({
    app: appSlice.reducer,
    auth: authSlice.reducer
})

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),

});



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;