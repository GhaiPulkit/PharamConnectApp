'use client';
import { ReactNode } from 'react';
import { NoSSR } from './NoSSR';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import "@/styles/index.css"

export default function AppWrappers({ children }: { children: ReactNode }) {
  return (
      <NoSSR>
        <ChakraProvider>
              <React.Fragment>
                {children}
              </React.Fragment>
        </ChakraProvider>
      </NoSSR>
  );
}