'use client';

import { RootState } from "@/store";
import HomeScreen from "@/components/modules/HomeScreen"
import { useSelector } from 'react-redux';
import { useDataInit } from "@/hooks/useDataInit";
import { Button, Flex, useBreakpointValue, useDisclosure, VStack, Image } from "@chakra-ui/react";
import { PHARMA_CATEGORIES, PHARMA_CATEGORY_LIST } from "@/components/modules/home/constants";
import { ROUTES } from "@/constants/route";
import { useAppPrimaryContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaFileMedical } from "react-icons/fa6";
import { cn } from "../../../../utils";
import View from "@/components/modules/home/QuestionnaireView";
import { MdMedication } from "react-icons/md";
import { GiPill } from "react-icons/gi";
import PrimaryButton from "@/components/common/PrimaryButton";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import _ from "lodash";
import { SEARCH_OPTIONS, SEARCH_OPTIONS_LIST } from '../../../components/modules/home/constants';

export default function HomePage() {
    useDataInit();
    const router = useRouter();
    const breakpoint = useBreakpointValue({ base: 'sm', md: 'md' });
    const { setQuery, query }: any = useAppPrimaryContext();
    const [searchOption, setSearchOption] = useState<SEARCH_OPTIONS>(SEARCH_OPTIONS.franchise)
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Selected Category DEFUALT IS PCD
    const [selectedCategory, setSelectedCategory] = useState<PHARMA_CATEGORIES>(PHARMA_CATEGORIES.PCD);

    const handleOnSubmit = (data: any) => {
        // THIS DATA MUST BE SAVED SOMEWHERE AND WILL BE USED IN SENDING LEAD TO MANUFACTURER
        const finalQuery = {
            category: selectedCategory,
            ...data
        };
        console.log("Form Submitted: ", finalQuery);

        // ASK FOR OTP IF THE USE ONLY ON 1ST Search
        // onOpen();

        //SET QUERY -  WORKS
        setQuery(finalQuery);

        //Navigate to Results page.
        navigateToResults();
    }

    const navigateToResults = () => {
        router.push(ROUTES.RESULTS)
    }


    return (<>
        <Flex direction={'column'} gap={'1rem'} className="w-full mx-auto h-full px-4 py-4">
            <div className="grid grid-cols-2 gap-8">
                <VStack alignItems="flex-start" spacing={8} className="p-[2rem] ">
                    <div className="">
                        <h1 className="flex items-center gap-2"><Image src="/logos/logo.png" alt="PharmaGrid Logo" boxSize="40px" />PharmaGrid </h1>
                        <span className="text-sm font-medium text-gray-500">Connecting Manufacturers, Distributors & Healthcare Businesses.</span>
                    </div>

                    {/* <p className="text-lg font-semibold">Connecting Manufacturers, Distributors & Healthcare Businesses.</p> */}
                    <p>Discover a reliable marketplace for high-quality pharmaceutical products,
                        ethical partnerships, and seamless business transactions.</p>
                    <PrimaryButton className="" onClick={() => {
                        window.location.href = '/manufacturers';
                    }} title={"Know More"}></PrimaryButton>
                    <div className="flex flex-col gap-6">
                        <h2> How PharmaGrid works?</h2>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="card">
                                <div className="flex flex-col justify-between gap-[1.5rem]">
                                    <span className="text-xs font-bold text-[grey]">Step 1</span>
                                    <h3>Search</h3>
                                    <p className="text-sm text-gray-500">Tell us what you are looking for?</p>
                                </div>

                            </div>
                            <div className="card">
                                <div className="flex flex-col justify-between gap-[1.5rem]">
                                    <span className="text-xs font-bold text-[grey]">Step 2</span>
                                    <h3>Validate Your Email/Phone Number</h3>
                                    <p className="text-sm text-gray-500">Quickly Validate your phone number or e-mail</p>
                                </div>

                            </div>
                            <div className="card">
                                <div className="flex flex-col justify-between gap-[1.5rem]">
                                    <span className="text-xs font-bold text-[grey]">Step 3</span>
                                    <h3>Browse Manufacturers List of Products & Services</h3>
                                    <p className="text-sm text-gray-500">Explore a wide range of pharmaceutical products and manufacturing services.</p>
                                </div>

                            </div>

                        </div>
                    </div>
                </VStack>
                <VStack>
                    <div className="w-full p-[2rem] rounded-4xl backdrop-blur-xl bg-[#ffffff40] !border-[white] !border-[1px]  drop-shadow-lg">
                        <div className="flex">
                            <label className="!text-xl !font-bold p-4 flex-grow">Tell us what you are looking for?</label>
                            <div className="flex">{SEARCH_OPTIONS_LIST.map(([key, value], idx: number) => {
                                const searchValue = (value && typeof value === 'object' && 'searchoption' in value) ? (value as any).searchOption : value;
                                return (
                                    <div key={idx}>
                                        <PrimaryButton title={key} isActive={_.isEqual(value, searchOption)} onClick={() => setSearchOption(searchValue)} />
                                    </div>
                                )
                            })}
                            </div>
                        </div>
                        {searchOption == SEARCH_OPTIONS.franchise ? <section className='flex flex-col gap-4'>
                            <div className='flex gap-2 w-full p-2 grid grid-cols-3 gap-6 mt-4'>
                                {
                                    PHARMA_CATEGORY_LIST.map(([key, value], idx: number) => {
                                        // value may be either the enum value or an object containing the enum; normalize it
                                        const categoryValue = (value && typeof value === 'object' && 'selectedCategory' in value) ? (value as any).selectedCategory : value;

                                        const icon = value?.split(" ").map(e => e.charAt(0)).join("");
                                        return (
                                            <div
                                                key={`category-${idx}`}
                                            >
                                                <PrimaryButton className="!p-4 w-3/4 !aspect-[1/1]" icon={() => (<div className="flex items-center gap-2 text-xl font-bold text-[teal] drop-shadow-xl">{icon}</div>)} title={value.split("_").join(' ')} isActive={_.isEqual(value, selectedCategory)} onClick={() => setSelectedCategory(categoryValue)} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="p-2 mt-2">
                                <View selectedSearchOption={searchOption as SEARCH_OPTIONS} selectedCategory={selectedCategory as PHARMA_CATEGORIES} handleOnSubmit={handleOnSubmit} />
                            </div>

                        </section> : <section className='flex flex-col gap-4'>TO be done</section>
                        }
                    </div>
                </VStack>
            </div>
            <section className="w-full hidden">
                {/* <div className="flex flex-col gap-6">
                        <h2> How PharmaGrid works?</h2>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="p-6 rounded-xl bg-white border-white !border-1 bg-gradient-to-r from-grey-300 via-grey-500 to-white" style={{
                                boxShadow:
                                    'rgb(255 255 255) -1px -12px 30px 6px, rgb(160 160 160) 8px 5px 12px 1px',
                            }}>
                                <span className="text-xs font-bold text-[grey]">Step 1</span>
                                <h3>Search</h3>
                                <p>Tell us what you are looking for?</p>
                            </div>
                            <div className="p-6 rounded-xl bg-white  border-white !border-1 bg-gradient-to-r from-grey-300 via-grey-500 to-white" style={{
                                boxShadow:
                                    'rgb(255 255 255) -1px -12px 30px 6px, rgb(160 160 160) 8px 5px 12px 1px',
                            }}>
                                <span className="text-xs font-bold text-[grey]">Step 2</span>
                                <h3>Validate Your Email/Phone Number</h3>
                                <p>Quickly Validate your phone number or e-mail</p>
                            </div>
                            <div className="p-6 rounded-xl bg-white  border-white !border-1 bg-gradient-to-r from-grey-300 via-grey-500 to-white" style={{
                                boxShadow:
                                    'rgb(255 255 255) -1px -12px 30px 6px, rgb(160 160 160) 8px 5px 12px 1px',
                            }}>
                                <span className="text-xs font-bold text-[grey]">Step 3</span>
                                <h3>Browse Manufacturers List of Products & Services</h3>
                                <p>Explore a wide range of pharmaceutical products and manufacturing services.</p>
                            </div>

                        </div>
                    </div> */}
            </section>
            <section className="w-full hidden">
                <div className="flex flex-col gap-6">
                    <h2> Top Manufacturers</h2>
                    <div className="grid grid-cols-3 gap-6">
                        <PrimaryButton className="!p-4 w-full" icon={GiPill} iconSize={'2rem'} title={'Capsule, Injection etc.'} onClick={() => null} />
                        <PrimaryButton className="!p-4 w-full" icon={GiPill} iconSize={'2rem'} title={'Hand Sanitizers'} onClick={() => null} />
                        <PrimaryButton className="!p-4 w-full" icon={GiPill} iconSize={'2rem'} title={'Face Masks'} onClick={() => null} />
                        <PrimaryButton className="!p-4 w-full" icon={GiPill} iconSize={'2rem'} title={'Vetinerary Manufacturers'} onClick={() => null} />
                        <PrimaryButton className="!p-4 w-full" icon={GiPill} iconSize={'2rem'} title={'Cosmetic Manufacturers'} onClick={() => null} />
                        <PrimaryButton className="!p-4 w-full" icon={GiPill} iconSize={'2rem'} title={'Pharma Distributors'} onClick={() => null} />
                    </div>
                </div>
            </section>
            <section className="w-full h-[200px]"></section>
        </Flex>
    </>)
}