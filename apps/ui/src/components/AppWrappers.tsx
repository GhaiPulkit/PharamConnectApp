'use client';

import { ReactNode, useState } from 'react';
import { NoSSR } from './NoSSR';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import "@/styles/index.css"
import { getManufacturers } from '@/data/manufacturer';
import { AppPrimaryContextProvider } from '@/context/AppContext';
import { Provider, useDispatch } from 'react-redux';
import store, { AppDispatch } from "@/store";
import { AppActions } from '@/store/modules/appSlice';

export default function AppWrappers({ children }: { children: ReactNode }) {
  const [manufacturers, setManufacturers] = useState<any[]>([]);
  const [selectedManufacturerID, setSelectedManufacturerID] = useState<number> ();
  const [query, setQuery] = useState<Object | undefined>(undefined);

  return (
    <ChakraProvider>
      <React.Fragment>
        <Provider store={store}>
          <AppPrimaryContextProvider value={{ manufacturers ,setSelectedManufacturerID, selectedManufacturerID,query, setQuery}}>
            {children}
          </AppPrimaryContextProvider>
        </Provider>
      </React.Fragment>
    </ChakraProvider>
  );
}