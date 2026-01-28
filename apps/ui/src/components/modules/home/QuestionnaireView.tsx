'use client';

import { COMPOSITIONS } from "@/data/product/composition"
import { PRODUCT_TYPES } from "@/data/product/productType"
import { Button, Checkbox, FormControl, FormLabel, Input, Select } from "@chakra-ui/react"
import { PHARMA_CATEGORIES, SEARCH_OPTIONS } from "./constants"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import * as yup from "yup";
import { useEffect } from "react";
import { ProductType } from '../../../data/product/productType';
import PrimaryButton from "@/components/common/PrimaryButton";
import { PCD_FRANCHISE_TYPES } from "@/data/PharmaCategeories";


/**
 * Questionnaire View Component that changes on selected category
 * @param param0 
 * @returns 
 */
export default function View({ selectedCategory, handleOnSubmit, selectedSearchOption }: { selectedCategory?: PHARMA_CATEGORIES, handleOnSubmit: (data: any) => void, selectedSearchOption?:SEARCH_OPTIONS }) {
    return (<>
        {
           selectedSearchOption === SEARCH_OPTIONS.franchise && selectedCategory === PHARMA_CATEGORIES.PCD && <PCDQuestionnaire handleOnSubmit={handleOnSubmit} />
        }
        {
           selectedSearchOption === SEARCH_OPTIONS.franchise && selectedCategory === PHARMA_CATEGORIES.THIRD_PARTY && <ThirdPartyQuestionnaire handleOnSubmit={handleOnSubmit} />
        }
        {
           selectedSearchOption === SEARCH_OPTIONS.franchise && selectedCategory === PHARMA_CATEGORIES.PRIVATE_LABEL && <PrivateLabellingForm handleOnSubmit={handleOnSubmit} />
        }
        {
            selectedSearchOption === SEARCH_OPTIONS.medicine && <PrivateLabellingForm handleOnSubmit={handleOnSubmit} />
        }
    </>)
}

const pcdSchema = yup.object({
    cityDistrict: yup.string().required("City/District is required"),
    state: yup.string().required("State is required"),
    franchiseType: yup.string().oneOf(PCD_FRANCHISE_TYPES).required("Please choose a franchise type"),
    interestedInPCDMonopoly: yup.boolean().required(),
    interestedInPCD: yup.boolean().default(true),
}).required();

type PCDFormData = yup.InferType<typeof pcdSchema>;

const PCDQuestionnaire = ({ handleOnSubmit }: { handleOnSubmit: (data: any) => void }) => {

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<PCDFormData>({
        resolver: yupResolver(pcdSchema) as unknown as Resolver<PCDFormData>,
        mode: "onChange",
        defaultValues: {
            cityDistrict: "",
            state: "",
            franchiseType: PCD_FRANCHISE_TYPES[0],
            interestedInPCDMonopoly: false,
            interestedInPCD: true,
        },
    });

    return (
        <form onSubmit={handleSubmit((data: PCDFormData) => handleOnSubmit(data))} className="space-y-4">
            <FormControl isInvalid={!!errors.cityDistrict} variant="floating">
                <span className="!text-center text-xs font-[800] !text-gray-600">Which city you are interested in?</span>
                <Input {...register("cityDistrict")} placeholder="Enter city or district" />
            </FormControl>

            <FormControl isInvalid={!!errors.state} variant="floating">
                 <span className="!text-center text-xs font-[800] !text-gray-600">Which state this city is in?</span>
                <Input {...register("state")} placeholder="Enter state" />
            </FormControl>

            <FormControl variant={'floating'} >
                 <span className="!text-center text-xs font-[800] !text-gray-600">Franchise Type</span>
                <Select
                    {...register("franchiseType")}
                    className="!drop-shadow-xl !bg-[white]"
                    placeholder="Select Franchise Type"
                >
                    {PCD_FRANCHISE_TYPES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </Select>
            </FormControl>

            <FormControl isInvalid={!!errors.interestedInPCDMonopoly} variant="floating">
                <span className="!text-center text-xs font-[800] !text-gray-600">Monopoly rights?</span>
                <Select {...register("interestedInPCDMonopoly")} placeholder="Select">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </Select>
            </FormControl>
            <PrimaryButton type='submit' className="" title={"Search"}></PrimaryButton>
            {/* <Button size='lg' className='!background !text-[grey] mx-auto mt-4' type="submit">Search</Button> */}
        </form>
    );
}

const ThirdPartyQuestionnaire = ({ handleOnSubmit }: { handleOnSubmit: (data: any) => void }) => {
    return <ProductDetailsForm handleOnSubmit={handleOnSubmit} />
}


// Yup validation schema
// const productFormSchema = yup.object({
//     product: yup.string(),
//     salt: yup.string(),
//     minOrders: yup.number(),
//     interestedInThirdPartyProducts: yup.boolean().default(true),
// }).required();
const productFormSchema = yup.object({
    composition: yup.string().oneOf(COMPOSITIONS).required("Composition is required"),
    productType: yup.string().oneOf(PRODUCT_TYPES).required("Product Type is required"),
    packetSize: yup.string().required("Packet size required"),
    minOrders: yup.number().min(1, "Minimum 1 order").required(),
    interestedInThirdPartyProducts: yup.boolean().default(true),
});


// Infer TypeScript type from schema (optional but helpful)
type ProductFormData = yup.InferType<typeof productFormSchema>;

const ProductDetailsForm = ({ handleOnSubmit }: { handleOnSubmit: (data: any) => void }) => {

    const searchForm = useForm<ProductFormData>({
        resolver: yupResolver(productFormSchema),
        mode: "onChange",
        defaultValues: {
            composition: undefined,
            productType: undefined,
            packetSize: "",
            minOrders: 0,
            interestedInThirdPartyProducts: true
        }
    });

    const { subscribe, watch } = searchForm;

    /**
     * Upon changes on any field the field values of other fields will be changed
     * 
     */
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
    }, [subscribe]);

    return (<>
        <form onSubmit={searchForm.handleSubmit(handleOnSubmit)} className="space-y-4">
            <FormControl variant={'floating'} >
                <span className="!text-center text-xs font-[800] !text-gray-600">Composition</span>
                <Select
                    {...searchForm.register("composition")}
                    className="!drop-shadow-xl !bg-[white]"
                    placeholder="Select Composition"
                >
                    {COMPOSITIONS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant={'floating'} >
                <span className="!text-center text-xs font-[800] !text-gray-600">Product Type</span>
                <Select
                    {...searchForm.register("productType")}
                    className="!drop-shadow-xl !bg-[white]"
                    placeholder="Select Product Type"
                >
                    {PRODUCT_TYPES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant={'floating'} >
                <span className="!text-center text-xs font-[800] !text-gray-600">Packet Size</span>
                <Input {...searchForm.register("packetSize")} className="!drop-shadow-xl !bg-[white]" id='composition' type='string' placeholder='Example, Axotocin 3mg 3w/u' />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl variant={'floating'} >
                <span className="!text-center text-xs font-[800] !text-gray-600">Minimun Orders</span>
                <Input className="!drop-shadow-xl !bg-[white]" {...searchForm.register("minOrders")} id='composition' type='number' placeholder='Example, Axotocin 3mg 3w/u' />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <PrimaryButton type='submit' className="" title={"Search"}></PrimaryButton>        </form>
    </>)

}

const PrivateLabellingForm = ({ handleOnSubmit }: { handleOnSubmit: (data: any) => void }) => {
    const schema = yup.object({
        medicineSystem: yup.string().oneOf(['Ayurvedic', 'Allopathy']).required("Please choose a system"),
        productListing: yup.string().required("Product listing is required").min(3, "Provide at least one product"),
        needExport: yup.string().oneOf(['yes', 'no']).required("Please specify export requirement"),
        interestedInPrivateLabels: yup.boolean().default(true),
    }).required();

    type FormData = yup.InferType<typeof schema>;

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema) as unknown as Resolver<FormData>,
        mode: "onChange",
        defaultValues: {
            medicineSystem: "Ayurvedic",
            productListing: "",
            needExport: "no",
        },
    });
    return (
        <form onSubmit={handleSubmit((data: FormData) => handleOnSubmit(data))} className="space-y-4">
            <FormControl isInvalid={!!errors.medicineSystem} variant="floating">
                <span className="!text-center text-xs font-[800] !text-gray-600">Choose System</span>
                <Select {...register("medicineSystem")} placeholder="Select system">
                    <option value="Ayurvedic">Ayurvedic</option>
                    <option value="Allopathy">Allopathy</option>
                </Select>
            </FormControl>

            <FormControl isInvalid={!!errors.productListing} variant="floating">
                <span className="!text-center text-xs font-[800] !text-gray-600">Product Listing</span>
                <Input {...register("productListing")} placeholder="Comma separated product names" />
            </FormControl>

            <FormControl isInvalid={!!errors.needExport} variant="floating">
                <span className="!text-center text-xs font-[800] !text-gray-600">Need to export?</span>
                <Select {...register("needExport")} placeholder="Select">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </Select>
            </FormControl>

            <PrimaryButton type='submit' className="" title={"Search"}></PrimaryButton>        </form>
    );
}