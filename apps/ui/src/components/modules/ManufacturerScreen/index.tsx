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
        <div className="w-full px-2  py-1 flex">
            <Button leftIcon={<IoReturnDownBack />} onClick={goToHome}>Back</Button>
        </div>
        < div className="px-[2rem] flex justify-center items-center max-w-[1200px] mx-auto" >
            <div className="flex flex-col gap-8">
                <div className="flex flex-col justify-start items-center gap-2 w-full card">
                    <h1 className="!text-[left] w-full">Top Manufacturers</h1>
                    <p className="!text-[left] w-full"> Everything You Need to Build Better Products</p>
                </div>
                <ManufacturerShowGrid manufacturers={manufacturers} navigateToManufacturer={navigateToManufacturer} />
            </div>
        </div >
    </>)
}