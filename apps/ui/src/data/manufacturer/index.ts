import { faker } from '@faker-js/faker';

/** COMPOSITIONS */
function createCompositions() {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    composition: faker.science.chemicalElement().name,
    category: faker.helpers.arrayElement([
      "Pain Relief",
      "Antibiotic",
      "Blood Pressure",
      "Diabetes",
      "Cholesterol",
      "Acid Reflux",
      "Allergy",
      "Cardiovascular",
      "Respiratory",
      "Anti-inflammatory",
      "Blood Thinner",
      "Thyroid",
      "Urology",
      "Neuropathic Pain",
      "Seizure Control",
    ]),
  };
}


// ** PRODUCT
function createProduct() {
  return {
    p_id: faker.string.uuid(),
    p_salt: faker.helpers.arrayElement([
      "Paracetamol","Amoxicillin","Pantoprazole","Azithromycin", "Diclofenac"
    ]),
    p_name: faker.helpers.arrayElement([
      "Crocin","Calpol","Dolo 650","Pacimol", "Metacin", "Amoxil", "Mox", "Softmox", "Wymox", "Pantocid", "Pantozol", "Pantodac", "Azithral", "Zithromax", "Azee", "Azibest"
    ]),
    composition: faker.helpers.multiple(createCompositions, {
      count: Math.floor(Math.random() * 1),
    }),
    p_category: faker.helpers.arrayElement([category.ALOPATHY, category.AYURVEDIC, category.HOMEOPATHY]),
    price: faker.number.int({ min: 50, max: 800 }),
    minOrderRequired: faker.number.int({ min: 1, max: 100 }),
    productType: faker.helpers.arrayElement([
      "tablet", "capsule", "syrup", "ointment", "injection"
    ]),
    packageType: faker.helpers.arrayElement([   // ✅ Fix field name
      "ALU-ALU", "ALU-PVC", "BLISTER", "BLISTER-BOX", "STRIP PACK"
    ]),
    packageSize: faker.helpers.arrayElement([
      "10x10", "200 ml", "4x5x10", "60 ml"
    ])
  };
}


/**Manufacturer */
function createRandomManufacturer():any {
  return {
    id: faker.string.uuid(),
    name: faker.company.buzzNoun(),
    description: faker.company.buzzPhrase(),
    email: faker.internet.email(),
    avatar: faker.image.url(),
    location: faker.location.city(),
    registeredAt: faker.date.past().toDateString(),
    interestedInPCDMonopoly: faker.datatype.boolean(),
    interestedInPCD: faker.datatype.boolean(),
    interestedInThirdPartyProducts: faker.datatype.boolean(),
    interestedInPrivateLabels: faker.datatype.boolean(),
    compositionAvailable: faker.helpers.multiple(createCompositions, {
      count: Math.floor(Math.random() * 50),
    }),

    // PRODUCTS
    products: faker.helpers.multiple(createProduct, {
      count: Math.floor(Math.random() * 50),
    }),
    productCategoriesSupported: [category.ALOPATHY, category.AYURVEDIC],
    sponsored: faker.datatype.boolean(),
    exportAvailable: faker.datatype.boolean()
  };
}

export const CATEGORY_MAP = {
  alopathy: 0,
  ayurvedic: 1,
  homeopathy: 2
}

enum category {
  ALOPATHY, AYURVEDIC, HOMEOPATHY
}

export const getManufacturers = faker.helpers.multiple(createRandomManufacturer, {
  count: 100,
});

export type ExportMode = "road" | "cargo" | "air";

export type PackageType =
  | "BLISTER-BOX"
  | "BOTTLE"
  | "TUBE"
  | "DISPO PACK";

export type ProductType =
  | "tablet"
  | "capsule"
  | "capsules"
  | "softgel capsules"
  | "syrup"
  | "cream"
  | "suspension"
  | "injection";

export interface Manufacturer {
  id: string;
  name: string;
  email: string;
  avatar?: string; 
  ceo?: string;
  legalStatus: string;
  location: string;
  address: string;
  registeredAt: string;
  exporter: boolean;
  wholesaler: boolean;
  serviceProvider: boolean;
  distributor: boolean;
  trader: boolean;
  employeeCount?: string;
  gst?: string;
  exportMode: Array<string>;
  businessNature?: Array<string>;
  products?: Array<{
    p_id: string;
    p_salt: string;
    p_name: string;
    composition: string[];
    p_category: category;
    price: number;
    minOrderRequired: number;
    productType: ProductType;
    packageType: PackageType;
    packageSize: string;
  }>;
  compositionAvailable: Array<{
    id: string;
    composition: string[];
    category: category
  }>;
  productCategoriesSupported: category[];
  sponsored: boolean;
  exportAvailable: boolean;
  // productsCount: number;
  // successfulDeliveries: number;
  interestedInPCD?: boolean;
  interestedInPCDMonopoly?: boolean;
  interestedInThirdPartyProducts: boolean;
  interestedInPrivateLabels: boolean;
}



export const ManufacturerListStatic: Manufacturer[] = [
  {
    "id": "edd95d58-3aba-4ac9-9b9f-99ef71919311",
    "name": "Kivonyx Healthcare",
    "legalStatus": "Private Limited Company (Pvt. Ltd.)",
    "email": "Osborne_Batz-Zboncak@hotmail.com",
    "avatar": "https://picsum.photos/seed/SMwThLnf/1120/3483",
    "ceo": "Mr. Kirtan Padia",
    "employeeCount": "50 - 80",
    "gst": "24AAICK2958A1ZR",
    "exporter": true,
    "businessNature": ["PCD Pharma Franchise", "Third Party Manufacturer"],
    "location": "Gujarat, India",
    "address": "403-A, Primate House, Opp. Mother Milk Palace, Nr. Judges Bunglows Cross Road, Bodakdev, Ahmedabad – 380015 (Gujarat, India)", //new field
    "registeredAt": "Fri Aug 08 2025",
    "interestedInPCDMonopoly": true,
    "interestedInPCD": true,
    "interestedInThirdPartyProducts": true,
    "interestedInPrivateLabels": false,
    "wholesaler": true,
    "serviceProvider": true,
    "distributor": true,
    "trader": true,
    "compositionAvailable": [
        {
            "id": "9b91b5fb-7f2c-4cd4-aecf-e2250e8b90ba",
            "composition": [
                "Calcium Carbonate 500mg",
                "Calcitriol 0.25mcg",
                "Omega-3 fatty acid 300mg",
                "Methylcobalamin 1500mcg",
                "Folic acid 800mcg",
                "Boron 1.5mg"
            ],
            "category": 0
        },
        {
            "id": "af3e62d6-a9c3-475a-91e3-89ec9b4d580a",
            "composition": [
                "Methylcobalamin 1500mcg",
                "L-Methyl Folate 1mg",
                "Pyridoxal-5- Phosphate 0.5mg",
                "Vitamin D3 2000 IU"
            ],
            "category": 0
        },
        {
            "id": "08e4369d-1bb6-4f9e-a450-6d4e53e48bfb",
            "composition": [
                "Tricholine Citrate 500 mg",
                "L-Ornithine L-Aspartate 150 mg",
                "Lecithin 125 mg",
                "Methionine 50 mg",
                "Taurine 50 mg",
                "Silymarin 35 mg",
                "Inositol 10 mg",
                "D-Panthenol 5 mg",
                "Folic Acid 150 mcg"
            ],
            "category": 0
        },
        {
            "id": "734c26f3-5a90-4b6d-ae79-1e9fbcd71209",
            "composition": [
                "Dextromethorphan HBr 15mg",
                "Chlorpheniramine Maleate 2mg",
                "Phenylephrine HCl"
            ],
            "category": 0
        },
        {
            "id": "1df9e885-c46a-4c47-8534-0d6bd9a5a9e8",
            "composition": [
                "Multivitamins",
                "Multiminerals",
                "Antioxidants",
                "Lycopene",
                "Ginseng",
                "Ginkgo Biloba",
                "Grape Seed Extract",
                "Green Tea Extract",
                "Mixed Carotenoids",
                "Citrus Bioflavanoids",
                "Lactic Acid Bacillus",
                "Amino acid"
            ],
            "category": 0
        },
        {
            "id": "a902b7ae-e2cc-44d7-a539-a2143e22a6e4",
            "composition": [
                "Chlordiazepoxide 5mg",
                "Clidinium Bromide 2.5mg",
                "Dicyclomine 10mg"
            ],
            "category": 0
        },
        {
            "id": "xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            "composition": [
                "Escitalopram 10mg",
                "Clonazepam 0.5mg"
            ],
            "category": 0
        },
        {
            "id": "xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            "composition": [
                "Ferrous Ascorbate 100mg",
                "Folic Acid 1.5mg",
                "Zinc Sulphate eq. 22.5mg"
            ],
            "category": 0
        }
    ],
    "products": [
        {
            "p_id": "9b91b5fb-7f2c-4cd4-aecf-e2250e8b90ba",
            "p_salt": "Calcium Carbonate",
            "p_name": "CALDONYX MAX Softgel Capsules",
            "composition": [
                "Calcium Carbonate 500mg",
                "Calcitriol 0.25mcg",
                "Omega-3 fatty acid 300mg",
                "Methylcobalamin 1500mcg",
                "Folic acid 800mcg",
                "Boron 1.5mg"
            ],
            "p_category": 0,
            "price": 0,
            "minOrderRequired": 0,
            "productType": "softgel capsules",
            "packageType": "BLISTER-BOX",
            "packageSize": "10x10"
        },
        {
            "p_id": "af3e62d6-a9c3-475a-91e3-89ec9b4d580a",
            "p_salt": "Methylcobalamin",
            "p_name": "VIBIFOL-ACTIV-MD Tablets",
            "composition": [
                "Methylcobalamin 1500mcg",
                "L-Methyl Folate 1mg",
                "Pyridoxal-5- Phosphate 0.5mg",
                "Vitamin D3 2000 IU"
            ],
            "p_category": 0,
            "price": 0,
            "minOrderRequired": 0,
            "productType": "tablet",
            "packageType": "BLISTER-BOX",
            "packageSize": "10x10"
        },
        {
            "p_id": "08e4369d-1bb6-4f9e-a450-6d4e53e48bfb",
            "p_salt": "Tricholine Citrate",
            "p_name": "XYNOLIV-Syrup",
            "composition": [
                "Tricholine Citrate 500 mg",
                "L-Ornithine L-Aspartate 150 mg",
                "Lecithin 125 mg",
                "Methionine 50 mg",
                "Taurine 50 mg",
                "Silymarin 35 mg",
                "Inositol 10 mg",
                "D-Panthenol 5 mg",
                "Folic Acid 150 mcg"
            ],
            "p_category": 0,
            "price": 0,
            "minOrderRequired": 0,
            "productType": "syrup",
            "packageType": "BOTTLE",
            "packageSize": "200 ml"
        },
        {
            "p_id": "734c26f3-5a90-4b6d-ae79-1e9fbcd71209",
            "p_salt": "Dextromethorphan HBr",
            "p_name": "COFCODYL-DX Syrup",
            "composition": [
                "Dextromethorphan HBr 15mg",
                "Chlorpheniramine Maleate 2mg",
                "Phenylephrine HCl"
            ],
            "p_category": 0,
            "price": 0,
            "minOrderRequired": 0,
            "productType": "syrup",
            "packageType": "BOTTLE",
            "packageSize": "100ml"
        },
        {
            "p_id": "1df9e885-c46a-4c47-8534-0d6bd9a5a9e8",
            "p_salt": "Multivitamins",
            "p_name": "VIBIFOL-360 Tablets",
            "composition": [
                "Multivitamins",
                "Multiminerals",
                "Antioxidants",
                "Lycopene",
                "Ginseng",
                "Ginkgo Biloba",
                "Grape Seed Extract",
                "Green Tea Extract",
                "Mixed Carotenoids",
                "Citrus Bioflavanoids",
                "Lactic Acid Bacillus",
                "Amino acid"
            ],
            "p_category": 0,
            "price": 0,
            "minOrderRequired": 0,
            "productType": "tablet",
            "packageType": "BLISTER-BOX",
            "packageSize": "10x10"
        },
        {
            "p_id": "a902b7ae-e2cc-44d7-a539-a2143e22a6e4",
            "p_salt": "Chlordiazepoxide",
            "p_name": "COLIPAM-FORTE Tablets",
            "composition": [
                "Chlordiazepoxide 5mg",
                "Clidinium Bromide 2.5mg",
                "Dicyclomine 10mg"
            ],
            "p_category": 0,
            "price": 0,
            "minOrderRequired": 0,
            "productType": "tablet",
            "packageType": "BLISTER-BOX",
            "packageSize": "4x5x10"
        },
        {
            "p_id": "xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            "p_salt": "Escitalopram",
            "p_name": "DEPONYX Tablets",
            "composition": [
                "Escitalopram 10mg",
                "Clonazepam 0.5mg"
            ],
            "p_category": 0,
            "price": 0,
            "minOrderRequired": 0,
            "productType": "tablet",
            "packageType": "BLISTER-BOX",
            "packageSize": "10x10"
        },
        {
            "p_id": "xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            "p_salt": "Ferrous Ascorbate",
            "p_name": "FERROCK-XT Tablets",
            "composition": [
                "Ferrous Ascorbate 100mg",
                "Folic Acid 1.5mg",
                "Zinc Sulphate eq. 22.5mg"
            ],
            "p_category": 0,
            "price": 0,
            "minOrderRequired": 0,
            "productType": "tablet",
            "packageType": "BLISTER-BOX",
            "packageSize": "10x10"
        }
    ],
    "productCategoriesSupported": [
        0,
        1
    ],
    "sponsored": true,
    "exportAvailable": true,
    "exportMode": [
        "road",
        "cargo",
        "air"
    ]
},
{"id": "f5e8d4c7-7e3a-44fa-9b85-12e4c1ab6809",
    "name": "SP Pharmaceuticals",
    "legalStatus": "Individual - Proprietor",
    "email": "info.sppharmaceuticals@gmail.com",
    "avatar": "https://company.pharmahopers.com/sp-pharmaceuticals",
    "location": "Panchkula, Haryana, India",
    "address": "Plot No-183, Phase-1, Ind. Estate HSIIDC Alipur, Barwala, Panchkula, Haryana, India",
    "registeredAt": "2014",
    "exporter": true,
    "interestedInPCDMonopoly": true,
    "interestedInPCD": true,
    "interestedInThirdPartyProducts": true,
    "interestedInPrivateLabels": false,
    "wholesaler": true,
    "serviceProvider": true,
    "distributor": true,
    "trader": true,
    "gst": "06BAAPG8125R2ZE",
    "businessNature": ["PCD Pharma Franchise"],
    "employeeCount": "50 - 80",
  "compositionAvailable": [
    {
      "id": "comp1",
      "composition": ["Aceclofenac 100mg", "Paracetamol 325mg"],
      "category": 0
    },
    {
      "id": "comp2",
      "composition": ["Azithromycin 250mg"],
      "category": 0
    },
    {
      "id": "comp3",
      "composition": ["Cefixime 200mg", "Ofloxacin 200mg"],
      "category": 0
    },
    {
      "id": "comp4",
      "composition": ["Esomeprazole 40mg"],
      "category": 0
    },
    {
      "id": "comp5",
      "composition": ["Pregabalin 75mg", "Methylcobalamin 750mcg"],
      "category": 0
    },
    {
      "id": "comp6",
      "composition": ["Calcium Carbonate 625mg", "Calcitriol 0.25mcg", "Vitamin K2-7 45mcg"],
      "category": 0
    }
  ],
  "products": [
    {
      "p_id": "sp001",
      "p_salt": "Aceclofenac",
      "p_name": "ACEMIND-P Tablets",
      "composition": ["Aceclofenac 100mg", "Paracetamol 325mg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "tablet",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "sp002",
      "p_salt": "Azithromycin",
      "p_name": "AZIWAWE-250 Tablets",
      "composition": ["Azithromycin 250mg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "tablet",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "sp003",
      "p_salt": "Cefixime & Ofloxacin",
      "p_name": "SPIFI-O Tablets",
      "composition": ["Cefixime 200mg", "Ofloxacin 200mg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "tablet",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "sp004",
      "p_salt": "Esomeprazole",
      "p_name": "ESOROM Tablets",
      "composition": ["Esomeprazole 40mg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "tablet",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "sp005",
      "p_salt": "Pregabalin & Methylcobalamin",
      "p_name": "PREGAMIND-M Capsules",
      "composition": ["Pregabalin 75mg", "Methylcobalamin 750mcg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "capsule",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "sp006",
      "p_salt": "Calcium Carbonate",
      "p_name": "CALCOTRIL-K2 Softgel Capsules",
      "composition": ["Calcium Carbonate 625mg", "Calcitriol 0.25mcg", "Vitamin K2-7 45mcg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "softgel capsules",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x1x10"
    }
  ],
  "productCategoriesSupported": [
    0,
    1
  ],
  "sponsored": true,
  "exportAvailable": true,
  "exportMode": [
    "road",
    "cargo",
    "air"
  ]
},
{
  "id": "1e87d4b3-60f3-4c6f-9a0c-2ce8f4456374",
    "name": "Dr. D Pharma",
    "legalStatus": "Proprietorship",
    "email": "drdpharmachd@gmail.com",
    "avatar": "https://company.pharmahopers.com/dr-d-pharma",
    "location": "Baddi, Himachal Pradesh, India",
    "address": "Village Bhatoli Khurd, Opposite Birla Textile Officer Colony, Baddi–134114, Himachal Pradesh, India",
    "registeredAt": "2010",
    "gst": "02BERPP4767D1ZA",
    "businessNature": ["Manufacturer"],
    "employeeCount": "upto 10",
    "exporter": true,
    "interestedInPCDMonopoly": true,
    "interestedInPCD": true,
    "interestedInThirdPartyProducts": true,
    "interestedInPrivateLabels": false,
    "wholesaler": true,
    "serviceProvider": true,
    "distributor": true,
    "trader": true,
  "compositionAvailable": [
    {
      "id": "comp1",
      "composition": ["Etoricoxib 120mg"],
      "category": 0
    },
    {
      "id": "comp2",
      "composition": ["Ondansetron 4mg"],
      "category": 0
    },
    {
      "id": "comp3",
      "composition": ["Pantoprazole Sodium 40mg", "Itopride Hydrochloride 150mg"],
      "category": 0
    },
    {
      "id": "comp4",
      "composition": ["Aceclofenac 100mg", "Paracetamol 325mg", "Chlorzoxazone 250mg"],
      "category": 0
    },
    {
      "id": "comp5",
      "composition": ["Lactulose 10gm/15ml"],
      "category": 0
    }
  ],
  "products": [
    {
      "p_id": "drd-001",
      "p_salt": "Etoricoxib",
      "p_name": "DCORI-120 Tablets",
      "composition": ["Etoricoxib 120mg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "tablet",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "drd-002",
      "p_salt": "Ondansetron",
      "p_name": "VOMIDIN Tablets",
      "composition": ["Ondansetron 4mg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "tablet",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "drd-003",
      "p_salt": "Pantoprazole + Itopride",
      "p_name": "DPANTA-IT Capsules",
      "composition": ["Pantoprazole Sodium 40mg", "Itopride Hydrochloride 150mg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "capsules",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "drd-004",
      "p_salt": "Aceclofenac",
      "p_name": "DCEC-MR Tablets",
      "composition": ["Aceclofenac 100mg", "Paracetamol 325mg", "Chlorzoxazone 250mg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "tablet",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "drd-005",
      "p_salt": "Lactulose",
      "p_name": "DLAC-100 Syrup",
      "composition": ["Lactulose 10gm/15ml"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "syrup",
      "packageType": "BOTTLE",
      "packageSize": "100 ml"
    },
    {
      "p_id": "drd-006",
      "p_salt": "Methylcobalamin",
      "p_name": "DECOB 2500 Injection",
      "composition": ["Methylcobalamin Injection 2500mcg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "injection",
      "packageType": "DISPO PACK",
      "packageSize": ""
    }
  ],
  "productCategoriesSupported": [
    0,
    1
  ],
  "sponsored": true,
  "exportAvailable": true,
  "exportMode": [
    "road",
    "cargo",
    "air"
  ]
},
{
  "id": "f2d1c7a8-3bde-4f19-a01a-c7d5878f97de",
    "name": "Bidu Biotech",
    "legalStatus": "Individual - Proprietor",
    "email": "akashyap@bidubiotech.com",
    "avatar": "https://company.pharmahopers.com/bidu-biotech",
    "location": "S.A.S. Nagar (Mohali), Punjab, India",
    "address": "SCO-50, TDI City, Sector-118, Chandigarh-Kharar Highway, Mohali, Punjab, India",
    "registeredAt": "2010",
    "gst": "03BADPK9123Q1ZG",
    "businessNature": ["PCD Pharma Franchise", "Third Party Manufacturer"],
    "employeeCount": "155",
    "exporter": true,
    "interestedInPCDMonopoly": true,
    "interestedInPCD": true,
    "interestedInThirdPartyProducts": true,
    "interestedInPrivateLabels": false,
    "wholesaler": true,
    "serviceProvider": true,
    "distributor": true,
    "trader": true,
  "compositionAvailable": [
    {
      "id": "comp1",
      "composition": ["Pregabalin 75mg", "Methylcobalamin 1500 mcg"],
      "category": 0
    },
    {
      "id": "comp2",
      "composition": ["Methylcobalamin 1500 mcg", "Folic Acid 1.5 mg", "Alpha Lipoic Acid 100 mg", "Thiamine Mononitrate 10 mg", "Pyridoxine Hydrochloride 3 mg", "Vitamin D3 1000 IU"],
      "category": 0
    },
    {
      "id": "comp3",
      "composition": ["Sodium Valproate", "Valproic Acid 300 CR"],
      "category": 0
    },
    {
      "id": "comp4",
      "composition": ["Pregabalin 75mg", "Methylcobalamin 750 mcg"],
      "category": 0
    },
    {
      "id": "comp5",
      "composition": ["100% Lycopene", "Multivitamin", "Antioxidant"],
      "category": 0
    },
    {
      "id": "comp6",
      "composition": ["Bromhexine Hydrochloride 4mg", "Dextromethorphan Hydrobromide 5mg", "Ammonium Chloride 50mg", "Menthol"],
      "category": 0
    }
  ],
  "products": [
    {
      "p_id": "prod-bidu-001",
      "p_salt": "Pregabalin",
      "p_name": "Dibion-Forte Tablets",
      "composition": ["Pregabalin 75mg", "Methylcobalamin 1500 mcg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "tablet",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "prod-bidu-002",
      "p_salt": "Methylcobalamin",
      "p_name": "Dibion Plus Forte Tablets",
      "composition": ["Methylcobalamin 1500 mcg", "Folic Acid 1.5 mg", "Alpha Lipoic Acid 100 mg", "Thiamine Mononitrate 10 mg", "Pyridoxine Hydrochloride 3 mg", "Vitamin D3 1000 IU"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "tablet",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "prod-bidu-003",
      "p_salt": "Sodium Valproate",
      "p_name": "Dewell-300 CR Tablets",
      "composition": ["Sodium Valproate", "Valproic Acid 300 CR"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "tablet",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "prod-bidu-004",
      "p_salt": "Pregabalin",
      "p_name": "Debion-75 Tablets",
      "composition": ["Pregabalin 75mg", "Methylcobalamin 750 mcg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "tablet",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "prod-bidu-005",
      "p_salt": "Lycopene",
      "p_name": "Deltox-L Capsules",
      "composition": ["100% Lycopene", "Multivitamin", "Antioxidant"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "capsule",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "prod-bidu-006",
      "p_salt": "Bromhexine Hydrochloride",
      "p_name": "Derex-BA Syrup",
      "composition": ["Bromhexine Hydrochloride 4mg", "Dextromethorphan Hydrobromide 5mg", "Ammonium Chloride 50mg", "Menthol"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "syrup",
      "packageType": "BOTTLE",
      "packageSize": "100ml"
    }
  ],
  "productCategoriesSupported": [
    0,
    1
  ],
  "sponsored": true,
  "exportAvailable": true,
  "exportMode": [
    "road",
    "air"
  ]
},
{
 "id": "d9faef6b-2bdb-4678-a701-dc5e98f65ef9",
    "name": "Novogen Captab",
    "legalStatus": "Partnership Firm Registered Under Indian Partnership Act 1932",
    "email": "novogenp@gmail.com",
    "avatar": "https://company.pharmahopers.com/novogen-captab",
    "location": "Mohali, Punjab, India",
    "address": "CAPTAB R2 Tower, Plot No. F-D235, Second Floor, Industrial Area, Phase-8B, Mohali - 160071, Punjab, India",
    "registeredAt": "2011",
    "gst": "03AAIFN4775H1Z5",
    "businessNature": ["PCD Pharma Franchise"],
    "employeeCount": "11 - 25",
    "exporter": true,
    "interestedInPCDMonopoly": true,
    "interestedInPCD": true,
    "interestedInThirdPartyProducts": true,
    "interestedInPrivateLabels": false,
    "wholesaler": true,
    "serviceProvider": true,
    "distributor": true,
    "trader": true,
  "compositionAvailable": [
    {
      "id": "comp1",
      "composition": ["Ketoconazole 2.0% w/w", "Iodochlorhydroxyquinoline 1.0% w/w", "Tolnaftate 1.0% w/w", "Neomycin Sulphate 0.1% w/w"],
      "category": 0
    },
    {
      "id": "comp2",
      "composition": ["Mefenamic Acid 500mg"],
      "category": 0
    },
    {
      "id": "comp3",
      "composition": ["Trypsin 96mg", "Bromelain 180mg", "Rutoside 200mg"],
      "category": 0
    },
    {
      "id": "comp4",
      "composition": ["Collagen Peptide Type-II 150mg", "Collagen Peptide Type-I 40mg", "Rosehip Extract 275mg", "Sodium Hyaluronate 40mg", "Curcumin Extract 50mg", "Chondroitin Sulphate 200mg"],
      "category": 0
    },
    {
      "id": "comp5",
      "composition": ["Dextromethorphan Hydrobromide 10mg", "Phenylephrine Hydrochloride 5mg", "Chlorpheniramine Maleate 2mg"],
      "category": 0
    },
    {
      "id": "comp6",
      "composition": ["Bilastine 10mg", "Montelukast 4mg"],
      "category": 0
    }
  ],
  "products": [
    {
      "p_id": "prod-novo-001",
      "p_salt": "Ketoconazole",
      "p_name": "ACUDERM CREAM",
      "composition": ["Ketoconazole 2.0% w/w", "Iodochlorhydroxyquinoline 1.0% w/w", "Tolnaftate 1.0% w/w", "Neomycin Sulphate 0.1% w/w"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "cream",
      "packageType": "TUBE",
      "packageSize": "15 gm"
    },
    {
      "p_id": "prod-novo-002",
      "p_salt": "Mefenamic Acid",
      "p_name": "CUMEF-500 Tablets",
      "composition": ["Mefenamic Acid 500mg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "tablet",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "prod-novo-003",
      "p_salt": "Trypsin",
      "p_name": "TRIPDASE-FORTE Tablets",
      "composition": ["Trypsin 96mg", "Bromelain 180mg", "Rutoside 200mg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "tablet",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "prod-novo-004",
      "p_salt": "Collagen Peptides",
      "p_name": "ELSHOT Softgel Capsules",
      "composition": ["Collagen Peptide Type-II 150mg", "Collagen Peptide Type-I 40mg", "Rosehip Extract 275mg", "Sodium Hyaluronate 40mg", "Curcumin Extract 50mg", "Chondroitin Sulphate 200mg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "softgel capsules",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "prod-novo-005",
      "p_salt": "Dextromethorphan Hydrobromide",
      "p_name": "NOVOCOFF Softgel Capsules",
      "composition": ["Dextromethorphan Hydrobromide 10mg", "Phenylephrine Hydrochloride 5mg", "Chlorpheniramine Maleate 2mg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "softgel capsules",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x1x10"
    },
    {
      "p_id": "prod-novo-006",
      "p_salt": "Bilastine",
      "p_name": "ELBEL-M SUSPENSION",
      "composition": ["Bilastine 10mg", "Montelukast 4mg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "suspension",
      "packageType": "BOTTLE",
      "packageSize": "100 ml"
    }
  ],
  "productCategoriesSupported": [
    0,
    1
  ],
  "sponsored": true,
  "exportAvailable": true,
  "exportMode": [
    "road",
    "air"
  ]
},
{
  "id": "c8fa9f58-769e-4b1b-9e11-ae71f2f33f92",
    "name": "Urochem Biotech",
    "legalStatus": "Partnership Firm",
    "email": "info@urochembiotech.in",
    "avatar": "https://company.pharmahopers.com/urochem-biotech",
    "location": "Panchkula, Haryana, India",
    "address": "Plot No-229, 2nd Floor, Phase-1, Panchkula, 134113, Haryana, India",
    "registeredAt": "2017",
    "gst": "04AAFFU3699G1ZW",
    "businessNature": ["PCD Pharma Franchise"],
    "employeeCount": "50 - 80",
    "exporter": true,
    "interestedInPCDMonopoly": true,
    "interestedInPCD": true,
    "interestedInThirdPartyProducts": true,
    "interestedInPrivateLabels": false,
    "wholesaler": true,
    "serviceProvider": true,
    "distributor": true,
    "trader": true,
  "compositionAvailable": [
    {
      "id": "comp1",
      "composition": ["Lycopene (10%) 5.00mg", "Grape Seed Extract 25.00mg", "Lutein 10% 7.00mg", "Beta Carotene 30% 6.00mg", "Vitamin E 9.00mg", "Zinc Oxide 7.00mg", "Folic Acid 160.00mcg", "Manganese Sulphate 1.00mg", "Sodium Selenate 86.16mcg", "Copper 1.00mcg"],
      "category": 0
    },
    {
      "id": "comp2",
      "composition": ["Ginseng Extract Powder 42.5mg", "Vitamin C 15mg", "Vitamin E Acetate 5mg", "Niacinamide 5mg", "Calcium Pantothenate 5mg", "Vitamin B2 1.28mg", "Vitamin B1 1mg", "Vitamin B6 1mg", "Vitamin A Palmitate 461.5mcg", "Folic Acid 150mcg", "Vitamin D3 150mcg", "Vitamin B12 0.8mcg", "Calcium 75mg", "Phosphorus 58mg", "Ferrous Fumarate 30mg", "Zinc 10mg", "Magnesium 3mg", "Potassium Sulphate 2mg", "Copper 0.5mg", "Manganese 0.5mg", "Iodine 100mcg"],
      "category": 0
    },
    {
      "id": "comp3",
      "composition": ["Calcium Carbonate IP 500mg", "Calcitriol IP 0.25mcg", "Zinc Sulphate Monohydrate (eq. elemental zinc 7.5mg)", "Magnesium Sulphate (eq. elemental magnesium 50mg)", "Vitamin K2-7 IP 45mcg", "Methylcobalamine IP 1500mcg", "L-Methyl folate 800mcg"],
      "category": 0
    },
    {
      "id": "comp4",
      "composition": ["Potassium Citrate 1100mg", "Magnesium Citrate 375mg", "Pyridoxine HCl 20mg"],
      "category": 0
    },
    {
      "id": "comp5",
      "composition": ["Fungal Diastase 50mg", "Cinnamon Oil 250mcg", "Caraway Oil 500mcg", "Cardamom Oil 500mcg"],
      "category": 0
    }
  ],
  "products": [
    {
      "p_id": "urochem-001",
      "p_salt": "Lycopene",
      "p_name": "LYCOP-G Softgel Capsules",
      "composition": ["Lycopene (10%) 5.00mg", "Grape Seed Extract 25.00mg", "Lutein 10% 7.00mg", "Beta Carotene 30% 6.00mg", "Vitamin E 9.00mg", "Zinc Oxide 7.00mg", "Folic Acid 160.00mcg", "Manganese Sulphate 1.00mg", "Sodium Selenate 86.16mcg", "Copper 1.00mcg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "softgel capsules",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "urochem-002",
      "p_salt": "Ginseng Extract Powder",
      "p_name": "MULTIVMIN-G Softgel Capsules",
      "composition": ["Ginseng Extract Powder 42.5mg", "Vitamin C 15mg", "Vitamin E Acetate 5mg", "Niacinamide 5mg", "Calcium Pantothenate 5mg", "Vitamin B2 1.28mg", "Vitamin B1 1mg", "Vitamin B6 1mg", "Vitamin A Palmitate 461.5mcg", "Folic Acid 150mcg", "Vitamin D3 150mcg", "Vitamin B12 0.8mcg", "Calcium 75mg", "Phosphorus 58mg", "Ferrous Fumarate 30mg", "Zinc 10mg", "Magnesium 3mg", "Potassium Sulphate 2mg", "Copper 0.5mg", "Manganese 0.5mg", "Iodine 100mcg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "softgel capsules",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "urochem-003",
      "p_salt": "Calcium Carbonate",
      "p_name": "CEZCAL-K2 7 Softgel Capsules",
      "composition": ["Calcium Carbonate IP 500mg", "Calcitriol IP 0.25mcg", "Zinc Sulphate Monohydrate (eq. elemental zinc 7.5mg)", "Magnesium Sulphate (eq. elemental magnesium 50mg)", "Vitamin K2-7 IP 45mcg", "Methylcobalamine IP 1500mcg", "L-Methyl folate 800mcg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "softgel capsules",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x1x10"
    },
    {
      "p_id": "urochem-004",
      "p_salt": "Potassium Citrate",
      "p_name": "OROSTONE-B6 Syrup",
      "composition": ["Potassium Citrate 1100mg", "Magnesium Citrate 375mg", "Pyridoxine HCl 20mg (Each 5ml)"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "syrup",
      "packageType": "BOTTLE",
      "packageSize": "200 ml"
    },
    {
      "p_id": "urochem-005",
      "p_salt": "Fungal Diastase",
      "p_name": "UROZIME (SUGAR FREE) Syrup 100ml",
      "composition": ["Fungal Diastase 50mg", "Cinnamon Oil 250mcg", "Caraway Oil 500mcg", "Cardamom Oil 500mcg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "syrup",
      "packageType": "BOTTLE",
      "packageSize": "100 ml"
    },
    {
      "p_id": "urochem-006",
      "p_salt": "Fungal Diastase",
      "p_name": "UROZIME (SUGAR FREE) Syrup 200ml",
      "composition": ["Fungal Diastase 50mg", "Cinnamon Oil 250mcg", "Caraway Oil 500mcg", "Cardamom Oil 500mcg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "syrup",
      "packageType": "BOTTLE",
      "packageSize": "200 ml"
    }
  ],
  "productCategoriesSupported": [
    0,
    1
  ],
  "sponsored": true,
  "exportAvailable": true,
  "exportMode": [
    "road",
    "cargo",
    "air"
  ]
},
{
   "id": "ff3a2c09-bce4-4c05-9a14-df1c5e6e5832",
    "name": "Servocare Lifesciences Pvt. Ltd.",
    "legalStatus": "Private Limited Company",
    "email": "intro@servocarelifesciences.co.in",
    "avatar": "https://company.pharmahopers.com/servocare-lifesciences-pvt-ltd",
    "location": "Manimajra, Chandigarh & Panchkula, Haryana, India",
    "address": "SCF-246, New Motor Market, Manimajra, Chandigarh – 160101, India; Office: Plot No. 353, Industrial Area Phase-1, Panchkula, Haryana – 134113, India",
    "registeredAt": "2005",
    "gst": "04AAFFU3699G1ZW",
    "businessNature": ["PCD Pharma Franchise"],
    "employeeCount": "50 - 80",
    "exporter": true,
    "interestedInPCDMonopoly": true,
    "interestedInPCD": true,
    "interestedInThirdPartyProducts": true,
    "interestedInPrivateLabels": true,
    "wholesaler": true,
    "serviceProvider": true,
    "distributor": true,
    "trader": true,
  "compositionAvailable": [
    {
      "id": "servocare-comp1",
      "composition": ["Azelaic Acid 15% w/w"],
      "category": 0
    },
    {
      "id": "servocare-comp2",
      "composition": ["Clindamycin 1% w/w"],
      "category": 0
    },
    {
      "id": "servocare-comp3",
      "composition": ["Eberconazole 1% w/w"],
      "category": 0
    },
    {
      "id": "servocare-comp4",
      "composition": ["Mometasone Furoate 0.1% w/w", "Fusidic Acid 2% w/w"],
      "category": 0
    },
    {
      "id": "servocare-comp5",
      "composition": ["Adapalene 0.1% w/w", "Clindamycin 1% w/w"],
      "category": 0
    },
    {
      "id": "servocare-comp6",
      "composition": ["Amrolfine 0.25% w/w"],
      "category": 0
    }
  ],
  "products": [
    {
      "p_id": "servocare-prod001",
      "p_salt": "Azelaic Acid",
      "p_name": "Azelite Cream",
      "composition": ["Azelaic Acid 15% w/w"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "cream",
      "packageType": "TUBE",
      "packageSize": "15 gm"
    },
    {
      "p_id": "servocare-prod002",
      "p_salt": "Clindamycin",
      "p_name": "Clidis Cream",
      "composition": ["Clindamycin 1% w/w"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "cream",
      "packageType": "TUBE",
      "packageSize": "20 gm"
    },
    {
      "p_id": "servocare-prod003",
      "p_salt": "Eberconazole",
      "p_name": "Ebnol Cream",
      "composition": ["Eberconazole 1% w/w"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "cream",
      "packageType": "TUBE",
      "packageSize": "15 gm"
    },
    {
      "p_id": "servocare-prod004",
      "p_salt": "Eberconazole + Mometasone",
      "p_name": "Ebnol M Cream",
      "composition": ["Eberconazole 1% w/w", "Mometasone Furoate 0.1% w/w"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "cream",
      "packageType": "TUBE",
      "packageSize": "30 gm"
    },
    {
      "p_id": "servocare-prod005",
      "p_salt": "Adapalene + Clindamycin",
      "p_name": "Edlair C Cream",
      "composition": ["Adapalene 0.1% w/w", "Clindamycin 1% w/w"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "cream",
      "packageType": "TUBE",
      "packageSize": "15 gm"
    },
    {
      "p_id": "servocare-prod006",
      "p_salt": "Amrolfine",
      "p_name": "Fenis Cream",
      "composition": ["Amrolfine 0.25% w/w"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "cream",
      "packageType": "TUBE",
      "packageSize": "30 gm"
    }
  ],
  "productCategoriesSupported": [
    0,
    1
  ],
  "sponsored": true,
  "exportAvailable": true,
  "exportMode": [
    "road",
    "air"
  ]
},
{
  "id": "5a2c4d9e-91b2-4ac5-aa41-f0d87fd2e1b3",
    "name": "Soigner Pharma",
    "legalStatus": "Private Limited Company",
    "email": "info@soignerpharma.com",
    "avatar": "https://company.pharmahopers.com/soigner-pharma",
    "location": "Zirakpur, Punjab, India",
    "address": "SCO 5-6, Wadhwa Nagar, Near Hotel Sunpark, Kalka Highway, Zirakpur, Punjab – 140603, India",
    "registeredAt": "2007",
    "gst": "04AAFFU3699G1ZW",
    "businessNature": ["PCD Pharma Franchise"],
    "employeeCount": "50 - 80",
    "exporter": true,
    "interestedInPCDMonopoly": true,
    "interestedInPCD": true,
    "interestedInThirdPartyProducts": true,
    "interestedInPrivateLabels": true,
    "wholesaler": true,
    "serviceProvider": true,
    "distributor": true,
    "trader": true,
  "compositionAvailable": [
    {
      "id": "comp1",
      "composition": ["Levocetirizine 5mg"],
      "category": 0
    },
    {
      "id": "comp2",
      "composition": ["Cefpodoxime Proxetil 200mg"],
      "category": 0
    },
    {
      "id": "comp3",
      "composition": ["Ofloxacin 200mg"],
      "category": 0
    },
    {
      "id": "comp4",
      "composition": ["Pantoprazole 40mg", "Domperidone 10mg"],
      "category": 0
    },
    {
      "id": "comp5",
      "composition": ["Fexofenadine 120mg", "Montelukast 10mg"],
      "category": 0
    }
  ],
  "products": [
    {
      "p_id": "sp-001",
      "p_salt": "Levocetirizine",
      "p_name": "5 Zine Tablet",
      "composition": ["Levocetirizine 5mg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "tablet",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "sp-002",
      "p_salt": "Cefpodoxime Proxetil",
      "p_name": "PODZY-CV Tablets",
      "composition": ["Cefpodoxime Proxetil 200mg", "Clavulanic Acid 125mg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "tablet",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "sp-003",
      "p_salt": "Ofloxacin",
      "p_name": "POLKA-200 Tablets",
      "composition": ["Ofloxacin 200mg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "tablet",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "sp-004",
      "p_salt": "Pantoprazole + Domperidone",
      "p_name": "PENSIG Tablets",
      "composition": ["Pantoprazole 40mg", "Domperidone 10mg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "tablet",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    },
    {
      "p_id": "sp-005",
      "p_salt": "Fexofenadine + Montelukast",
      "p_name": "FEXMARE Tablets",
      "composition": ["Fexofenadine 120mg", "Montelukast 10mg"],
      "p_category": 0,
      "price": 0,
      "minOrderRequired": 0,
      "productType": "tablet",
      "packageType": "BLISTER-BOX",
      "packageSize": "10x10"
    }
  ],
  "productCategoriesSupported": [
    0,
    1
  ],
  "sponsored": true,
  "exportAvailable": true,
  "exportMode": [
    "road",
    "cargo",
    "air"
  ]
}
]