'use client';

import React, { createContext, useContext } from 'react';

export const AppPrimaryContext = createContext({});

export const AppPrimaryContextProvider = AppPrimaryContext.Provider;

export const AppPrimaryContextConsumer = AppPrimaryContext.Consumer;

export const useAppPrimaryContext = () => useContext(AppPrimaryContext);

export const withAppPrimaryContext = (Component) => {
  const Wrappedcomponent = (newProps) => {
    return (
      <AppPrimaryContextConsumer>
        {(props) => <Component {...props} {...newProps} />}
      </AppPrimaryContextConsumer>
    );
  };
  return Wrappedcomponent;
};