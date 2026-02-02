'use client';

import NoRecordFound from "@/components/common/NoRecordFound";
import { useAppPrimaryContext } from "@/context/AppContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GiMedicines } from "react-icons/gi";
import { cn } from "../../../../utils";
import { FaArrowAltCircleUp, FaArrowRight } from "react-icons/fa";
import { productCategories } from "@/components/modules/ManufacturerScreen/ProductTypes";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { CgWebsite } from "react-icons/cg";
import { IoTrainOutline, IoAirplaneOutline, IoCarOutline, IoBoat } from "react-icons/io5";
import { Button, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from "@chakra-ui/react";
import { FaLeaf } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import CarouselSideMenuTabs, { CarouselSideMenuItemContentProps } from "@/components/common/SidebarMenuTabs";
import { PHARMA_CATEGORIES } from "@/data/PharmaCategeories";
import { Manufacturer, ManufacturerListStatic } from "@/data/manufacturer";
import React from "react";
import CreateOpportunityModal from "@/app/categories/components/PostRequirementCTA";

// type Manufacturer = {
//     id: string | number;
//     name: string;
//     avatar?: string;
//     description?: string;
//     introduction?: string;
//     location?: string;
//     email?: string;
//     phone?: string;
//     website?: string;
//     compositionAvailable?: { id: string | number; composition: string[]; category?: string }[];
//     product_types?: { id: number; name: string; description?: string }[];
//     best_sellers?: { id: number; name: string }[];
//     certifications?: string[];
//     established?: string;
// };

export default function ManufacturerPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Manufacturer['products'] | []>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [manufacturer, setManufacturer] = useState<Manufacturer | undefined>();
    const queryparam = useSearchParams();
    // const manufacturers = useSelector((state: RootState) => state.app.manufacturerList); // Access transformed state
    const manufacturers = ManufacturerListStatic; // Access transformed state

    // fallback sample data when context has no manufacturers
    const sampleManufacturers = [
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
        setManufacturer(found as Manufacturer | undefined);
        setFilteredProducts((found as Manufacturer)?.products || []);
    }, [manufacturers, queryparam]);


    const handleSearch = (query: string) => {
        const trimmedQuery = query.trim();
        setSearchQuery(trimmedQuery);

        if (!trimmedQuery) {
            // Reset to all products if query is empty
            setFilteredProducts(manufacturer?.products || []);
            setIsSearching(false);
            return;
        }

        const filtered = (manufacturer?.products || []).filter(p =>
            p.p_name.toLowerCase().split(/[\s-]+/).includes(query.toLowerCase()) || 
            p.composition.some(c => (
                c.toLowerCase().split(/[\s-]+/).includes(query.toLowerCase())
            ))
        );

        setFilteredProducts(filtered);
        setIsSearching(true);
    };

    // Tobe removed after testing
    useEffect(() => {
        console.log(searchQuery)
        console.log(filteredProducts)
        console.log(isSearching)
    }, [searchQuery, filteredProducts, isSearching])

    if (!manufacturer) return <NoRecordFound />;


    const sideMenuItems: CarouselSideMenuItemContentProps[] = [
        {
            title: "About Us",
            content: (<AboutUs description={manufacturer.about || ""}/>),
        },
        {
            title: "Categories",
            content: (<Categories />)
        },
        {
            title: "Product",
            content: (<Products />)
        },
        {
            title: "Compositions",
            content: (
                <section className="h-full w-full mt-4 flex flex-col gap-8">
                    <section className=" p-2 bg-white">
                        <h3 className="font-bold text-lg mb-2">Compositions Available</h3>
                        <div className="grid grid-cols-[repeat(4,1fr)] gap-2">
                            {manufacturer.compositionAvailable?.map((composition, index) => (
                                composition.composition?.map((item, itemIndex) => (
                                    <>
                                        <div key={`${index}-${itemIndex}`} className="px-4 py-2 text-[12px] leading-[16px] bg-gray-50">
                                            {item || 'N/A'}
                                        </div>
                                    </>
                                ))
                            ))}
                        </div>
                    </section>
                </section>
            )

        }
    ]
    return (<>
        <div className=" w-full h-full grid grid-rows-[auto_1fr] overflow-y-hidden p-2">
            <div className="w-full bg-white grid grid-cols-[auto_1fr] mx-auto max-w-[1200px] z-10 rounded-lg gap-2 overflow-y-auto">
                <div className="w-auto h-full flex flex-col p-2">
                    {/* Todo : Add Image */}
                </div>
                <div className="w-full grid grid-rows-[auto_1fr] h-full overflow-y-auto pt-2">
                <div className="rounded-xl overflow-hidden relative h-[250px] w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-center object-fit flex items-center justify-center"
                style={{ backgroundImage: "url('./images/tpm_image.jpg')" }}>
                <div className="absolute inset-0 bg-black opacity-20"></div>
                </div>
                    <section className="w-full !border-b h-[auto] p-2">
                        <InfoHeader
                            manufacturer={manufacturer}
                            // searchQuery={searchQuery}
                            // onSearch={handleSearch}
                        />

                    </section>
                    <section className="w-full bg-green p-2 h-auto">
                        <CarouselSideMenuTabs sideMenuItems={sideMenuItems} />
                    </section>
                </div>
            </div>

        </div>
    </>);
}




const CategoryCircle = ({ label, icon: Icon }: { label: string, icon: React.ElementType }) => {
    return (
        <div className="mx-auto p-2 w-[200px] drop-shadow-md bg-white to-white bg-gray rounded-xl flex flex-col items-center justify-center hover:bg-gray-50 hover:scale-[1.1] transition-transform cursor-pointer">
            <div className="flex flex-col items-center justify-center gap-2 h-[75px] overflow-hidden">
                <Icon className="text-[darkgreen] text-1xl" />
                <span className="text-xs font-semibold text-gray-500">{label}</span>
            </div>
        </div>
    )
}


const ProductBox = ({ name, description, onClick, icon }: { name: string; description?: React.ReactNode, onClick?: () => void, icon?: React.ElementType }) => {
    return (
        <div className="mx-auto p-8 w-full h-full max-w-[250px] aspect-square rounded-2xl bg-gray-100 !border-r-[10px] !border-b-[10px] border-gray-200 flex flex-col items-center justify-between hover:scale-105 transition-transform cursor-pointer" onClick={onClick}>
            <div className="grid grid-cols-[auto_1fr] gap-4">
                <div className="bg-pink-500 w-[50px] aspect-square rounded-full"></div>
                <div className="flex flex-col items-center justify-start">
                    <span className="font-bold">{name}</span>
                    <p className="text-sm text-gray-600">{description || 'Somthng'}</p>
                </div>
            </div>
        </div>)
};


const InfoHeader = ({ manufacturer }: { manufacturer: any }) => {
    return (
        <div id="info-wrapper" className="">
            <div className=" p-2 rounded-lg grid grid-cols-[75%_1fr] gap-2">
                <div className="flex flex-col gap-4 p-2">
                    <div className="flex flex-wrap gap-2 items-baseline">
                        <h1>{manufacturer.name}</h1><div className="px-4 text-sm text-gray-500">
                            <span className="font-bold">CEO :</span>
                            <span className="ml-1">{manufacturer.ceo}</span>
                        </div>
                    </div>
                    <div className="w-full flex  items-center">
                        <div className="flex gap-2 items-baseline">
                            <span className="px-4 text-sm text-blue-500 p-2 bg-blue-100 rounded-full !border-1 !border-[blue-500]">Private Limited Company </span>
                            <span className="text-sm font-medium text-[#cccccc] flex gap-2 items-baseline"><LuUsers color={'#cccccc'} /> 50-60  Employees</span>
                        </div>
                        <span className="px-4 text-sm text-gray-400"><b>GST:</b>{manufacturer.gst}</span>
                    </div>

                    <div className="w-full flex gap-4 items-center mt-2 text-gray-400">
                        {[
                            { icon: CiLocationOn, value: manufacturer.location || 'N/A' },
                            // { icon: HiOutlineMail, value: manufacturer.email || 'N/A' },
                            // { icon: FiPhone, value: manufacturer.phone || 'N/A' },
                            { icon: CgWebsite, value: manufacturer.website || 'N/A' },
                        ].map((contact, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                                <contact.icon />
                                <span>{contact.value}</span>
                            </div>
                        ))
                        }
                    </div>
                    <div className="text-gray-400 w-full flex flex-col gap-2 text-sm mt-[10px]">
                        <span className="text-xs font-semibold text-gray-400"> Export</span>
                        <div className="flex gap-2">
                            <span>
                                {manufacturer.exporter ? "International Markets including USA, Europe, Africa, Asia" : "Do not export"}</span>
                            {[{ icon: IoTrainOutline, name: "train" }, { icon: IoAirplaneOutline, name: "air" }, { icon: IoCarOutline, name: "road" }, { icon: IoBoat, name: "cargo" }].map((icon, idx) => (
                                <icon.icon key={idx} className="inline-block ml-2" /> // use the if logic to map with manufacturer.export
                            ))}
                        </div>


                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-semibold text-gray-400">Nature of Business</span>
                        <div className="flex gap-2">
                            {manufacturer.businessNature.map((business: string, idx: any) => (
                                <span key={idx} className="text-sm text-pink-600 bg-pink-100 !border-pink-600 !border-1 px-2 rounded-full py-1">{business}</span>
                            ))}
                        </div>

                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-semibold text-gray-400">Additional Services</span>
                        <div className="flex gap-2">
                            {['wholesaler', 'exporter', 'supplier', 'distributor', 'service provider', 'trader'].map((business, idx) => (
                                manufacturer[business] && <span key={idx} className="text-sm text-pink-600 bg-pink-100 !border-pink-600 !border-1 px-2 rounded-full py-1">{business}</span>
                            ))}
                        </div>

                    </div>
                </div>
                <div className="w-full grid grid-rows-[1fr_auto] gap-2 ">
                    <div className="!border-1 !border-grey w-full rounded-md h-[40px] flex flex-col ">
                        <input
                            type="text"
                            placeholder="Search Products..."
                            className="w-full h-full px-2 rounded-md"
                            // value={searchQuery}
                            // onChange={(e) => onSearch(e.target.value)}
                            // onKeyDown={(e) => e.key === 'Enter' && onSearch(searchQuery)}
                        />

                    </div>
                    <div className="flex gap-2">
                        <Button className="!bg-[purple] rounded-md !text-white !px-2 !py-2 !no-wrap" onClick={() => console.log("Request Form clicked")}>Request Form</Button>
                        <Button className="!bg-[purple] rounded-md !text-white !px-2 !py-2 !no-wrap">Brochure</Button>
                        {/* <CreateOpportunityModal 
                            isOpen={isOpen}
                            onClose={onClose}
                            step={step}
                            setStep={setStep}
                            totalSteps={totalSteps}
                            progress={progress}
                            formData={formData}
                            updateField={updateField}
                            submitOpportunity={submitOpportunity}
                            BUSINESS_TYPES={BUSINESS_TYPES}
                            PACKAGING_PREFERENCES={PACKAGING_PREFERENCES}
                            EXPERIENCE_ROLES={EXPERIENCE_ROLES}
                        /> */}
                        {/* <button className="">Download Brochure</button> */}
                    </div>
                </div>

            </div>
        </div>
    )
}


const AboutUs = ({ description }: { description: string }) => {
    return (<section className=" p-2 bg-white">
        <h3 className="font-bold text-lg mb-2">About Us</h3>
        <p className="leading-[26px] text-sm text-gray-700">{description || '-'}</p>
    </section>)
}

const Categories = () => {
    return (<section className=" p-2 bg-white">
        <h3 className="font-bold text-lg mb-2">Categories</h3>
        <div className="p-4 grid grid-cols-[repeat(4,1fr)] gap-4">
            {PHARMA_CATEGORIES.map(item => (
                <CategoryCircle key={item.id} label={item.name} icon={FaLeaf} />)
            )}
        </div>
    </section>)
}

const Products = ({ products, searchQuery }: { products?: Manufacturer['products'], searchQuery?: string}) => {
    //  if (!products || products.length === 0) {
    //     return (
    //         <section className="p-2 bg-white">
    //             <h3 className="font-bold text-lg mb-2">Products</h3>
    //             <p>No products found having {searchQuery}</p>
    //         </section>
    //     );
    // }
    // // code to add dynamic product data
    // if (products.length > 0 ) {
    //     return (
    //         <section className="p-2 bg-white">
    //             <h3 className="font-bold text-lg mb-2">{searchQuery} - Products</h3>
    //             <div className="p-4 grid grid-cols-3 gap-4 h-[auto]">
    //                 {products.map(p => (
    //                     <ProductBox
    //                         key={p.p_id}
    //                         name={p.p_name}
    //                         description={p.composition.map((c, idx) => (
    //                            <div key={idx} className="text-sm text-gray-600">
    //                                 • {c}
    //                             </div> 
    //                         ))}
    //                     />
    //                 ))}
    //             </div>
    //         </section>
    //     );
    // }
    return (<section className=" p-2 bg-white">
        <h3 className="font-bold text-lg mb-2">Products</h3>
        <div className="p-4 grid grid-cols-3 gap-4 h-[auto]">
            {/* Analgesics & Antipyretics */}
            <ProductBox name="Sun-Parcet 500" description="Paracetamol 500mg - Fast acting relief for fever and pain" />
            <ProductBox name="Sun-Fenac Plus" description="Diclofenac Sodium 50mg + Paracetamol 325mg" />
            <ProductBox name="Nimu-Sun Gold" description="Nimesulide 100mg + Paracetamol 325mg Tablet" />

            {/* Antibiotics & Anti-Infectives */}
            <ProductBox name="Amoxy-Sun 500" description="Amoxicillin 500mg Broad Spectrum Antibiotic" />
            <ProductBox name="Sun-Clav 625" description="Amoxicillin 500mg + Potassium Clavulanate 125mg" />
            <ProductBox name="Azith-Sun 500" description="Azithromycin 500mg USP - 3 Day Course" />
            <ProductBox name="Cef-Sun 200" description="Cefixime 200mg Dispersible Tablet" />
            <ProductBox name="Oflox-Sun OZ" description="Ofloxacin 200mg + Ornidazole 500mg" />

            {/* Cardiovascular & Anti-Diabetic */}
            <ProductBox name="Telmi-Sun 40" description="Telmisartan 40mg - Blood Pressure Management" />
            <ProductBox name="Amlod-Sun 5" description="Amlodipine 5mg Calcium Channel Blocker" />
            <ProductBox name="Glim-Sun M2" description="Glimepiride 2mg + Metformin 500mg SR" />

            {/* Gastrointestinal */}
            <ProductBox name="Pant-Sun 40" description="Pantoprazole 40mg Gastro-Resistant Tablets" />
            <ProductBox name="Sun-DSR" description="Pantoprazole 40mg + Domperidone 30mg Sustained Release" />
            <ProductBox name="Om-Sun 20" description="Omeprazole 20mg Antacid Capsules" />
            <ProductBox name="Gel-Sun Antacid" description="Magnesium Hydroxide + Aluminium Hydroxide Gel" />

            {/* Vitamins & Supplements */}
            <ProductBox name="Sun-Vit Multivitamin" description="Essential Vitamins, Minerals & Antioxidants" />
            <ProductBox name="Cal-Sun D3" description="Calcium Carbonate 500mg + Vitamin D3 250 IU" />
            <ProductBox name="B-Sun Complex" description="Vitamin B-Complex with B12 and Vitamin C" />

            {/* Respiratory & Allergy */}
            <ProductBox name="Lev-Sun M" description="Levocetirizine 5mg + Montelukast 10mg" />
            <ProductBox name="Cough-Sun Expectorant" description="Terbutaline + Guaiphenesin + Bromhexine Syrup" />

        </div>
    </section>)
}

const extractCompositionName = (value: string) => {
    return value
        .replace(/\s+\d+(\.\d+)?\s*(mcg|mg|g|iu)?$/i, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
};

// const uniqueCompositionNames = React.useMemo(() => {
//     if (!manufacturer?.compositionAvailable) return [];

//     const allNames = manufacturer.compositionAvailable.flatMap(c =>
//         c.composition?.map(extractCompositionName) ?? []
//     );

//     return Array.from(new Set(allNames));
// }, [manufacturer]);

const Compositions = ({ manufacturer }: {manufacturer: Manufacturer}) => {
    const uniqueCompositionNames = React.useMemo(() => {
        if (!manufacturer?.compositionAvailable) return [];

        const allNames = manufacturer.compositionAvailable.flatMap(c =>
            c.composition?.map(extractCompositionName) ?? []
        );

        return Array.from(new Set(allNames));
    }, [manufacturer]);

    return (
        <section className="p-2 bg-white">
            <h3 className="font-bold text-lg mb-3">Compositions Available</h3>

            <ul
                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    gap-x-8
                    gap-y-2
                "
            >
                {uniqueCompositionNames.map((name, index) => (
                    <p key={index}>{name}</p>
                    // <CompositionList
                    //     key={name}   // stable key now
                    //     label={name}
                    // />
                ))}
            </ul>
        </section>
    );
};
    