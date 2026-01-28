'use client';

import { useAppPrimaryContext } from "@/context/AppContext";
import { ManufacturerShowGrid } from "./components/ManufacturerShowGrid";
import { useRouter } from "next/navigation";
import { IoReturnDownBack } from "react-icons/io5";
import { Button, useDisclosure } from "@chakra-ui/react";
import { ROUTES } from "@/constants/route";
import OTPModal from "../home/OtpConfirmationModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ManufacturerListStatic } from "@/data/manufacturer";

/**
 * 
 * @returns 
 */
export default function ManufacturerView({ props }: { props: any }) {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { setSelectedManufacturerID }: any = useAppPrimaryContext();
    // const manufacturers = useSelector((state: RootState) => state.app.manufacturerList); // Access transformed state
    const manufacturers = ManufacturerListStatic;
    console.log(manufacturers)
    // NAVIGATE TO MANUFACTURE PAGE
    const navigateToManufacturer = (id: number) => {
        setSelectedManufacturerID(id)
        router.push(`/manufacturer?manufacturerId=${id}`)
    }

    const goToHome = () => {
        router.push(ROUTES.HOME)
    }

    const showResults = () => {

    }

    return (<>
        <OTPModal isOpen={isOpen} onClose={onClose} onCloseCallback={() => showResults} />
        <div className=" w-full flex flex-col gap-2">
            <div className="relative w-full px-2 py-1 flex h-[100px]">
                <div className="flex justify-center items-center w-full">
                    <h1 className="w-full !text-center">Top Manufacturers</h1>
                </div>

                <div className="absolute !bg-blue">
                    <Button leftIcon={<IoReturnDownBack />} onClick={goToHome}>Back</Button>
                </div>

            </div>
            <div className="flex justify-center items-center w-full">
                <span className="text-md text-gray-400 !text-center">Review all the manufacturers</span>
            </div>
            < div className="px-[2rem] flex justify-center items-center max-w-[1200px] mx-auto mt-[1rem]" >
                <div className="flex flex-col gap-8">
                    <ManufacturerShowGrid manufacturers={manufacturers} navigateToManufacturer={navigateToManufacturer} />
                    <div className="h-[200px]"></div>
                </div>
            </div >
        </div>

    </>)
}