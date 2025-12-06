import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

/* App Global UI slice */
export const appSlice = createSlice({
    name: 'app',
    initialState: {
        theme: 'light', // 'light' | 'dark'
        loading: false,
        toast: null,

        // Manufacturer
        manufacturerList: []
    },
    reducers: {
        setTheme(state, action) {
            state.theme = action.payload;
        },
        setLoading(state, action) {
            state.loading = !!action.payload;
        },
        showToast(state, action) {
            state.toast = action.payload;
        },
        clearToast(state) {
            state.toast = null;
        },
        setManufactuerList(state, action) {
            state.manufacturerList = action.payload
        }
    },
});

const selectManufacturerList = createSelector(
    (state: RootState) => state.app,
    (ui) => ui.manufacturerList
);

export const AppSelector = {
    selectManufacturerList
}

export const AppActions = {
    ...appSlice.actions
}