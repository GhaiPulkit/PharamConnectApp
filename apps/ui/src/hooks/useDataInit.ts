'use client';
import { getManufacturers } from "@/data/manufacturer";
import { AppDispatch } from "@/store";
import { AppActions } from "@/store/modules/appSlice";
import React from "react";
import { useDispatch } from "react-redux";

export const useDataInit = () => {
    const dispatch: AppDispatch = useDispatch();
    React.useEffect(() => {
        dispatch(AppActions.setManufactuerList(getManufacturers))
    }, []);

    return
}