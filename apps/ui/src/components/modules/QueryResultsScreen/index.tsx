'use client';

import { useAppPrimaryContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { ManufacturerShowGrid } from "../ManufacturerScreen/components/ManufacturerShowGrid";
import { useEffect, useState } from "react";
import NoRecordFound from "@/components/common/NoRecordFound";
import { IoReturnDownBack } from "react-icons/io5";
import { Button } from "@chakra-ui/react";
import { ROUTES } from "@/constants/route";

/**
 * 
 * @returns 
 */
export default function QueryResultsView({ props }: { props: any }) {
    const router = useRouter();
    const { manufacturers, setSelectedManufacturerID, query }: any = useAppPrimaryContext();
    // NAVIGATE TO MANUFACTURE PAGE
    const navigateToManufacturer = (id: number) => {
        setSelectedManufacturerID(id)
        router.push(`${ROUTES.MANUFACTURER}?manufacturerId=${id}`)
    }

    const [filteredDataSource, setFilteredDataSource] = useState<any>([]);

    useEffect(() => {
        console.log("Search Criteria Updated: ", query);
        if (!query) {
            return;
        }
        setFilteredDataSource(() => {
            return manufacturers?.filter(({ interestedInPCD, interestedInPCDMonopoly }: any) => {
                if (!query) return true;
                let match = true;
                match = query?.interestedInPCDMonopoly && match && interestedInPCDMonopoly == query?.interestedInPCDMonopoly;
                match = query?.interestedInPCD && match && interestedInPCD == query?.interestedInPCD;
                
                return match
            });
        });
    }, [query]);

    const goToHome = () => {
        router.push(ROUTES.HOME)
    }

    useEffect(() => {
        console.log(filteredDataSource)
    }, [filteredDataSource]);

    return (<>
        <div className="h-auto w-full overflow-auto">
            <div className="w-full p-2 flex !sticky" style={{ top: "70px" }}>
                <Button leftIcon={<IoReturnDownBack />} onClick={goToHome}>Back</Button>
            </div>

            <div className="py-[2rem] px-[2rem] max-w-[1100px] mx-auto" >
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <h2 className="">Your Search Results</h2>
                        <p className="!text-[grey]">Based on what you’re looking for, here’s what we found.</p>
                    </div>
                    {filteredDataSource?.length ? <ManufacturerShowGrid manufacturers={filteredDataSource} navigateToManufacturer={navigateToManufacturer} /> :
                        <NoRecordFound />}
                </div>
            </div >
        </div>

    </>)
}