'use client';

import PrimaryButton from "@/components/common/PrimaryButton";
import { Button, Card, Grid } from "@chakra-ui/react";
import { CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa";


export const ManufacturerShowGrid = ({ manufacturers, navigateToManufacturer }: { manufacturers: any, navigateToManufacturer: (id: number) => any }) => {

    return <Grid templateColumns='repeat(3, 1fr)' gap={8}>

        {manufacturers?.map(({ empty = false, id, compositionAvailable = [], name, description, avatar, products = 0, location }: any, idx: number) => (

            !empty ? (
                <div className='flex flex-col gap-2 bg-white !border-1 !border-gray-100 p-[20px] rounded-md drop-shadow-xl' key={`manufacturer-${idx}`}>
                    <div className="w-full p-1 flex flex-col gap-3">
                        <div className="h-auto grid grid-cols-[1fr_auto]">
                            <img className="!h-[50px] rounded-full aspect-square object-fit" src={"./logos/cropped-welldone-logo.webp"} onError={(e) => e.currentTarget.src = "https://www.freeiconspng.com/uploads/blank-logo-design-for-brand-13.png"} alt="" />
                            <div className="text-xs font-bold rounded-2xl !bg-teal-50 w-full h-fit p-1 px-4 !text-teal-800 !border-teal-100 !border-1 flex gap-2"> <FaStar /> Sponsored</div>
                        </div>
                        <span className="!text-gray-500 capitalize text-xl">{name}</span>
                        <p className="text-xs font-medium text-gray-500">{description || 'Description Goes here'}</p>

                        <div className="action-w grid grid-cols-[repeat(2,1fr)] gap-4 my-2">
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-xs font-bold text-gray-500">Products</span>
                                <span className='text-lg text-[darkgreen]'>{compositionAvailable.length}</span>
                            </div>
                             <div className="flex flex-col items-center gap-2">
                                <span className="text-xs font-bold text-gray-500">Compositions</span>
                                <span className='text-lg text-[darkgreen]'>{compositionAvailable.length}</span>
                            </div>
                        </div>
                        <div className="action-wrapper grid grid-cols-2">
                            <div className="text-xs font-light text-[black] flex items-center gap-1"> <CiLocationOn />{location}</div>
                            <div className="flex justify-end"><PrimaryButton onClick={() => navigateToManufacturer(id)} title={'View'}></PrimaryButton></div>
                        </div>

                    </div>
                </div>
            ) : <Card className='flex flex-col items-center justify-center rounded-xl !border-[1px] !border-[#ffffff] bg-[#ffffff90] p-3 drop-shadow-xl' key={`manufacturer-${idx}`}>
                <p className='text-sm text-[lightgray] font-bold italic'> YOUR PROFILE GOES HERE.</p>
            </Card>
        ))}
    </Grid>
}