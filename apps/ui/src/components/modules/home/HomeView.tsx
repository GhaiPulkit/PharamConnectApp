'use client';
import Banner from '@/app/home/components/Banner';
import { Box, AbsoluteCenter, Button, Divider, VStack, Flex, FormControl, FormLabel, Center, Card, Image, Input, useDisclosure, Select, Grid } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { FaFileMedical } from "react-icons/fa";
import OTPModal from './OtpConfirmationModal';
import { PHARMA_CATEGORIES, PHARMA_CATEGORY_LIST } from './constants';
import View from './QuestionnaireView';
import { cn } from '../../../../utils';
import { useAppPrimaryContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import SectionWrapper from '@/app/home/components/SectionWrapper';


const HomeView: React.FC = () => {
    const router = useRouter();

    const { manufacturers, setSelectedManufacturerID }: any = useAppPrimaryContext();
    // Selected Category DEFUALT IS PCD
    const [selectedCategory, setSelectedCategory] = React.useState<PHARMA_CATEGORIES>(PHARMA_CATEGORIES.PCD);

    const [filteredDataSource, setFilteredDataSource] = useState<any>([]);

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [criteria, setCriteria] = React.useState<any>(null);

    const [showQueryResuts, setShowQueryResults] = useState<boolean>(false);


    const showResults = (data: FormData) => {
        console.log("Form Data Submitted: ", data);
        // TODO: Implement search logic here based on form data
    }

    const handleOnSubmit = (data: any) => {
        console.log("Form Submitted: ", data);
        // onOpen();
        setCriteria(data);
    }


    useEffect(() => {
        console.log("Search Criteria Updated: ", criteria);
        if (!criteria) {
            return;
        }
        setFilteredDataSource(() => {
            return manufacturers?.filter(({ interestedInPCD, interestedInPCDMonopoly }: any) => {
                if (!criteria) return true;
                let match = true;
                match = criteria?.interestedInPCDMonopoly && match && interestedInPCDMonopoly == criteria?.interestedInPCDMonopoly;
                match = criteria?.interestedInPCD && match && interestedInPCD == criteria?.interestedInPCD;
                return match
            });
        });
    }, [criteria]);


    // Filtered Data Source is not a multiple of 4, add empty cards to make it so
    useEffect(() => {
        if (filteredDataSource.length % 4 !== 0) {
            const emptyCardsToAdd = 4 - (filteredDataSource.length % 4);
            const emptyCards = Array(emptyCardsToAdd).fill({ empty: true });
            setFilteredDataSource((prev: any) => [...prev, ...emptyCards]);
        }
        // After ensuring grid has multiples of 4, jump to results if a search took place
        if (criteria) {
            const hasRealResults = filteredDataSource.some((m: any) => !m?.empty);
            if (hasRealResults) {
                // wait briefly for DOM update then scroll
                setTimeout(() => {
                    const el = document.getElementById('query-results');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, [filteredDataSource]);


    // NAVIGATE TO MANUFACTURE PAGE
    const navigateToManufacturer = (id: number) => {
        setSelectedManufacturerID(id)
        router.push(`/manufacturer?manufacturerId=${id}`)
    }

    return (<>
        <OTPModal isOpen={isOpen} onClose={onClose} onCloseCallback={() => showResults} />
        <div className="w-full h-full p-0 flex flex-col gap-2 ">
            {/* Banner */}
            <div id="banner-wrapper" className=" px-4 py-8 w-full flex flex-col gap-2 bg-transparent">
                <div id="banner-body" className="rounded-xl !border !border-[white] bg-cover bg-center overflow-hidden drop-shadow-xl " style={{ backgroundImage: "url('/images/bg-02.png')" }} >
                    <Flex className={'py-[3rem] px-[2rem] w-full backdrop-blur-lg bg-[#ffffff90]'} gap={2}>
                        <Flex justify={'center'} className='w-full'>
                            <div className="relative p-2 text-center flex flex-col gap-[2rem] rounded-md overflow-hidden">
                                {/* content above the overlay */}
                                <div className="relative z-10 text-white flex flex-col gap-8">
                                    <h1>Your one stop desitination for Pharama Marketplace</h1>
                                    <p className="text-gray-800 mx-auto">
                                        Connect with verified manufacturers, traders, and distributors. Find quality pharmaceutical products or offer your manufacturing services.
                                    </p>
                                    <Divider />
                                    <section className='flex flex-col gap-4'>
                                        <h2>Tell us what you are interested in?</h2>
                                        <div className='flex  w-full p-2 flex-wrap gap-[2rem] justify-around'>
                                            {
                                                PHARMA_CATEGORY_LIST.map(([key, value], idx: number) => {
                                                    // value may be either the enum value or an object containing the enum; normalize it
                                                    const categoryValue = (value && typeof value === 'object' && 'selectedCategory' in value) ? (value as any).selectedCategory : value;

                                                    return (
                                                        <Button
                                                            onClick={() => setSelectedCategory(categoryValue)}
                                                            key={`category-[${idx}]`}
                                                            className={cn(
                                                                'h-[100px] !border  !border-[white] p-[2rem] aspect-square flex justify-center items-center',
                                                                { '!bg-[green]': selectedCategory === categoryValue, '!bg-[#111]': selectedCategory !== categoryValue }
                                                            )}
                                                            rounded={'xl'}
                                                            flexBasis={{ base: "100%", sm: "45%", md: "30%" }}
                                                        >
                                                            <span className='text-xl text-white font-bold flex items-center gap-1'><FaFileMedical /> {key}</span>
                                                        </Button>
                                                    )
                                                })
                                            }
                                        </div>
                                    </section>
                                    <section>
                                        <div className="max-w-[700px] mx-auto py-2 flex flex-col gap-8">
                                            <View selectedCategory={selectedCategory as PHARMA_CATEGORIES} handleOnSubmit={handleOnSubmit} />
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </Flex>
                    </Flex>

                </div >
            </div >
            {/** Results */}
            <div id="query-results" ></div>
            {filteredDataSource?.length && <SectionWrapper>
                <div className="flex flex-col items-center justify-center gap-4">
                    <h2 >Top Results</h2>
                    <p className="!text-[grey]"> Below are the manufactures you are looking for.</p>
                     <ManufacturerShowGrid manufacturers={filteredDataSource} navigateToManufacturer={navigateToManufacturer}/>
                </div>
            </SectionWrapper>}
            {/* Featured Manufacturer */}
            < div className="py-[3rem] px-[2rem] backdrop-blur-xl flex justify-center items-center max-w-[1100px] mx-auto" >
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <h2>Top Manufacturers</h2>
                        <p className="!text-[grey]"> Everything You Need to Build Better Products</p>
                    </div>
                   <ManufacturerShowGrid manufacturers={manufacturers} navigateToManufacturer={navigateToManufacturer}/>
                </div>
            </div >
            <Divider />
            {/*  */}
        </div >

    </>


    );
};

export default HomeView;



const ManufacturerShowGrid = ({ manufacturers, navigateToManufacturer }: { manufacturers: any, navigateToManufacturer: (id: number) => any }) => {
    return <Grid templateColumns='repeat(3, 1fr)' gap={4}>

        {manufacturers?.map(({ empty = false, id, compositionAvailable = [], name, description, avatar, products = 0, location }: any, idx: number) => (

            !empty ? (
                <Card className='flex flex-col gap-2 p-[1rem] rounded-xl !border-[1px] !border-[#ffffff] bg-[#ffffff90] p-3 drop-shadow-xl' key={`manufacturer-${idx}`}>
                    <div className="w-full p-1 flex flex-col gap-2">
                        <h3 className="text-[grey] capitalize">{name}</h3>
                        <p>{description}</p>
                        <div className="h-auto">
                            <img className="h-[200px] aspect-square object-fit" src={avatar} onError={(e) => e.currentTarget.src = "https://www.freeiconspng.com/uploads/blank-logo-design-for-brand-13.png"} alt="" />
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