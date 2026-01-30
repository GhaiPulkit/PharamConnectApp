import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { set } from "react-hook-form";
import { Manufacturer } from '../../data/manufacturer/index';

/* App Global UI slice */
export const appSlice = createSlice({
    name: 'app',
    initialState: {
        theme: 'light', // 'light' | 'dark'
        loading: false,
        toast: null,

        // Manufacturer
        manufacturerList: Array<Manufacturer>,
        selectedManufacturerId: null,
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
        },
        setSelectedManufacturerId(state, action) {
            state.selectedManufacturerId = action.payload
        }
    },
});

const selectManufacturerList = createSelector(
    (state: RootState) => state.app,
    (ui) => ui.manufacturerList
);

const selectedManufacturerId = createSelector(
    (state: RootState) => state.app,
    (ui) => ui.selectedManufacturerId
);

export const AppSelector = {
    selectManufacturerList,
    selectedManufacturerId
}

export const AppActions = {
    ...appSlice.actions
}