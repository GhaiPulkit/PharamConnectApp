'use client';

import Header from "@/components/Header";
import { useDataInit } from "@/hooks/useDataInit";
import Footer from '../../components/Footer';

export default function ModuleLayout({ children }: { children: React.ReactNode }) {
    useDataInit();

    return (<>
        <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: "url('./images/top-view-variety-tablets-painkillers-with-copy-space.jpg')" }}
            // style={{background: 'linear-gradient(135deg, #fefbffff, #F0E9D8)'}}
        >
            <div className="h-full w-full bg-[#fdfdfd73] backdrop-blur-md grid grid-rows-[auto_1fr] overflow-auto scrollbar-hide">
            <Header />
            {children}
            {/* <Footer /> */}
            </div>
        </div>
    </>)
}
