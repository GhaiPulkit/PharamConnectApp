'use client';

import NoRecordFound from "@/components/common/NoRecordFound";
import { useAppPrimaryContext } from "@/context/AppContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


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
                <section className="box-wrap rounded-xl drop-shadow p-4 bg-[#ffffffee] backdrop-blur !border !border-[white]">
                    <div className="flex gap-4 items-start">
                        <div className="rounded aspect-square h-[120px] w-[120px] overflow-hidden border">
                            <img
                                src={manufacturer.avatar}
                                alt={`${manufacturer.name} logo`}
                                className="h-full w-full object-cover"
                                onError={(e) =>
                                    (e.currentTarget.src = "https://www.freeiconspng.com/uploads/blank-logo-design-for-brand-13.png")
                                }
                            />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold">{manufacturer.name}</h1>
                            <p className="text-gray-700 mt-2">{manufacturer.description}</p>
                            {manufacturer.introduction && (
                                <p className="text-gray-600 mt-3">{manufacturer.introduction}</p>
                            )}
                            <div className="mt-4 text-sm text-gray-500 flex flex-wrap gap-4">
                                <div>Location: {manufacturer.location}</div>
                                <div>Email: {manufacturer.email}</div>
                                <div>Phone: {manufacturer.phone}</div>
                                <div>Website: <a href={manufacturer.website} target="_blank" rel="noreferrer" className="text-blue-600 underline">{manufacturer.website}</a></div>
                                <div>Established: {manufacturer.established}</div>
                            </div>
                            <div className="mt-3 flex gap-2 flex-wrap">
                                {manufacturer.certifications?.map((c, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                        {c}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Stats */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="box-wrap p-4 rounded-lg text-center">
                        <div className="text-sm text-gray-500">Compositions</div>
                        <div className="text-2xl font-semibold">{manufacturer.compositionAvailable?.length ?? 0}</div>
                    </div>
                    <div className="box-wrap p-4 rounded-lg text-center">
                        <div className="text-sm text-gray-500">Product Types</div>
                        <div className="text-2xl font-semibold">{manufacturer.product_types?.length ?? 0}</div>
                    </div>
                    <div className="box-wrap p-4 rounded-lg text-center">
                        <div className="text-sm text-gray-500">Best Sellers</div>
                        <div className="text-2xl font-semibold">{manufacturer.best_sellers?.length ?? 0}</div>
                    </div>
                    <div className="box-wrap p-4 rounded-lg text-center">
                        <div className="text-sm text-gray-500">Certifications</div>
                        <div className="text-2xl font-semibold">{manufacturer.certifications?.length ?? 0}</div>
                    </div>
                </section>

                {/* Compositions */}
                <section className="flex flex-col gap-3">
                    <h2 className="text-2xl font-bold">Compositions</h2>
                    <div className="flex gap-3 flex-wrap">
                        {manufacturer.compositionAvailable?.map((comp) => (
                            <div key={comp.id} className="w-[260px]">
                                <div className="box-wrap p-4 rounded-lg h-full flex flex-col">
                                    <h3 className="text-lg font-semibold">{comp.composition}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{comp.category ?? "Uncategorized"}</p>
                                    <div className="mt-auto text-xs text-gray-400">ID: {comp.id}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Product Types */}
                <section className="flex flex-col gap-3">
                    <h2 className="text-2xl font-bold">Product Types</h2>
                    <div className="flex gap-3 flex-wrap">
                        {manufacturer.product_types?.map((p) => (
                            <div key={p.id} className="w-[260px]">
                                <div className="box-wrap p-4 rounded-lg h-full">
                                    <h3 className="text-lg font-semibold">{p.name}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{p.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Best Sellers */}
                <section className="flex flex-col gap-3">
                    <h2 className="text-2xl font-bold">Best Sellers</h2>
                    <div className="flex gap-3 flex-wrap">
                        {manufacturer.best_sellers?.map((s) => (
                            <div key={s.id} className="w-[220px]">
                                <div className="box-wrap p-4 rounded-lg">
                                    <h4 className="font-semibold">{s.name}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

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
            </div>
        </>
    );
}