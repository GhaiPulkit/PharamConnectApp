import dynamic from 'next/dynamic';
import React, { ReactNode } from 'react';

const _NoSSR = ({ children }: { children: ReactNode }) => <React.Fragment>{children}</React.Fragment>;

export const NoSSR = dynamic(() => Promise.resolve(_NoSSR), {
  ssr: false
});