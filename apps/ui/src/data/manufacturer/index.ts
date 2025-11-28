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
    registeredAt: faker.date.past(),
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


export interface Manufacturer {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  products?: Array<{
    id: number;
    composition: string;
    category: string;
  }>;
  productsCount: number;
  successfulDeliveries: number;
  interestedInPCD?: boolean;
  interestedInPCDMonopoly?: boolean;
}