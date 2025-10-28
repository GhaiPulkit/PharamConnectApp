import Banner from '@/app/home/components/Banner';
import { Box, AbsoluteCenter, Button, Divider, VStack, Flex, FormControl, FormLabel, Center } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Grid, GridItem } from "@chakra-ui/react"
import { FiArrowUpRight } from "react-icons/fi";
import SearchForm from '@/app/home/components/SearchForm';
import { MANUFACTURES_LIST } from '@/data/manufacturer';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import * as yup from "yup";
import { CiLocationOn } from 'react-icons/ci';

const CategoriesView: React.FC = () => {
    const [manufacturers, setManufacturers] = React.useState(MANUFACTURES_LIST);

    // Yup validation schema
    const schema = yup.object({
        product: yup.string().nullable(),
        salt: yup.string().nullable(),
        minOrders: yup.number().nullable()
    }).required();

    // Infer TypeScript type from schema (optional but helpful)
    type FormData = yup.InferType<typeof schema>;
    const searchForm = useForm<FormData>({
        resolver: yupResolver(schema) as unknown as Resolver<FormData>,
        mode: "onChange",
        defaultValues: {
            product: "",
            salt: "",
            minOrders: 0
        },
    });

    const { subscribe, watch } = searchForm;
    useEffect(() => {
        console.log("Subscribed to form changes");
        // make sure to unsubscribe;
        const callback = subscribe({
            formState: {
                values: true,
            },
            callback: ({ values }: { values: any }) => {
                console.log(values)
            },
        })

        return () => callback()
    }, [subscribe])

    return (<>

        <div className="w-full h-full p-0 flex flex-col gap-2 ">
            {/* Banner */}
            <div id="banner-wrapper" className=" px-4 py-8 w-full flex flex-col gap-2 bg-transparent">
                <div id="banner-body" className=" rounded-xl bg-[#11111110] py-[3rem] px-[2rem] backdrop-blur-xl" style={{ border: "1px solid #eaeaeaff" }}>
                    <Flex className={''} gap={2}>
                        {/* <Flex justify='start' align={'center'} className='w-1/2'>
                            <SearchForm/>
                        </Flex> */}
                        <Flex justify={'center'} className='w-full'>
                            <div className="bg-transparent max-w-[700px] p-2 text-center flex flex-col gap-8">
                                <h1>Your one stop desitination for Pharama Marketplace</h1>
                                <p className="text-[grey]">Connect with verified manufacturers, traders, and distributors. Find quality pharmaceutical products or offer your manufacturing services.
                                </p>
                                <h2> Tell us what you are looking for?</h2>
                                <SearchForm form={searchForm} />
                            </div>
                        </Flex>
                    </Flex>

                </div>
            </div>
            {/* Featured Manufacturer */}
            <div className="py-[3rem] px-[2rem] backdrop-blur-xl flex justify-center items-center max-w-[1100px] mx-auto">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <h2>Results</h2>
                        <div className="text-[black] text-4xl"> Everything You Need to Build Better Products</div>
                    </div>
                    <Grid templateColumns="repeat(3, 1fr)" gap="6">

                        {manufacturers.map(({id, name, logoUrl, location, productsCount, successfulDeliveries}, idx) => (

                            <GridItem key={`manufacturer-${idx}`}>
                                <div className="w-full aspect-square rounded-xl !border-[1px] border-[black] bg-[#ffffff90] p-3 drop-shadow-xl">
                                    <div className="w-full p-1 flex flex-col gap-2">

                                        <p className="text-[grey]">{name}</p>
                                        <div className="flex-1 aspect-square">
                                            <img src={logoUrl} onError={(e) => e.currentTarget.src = "https://www.freeiconspng.com/uploads/blank-logo-design-for-brand-13.png"} alt="" />
                                        </div>
                                        <div className="action-w grid grid-cols-2 flex p-2 !border-t-[1px]">
                                            <p className='text-sm'>{productsCount} products</p>
                                            <p className='text-sm'>{successfulDeliveries} successfull deliveries</p>
                                        </div>
                                        <div className="text-xs font-light text-[black] flex items-center gap-1"> <CiLocationOn />{location}</div>
                                    </div>
                                </div>
                            </GridItem>
                        ))}
                    </Grid>
                </div>
            </div>
            <Divider />
            {/*  */}
            <VStack>
                <Box className='py-[3rem] px-[2rem] backdrop-blur-xl flex justify-center items-center max-w-[1100px] mx-auto'>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <h2>Post Your Requirements</h2>
                            <div className="text-[black] text-4xl"> Looking for something specific</div>
                        </div>
                    </div>
                </Box>
            </VStack>
        </div>

    </>


    );
};

export default CategoriesView;