
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
              background: `
      radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15), transparent 60%),
      radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1), transparent 70%),
      linear-gradient(135deg, #f0f3f7, #dfe3e8)
    `,
              backgroundAttachment: "fixed",
              fontFamily: "sans-serif",
            }}
          >
            <Header />
            {children}
          </div>
        </AppWrappers>
      </body>
    </html>
  );
}
