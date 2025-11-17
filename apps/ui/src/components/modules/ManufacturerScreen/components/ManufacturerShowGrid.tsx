'use client';

import { Button, Card, Grid } from "@chakra-ui/react";
import { CiLocationOn } from "react-icons/ci";


export const ManufacturerShowGrid = ({ manufacturers, navigateToManufacturer }: { manufacturers: any, navigateToManufacturer: (id: number) => any }) => {
    return <Grid templateColumns='repeat(3, 1fr)' gap={4}>

        {manufacturers?.map(({ empty = false, id, compositionAvailable = [], name, description, avatar, products = 0, location }: any, idx: number) => (

            !empty ? (
                <Card className='flex flex-col gap-2 p-[1rem] rounded-xl !border-[1px] !border-[#ffffff] bg-[#ffffff90] p-3 drop-shadow-xl' key={`manufacturer-${idx}`}>
                    <div className="w-full p-1 flex flex-col gap-2">
                        <h3 className="text-[grey] capitalize">{name}</h3>
                        <p>{description}</p>
                        <div className="h-auto p-[4rem]">
                            <img className="h-[200px] aspect-square object-fit" src={"./logos/cropped-welldone-logo.webp"} onError={(e) => e.currentTarget.src = "https://www.freeiconspng.com/uploads/blank-logo-design-for-brand-13.png"} alt="" />
                        </div>
                        <div className="action-w flex flex-col p-2 !border-t-[1px]">
                            <div className="">
                                <span className='text-lg text-[darkgreen]'>{compositionAvailable.length}</span><span className='text-sm'> Compositions Available</span>
                            </div>
                        </div>
                        <div className="action-wrapper grid grid-cols-2">
                            <div className="text-xs font-light text-[black] flex items-center gap-1"> <CiLocationOn />{location}</div>
                            <Button onClick={() => navigateToManufacturer(id)}>View</Button>
                        </div>

                    </div>
                </Card>
            ) : <Card className='flex flex-col items-center justify-center rounded-xl !border-[1px] !border-[#ffffff] bg-[#ffffff90] p-3 drop-shadow-xl' key={`manufacturer-${idx}`}>
                <p className='text-sm text-[lightgray] font-bold italic'> YOUR PROFILE GOES HERE.</p>
            </Card>
        ))}
    </Grid>
}