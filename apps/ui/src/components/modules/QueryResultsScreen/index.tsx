'use client';

import { useAppPrimaryContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { ManufacturerShowGrid } from "../ManufacturerScreen/components/ManufacturerShowGrid";
import { useEffect, useState } from "react";
import NoRecordFound from "@/components/common/NoRecordFound";
import { IoReturnDownBack } from "react-icons/io5";
import { Button } from "@chakra-ui/react";
import { ROUTES } from "@/constants/route";
import { PHARMA_CATEGORIES } from "../home/constants";

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
	console.log("Sample manufacturer", manufacturers);
	}, []);
    useEffect(() => {
        if (!query) {
            return;
        }
        setFilteredDataSource(() => {
        return manufacturers.filter((m: any) => {

            // Filter based on category
            switch (query.category) {

                case PHARMA_CATEGORIES.PCD: {
                    let match = true;
                    match =  query?.interestedInPCD && match && m.interestedInPCD == query?.interestedInPCD;
                    match = query?.interestedInPCDMonopoly && match && m.interestedInPCDMonopoly == query?.interestedInPCDMonopoly;
                    return match;
                }

                case PHARMA_CATEGORIES.THIRD_PARTY: {
					let match = true;

					if (query.composition) {
						const comp = query.composition.toLowerCase();
						match = match && m.products?.some((p: any) =>
						Array.isArray(p.composition) &&
						p.composition.some((c: any) =>
							String(c.composition || "").toLowerCase().includes(comp)
						)
						);
					}


					// to be verified
					// if (query.productType) {
					// 	match = match && m.products?.some((p: any) =>
					// 	p.productType?.toLowerCase() === query.productType.toLowerCase()
					// 	);
					// }

					// if (query.packetSize) {
					// 	match = match && m.products?.some((p: any) =>
					// 	String(p.packageSize || "").toLowerCase().includes(query.packetSize.toLowerCase())
					// 	);
					// }

					// if (query.minOrders) {
					// 	match = match && m.products?.some((p: any) =>
					// 	p.minOrderRequired >= query.minOrders
					// 	);
					// }

					return match;
					}

                case PHARMA_CATEGORIES.PRIVATE_LABEL: {
                    let match = true;

                    if (query.medicineSystem) {
                        match = match && m.medicineSystem === query.medicineSystem;
                    }

                    if (query.needExport) {
                        match = match && m.exportAvailable === (query.needExport === "yes");
                    }

                    if (query.productListing) {
                        const list = query.productListing
                            .toLowerCase()
                            .split(",")
                            .map((p: string) => p.trim());

                        match = match && list.every((item: string) =>
                            m.products?.some((p: any) =>
                                p.name.toLowerCase().includes(item)
                            )
                        );
                    }

                    return match;
                }

                default:
                    return true;
            }
        });
    });
    }, [query]);
    useEffect(() => console.log(filteredDataSource),[filteredDataSource])
    const goToHome = () => {
        router.push(ROUTES.HOME)
    }

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