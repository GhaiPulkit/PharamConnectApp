'use client';

import NoRecordFound from "@/components/common/NoRecordFound";
import { useAppPrimaryContext } from "@/context/AppContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GiMedicines } from "react-icons/gi";
import { cn } from "../../../utils";
import { FaArrowAltCircleUp, FaArrowRight } from "react-icons/fa";
import { productCategories } from "@/components/modules/ManufacturerScreen/ProductTypes";


type Manufacturer = {
    id: string | number;
    name: string;
    avatar?: string;
    description?: string;
    introduction?: string;
    location?: string;
    email?: string;
    phone?: string;
    website?: string;
    compositionAvailable?: { id: number; composition: string; category?: string }[];
    product_types?: { id: number; name: string; description?: string }[];
    best_sellers?: { id: number; name: string }[];
    certifications?: string[];
    established?: string;
};

export default function Page() {
    const { manufacturers }: any = useAppPrimaryContext();
    const [manufacturer, setManufacturer] = useState<Manufacturer | undefined>();
    const queryparam = useSearchParams();

    // fallback sample data when context has no manufacturers
    const sampleManufacturers: Manufacturer[] = [
        {
            id: "1",
            name: "Pulsetech Pharma Ltd.",
            avatar:
                "https://images.unsplash.com/photo-1581091870626-3a8b2b9d5b2a?w=400&auto=format&q=60",
            description:
                "A leading developer of high-quality generics and specialty APIs focused on global health.",
            introduction:
                "Pulsetech Pharma has been delivering safe, effective and affordable medicines since 1998. We combine modern R&D with strict quality control to serve patients worldwide.",
            location: "Mumbai, India",
            email: "info@pulsetechpharma.com",
            phone: "+91 22 4000 1234",
            website: "https://pulsetechpharma.example",
            compositionAvailable: [
                { id: 1, composition: "Azithromycin 250mg", category: "Antibiotic" },
                { id: 2, composition: "Paracetamol 500mg", category: "Analgesic" },
                { id: 3, composition: "Vitamin D3 1000IU", category: "Supplement" },
            ],
            product_types: [
                { id: 1, name: "Tablets", description: "Immediate release and coated tablets" },
                { id: 2, name: "Suspensions", description: "Pediatric oral suspensions" },
            ],
            best_sellers: [
                { id: 1, name: "Pulsetech Paracetamol" },
                { id: 2, name: "Pulsetech Azithro" },
            ],
            certifications: ["WHO-GMP", "ISO 9001", "USFDA (DMF Pending)"],
            established: "1998",
        },
        {
            id: "2",
            name: "Novex Biocare",
            avatar:
                "https://images.unsplash.com/photo-1604908177522-9c7d2b1f1f0b?w=400&auto=format&q=60",
            description: "Specialty injectables and biologics manufacturer.",
            introduction:
                "Novex Biocare pioneers sterile manufacturing for complex formulations with end-to-end cold chain expertise.",
            location: "Hyderabad, India",
            email: "contact@novexbiocare.example",
            phone: "+91 40 3000 5678",
            website: "https://novexbiocare.example",
            compositionAvailable: [
                { id: 10, composition: "Adalimumab (biosimilar)", category: "Biologic" },
                { id: 11, composition: "Ceftriaxone 1g", category: "Antibiotic" },
            ],
            product_types: [
                { id: 10, name: "Injectables", description: "Vials and prefilled syringes" },
                { id: 11, name: "Lyophilized Products", description: "Freeze-dried formulations" },
            ],
            best_sellers: [{ id: 10, name: "Novex Biologics Adalimumab" }],
            certifications: ["WHO-GMP", "EU GMP (MRA)"],
            established: "2008",
        },
    ];

    useEffect(() => {
        const param = queryparam?.get("manufacturerId");
        const source = Array.isArray(manufacturers) && manufacturers.length ? manufacturers : sampleManufacturers;
        // try to find by id or fallback to first
        const found = param
            ? source.find((m: any) => String(m.id) === String(param))
            : source[0];
        setManufacturer(found);
    }, [manufacturers, queryparam]);

    if (!manufacturer) return <NoRecordFound />;

    return (
        <>
            <div className="flex flex-col gap-4 max-w-[1200px] mx-auto py-6">
                {/* Header / Intro */}
                <section className="box-wrap drop-shadow p-4 ">
                    <div className="flex gap-4 items-start">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold">{'Sun Pharma'}</h1>
                            <p className="text-gray-700 mt-2">{'A complete solution to your manufacturer needs.'}</p>
                            {manufacturer.introduction && (
                                <p className="text-gray-600 mt-3">{manufacturer.introduction}</p>
                            )}
                            <div className="mt-4 text-sm text-gray-500 flex flex-wrap gap-4">
                                <div>Location: {manufacturer.location}</div>
                                <div>Email: {manufacturer.email}</div>
                                <div>Phone: {manufacturer.phone}</div>
                                <div>Website: <a href={manufacturer.website} target="_blank" rel="noreferrer" className="text-blue-600 underline">{manufacturer.website}</a></div>
                                <div>Est. {manufacturer.established || 1990}</div>
                            </div>
                            {/* <div className="mt-3 flex gap-2 flex-wrap">
                                {manufacturer.certifications?.map((c, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                        {c}
                                    </span>
                                ))}
                            </div> */}
                        </div>
                    </div>
                </section>
                <section className="p-4 flex flex-col gap-2">
                    <div className="text-lg font-bold !text-[black]">About Us</div>
                    <p className="text-md font-normal text-[#111111]"> Avecia Healthcare is an expeditiously growing pharmaceutical marketing company with 500+ products. We offer PCD Pharma Franchise for quality pharmaceutical formulations which are both affordable and convenient for mankind.

Our pharmaceutical products are formulated using high-quality materials sourced from reliable and trusted manufacturers with WHO GMP Certified Unit</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 animate-fade-in-scale">
                    {[{ name: "Compositions", number: 12 }, { name: "Product Types", number: 12 }, { name: "Best Sellers", number: 12 }, { name: "Certifications", number: 12 }].map((item, idx) =>
                        <div className={cn(`box-wrap flex flex-col gap-2 p-4 rounded-lg !border-[black] !border-r-[5px] !border-b-[5px] text-center bg-[#007F72] rounded-xl drop-shadow-xl`)}>
                            <div className=" grid grid-cols-[1fr_auto] gap-5 w-full">
                                <div className="text-sm text-white">{item.name}
                                    <div className="text-2xl text-white font-semibold">{manufacturer.compositionAvailable?.length ?? 0}</div>
                                </div>
                                <div className="flex flex-end"><GiMedicines fontSize={'1.5rem'} color={'white'} /></div></div>

                            <div className=" text-sm text-gray-100 text-right flex flex-end items-center gap-2">View All <FaArrowRight color={'white'} /></div>
                        </div>)
                    }
                </div>
                </section>

                {/* Types of Products */}
                <section className="flex flex-col gap-3 p-4">
                    <div className="text-lg font-bold !text-[black]">Types of Products</div>
                    <div className="flex gap-3 flex-wrap justify-center animate-fade-in-scale">
                        {productCategories.map((item: any, idx) =>
                            <div key={`productType-w-${idx}`} className={cn(`box-wrap w-[150px] h-[150px] flex flex-col gap-2 p-4 rounded-lg !border-[black] !border-r-[5px] !border-b-[5px] text-center bg-[#E9A319] rounded-xl drop-shadow-xl`)}>
                                <div className="h-full flex items-center justify-center flex-col gap-2">
                                    <div className="flex flex-end"><item.icon color={'white'} fontSize={'3rem'} /></div>
                                    <div className="text-sm text-white">{item.name}</div>
                                    </div>

                                {/* <div className=" text-sm text-gray-100 text-right flex flex-end items-center gap-2">View All <FaArrowRight color={'white'}/></div> */}
                            </div>)
                        }
                    </div>

                </section>

                {/* Compositions */}
                <section className="flex flex-col gap-3 p-4">
                    <div className="text-lg font-bold !text-[black]">Compositions</div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gray-100 text-left">
                                <tr>
                                    <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">ID</th>
                                    <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">Composition</th>
                                    <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">Category</th>
                                </tr>
                            </thead>

                            <tbody>
                                {manufacturer.compositionAvailable?.map((comp, idx) => (
                                    <tr key={comp.id + idx} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border-b text-xs text-gray-600">{comp.id}</td>
                                        <td className="px-4 py-2 border-b text-sm font-medium text-gray-800">
                                            {comp.composition}
                                        </td>
                                        <td className="px-4 py-2 border-b text-sm text-gray-600">
                                            {comp.category ?? "Uncategorized"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>


                {/* Product Types */}


                {/* Best Sellers */}

                {/* Footer / Contact CTA */}
                <section className="box-wrap p-4 rounded-xl text-center">
                    <h3 className="text-xl font-bold">Contact {manufacturer.name}</h3>
                    <p className="text-gray-600 mt-2">For partnership, supply or enquiries reach out at <a className="underline text-blue-600" href={`mailto:${manufacturer.email}`}>{manufacturer.email}</a> or call {manufacturer.phone}</p>
                    {manufacturer.website && (
                        <div className="mt-3">
                            <a className="px-4 py-2 bg-blue-600 text-white rounded" href={manufacturer.website} target="_blank" rel="noreferrer">Visit website</a>
                        </div>
                    )}
                </section>

                <div className="absolute bottom-0 right-0 h-[50px] w-auto mx-4 my-4 flex flex-col items-center gap-2 drop-shadow-xl">
                    <FaArrowAltCircleUp color={'black'} fontSize={'2rem'}/>
                    <p className="text-[10px]">Back To Top</p>
                </div>
            </div>
        </>
    );
}