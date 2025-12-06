'use client';

import Header from "@/components/Header";
import { useDataInit } from "@/hooks/useDataInit";

export default function ModuleLayout({ children }: { children: React.ReactNode }) {
    useDataInit();

    return (<>
        <div
            className="h-full w-full background bg-cover bg-center"
            style={{ backgroundImage: "url('./images/top-view-variety-tablets-painkillers-with-copy-space.jpg')" }}
        >
            <div className="h-full w-full backdrop-blur-md bg-black/30 grid grid-rows-[auto_1fr] overflow-auto scrollbar-hide">
            <Header />
            {children}
            </div>
        </div>
    </>)
}
