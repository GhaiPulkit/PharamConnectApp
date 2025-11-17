import { useAppPrimaryContext } from "@/context/AppContext";
import View from "../home/QuestionnaireView";
import { PHARMA_CATEGORIES, PHARMA_CATEGORY_LIST } from "../home/constants";
import { useEffect, useState } from "react";
import { FaFileMedical } from "react-icons/fa";
import { cn } from "../../../../utils";
import { Button, useBreakpoint, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/route";
import OTPModal from "../home/OtpConfirmationModal";


export default function ({ props }: { props: any }) {
    const router = useRouter();
    const breakpoint = useBreakpointValue({ base: 'sm', md: 'md' });
    const { manufacturers, setQuery, query }: any = useAppPrimaryContext();
     const { isOpen, onOpen, onClose } = useDisclosure();
     
    // Selected Category DEFUALT IS PCD
    const [selectedCategory, setSelectedCategory] = useState<PHARMA_CATEGORIES>(PHARMA_CATEGORIES.PCD);

    const handleOnSubmit = (data: any) => {
        // THIS DATA MUST BE SAVED SOMEWHERE AND WILL BE USED IN SENDING LEAD TO MANUFACTURER
        console.log("Form Submitted: ", data);

        // ASK FOR OTP IF THE USE ONLY ON 1ST Search
        // onOpen();

        //SET QUERY -  WORKS
        setQuery(data);
        
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
     <OTPModal isOpen={isOpen} onClose={onClose} onCloseCallback={() => null} />
        <div className={cn("h-full w-full gap-2", {
            'flex flex-col-reverse': breakpoint == 'sm',
            'grid lg:grid-cols-2': breakpoint != 'sm'
        })}>
            <div className="flex flex-col items-center justify-center sm:p-2">
                <h2>Tell us what you are interested in?</h2>
                <section className='flex flex-col gap-4'>
                    <div className='flex gap-2 w-full p-2 '>
                        {
                            PHARMA_CATEGORY_LIST.map(([key, value], idx: number) => {
                                // value may be either the enum value or an object containing the enum; normalize it
                                const categoryValue = (value && typeof value === 'object' && 'selectedCategory' in value) ? (value as any).selectedCategory : value;

                                return (
                                    <Button
                                        onClick={() => setSelectedCategory(categoryValue)}
                                        key={`category-[${idx}]`}
                                        className={cn(
                                            { '!bg-[#008080]': selectedCategory === categoryValue, '!bg-[#111]': selectedCategory !== categoryValue }
                                        )}
                                        rounded={'xl'}
                                    >
                                        <span className='text-sm text-white font-bold flex items-center gap-1'><FaFileMedical /> {key}</span>
                                    </Button>
                                )
                            })
                        }
                    </div>
                </section>
                <section>
                    <div className="max-w-[700px] mx-auto py-2 flex flex-col gap-8" >
                        <View selectedCategory={selectedCategory as PHARMA_CATEGORIES} handleOnSubmit={handleOnSubmit} />
                    </div>
                </section>
            </div>
            <div className="rounded-md  overflow-hidden "  >
                <div className=" px-[3rem] h-full w-full flex flex-col items-center justify-center gap-4">
                    <h1 className="text-center font-bold">Your one stop desitination for Pharama Marketplace</h1>
                    <p className="text-center text-gray-600 italic">Connect with verified manufacturers, traders, and distributors. Find quality pharmaceutical products or offer your manufacturing services.</p>
                </div>
            </div>
        </div>
    </>)
}   