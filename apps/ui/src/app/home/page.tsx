'use client';

import HomeView from '@/components/modules/home/HomeView';
import { getManufacturers } from '@/data/manufacturer';
import * as React from 'react'

export default function Home() {
    return (
        <>
        <div className="h-full w-full text-white font-bold">
            <HomeView/>
        </div>
        </>
    );
}