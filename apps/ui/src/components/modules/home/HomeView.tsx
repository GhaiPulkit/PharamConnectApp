import { Box, AbsoluteCenter, Button } from '@chakra-ui/react';
import React from 'react';

const HomeView: React.FC = () => {
    return (<>

        <div className="w-full h-full p-0 flex flex-col gap-2">
                    {/* Banner */}

            <div className="px-4 py-8 w-full flex flex-col gap-2 bg-gradient-to-r from-[rgba(223,237,206,1)] to-[rgba(213,237,229,1)]">
                <h1>India&apos;s Leading B2B Pharmaceutical Marketplace</h1>
                <p className="text-[grey]">Connect with verified manufacturers, traders, and distributors. Find quality pharmaceutical products or offer your manufacturing services.
                </p>
                <div className="action-bar flex gap-2">
                    <Button >Browse manufacturers</Button>
                    <Button>Post Requirement</Button>
                </div>
            </div>
            {/* Featured Manufacturer */}
            <div className="p-2">
                <h2>Featured Manufacturers</h2>
                <div className="flex gap-2 flex-wrap">
                {[1,2,3].map((item,idx) => {
                    return (
                        <div key={`item_${idx}`} className="card">

                        </div>
                    )
                })}
                </div>
            </div>
        </div>

    </>


    );
};

export default HomeView;