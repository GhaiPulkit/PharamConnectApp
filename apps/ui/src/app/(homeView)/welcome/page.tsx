'use client';

import { RootState } from "@/store";
import HomeScreen from "@/components/modules/HomeScreen"
import { useSelector } from 'react-redux';
import { useDataInit } from "@/hooks/useDataInit";
import { Button, useBreakpointValue, useDisclosure, VStack } from "@chakra-ui/react";
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

export default function HomePage() {
    useDataInit();
    const router = useRouter();
    const breakpoint = useBreakpointValue({ base: 'sm', md: 'md' });
    const { setQuery, query }: any = useAppPrimaryContext();

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

    useEffect(() => {
        console.log(breakpoint)
    }, [breakpoint])

    return (<>
        {/* <HomeScreen props={undefined} /> */}
        <div className="w-full mx-auto h-full flex flex-col gap-6 pt-10 px-4">
            <div className="w-full p-[2rem] mx-auto flex flex-col gap-[2rem]">
                <div className="card grid grid-cols-2 gap-8">
                    <VStack alignItems="flex-start" spacing={8} className="p-[2rem] ">
                        <h1>PharmaGrid — Your Trusted B2B Pharma Marketplace</h1>
                        <p className="text-lg font-semibold">Connecting Manufacturers, Distributors & Healthcare Businesses.</p>
                        <p>Discover a reliable marketplace for high-quality pharmaceutical products,
                            ethical partnerships, and seamless business transactions.</p>
                        <PrimaryButton className="" onClick={() => {
                            window.location.href = '/manufacturers';
                        }} title={"Know More"}></PrimaryButton>
                    </VStack>
                    <VStack>
                        <div className="w-full p-[2rem] rounded-4xl backdrop-blur-xl bg-[#ffffff40] !border-[white] !border-[1px]  drop-shadow-lg">
                            <label className="!text-2xl !font-bold p-4">Tell us what you are looking for?</label>
                            <section className='flex flex-col gap-4'>
                                <div className='flex gap-2 w-full p-2 grid grid-cols-3 gap-6 mt-4'>
                                    {
                                        PHARMA_CATEGORY_LIST.map(([key, value], idx: number) => {
                                            // value may be either the enum value or an object containing the enum; normalize it
                                            const categoryValue = (value && typeof value === 'object' && 'selectedCategory' in value) ? (value as any).selectedCategory : value;

                                            return (
                                                <div
                                                    key={`category-${idx}`}
                                                >
                                                    <PrimaryButton className="!p-4 w-full !aspect-[1/1]" icon={BsArrowUpRightCircleFill} title={key.split("_").join(' ')} isActive={_.isEqual(value, selectedCategory)} onClick={() => setSelectedCategory(categoryValue)} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="p-2">
                                    <View selectedCategory={selectedCategory as PHARMA_CATEGORIES} handleOnSubmit={handleOnSubmit} />
                                </div>

                            </section>

                        </div>
                    </VStack>
                </div>
                <section className="w-full">
                    <div className="flex flex-col gap-6 card">
                        <h2> How PharmaGrid works?</h2>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="p-6 rounded-xl border-white !border-1 bg-gradient-to-r from-grey-300 via-grey-500 to-white" style={{
                                boxShadow:
                                    'rgb(255 255 255) -1px -12px 30px 6px, rgb(160 160 160) 8px 5px 12px 1px',
                            }}>
                                <span className="text-xs font-bold text-[grey]">Step 1</span>
                                <h3>Search</h3>
                                <p>Tell us what you are looking for?</p>
                            </div>
                            <div className="p-6 rounded-xl border-white !border-1 bg-gradient-to-r from-grey-300 via-grey-500 to-white" style={{
                                boxShadow:
                                    'rgb(255 255 255) -1px -12px 30px 6px, rgb(160 160 160) 8px 5px 12px 1px',
                            }}>
                                <span className="text-xs font-bold text-[grey]">Step 2</span>
                                <h3>Validate Your Email/Phone Number</h3>
                                <p>Quickly Validate your phone number or e-mail</p>
                            </div>
                            <div className="p-6 rounded-xl border-white !border-1 bg-gradient-to-r from-grey-300 via-grey-500 to-white" style={{
                                boxShadow:
                                    'rgb(255 255 255) -1px -12px 30px 6px, rgb(160 160 160) 8px 5px 12px 1px',
                            }}>
                                <span className="text-xs font-bold text-[grey]">Step 3</span>
                                <h3>Browse Manufacturers List of Products & Services</h3>
                                <p>Explore a wide range of pharmaceutical products and manufacturing services.</p>
                            </div>

                        </div>
                    </div>
                </section>
                <section className="w-full card">
                    <div className="flex flex-col gap-6">
                        <h2> Top Manufacturer</h2>
                        <div className="grid grid-cols-3 gap-6">
                            <PrimaryButton className="!p-4 w-full" icon={GiPill} iconSize={'2rem'} title={'Capsule, Injection etc.'} onClick={() => null} />
                            <PrimaryButton className="!p-4 w-full" icon={GiPill} iconSize={'2rem'} title={'Compositions'} onClick={() => null} />
                            <PrimaryButton className="!p-4 w-full" icon={GiPill} iconSize={'2rem'} title={'Products'} onClick={() => null} />
                        </div>
                    </div>
                </section>
                <section className="w-full h-[200px]"></section>
            </div>
        </div>
    </>)
}