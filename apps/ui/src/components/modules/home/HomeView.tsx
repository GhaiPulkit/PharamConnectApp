import Banner from '@/app/home/components/Banner';
import { Box, AbsoluteCenter, Button } from '@chakra-ui/react';
import React from 'react';
import { Grid, GridItem } from "@chakra-ui/react"
import { FiArrowUpRight } from "react-icons/fi";

const HomeView: React.FC = () => {
    return (<>

        <div className="w-full h-full p-0 flex flex-col gap-2 ">
            {/* Banner */}
            {/* <Banner /> */}
            <div id="banner-wrapper" className="px-4 py-8 w-full flex flex-col gap-2 bg-transparent">
                <div id="banner-body" className="rounded-xl bg-[#11111110] py-[3rem] px-[2rem] backdrop-blur-xl flex justify-center items-center" style={{ border: "1px solid #eaeaeaff" }}>
                    <div className="bg-transparent max-w-[700px] p-2 text-center flex flex-col gap-8">
                        <h1>Your one stop desitination for Pharama Marketplace</h1>
                        <p className="text-[grey]">Connect with verified manufacturers, traders, and distributors. Find quality pharmaceutical products or offer your manufacturing services.
                        </p>
                        <Button>Start Your Search</Button>
                        <Button>Get In Touch</Button>
                    </div>
                </div>
            </div>
            {/* Featured Manufacturer */}
            <div className="py-[3rem] px-[2rem] backdrop-blur-xl flex justify-center items-center max-w-[1100px] mx-auto">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <h2>Featured Manufacturers</h2>
                        <div className="text-[black] text-4xl"> Everything You Need to Build Better Products</div>
                    </div>
                    <Grid templateColumns="repeat(3, 1fr)" gap="6">
                        <GridItem>
                            <div className="w-full aspect-square rounded-xl !border-[1px] border-[black] bg-[#ffffff90] p-3 drop-shadow-xl">
                                <div className="w-full p-1 flex flex-col gap-2">
                                    <p className="text-[grey]">BOINIC MEDICARE</p>
                                    <div className="flex-1 aspect-square">
                                        <img src="https://www.freeiconspng.com/uploads/blank-logo-design-for-brand-13.png" alt="" />
                                    </div>
                                    <div className="action-w grid grid-cols-2 flex p-2 !border-t-[1px]">
                                        <p className='text-sm'>99 products</p>
                                        <p className='text-sm'>45 successfull deliveries</p>
                                    </div>
                                    <div className="font-light text-[black] flex items-center gap-1"> View Market Analysis <FiArrowUpRight /></div>
                                </div>
                            </div>
                        </GridItem>
                        <GridItem>
                            <div className="w-full aspect-square rounded-xl !border-[1px] border-[black] bg-[#ffffff90] p-3 drop-shadow-xl">
                                <div className="w-full p-1 flex flex-col gap-2">
                                    <p className="text-[grey]">BOINIC MEDICARE</p>
                                    <div className="flex-1 aspect-square">
                                        <img src="https://www.freeiconspng.com/uploads/blank-logo-design-for-brand-13.png" alt="" />
                                    </div>
                                    <div className="action-w grid grid-cols-2 flex p-2 !border-t-[1px]">
                                        <p className='text-sm'>99 products</p>
                                        <p className='text-sm'>45 successfull deliveries</p>
                                    </div>
                                    <div className="font-light text-[black] flex items-center gap-1"> View Market Analysis <FiArrowUpRight /></div>
                                </div>
                            </div>
                        </GridItem>
                        <GridItem>
                            <div className="w-full aspect-square rounded-xl !border-[1px] border-[black] bg-[#ffffff90] p-3 drop-shadow-xl">
                                <div className="w-full p-1 flex flex-col gap-2">
                                    <p className="text-[grey]">BOINIC MEDICARE</p>
                                    <div className="flex-1 aspect-square">
                                        <img src="https://www.freeiconspng.com/uploads/blank-logo-design-for-brand-13.png" alt="" />
                                    </div>
                                    <div className="action-w grid grid-cols-2 flex p-2 !border-t-[1px]">
                                        <p className='text-sm'>99 products</p>
                                        <p className='text-sm'>45 successfull deliveries</p>
                                    </div>
                                    <div className="font-light text-[black] flex items-center gap-1"> View Market Analysis <FiArrowUpRight /></div>
                                </div>
                            </div>
                        </GridItem>
                    </Grid>

                </div>

            </div>
        </div>

    </>


    );
};

export default HomeView;