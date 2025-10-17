// app/layout.tsx
import { ReactNode } from 'react';

import AppWrappers from '@/components/AppWrappers';
import Header from '@/components/Header';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <AppWrappers>
                    <div className="prose h-screen w-screen overflow-x-hidden ">
                        <Header />
                        {children}
                    </div>
                </AppWrappers>

            </body>
        </html>
    );
}
