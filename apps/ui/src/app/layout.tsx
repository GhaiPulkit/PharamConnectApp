
import { ReactNode } from 'react';

import AppWrappers from '@/components/AppWrappers';
import Header from '@/components/Header';
import React from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {

  // create context here
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} >
        <AppWrappers>
          <div
            className="prose h-screen w-screen overflow-x-hidden"
            style={{
              margin: 0,
              padding: 0,
              backgroundAttachment: "fixed",
              fontFamily: "sans-serif",
            }}
          >

            {children}
          </div>
        </AppWrappers>
      </body>
    </html>
  );
}
