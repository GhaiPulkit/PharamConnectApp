'use client';
import Banner from '@/app/home/components/Banner';
import { Box, AbsoluteCenter, Button, Divider, VStack, Flex, FormControl, FormLabel, Center, Card, Image, Input, useDisclosure, Select } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { Grid, GridItem } from "@chakra-ui/react"
import { FiArrowUpRight } from "react-icons/fi";
import SearchForm from '@/app/home/components/SearchForm';
import { MANUFACTURES_LIST } from '@/data/manufacturer';

import { CiLocationOn } from 'react-icons/ci';
import { PHARAM_MANUFACTURERS_CATEGORIED } from '@/data/PharmaCategeories';
import { FaFileMedical } from "react-icons/fa";
import { RiContractFill } from "react-icons/ri";
import OTPModal from './OtpConfirmationModal';
import { COMPOSITIONS } from '@/data/product/composition';
import { PRODUCT_TYPES } from '@/data/product/productType';
import { PHARMA_CATEGORIES, PHARMA_CATEGORY_LIST } from './constants';
import View from './QuestionnaireView';
import { cn } from '../../../../utils';


const HomeView: React.FC = () => {
    // Selected Category DEFUALT IS PCD
    const [selectedCategory, setSelectedCategory] = React.useState<PHARMA_CATEGORIES>(PHARMA_CATEGORIES.PCD);

    const dataSource = useRef(MANUFACTURES_LIST);
    const [filteredDataSource, setFilteredDataSource] = useState(MANUFACTURES_LIST);

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [criteria, setCriteria] = React.useState<any>(null);


    const showResults = (data: FormData) => {
        console.log("Form Data Submitted: ", data);
        // TODO: Implement search logic here based on form data
    }

    const handleOnSubmit = (data: any) => {
        console.log("Form Submitted: ", data);
        setCriteria({formType: selectedCategory, ...data});
        onOpen();
    }


    useEffect(() => {
        console.log("Search Criteria Updated: ", criteria);
        if (!criteria) {
            return;
        }
        setFilteredDataSource(() => {
            return dataSource?.current.filter((item) => {
                if (!criteria) return true;
                let match = true;
                switch (criteria.formType){
                    case PHARMA_CATEGORIES.PCD: {
                        match = criteria?.interestedInPCDMonopoly && match && item.interestedInPCDMonopoly == criteria?.interestedInPCDMonopoly;
                        match = criteria?.interestedInPCD && match && item.interestedInPCD == criteria?.interestedInPCD;
                        break;
                    }
                    case PHARMA_CATEGORIES.THIRD_PARTY: {
                    if (criteria.product) {
                        match =
                            match &&
                            !!item.products?.some((p) =>
                                (p.category ?? "").toLowerCase().includes((criteria.product ?? "").toLowerCase()) ||
                                (p.composition ?? "").toLowerCase().includes((criteria.product ?? "").toLowerCase())
                            );
                    }

                    if (criteria.salt) {
                        match =
                            match &&
                            !!item.products?.some((p) =>
                                (p.composition ?? "").toLowerCase().includes((criteria.salt ?? "").toLowerCase())
                            );
                    }
                    if (criteria.minOrders) {
                        match =
                            match &&
                            (item.productsCount ?? 0) >= Number(criteria.minOrders);
                    }
                    break;
                    }
                    case PHARMA_CATEGORIES.PRIVATE_LABEL: {
                        match = criteria.medicineSystem && match &&
                                !!item.medicineSystem
                                    ?.toLowerCase()
                                    .includes(criteria.medicineSystem.toLowerCase());

                        const needExportCriteria = criteria.needExport.toLowerCase() === "yes";
                        match = match && item.needExport === needExportCriteria;

                        if (criteria.productListing) {
                            const searchTerms = criteria.productListing
                                .toLowerCase()
                                .split(",")
                                .map((t: string) => t.trim())
                                .filter(Boolean);
                            match =
                                match &&
                                !!item.products?.some((p) =>
                                    searchTerms.some(
                                        (term: string) => p.composition.toLowerCase().includes(term)
                                    )
                                );
                        }
                        break;
                }
            }

                return match
            });
        });
    }, [criteria]);


    return (<>
        <OTPModal isOpen={isOpen} onClose={onClose} onCloseCallback={() => showResults} />
        <div className="w-full h-full p-0 flex flex-col gap-2 ">
            {/* Banner */}
            <div id="banner-wrapper" className=" px-4 py-8 w-full flex flex-col gap-2 bg-transparent">
                <div id="banner-body" className="rounded-xl !border !border-[white] bg-cover bg-center overflow-hidden drop-shadow-xl " style={{ backgroundImage: "url('/images/bg-02.png')" }}>
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
            {/* Featured Manufacturer */}
            < div className="py-[3rem] px-[2rem] backdrop-blur-xl flex justify-center items-center max-w-[1100px] mx-auto" >
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <h2>Top Manufacturers</h2>
                        <p className="!text-[grey]"> Everything You Need to Build Better Products</p>
                    </div>
                    <Flex justify='center' gap={4} wrap='wrap' className='flex-1'>

                        {filteredDataSource?.map(({ id, name, logoUrl, location, productsCount, successfulDeliveries }, idx) => (

                            <Card className='flex flex-col gap-2 p-[1rem] rounded-xl !border-[1px] !border-[#ffffff] bg-[#ffffff90] p-3 drop-shadow-xl' key={`manufacturer-${idx}`}>
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
            </div >
            <Divider />
            {/*  */}
        </div >

    </>


    );
};

export default HomeView;