import { FormControl, FormLabel, FormHelperText, Button, Input } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import * as yup from "yup";

// Yup validation schema
const schema = yup.object({
    product: yup.string().nullable(),
    salt: yup.string().nullable(),
    minOrders: yup.number().nullable()
}).required();

// Infer TypeScript type from schema (optional but helpful)
export type FormData = yup.InferType<typeof schema>;
export default function SearchForm({ form }: { form: any }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset,
        subscribe,
        watch,
    } = form;

    const ProductValueWatch = watch("product");
    const SaltValueWatch = watch("salt");
    const MinOrdersValueWatch = watch("minOrders");
    const onSubmit = async (data: FormData) => {
        try {
            // simulate async submission (e.g., call API)
            await new Promise((res) => setTimeout(res, 700));
            console.log("Submitted data:", data);
            // show success and reset
            alert("Form submitted — check console for data");
            reset();
        } catch (err) {
            console.error(err);
            alert("Something went wrong — try again");
        }
    };



    return (
        <div className="max-w-full w-full bg-[green]">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="flex flex-col gap-4 text-[black] w-full bg-[pink]">
                    {/* Product */}
                    <FormControl variant={'floating'} >
                        <FormLabel className={'!text-center !text-xl'}>What is is product you are looking for?</FormLabel>
                        <Input className="!drop-shadow-xl !bg-[white]"  id='product' type='string' {...register("product")} />
                        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    </FormControl>

                    {/* Salt */}
                    <FormControl variant={'floating'} >
                        <FormLabel className={'!text-center !text-xl'}>Which or all Salt you are intested in?</FormLabel>
                        <Input className="!drop-shadow-xl !bg-[white]"  id='salt' type='string' {...register("salt")}/>
                        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    </FormControl>

                    {/* Min Orders */}
                    <FormControl variant={'floating'}>
                        <FormLabel className={'!text-center !text-xl'}>Any min Orders</FormLabel>
                        <Input className="!drop-shadow-xl !bg-[white]"  id='minOrders' type='number'  {...register("minOrders")}/>
                        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    </FormControl>
                </div>
            </form>
        </div>
    );

}