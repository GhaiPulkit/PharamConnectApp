import Banner from '@/app/home/components/Banner';
import { Box, AbsoluteCenter, Button, Divider, VStack, Flex, FormControl, FormLabel, Center, Card, Image, Input, useDisclosure } from '@chakra-ui/react';
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
import { PHARAM_MANUFACTURERS_CATEGORIED } from '@/data/PharmaCategeories';
import { FaFileMedical } from "react-icons/fa";
import { RiContractFill } from "react-icons/ri";
import OTPModal from './OtpConfirmationModal';


const HomeView: React.FC = () => {
    const [manufacturers, setManufacturers] = React.useState(MANUFACTURES_LIST);
    const { isOpen, onOpen, onClose } = useDisclosure()

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
    <OTPModal isOpen={isOpen} onClose={onClose} />
        <div className="w-full h-full p-0 flex flex-col gap-2 ">
            {/* Banner */}
            <div id="banner-wrapper" className=" px-4 py-8 w-full flex flex-col gap-2 bg-transparent">
                <div id="banner-body" className="rounded-xl !border !border-[white] bg-cover bg-center overflow-hidden drop-shadow-xl " style={{ backgroundImage: "url('/images/bg-02.png')" }}>
                    <Flex className={'py-[3rem] px-[2rem] w-full backdrop-blur-lg bg-[#ffffff90]'} gap={2}>
                        {/* <Flex justify='start' align={'center'} className='w-1/2'>
                            <SearchForm/>
                        </Flex> */}
                        <Flex justify={'center'} className='w-full'>
                            <div
                                className="relative p-2 text-center flex flex-col gap-[2rem] rounded-md overflow-hidden"
                            >

                                {/* content above the overlay */}
                                <div className="relative z-10 text-white flex flex-col gap-8">
                                    <h1>Your one stop desitination for Pharama Marketplace</h1>
                                    <p className="text-gray-800 mx-auto">
                                        Connect with verified manufacturers, traders, and distributors. Find quality pharmaceutical products or offer your manufacturing services.
                                    </p>
                                                <Divider />
                                    <section className='flex flex-col gap-4'>
                                        <h2>Tell us what you are intrested in?</h2>
                                        <div className='flex  w-full p-2 flex-wrap gap-[2rem] justify-around'>
                                            <Card className='h-[100px] !border !bg-[#111] !border-[white] p-[2rem] aspect-square flex justify-center items-center' rounded={'xl'} flexBasis={{ base: "100%", sm: "45%", md: "30%" }}>
                                                <span className='text-xl text-white font-bold flex items-center gap-1'><FaFileMedical /> PCD</span>
                                            </Card>
                                            <Card className='h-[100px] !border !bg-[#111] !border-[white] p-[2rem] aspect-square flex justify-center items-center' rounded={'xl'} flexBasis={{ base: "100%", sm: "45%", md: "30%" }}>
                                                <span className='text-xl text-white font-bold flex items-center gap-1'><RiContractFill />Third Party</span>
                                            </Card>
                                            <Card className='h-[100px] !border !bg-[#111] !border-[white] p-[2rem] aspect-square flex justify-center items-center' rounded={'xl'} flexBasis={{ base: "100%", sm: "45%", md: "30%" }}>
                                                <span className='text-xl text-white font-bold flex items-center gap-1'><FaFileMedical />Private Labelling</span>
                                            </Card>
                                        </div>
                                    </section>
                                    <section>
                                        <div className="max-w-[700px] mx-auto py-2 flex flex-col gap-8">
                                            <FormControl variant={'floating'} >
                                                <FormLabel className={'!text-center !text-xl text-gray-800'}>Composition</FormLabel>
                                            <Input className="!drop-shadow-xl !bg-[white]" id='composition' type='string' placeholder='Example, Axotocin 3mg 3w/u' />
                                            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                        </FormControl>
                                                                                 <FormControl variant={'floating'} >
                                            <FormLabel className={'!text-center !text-xl text-gray-800'}>Product Type</FormLabel>
                                            <Input className="!drop-shadow-xl !bg-[white]" id='composition' type='string' placeholder='Example, Axotocin 3mg 3w/u' />
                                            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                        </FormControl>
                                                                                                                       <FormControl variant={'floating'} >
                                            <FormLabel className={'!text-center !text-xl text-gray-800'}>Packet Size</FormLabel>
                                            <Input className="!drop-shadow-xl !bg-[white]" id='composition' type='string' placeholder='Example, Axotocin 3mg 3w/u' />
                                            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                        </FormControl>
                                                                                                                       <FormControl variant={'floating'} >
                                            <FormLabel className={'!text-center !text-xl text-gray-800'}>Minimun Orders</FormLabel>
                                            <Input className="!drop-shadow-xl !bg-[white]" id='composition' type='string' placeholder='Example, Axotocin 3mg 3w/u' />
                                            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                        </FormControl>
                                        <Button size='lg' className='!bg-[black] !text-[white] mx-auto mt-4' onClick={()=> onOpen()}>Search Products</Button>
                                        </div>

                                    </section>
                                    {/* <Flex justify='center' gap={4} wrap='wrap' className='flex-1'>
                                        {PHARAM_MANUFACTURERS_CATEGORIED.map(({ id, name }, idx) => (
                                            <Card key={idx} rounded={'xl'} flexBasis={{ base: "100%", sm: "45%", md: "30%" }} overflow={'hidden'} className='flex flex-col gap-2 p-[1rem] '>
                                                <p className="category-name text-xs text-[grey] text-left">Category</p>
                                                <h3>Ayurverdic Medicine</h3>
                                                <Box width={'200px'} className='mx-auto aspect-square bg-[#ccc] rounded-lg '>

                                                </Box>
                                                <div className="action">
                                                    <Button rightIcon={<FiArrowUpRight />} size={'sm'} >Explore</Button>
                                                </div>
                                            </Card>
                                        ))}

                                    </Flex> */}
                                </div>
                            </div>
                        </Flex>
                    </Flex>

                </div>
            </div>
            {/* Featured Manufacturer */}
            <div className="py-[3rem] px-[2rem] backdrop-blur-xl flex justify-center items-center max-w-[1100px] mx-auto">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <h2>Top Manufacturers</h2>
                        <p className="!text-[grey]"> Everything You Need to Build Better Products</p>
                    </div>
                   <Flex justify='center' gap={4} wrap='wrap' className='flex-1'>

                        {manufacturers.map(({ id, name, logoUrl, location, productsCount, successfulDeliveries }, idx) => (

                            <Card flexBasis={{ base: "100%", sm: "45%", md: "30%" }} overflow={'hidden'} className='flex flex-col gap-2 p-[1rem] rounded-xl !border-[1px] !border-[#ffffff] bg-[#ffffff90] p-3 drop-shadow-xl' key={`manufacturer-${idx}`}>
                                <div className="w-full">
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
                            </Card>
                        ))}
                    </Flex>
                </div>
            </div>
            <Divider />
            {/*  */}
        </div>

    </>


    );
};

export default HomeView;