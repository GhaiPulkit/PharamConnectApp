export const Manufacturers: Array<Manufacturer> = [
    {
        id: 1,
        name: "PharmaCorp",
        logoUrl: "https://example.com/logos/pharmacorp.png",
        location: "New York, USA",
        products: [
            { id: 1, name: "Aspirin", category: "Pain Relief" },
            { id: 2, name: "Amoxicillin", category: "Antibiotic" },
            { id: 3, name: "Lisinopril", category: "Blood Pressure" },
        ],
        productsCount: 120,
        successfulDeliveries: 85,
    },
    {
        id: 2,
        name: "MediHealth",
        logoUrl: "https://example.com/logos/medihealth.png",
        location: "London, UK",
        products: [
            { id: 4, name: "Ibuprofen", category: "Pain Relief" },
            { id: 5, name: "Metformin", category: "Diabetes" },
        ],
        productsCount: 95,
        successfulDeliveries: 70,
    },
    {
        id: 3,
        name: "GlobalPharma",
        logoUrl: "https://example.com/logos/globalpharma.png",
        location: "Berlin, Germany",
        products: [
            { id: 6, name: "Atorvastatin", category: "Cholesterol" },
            { id: 7, name: "Omeprazole", category: "Acid Reflux" },
            { id: 8, name: "Amlodipine", category: "Blood Pressure" },
            { id: 9, name: "Simvastatin", category: "Cholesterol" },
        ],
        productsCount: 150,
        successfulDeliveries: 110,
    },
];

export default Manufacturers;


export interface Manufacturer {
    id: number;
    name: string;
    logoUrl: string;
    location?: string;
    products?: Array<{
        id: number;
        name: string;
        category: string;
    }>;
    productsCount: number;
    successfulDeliveries: number;
}