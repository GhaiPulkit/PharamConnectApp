'use client';

import { COMPOSITIONS } from "@/data/product/composition"
import { PRODUCT_TYPES } from "@/data/product/productType"
import { Button, Checkbox, FormControl, FormLabel, Input, Select } from "@chakra-ui/react"
import { PHARMA_CATEGORIES } from "./constants"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import * as yup from "yup";
import { useEffect } from "react";


/**
 * Questionnaire View Component that changes on selected category
 * @param param0 
 * @returns 
 */
export default function View({ selectedCategory, handleOnSubmit }: { selectedCategory?: PHARMA_CATEGORIES, handleOnSubmit: (data: any) => void }) {
    return (<>
        {
            selectedCategory === PHARMA_CATEGORIES.PCD && <PCDQuestionnaire handleOnSubmit={handleOnSubmit} />
        }
        {
            selectedCategory === PHARMA_CATEGORIES.THIRD_PARTY && <ThirdPartyQuestionnaire handleOnSubmit={handleOnSubmit} />
        }
        {
            selectedCategory === PHARMA_CATEGORIES.PRIVATE_LABEL && <PrivateLabellingForm handleOnSubmit={handleOnSubmit} />
        }
    </>)
}

const pcdSchema = yup.object({
    cityDistrict: yup.string().required("City/District is required"),
    state: yup.string().required("State is required"),
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
            interestedInPCDMonopoly: false,
            interestedInPCD: true,
        },
    });

    return (
        <form onSubmit={handleSubmit((data: PCDFormData) => handleOnSubmit(data))} className="space-y-4">
            <FormControl isInvalid={!!errors.cityDistrict} variant="floating">
                <FormLabel className="!text-center !text-xl text-gray-800">City/District</FormLabel>
                <Input {...register("cityDistrict")} placeholder="Enter city or district" />
            </FormControl>

            <FormControl isInvalid={!!errors.state} variant="floating">
                <FormLabel className="!text-center !text-xl text-gray-800">State</FormLabel>
                <Input {...register("state")} placeholder="Enter state" />
            </FormControl>

            <FormControl isInvalid={!!errors.state} variant="floating">
                <FormLabel className="!text-center !text-xl text-gray-800">Monopoly right?</FormLabel>
                <Checkbox {...register("interestedInPCDMonopoly")} />
            </FormControl>
            <Button size='lg' className='!bg-[black] !text-[white] mx-auto mt-4' type="submit">Search Products</Button>
        </form>
    );
}

const ThirdPartyQuestionnaire = ({ handleOnSubmit }: { handleOnSubmit: (data: any) => void }) => {
    return <ProductDetailsForm handleOnSubmit={handleOnSubmit} />
}


// Yup validation schema
const productFormSchema = yup.object({
    product: yup.string(),
    salt: yup.string(),
    minOrders: yup.number()
}).required();

// Infer TypeScript type from schema (optional but helpful)
type ProductFormData = yup.InferType<typeof productFormSchema>;

const ProductDetailsForm = ({ handleOnSubmit }: { handleOnSubmit: (data: any) => void }) => {

    const searchForm = useForm<ProductFormData>({
        resolver: yupResolver(productFormSchema) as Resolver<ProductFormData>,
        mode: "onChange",
        defaultValues: {
            product: "",
            salt: "",
            minOrders: 0
        },
    });

    const { subscribe, watch, register, handleSubmit, formState: {errors} } = searchForm;

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
        <form onSubmit={searchForm.handleSubmit((data: ProductFormData) => handleOnSubmit(data))} className="space-y-4">
            <FormControl variant={'floating'} >
                <FormLabel className={'!text-center !text-xl text-gray-800'}>Composition</FormLabel>
                <Select
                    {...register("salt")}
                    className="!drop-shadow-xl !bg-[white]"
                    placeholder="Select Composition"
                >
                    {COMPOSITIONS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant={'floating'} >
                <FormLabel className={'!text-center !text-xl text-gray-800'}>Product Type</FormLabel>
                <Select
                    {...register("product")}
                    className="!drop-shadow-xl !bg-[white]"
                    placeholder="Select Product Type"
                >
                    {PRODUCT_TYPES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant={'floating'} >
                <FormLabel className={'!text-center !text-xl text-gray-800'}>Packet Size</FormLabel>
                <Input className="!drop-shadow-xl !bg-[white]" id='composition' type='string' placeholder='Example, Axotocin 3mg 3w/u' />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl variant={'floating'} >
                <FormLabel className={'!text-center !text-xl text-gray-800'}>Minimun Orders</FormLabel>
                <Input {...register("minOrders")} className="!drop-shadow-xl !bg-[white]" id='composition' type='string' placeholder='Example, Axotocin 3mg 3w/u' />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <Button size='lg' className='!bg-[black] !text-[white] mx-auto mt-4' type="submit">Search Products</Button>
        </form>
    </>)

}

const PrivateLabellingForm = ({ handleOnSubmit }: { handleOnSubmit: (data: any) => void }) => {
    const schema = yup.object({
        medicineSystem: yup.string().oneOf(['Ayurvedic', 'Allopathy']).required("Please choose a system"),
        productListing: yup.string().required("Product listing is required").min(3, "Provide at least one product"),
        needExport: yup.string().oneOf(['yes', 'no']).required("Please specify export requirement"),
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
                <FormLabel className="!text-center !text-xl text-gray-800">Choose System</FormLabel>
                <Select {...register("medicineSystem")} placeholder="Select system">
                    <option value="Ayurvedic">Ayurvedic</option>
                    <option value="Allopathy">Allopathy</option>
                </Select>
            </FormControl>

            <FormControl isInvalid={!!errors.productListing} variant="floating">
                <FormLabel className="!text-center !text-xl text-gray-800">Product Listing</FormLabel>
                <Input {...register("productListing")} placeholder="Comma separated product names" />
            </FormControl>

            <FormControl isInvalid={!!errors.needExport} variant="floating">
                <FormLabel className="!text-center !text-xl text-gray-800">Need to export?</FormLabel>
                <Select {...register("needExport")} placeholder="Select">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </Select>
            </FormControl>

            <Button type="submit" size="lg" className="!bg-[black] !text-[white] mx-auto mt-4">Search Products</Button>
        </form>
    );
}