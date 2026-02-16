
import HomeView from '@/components/modules/home/HomeView';
import { getManufacturers } from '@/data/manufacturer';
import * as React from 'react'
import { GrAttachment } from 'react-icons/gr';
import './index.css';
import PrimaryButton from '@/components/common/PrimaryButton';
import { AbsoluteCenter, Box, Button, Divider, Tooltip } from '@chakra-ui/react';

export default function Home() {
    return (
        <>
        <div className="relative h-full w-full text-white font-bold bg-pink">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className=' min-w-[600px] flex flex-col gap-[10px]'>
                   {/* label */}
                    <div className="text-[2rem] text-gray-600 ">Tell us what you are looking for ?
                        <Tooltip placement='top-start' label="You can search for Manufacturers, Products, or Compositions" aria-label='A tooltip'>
                            <span className='text-[0.8rem] text-gray-500 cursor-pointer ml-2'>Help</span>
                        </Tooltip>
                    </div>
                    {/* Input */}
                    <div className="bg-gray-100 mt-[20px]">
                        <div id="input-q-wrap" className=" box rounded-xl w-full bg-[white] h-full text-gray-300 py-2 px-2 flex ">
                            <div className="flex items-center p-2 hover:bg-gray-300 hover:text-white rounded-md cursor-pointer">
                                <GrAttachment size={'10px'}/>
                            </div>
                            <div className="flex items-center flex-1">
                                <input className='placeholder:text-[12px] font-regular text-gray-200 focus:border-none' placeholder='Looking for Manufacturer, Products or Compositions'></input>
                            </div>
                        </div>
                    </div>
                    {/* hint */}
                    <div className="text-[10px] text-gray-400 italic"> You can type any composition, product, or product type and we'll find the best matches for you.</div>
                    {/* action */}
                    <div className="w-full h-full flex gap-2 mt-[20px]"> 
                        <Button title="Search" className='w-full !bg-[#0096ff66] !text-white'>Search</Button>
                        <Box position='relative'  className='flex-1 px-[2rem]'>
                            <Divider colorScheme="pink" size={"2px"}/>
                            <AbsoluteCenter bg='transparent' px='4'>
                                <span className='text-sm text-gray-400'>OR</span>
                            </AbsoluteCenter>
                        </Box>
                       <Button title="Browse manufacturers" className='w-full !bg-[#0096ff66] !text-white'>Browse Manufactureres</Button>
                    </div>

                    {/* <GrAttachment />
                    <div className="w-full h-full bg-[#c1c1c1] mx-3 rounded-full overflow-hidden">
                        Tell us about your project
                    </div> */}
                </div>
            </div>
        </div>
        </>
    );
}