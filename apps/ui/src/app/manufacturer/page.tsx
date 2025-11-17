'use client';

import NoRecordFound from "@/components/common/NoRecordFound";
import { useAppPrimaryContext } from "@/context/AppContext";
import { useEffect, useState } from "react";

export default function Page({ }) {
    const { manufacturers, selectedManufacturerID }: any = useAppPrimaryContext();
    const [manufacturer, setManufacturer] = useState<any>();

    // const manufacturer = {
    //     name: "ABC Manufacturing Co.",
    //     location: "Delhi, India",
    //     description: "Leading manufacturer of quality products.",
    //     introduction: "Welcome to ABC Manufacturing Co., where quality meets innovation.",
    //     products: [
    //         { id: 1, name: "Product A", description: "High-quality product A", price: 100 },
    //         { id: 2, name: "Product B", description: "Durable product B", price: 150 },
    //         { id: 3, name: "Product C", description: "Affordable product C", price: 200 },
    //         { id: 4, name: "Product A", description: "High-quality product A", price: 100 },
    //         { id: 5, name: "Product B", description: "Durable product B", price: 150 },
    //         { id: 6, name: "Product C", description: "Affordable product C", price: 200 },
    //     ],
    //     product_types: [
    //         { id: 1, name: "Type 1", description: "Description for Type 1" },
    //         { id: 2, name: "Type 2", description: "Description for Type 2" },
    //         { id: 3, name: "Type 3", description: "Description for Type 3" },
    //     ],
    //     best_sellers:[
    //         { id: 1, name: "Hot Search 1" },
    //         { id: 2, name: "Hot Search 2" },
    //         { id: 3, name: "Hot Search 3" },
    //         { id: 4, name: "Hot Search 4" },
    //     ],
    //     logoUrl: "https://www.example.com/logo.png",
    //     compositions: [
    //         { id: 1, name: "Axolyxon w/v 20mg", description: "Details about Composition A" },
    //         { id: 2, name: "Axolyxon w/v 20mg", description: "Details about Composition B" },
    //     ],
    // }

    useEffect(() => {
        selectedManufacturerID && setManufacturer(manufacturers[selectedManufacturerID])
    }, [selectedManufacturerID])

    useEffect(() => {
        console.log(manufacturer)
    }, [manufacturer])
    return (<>
        {manufacturer ? <div className="flex flex-col gap-2 max-w-[1200px] mx-auto py-4">
            <h1 className="text-3xl font-bold">{manufacturer?.name}</h1>
            <p className="text-lg text-gray-600">{manufacturer?.description}</p>

            {/* Intro Section */}
            <div className="box-wrap rounded-xl drop-shadow p-2 w-full !border !border-[white] bg-[#ffffff90] backdrop-blur">
                <div className="flex gap-4 items-top">
                    <div className="rouneded aspect-square h-[100px] w-[100px]">
                        <img src={manufacturer?.logoUrl} onError={(e) => e.currentTarget.src = "https://www.freeiconspng.com/uploads/blank-logo-design-for-brand-13.png"} alt="" />
                    </div>
                    <div className="flex-1 p-4 flex flex-col gap-4">
                        <h3 className="text-2xl font-bold mb-2">Details</h3>
                        <p className="text-gray-700">{manufacturer?.introduction}</p>
                        <div className="">
                            <span className="text-sm text-[grey]"> Location: {manufacturer?.location}</span>
                        </div>
                        {/* heat map section */}
                        <section className="flex flex-col gap-4 py-4 w-full">
                            {manufacturer?.best_sellers.length > 0 && <h4 className="text-2xl font-bold">Best Sellers</h4>}
                            {/* <div className="flex">
                                {manufacturer.best_sellers.map((item) => (
                                    <div key={item.id} className="px-3 py-1 bg-[#ff572290] text-white rounded-full mr-2 text-sm">
                                        {item.name}
                                    </div>
                                ))}
                            </div>     */}
                        </section>
                    </div>
                </div>
            </div>
            {/* Product Catalogue */}
            <section className="flex flex-col gap-4 py-4 w-full">
                <h2 className="text-2xl font-bold">Product Catalogue</h2>
                <div className="flex gap-1 flex-wrap w-full justify-center">
                    {/* {
                    manufacturer.products.map((product) => (
                        <div key={product.id} className="w-[30%] aspect-square p-2">
                            <div className="box-wrap rounded-xl drop-shadow p-4 !border !border-[white] bg-[#ffffff90] backdrop-blur flex flex-col gap-2 h-full">
                                <h3 className="text-xl font-semibold">{product.name}</h3>
                                <p className="text-gray-700">{product.description}</p>
                                <span className="text-lg font-bold">Price: ₹{product.price}</span>
                            </div>
                        </div>
                    ))
                } */}
                </div>

            </section>
            {/* Product Types */}
            <section className="flex flex-col gap-4 py-4 w-full">
                <h2 className="text-2xl font-bold">Product Types</h2>
                <div className="flex gap-1 flex-wrap w-full justify-center">
                    {/* {
                    manufacturer.product_types.map((product) => (
                        <div key={product.id} className="h-[300px] aspect-square p-2">
                            <div className="box-wrap rounded-xl drop-shadow p-4 !border !border-[white] bg-[#ffffff90] backdrop-blur flex flex-col gap-2 h-full">
                                <h3 className="text-xl font-semibold">{product.name}</h3>
                                <p className="text-gray-700">{product.description}</p>
                            </div>
                        </div>
                    ))
                } */}
                </div>

            </section>
        </div> :
            <NoRecordFound />}
    </>)
}