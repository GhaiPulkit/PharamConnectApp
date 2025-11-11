
import { ReactNode } from 'react';

import AppWrappers from '@/components/AppWrappers';
import Header from '@/components/Header';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true} >
                <AppWrappers>
                    <div className="prose h-screen w-screen overflow-x-hidden " style={{ background: 'linear-gradient(270deg, white, #ccc, white)' }}>
                        <Header />
                        {children}
                    </div>
                </AppWrappers>

            </body>
        </html>
    );
}
